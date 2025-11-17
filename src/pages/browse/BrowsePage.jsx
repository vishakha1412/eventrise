 // BrowsePage.jsx
import React, { useEffect, useState, useRef, useCallback } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

 

export const BrowsePage = () => {
  const navigate = useNavigate();

  // data
  const [allEvents, setAllEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [visibleEvents, setVisibleEvents] = useState([]);

  // ui states
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [error, setError] = useState(null);

  const [searchText, setSearchText] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [activeTag, setActiveTag] = useState(null);

  // metadata
  const [categories, setCategories] = useState(["All"]);
  const [locations, setLocations] = useState(["All"]);
  const [tags, setTags] = useState([]);

  // infinite scroll config
  const PAGE_SIZE = 6;
  const pageRef = useRef(1);
  const sentinelRef = useRef(null);
  const observerRef = useRef(null);
  const mountedRef = useRef(false);

  // simple debounce
  const debounce = (fn, delay = 300) => {
    let t;
    return (...args) => {
      clearTimeout(t);
      t = setTimeout(() => fn(...args), delay);
    };
  };

  // ---------- fetch events (same API & token logic) ----------
  useEffect(() => {
    mountedRef.current = true;
    const getCookie = (name) => {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop().split(";").shift();
      return undefined;
    };
    const token = getCookie("token");

    if (!token) {
      navigate("/register");
      return;
    }

    setIsLoading(true);
    setError(null);

    axios
      .get("http://localhost:5000/api/event/", { withCredentials: true })
      .then((res) => {
        if (!mountedRef.current) return;
        const ev = Array.isArray(res.data.events) ? res.data.events : [];
        setAllEvents(ev);
        setFilteredEvents(ev);
        pageRef.current = 1;
        setVisibleEvents(ev.slice(0, PAGE_SIZE));

        // derive categories, locations, tags
        const cats = new Set();
        const locs = new Set();
        const tset = new Set();
        ev.forEach((e) => {
          if (e.category) cats.add(e.category);
          if (e.location) locs.add(e.location);
          if (Array.isArray(e.tags)) e.tags.forEach((t) => tset.add(t));
        });
        setCategories(["All", ...Array.from(cats)]);
        setLocations(["All", ...Array.from(locs)]);
        setTags(Array.from(tset));
      })
      .catch((err) => {
        console.error("BrowsePage: fetch error", err);
        if (!mountedRef.current) return;
        setError("Failed to load events.");
        // preserve original behavior: redirect to /register on error
        navigate("/register");
      })
      .finally(() => {
        if (mountedRef.current) setIsLoading(false);
      });

    return () => {
      mountedRef.current = false;
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [navigate]);

  // ---------- filter & search ----------
  const applyFilters = useCallback(() => {
    let list = [...allEvents];

    const q = (searchText || "").trim().toLowerCase();
    if (q) {
      list = list.filter((e) => {
        const name = (e.name || "").toLowerCase();
        const desc = (e.description || "").toLowerCase();
        const cat = (e.category || "").toLowerCase();
        const tagStr = Array.isArray(e.tags) ? e.tags.join(" ").toLowerCase() : "";
        return (
          name.includes(q) ||
          desc.includes(q) ||
          cat.includes(q) ||
          tagStr.includes(q)
        );
      });
    }

    if (categoryFilter !== "All") {
      list = list.filter((e) => (e.category || "") === categoryFilter);
    }

    if (locationFilter !== "All") {
      list = list.filter((e) => (e.location || "") === locationFilter);
    }

    if (priceFilter === "Free") {
      list = list.filter((e) => !e.price || Number(e.price) === 0);
    } else if (priceFilter === "Paid") {
      list = list.filter((e) => e.price && Number(e.price) > 0);
    }

    if (activeTag) {
      list = list.filter((e) => Array.isArray(e.tags) && e.tags.includes(activeTag));
    }

    setFilteredEvents(list);
    pageRef.current = 1;
    setVisibleEvents(list.slice(0, PAGE_SIZE));
  }, [allEvents, searchText, categoryFilter, locationFilter, priceFilter, activeTag]);

  const debouncedApply = useCallback(debounce(applyFilters, 220), [applyFilters]);

  useEffect(() => {
    debouncedApply();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText, categoryFilter, locationFilter, priceFilter, activeTag, allEvents]);

  // ---------- load more ----------
  const loadMore = useCallback(() => {
    if (isLoadingMore) return;
    if (visibleEvents.length >= filteredEvents.length) return;
    setIsLoadingMore(true);
    setTimeout(() => {
      pageRef.current += 1;
      const next = filteredEvents.slice(0, pageRef.current * PAGE_SIZE);
      setVisibleEvents(next);
      setIsLoadingMore(false);
    }, 350);
  }, [isLoadingMore, visibleEvents.length, filteredEvents]);

  // ---------- intersection observer ----------
  useEffect(() => {
    if (!sentinelRef.current) return;

    if (observerRef.current) {
      observerRef.current.disconnect();
      observerRef.current = null;
    }

    const options = {
      root: null,
      rootMargin: "200px",
      threshold: 0.1,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadMore();
        }
      });
    }, options);

    observerRef.current.observe(sentinelRef.current);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
        observerRef.current = null;
      }
    };
  }, [loadMore]);

  // ---------- utils ----------
  const resetFilters = () => {
    setSearchText("");
    setCategoryFilter("All");
    setLocationFilter("All");
    setPriceFilter("All");
    setActiveTag(null);
  };

  const formatDate = (d) => {
    if (!d) return "TBA";
    try {
      return new Date(d).toLocaleDateString();
    } catch {
      return d;
    }
  };

  // ---------- jsx ----------
  return (
    <motion.div
      className="min-h-screen px-6 py-10 font-poppins"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <h1 className="text-4xl font-extrabold text-center mb-8 text-[#3b1a65] drop-shadow-md">
        Browse Events
      </h1>

      {/* Controls */}
      <div className="max-w-6xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center gap-4">
          {/* search */}
          <div className="flex-1">
            <input
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              placeholder="Search events, description, tags..."
              className="w-full rounded-xl px-4 py-3 bg-[#1E1A2B] text-[#f3eefb] placeholder-[#bfb3e6] shadow-[0_6px_18px_rgba(0,0,0,0.45)] border border-transparent focus:outline-none focus:ring-2 focus:ring-[#A259FF]/40"
            />
          </div>

          {/* filters */}
          <div className="flex gap-3 items-center">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="rounded-xl px-3 py-3 bg-[#22202f] text-[#efe9ff] shadow-inner border border-transparent focus:outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="rounded-xl px-3 py-3 bg-[#22202f] text-[#efe9ff] shadow-inner border border-transparent focus:outline-none"
            >
              {locations.map((l) => (
                <option key={l} value={l}>
                  {l}
                </option>
              ))}
            </select>

            <select
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="rounded-xl px-3 py-3 bg-[#22202f] text-[#efe9ff] shadow-inner border border-transparent focus:outline-none"
            >
              <option value="All">All Prices</option>
              <option value="Free">Free</option>
              <option value="Paid">Paid</option>
            </select>

            <button
              onClick={resetFilters}
              className="rounded-xl px-4 py-2 bg-gradient-to-r from-[#7b2cff] to-[#ff3cac] text-white font-semibold shadow-lg hover:opacity-95"
            >
              Reset
            </button>
          </div>
        </div>

        {/* tag chips */}
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            onClick={() => setActiveTag(null)}
            className={`px-3 py-1.5 rounded-full text-sm ${
              !activeTag
                ? "bg-gradient-to-r from-[#7b2cff] to-[#ff3cac] text-white shadow-lg"
                : "bg-[#2a2536] text-[#eaddff] border border-transparent"
            }`}
          >
            All Tags
          </button>

          {tags.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTag(t === activeTag ? null : t)}
              className={`px-3 py-1.5 rounded-full text-sm ${
                activeTag === t
                  ? "bg-gradient-to-r from-[#7b2cff] to-[#ff3cac] text-white shadow-lg"
                  : "bg-[#2a2536] text-[#eaddff] border border-transparent"
              }`}
            >
              #{t}
            </button>
          ))}
        </div>
      </div>

      {/* grid */}
      <div className="max-w-6xl mx-auto grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {/* skeleton */}
        {isLoading &&
          Array.from({ length: PAGE_SIZE }).map((_, i) => (
            <div
              key={i}
              className="rounded-2xl overflow-hidden bg-gradient-to-b from-[#1b1724] to-[#18141f] shadow-2xl border border-[#2b2236]"
            >
              <div className="w-full h-48 bg-gradient-to-r from-[#2a2135] via-[#271f3a] to-[#241b33] animate-pulse" />
              <div className="p-5">
                <div className="h-6 w-3/4 mb-3 bg-[#2a2236] animate-pulse rounded" />
                <div className="h-4 w-full mb-2 bg-[#2a2236] animate-pulse rounded" />
                <div className="h-4 w-5/6 mb-2 bg-[#2a2236] animate-pulse rounded" />
                <div className="h-10 mt-4 w-32 bg-[#2a2236] animate-pulse rounded-full" />
              </div>
            </div>
          ))}

        {!isLoading && visibleEvents.length === 0 && (
          <div className="col-span-full text-center text-[#5c4a78] p-10 rounded-lg bg-white/60">
            No events found. Try adjusting filters.
          </div>
        )}

        {visibleEvents.map((event) => {
          const title = event.name || "Untitled";
          const desc = event.description || "";
          const priceText =
            event.price && Number(event.price) > 0 ? `₹${event.price}` : "Free";
          const category = event.category || "General";
          const location = event.location || "Online";
          const date = formatDate(event.date);
          const capacity = event.capacity || "—";
          const evTags = Array.isArray(event.tags) ? event.tags : [];

          return (
            <motion.article
              key={event._id || title + Math.random()}
              className="rounded-2xl overflow-hidden transform transition-all"
              whileHover={{ scale: 1.02, y: -6 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
            >
              {/* card wrapper: dark neon style */}
              <div className="bg-[#1E1A2B] border border-[#321f4a] shadow-[0_14px_40px_rgba(95,44,255,0.18)] rounded-2xl overflow-hidden">
                {/* image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={event.image || ""}
                    alt={title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src =
                        "data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='800' height='450' viewBox='0 0 800 450'%3E%3Crect fill='%23221b33' width='800' height='450'/%3E%3Ctext x='50%25' y='50%25' fill='%23d9c7ff' font-size='20' dominant-baseline='middle' text-anchor='middle'%3ENo Image%3C/text%3E%3C/svg%3E";
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0f0816]/80 to-transparent" />
                  <div className="absolute top-3 right-3 px-3 py-1 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-[#7b2cff] to-[#ff3cac] shadow-lg">
                    {priceText}
                  </div>
                </div>

                {/* content */}
                <div className="p-5 text-[#efe9ff]">
                  <div className="flex items-start justify-between gap-4">
                    <h2 className="text-xl font-semibold leading-tight text-[#f7eaff]">
                      {title}
                    </h2>
                    <div className="px-2 py-1 text-sm rounded-md bg-[#2a2038] text-[#e7d8ff] border border-[#3a2a52]">
                      {category}
                    </div>
                  </div>

                  <p className="text-sm text-[#d9d0f7] mt-2 line-clamp-2">
                    {desc}
                  </p>

                  <div className="grid grid-cols-2 gap-2 text-sm text-[#cfc1f8] mt-4">
                    <div>
                      <span className="font-medium text-[#efe9ff]">Location:</span>{" "}
                      {location}
                    </div>
                    <div>
                      <span className="font-medium text-[#efe9ff]">Date:</span>{" "}
                      {date}
                    </div>
                    <div>
                      <span className="font-medium text-[#efe9ff]">Capacity:</span>{" "}
                      {capacity}
                    </div>
                    <div>
                      <span className="font-medium text-[#efe9ff]">Organizer:</span>{" "}
                      {event.name || "—"}
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex gap-2 flex-wrap">
                      {evTags.slice(0, 3).map((t) => (
                        <button
                          key={t}
                          onClick={() => setActiveTag(t)}
                          className="text-xs px-2 py-1 rounded-full bg-[#2a2236] text-[#eaddff] border border-transparent"
                        >
                          #{t}
                        </button>
                      ))}
                    </div>

                    <Link
                      to={`/organiser/${event.eventOrganiser}`}
                      className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gradient-to-r from-[#7b2cff] to-[#ff3cac] text-white text-sm font-semibold shadow-md hover:opacity-95"
                    >
                      Visit Shop →
                    </Link>
                  </div>
                </div>
              </div>
            </motion.article>
          );
        })}

        {/* sentinel */}
        <div ref={sentinelRef} className="col-span-full h-2" />
      </div>

      {/* load more indicator */}
      {isLoadingMore && (
        <div className="max-w-6xl mx-auto text-center mt-6">
          <div className="inline-flex items-center gap-3 bg-white/6 px-4 py-2 rounded-lg">
            <svg
              className="animate-spin w-5 h-5 text-[#b99bff]"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
            <span className="text-[#6f5aa1]">Loading more events...</span>
          </div>
        </div>
      )}

      {/* manual fallback */}
      {!isLoading && !isLoadingMore && visibleEvents.length < filteredEvents.length && (
        <div className="max-w-6xl mx-auto text-center mt-6">
          <button
            onClick={loadMore}
            className="manual-load inline-flex items-center gap-2 px-6 py-2 rounded-lg bg-[#7b2cff] text-white shadow-lg hover:bg-[#9b49ff]"
          >
            Load more
          </button>
        </div>
      )}

      {error && (
        <div className="max-w-6xl mx-auto text-red-400 text-center mt-6">
          {error}
        </div>
      )}
    </motion.div>
  );
};

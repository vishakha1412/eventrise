import axios from 'axios';
import { SERVER_URL } from '../../config';
import { toast } from 'react-hot-toast';
import {  useEffect, useState } from 'react';


function EventCard({ event }) {
    const [isSaved, setIsSaved] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const[likeCount, setLikeCount] = useState(event.likeCount || 0);
 const handleLike = async (eventId) => {
    try {
      const res = await axios.post(`${SERVER_URL}/api/event/like`, { eventId }, { withCredentials: true });
     toast.success(res.data.message);
       const liked = !res.data.message.includes("unliked");
       setLikeCount(prev => prev + (liked ? 1 : -1));
      
     setIsLiked(liked);
    /*  setSavedEvents(prev =>
        prev.map(ev =>
          ev._id === eventId
            ? { ...ev, likeCount: ev.likeCount + (res.data.message.includes("unliked") ? -1 : 1) }
            : ev
        )
      );*/
    } catch (err) {
      toast.error("Error liking event");
    }
  };

  const handleSave = async (eventId) => {
    try {
      const res = await axios.post(`${SERVER_URL}/api/event/save`, { eventId }, { withCredentials: true });
      toast.success(res.data.message);
      setIsSaved(!isSaved);
    //  setSavedEvents(prev => prev.filter(ev => ev._id !== eventId));
    } catch (err) {
      toast.error("Error unsaving event");
    }
  };
  
useEffect(() => {
  const checkLiked = async () => {
    try{
      const res = await axios.get(`${SERVER_URL}/api/event/getLike/${event._id}`, { withCredentials: true });
      
      setIsLiked(res.data.liked);
       


    } catch (err) {
      console.error("Error checking liked status:", err.response?.data || err.message);
    }
  };
  checkLiked();
}, [event._id]);
useEffect(() => {
  const checkSaved = async () => {
    try {
        const res = await axios.get(`${SERVER_URL}/api/event/saved/${event._id}`, { withCredentials: true });
        
        setIsSaved(res.data.saved);
    } catch (err) {
        console.error("Error checking saved status:", err.response?.data || err.message);
    }
    };
    checkSaved();
},[event._id]);


  return (
      <div className="rounded-lg shadow-md p-4 flex flex-row justify-between items-end text-sm font-semibold hover:opacity-95 transition duration-300 w-full">
      <button onClick={() => handleLike(event._id)} className= "text-white px-3 py-1 rounded mr-2 flex items-center space-x-2 bg-gradient-to-r from-[#6a25e0] to-[#ff3cac]">
        <div className="text-xl">{isLiked ? "❤️" : "🤍"}</div>
      <span>{likeCount}</span>

      </button>
      <button onClick={() => handleSave(event._id)} className="text-white px-3 py-1 rounded bg-gradient-to-r from-[#6a25e0] to-[#ff3cac]">
        {isSaved ? <div className="text-xl">✅</div> : <div className="text-xl">💾</div>} Save
      </button>
    </div>

  );
}
export default EventCard;
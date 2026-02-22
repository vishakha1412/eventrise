 import { useState,useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SERVER_URL } from "../config";

export default function DeleteAccountButton({ role }) {
  const [showModal, setShowModal] = useState(false);
  const [typedText, setTypedText] = useState("");
   const [token, setToken] = useState(null);
   const[roles,setRole]=useState(role);



  useEffect(() => {
  
  const fetchSession = async () => {
    try {
      const res = await axios.get(`${SERVER_URL}/api/auth/login/me`, {
        withCredentials: true,
      });

      setToken(true); // token exists if request succeeds
      setRole(res.data?.role || null);
      console.log("Role:", res.data?.role);
    } catch (err) {
      console.error("Session fetch failed:", err.response?.data || err.message);
      setToken(null);
      
      
    

    }
  };

  fetchSession();
} );
  const handleDelete = async () => {
    try {
      const endpoint =
        role === "organiser"
          ? `${SERVER_URL}/api/auth/organiser/delete`
          : `${SERVER_URL}/api/auth/user/delete`;

      await axios.delete(endpoint, { withCredentials: true })
      .then(() => {
          localStorage.removeItem("token");
          localStorage.removeItem("role");
          setToken(null);
          setRole(null);
          toast.success("account delete successful 👋");
          navigate("/");
        })
        .catch((err) => {
          console.error("account delete error:", err);
          toast.error("account delete failed. Please try again.");
        });

      toast.success("Account deleted successfully", { position: "top-center" });
      window.location.href = "/login";
    } catch (err) {
      toast.error(err.response?.data?.message || "Deletion failed", {
        position: "top-center",
      });
    } finally {
      setShowModal(false);
      setTypedText("");
    }
  };
 return (
    <div>
      <button
        className="mt-4 bg-red-500 hover:bg-red-900 text-white px-5 py-2 rounded-lg transition"
        onClick={() => setShowModal(true)}
      >
        Delete Account
      </button>

      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4 text-red-600">
              Confirm Account Deletion
            </h2>
            <p className="mb-4">
              This action <b>cannot be undone</b>. To confirm, type{" "}
              <b>DELETE</b> below:
            </p>
            <input
              type="text"
              value={typedText}
              onChange={(e) => setTypedText(e.target.value)}
              placeholder="Type DELETE"
              className="border px-2 py-1 w-full mb-4"
            />
<div className="flex justify-end space-x-2">
              <button
                className={`px-4 py-2 rounded-lg ${
                  typedText === "DELETE"
                    ? "bg-red-600 hover:bg-red-800 text-white"
                    : "bg-gray-400 text-white"
                }`}
                disabled={typedText !== "DELETE"}
                onClick={handleDelete}
              >
                Confirm Delete
              </button>
              <button
                className="px-4 py-2 rounded-lg bg-gray-500 text-white"
                onClick={() => {
                  setShowModal(false);
                  setTypedText("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

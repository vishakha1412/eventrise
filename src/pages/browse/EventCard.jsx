import axios from 'axios';
import { SERVER_URL } from '../../config';
import { toast } from 'react-hot-toast';
import { use, useEffect, useState } from 'react';


function EventCard({ event }) {
    const [isSaved, setIsSaved] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
  const handleLike = async () => {
    try{
    const res = await axios.post(`${SERVER_URL}/api/event/like`, { eventId: event._id }, { withCredentials: true });
     console.log("Liked event", res.data);
    // Optionally refresh event list or update state
    }catch(e){
      console.error("Error liking event:", e.response?.data?.message || e.message);
    }
  };

 const handleSave = async () => {
  try {
    const res = await axios.post(`${SERVER_URL}/api/event/save`, { eventId: event._id }, { withCredentials: true });
    console.log("Save response:", res.data);
    toast.success(res.data.message);
  } catch (err) {
    toast.error("Error saving event");
    console.error("Save error:", err.response?.data || err.message);
  }
};
useEffect(() => {
  const checkLiked = async () => {
    try{
      const res = await axios.get(`${SERVER_URL}/api/event/getLike/${event._id}`, { withCredentials: true });
      
      setIsLiked(res.data.liked);
      console.log("Liked status:", res.data.liked);


    } catch (err) {
      console.error("Error checking liked status:", err.response?.data || err.message);
    }
  };
  checkLiked();
}, [ event._id]);
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
});

  return (
    <div className="  rounded-lg shadow-md p-4 flex flex-row  justify-between items-end text-sm font-semibold hover:opacity-95 transition duration-300 w-full">
      
      <button onClick={handleLike} className=" text-white px-3 py-1 rounded mr-2 flex items-start bg-gradient-to-r from-[#6a25e0] to-[#ff3cac] ">{isLiked ? <div className='text-xl'>❤️</div> : <div className='text-xl'>🤍</div>}
 </button>
      <button onClick={handleSave} className=" text-white px-3 py-1 rounded bg-gradient-to-r from-[#6a25e0] to-[#ff3cac] ">{isSaved ? <div className='text-xl'>✅</div> : <div className='text-xl'>💾 Save</div>}</button>
    </div>
  );
}
export default EventCard;
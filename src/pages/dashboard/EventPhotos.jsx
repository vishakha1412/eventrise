import React from 'react'
import axios from 'axios';
import { SERVER_URL } from '../../config';
import { useEffect,useState } from 'react';
 
export const EventPhotos = () => {
    const[photos,setPhotos]=useState([]);
  
   useEffect(() =>{
      const fetchPhotos = async () => {
        try {
          const res=await axios.get(`${SERVER_URL}/api/event/` ,{ withCredentials: true });
          setPhotos(res.data.events);
          console.log("Event photos:", res.data );
          console.log("Event photos state:", photos.length);
          console.log("Event photos state (after update):", photos);
        } catch (err) {
          console.error("Error fetching event photos:", err.response?.data || err.message);
        }   };
        fetchPhotos();
   }
   ,[])
     
  return (
     <>
        <div className="container mx-auto p-4 ">
            <h1 className="text-2xl font-bold mb-4 text-3xl font-serif text-center text-[rgba(91,7,116,0.8)] animate-pulse">EVENT PHOTOS</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
                 {photos?.length > 0 ? (
          photos.map((photo) =>
            photo.images.map((img, index) => (
              <div
                key={`${photo._id}-${index}`}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-violet-600 transition duration-300 hover:scale-115 cursor-pointer hover:animate-pulse hover:duration-700"
              >
                <img
                  src={img}
                  alt={photo.title}
                  className="w-full h-48 object-cover"
                />
 
              </div>
            ))
          )
        ) : (
          <p>No event photos available.</p>
        )}
            </div>
        </div>
     </>
  )
}

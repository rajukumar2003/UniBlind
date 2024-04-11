import React from "react";
import { useState, useEffect } from "react";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const EventDisplay = ({ eventOpen, eventClose }) => { 
  
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const eventsCollectionRef = collection(db, 'events'); 
      const data = await getDocs(eventsCollectionRef);
      setEvents(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    }
    fetchData();
  }, []); 

  useEffect(() => {
    // Add event listener to handle click outside popup
    const handleClickOutside = (e) => {
      if (!eventOpen || e.target.closest(".glass")) return;
      eventClose();
    };
    document.body.addEventListener("click", handleClickOutside);
    // Cleanup event listener on component unmount
    return () => {
      document.body.removeEventListener("click", handleClickOutside);
    };
  }, [eventOpen, eventClose]);

  return (

    <div className={` bg-black bg-opacity-50 flex items-center justify-center top-[-55%] left-[-200%] relative ${eventOpen ? 'block' : 'hidden'}`}>
      <div id="lmao" className="bg-white black-shad w-2/3 h-4/5 rounded-xl fixed overflow-auto">
        <div className="z-20 fixed border-b border-black w-2/3 text-center">
          <p className="bg-white rounded-t-xl">Events</p>
        </div>
        <div className="z-10">
          {events.map((event, index) => (
            <div key={index}>
              <div className="flex justify-center">
                <img
                  src={event.imgLink}
                  className="object-contain h-[350px] w-[500px]"
                  alt="Event"
                />
              </div>
              <div className="text-center">
                <p className="font-montserrat">
                  <span className="font-bold text-xl">{ event.eventName }</span>
                  <br />
                  <span className="font-bold text-xl">{event.clubName}</span>
                  <br />
                  <span>{event.Description}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
        <button className="absolute top-3 right-3 text-2xl font-semibold" onClick={eventClose}>
          &times;
        </button>
      </div>
    </div>
  );
};

export default EventDisplay;

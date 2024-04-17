import React from "react";
import EventCard from "../Components/EventCard";
import { Link,useNavigate } from "react-router-dom";
// import { events } from "../Constans";
import EventDisplay  from "./EventDisplay";
import { useState, useEffect } from "react";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";



const Dashthird = () => {
  const[events,setEvents]=useState([]);
  const [isEventDisplayOpen, setIsEventDisplayOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const postRef = collection(db, "events");
    const unsubscribe = onSnapshot(postRef, (snapshot) => {
      const updatedEvents = [];
      snapshot.forEach((doc) => {
        updatedEvents.push({ ...doc.data(), id: doc.id });
      });

      updatedEvents.sort((a, b) => new Date(a.deadlineDate) - new Date(b.deadlineDate));

      setEvents(updatedEvents);
    });

    // Cleanup function
    return () => unsubscribe();
  }, []);


  return (
    
    <div className="h-screen">
            <button
              onClick={() => {
                setIsEventDisplayOpen(true);
              // navigate("/events");
            }}
          >
            <div className="mt-20 glass w-fit mx-5 rounded-lg mb-5 opa-black-shad grad">
          <p className="py-4 px-8 text-center text-2xl text-white font-semibold font-montserrat">
            UNIVERSITY EVENTS
          </p>
      </div>
          </button>



      <div className=" ml-4 flex flex-col no-scrollbar overflow-y-auto h-2/5">
        {events.map((event, index) => (
          <EventCard
            key={index}
            // imgURL={event.imgPath}
            title={event.eventName}
            // org={event.org}
            date={event.deadlineDate}
            venue={event.venue}
          />
        ))}
      </div>

      <div className="text-xl grad text-white flex flex-col items-center m-5 rounded-lg py-5 font-montserrat font-semibold opa-black-shad">
        <Link to="/" className='hover:text-black '>Feedback</Link>
        <Link to="/">Help</Link>
        <Link to="/">Customer Care</Link>
        <Link to="/">Contact-Us</Link>
        <Link to="/">About-Us</Link>
      </div>
      <EventDisplay eventOpen={isEventDisplayOpen} eventClose={() => setIsEventDisplayOpen(false)} />
    </div>
  );
};

export default Dashthird;

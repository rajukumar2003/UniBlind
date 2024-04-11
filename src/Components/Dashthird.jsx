import React from "react";
import EventCard from "../Components/EventCard";
import { Link,useNavigate } from "react-router-dom";
import { events } from "../Constans";

const Dashthird = () => {
  const navigate = useNavigate();

  return (
    
    <div className="h-screen">
            <button
            onClick={() => {
              navigate("/events");
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
            imgURL={event.imgURL}
            title={event.title}
            org={event.org}
            date={event.date}
            venue={event.venue}
          />
        ))}
      </div>

      <div className="text-xl grad text-white flex flex-col items-center m-5 rounded-lg py-5 font-montserrat font-semibold opa-black-shad">
        <Link to="/">Feedback</Link>
        <Link to="/">Help</Link>
        <Link to="/">Customer Care</Link>
        <Link to="/">Contact-Us</Link>
        <Link to="/">About-Us</Link>
      </div>

    </div>
  );
};

export default Dashthird;

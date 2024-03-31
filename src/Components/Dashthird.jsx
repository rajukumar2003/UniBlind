import React from "react";
import EventCard from "../Components/EventCard";
import { Link } from "react-router-dom";
import { events } from "../Constans";

const Dashthird = () => {
  return (
    <div className="h-screen">
      <div className="mt-20 glass w-fit mx-5 rounded-lg mb-5 border-2 border-white">
        <div className=" rounded-lg grad py-3 px-5">
          <p className="text-center text-2xl text-white font-semibold font-montserrat">
            UNIVERSITY EVENTS
          </p>
        </div>
      </div>

      {/*  */}

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

      <div className="text-xl glass text-white flex flex-col items-center m-5 border-2 border-white rounded-lg py-5 font-montserrat">
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

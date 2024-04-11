import React from "react";
import { events } from "../Constans/index";

const EventDisplay = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div id="lmao" className="bg-white black-shad w-2/3 h-4/5 rounded-xl fixed overflow-auto">
        <div className="z-20 fixed border-b border-black w-2/3 text-center">
          <p className="bg-white rounded-t-xl">Events</p>
        </div>
        <div className="z-10">
          {events.map((event, index) => (
            <div key={index}>
              <div className="flex justify-center">
                <img
                  src={event.imgURL}
                  className="object-contain h-[350px] w-[500px]"
                  alt="Event"
                />
              </div>
              <div className="text-center">
                <p className="font-montserrat">
                  <span className="font-bold text-xl">{event.title}</span>
                  <br />
                  <span className="font-bold text-xl">{event.org}</span>
                  <br />
                  <span>{event.desc}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default EventDisplay;

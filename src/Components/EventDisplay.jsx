import React from "react";
import { Feat } from "../assets/Images";

const EventDisplay = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center">
      <div className=" bg-white black-shad w-2/3 h-4/5 rounded-xl">
        <div className=" z-20 fixed border-b border-black w-2/3 text-center">
          Events
        </div>
        <div>
          <img src={Feat} className=" object-contain h-[350px] w-[500px] " />
        </div>
        <div className="">
          <p>
            <span>Event name</span>
            <span> Club Name</span>
            <span>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laborum,
              doloremque suscipit cumque, quis assumenda earum distinctio vitae,
              quae expedita in nihil. Placeat recusandae consequatur sunt totam
              aut quod ipsa molestias!
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default EventDisplay;

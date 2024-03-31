import React from "react";
import { Mask } from "../assets/Icons";

const Features = () => {
  return (
    <div id="features">
      <p>
        <span className=" font-montserrat font-semibold text-white text-3xl">
          OUR FEATURES
        </span>
        <br />
        <span className=" text-[#176B87] font-semibold font-montserrat text-lg">
          UniBlind is the anonymous Social networking platform for the students
          of the university
        </span>
      </p>
      <div className=" mt-12 flex gap-10 grid-cols-2">
        <div className="glass w-1/5 py-3 px-4">
          <img src={Mask} />
          <p>
            <span className="text-[#176B87] font-semibold text-lg">
              Group Chat
            </span>
            <br />
            <span className=" text-md text-white font-montserrat ">
              Enjoy confidential conversations without revealing identity.
              Connect with others freely and securely in our new anonymous
              chatting feature.
            </span>
          </p>
        </div>
        <div className="glass w-1/5 py-3 px-4">
          <img src={Mask} />
          <p>
            <span className="text-[#176B87] font-semibold text-lg">
              Group Chat
            </span>
            <br />
            <span className=" text-md text-white font-montserrat ">
              Enjoy confidential conversations without revealing identity.
              Connect with others freely and securely in our new anonymous
              chatting feature.
            </span>
          </p>
        </div>
        <div className="glass w-1/5 py-3 px-4">
          <img src={Mask} />
          <p>
            <span className="text-[#176B87] font-semibold text-lg">
              Group Chat
            </span>
            <br />
            <span className=" text-md text-white font-montserrat ">
              Enjoy confidential conversations without revealing identity.
              Connect with others freely and securely in our new anonymous
              chatting feature.
            </span>
          </p>
        </div>
        <div className="glass w-1/5 py-3 px-4">
          <img src={Mask} />
          <p>
            <span className="text-[#176B87] font-semibold text-lg">
              Group Chat
            </span>
            <br />
            <span className=" text-md text-white font-montserrat ">
              Enjoy confidential conversations without revealing identity.
              Connect with others freely and securely in our new anonymous
              chatting feature.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Features;

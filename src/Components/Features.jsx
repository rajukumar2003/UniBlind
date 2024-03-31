import React from "react";
import { Mask } from "../assets/Icons";
import { Feat } from "../assets/Images";

const Features = () => {
  return (
    <div id="features" className="h-screen">
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
      <div className="relative h-full">
        <div className=" left-0 ">
          <img
            src={Feat}
            alt="BG IMAGE"
            className="z-0 object-right absolute object-fill h-[80%] right-32"
          />
        </div>
        <div className="w-3/5 h-4/5 z-10">
          <div className=" mt-12 gap-2 grid grid-cols-2 h-full w-full">
            <div className=" bg-[#176B87] glass bg-opacity-30 py-3 px-4 w-2/3 mb-5 shadow-md shadow-[#176B87]">
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
            <div className="bg-[#176B87] glass bg-opacity-30 py-3 px-4 w-2/3 mb-5 shadow-md shadow-[#176B87]">
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
            <div className="bg-[#176B87] glass bg-opacity-30 py-3 px-4 w-2/3 mb-5 shadow-md shadow-[#176B87]">
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
            <div className="bg-[#176B87] glass bg-opacity-30 py-3 px-4 w-2/3 mb-5 shadow-md shadow-[#176B87]">
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
      </div>
    </div>
  );
};

export default Features;

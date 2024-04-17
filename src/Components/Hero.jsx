import { useNavigate } from "react-router-dom";
import React from "react";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section>
      <div className="absolute inset-0 flex flex-col justify-center items-start text-left text-white font-worksans leading-none m-28 max-sm:m-12">
        <p>
          <span className="text-[#3759C1] text-[200px] max-sm:text-[150px] font-sans font-bold m-0 drop-shadow-lg">
            Uni
          </span>
          <br />
          <span className="text-[250px] max-sm:text-[150px] font-bold m-0 font-outline-2 drop-shadow-lg">
            Blind
          </span>
        </p>
        <p className="text-[30px] max-sm:text-[17px] ml-3 max-sm:glass max-sm:p-3 max-sm:text-[#3759C1]">
          Connect Anonymously with your Acquintances
        </p>
        <div className="flex justify-center ">
          <button
            onClick={() => {
              navigate("./login");
            }}
            className="m-2 py-2 px-4 rounded-lg bg-[#86B6F6] text-white drop-shadow-lg w-28 h-10"
          >
            Log in
          </button>
          <button
            onClick={() => {
              navigate("/signup");
            }}
            className="m-2 py-2 px-4 rounded-lg bg-white text-[#86B6F6] drop-shadow-lg w-28 h-10"
          >
            Sign Up
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

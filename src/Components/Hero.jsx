import React from "react";

const Hero = () => {
  return (
    <section>
      <div className="absolute inset-0 flex flex-col justify-center items-start text-left text-white font-worksans leading-none m-10">
        <p>
          <span className="text-[#3759C1] text-[200px] font-sans font-bold m-0">
            Uni
          </span>
          <br />
          <span className="text-[250px] font-bold m-0">Blind</span>
        </p>
        <p className="text-[30px] ml-3">
          Chat Anonymously with your Acquintances
        </p>
        <div className="flex justify-center">
          <button className="m-2 py-2 px-4 rounded-lg bg-[#86B6F6] text-white shadow-lg">
            Log in
          </button>
          <button className="m-2 py-2 px-4 rounded-lg bg-white text-[#86B6F6] shadow-lg">
            Sign In
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;

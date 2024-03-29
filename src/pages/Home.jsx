import React from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import { LandBG } from "../assets/Images/";

const Home = () => {
  return (
    <main className="bg-gradient-to-r from-[#B4D4FF] to-white h-screen ">
      <div className="h-screen relative"> 
        <img src={LandBG} alt="Landing Background"
          className="h-full w-full object-contain object-right absolute top-0 right-0" />

        <section>
          <Navbar />
        </section>
        <section className="">
          <Hero />
        </section>
      </div>
    </main>
  );
};


export default Home;

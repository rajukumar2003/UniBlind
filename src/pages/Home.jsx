import React from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";
import { LandBG } from "../assets/Images/";
import Features from "../Components/Features";
import AboutUs from "../Components/AboutUs";
import Contactus from "../Components/Contactus";

const Home = () => {
  return (
    <main className="bg-gradient-to-r from-[#B4D4FF] to-white h-full ">
      <div className="h-screen relative">
        <img
          src={LandBG}
          alt="Landing Background"
          className="h-full w-full object-contain object-right absolute top-0 right-0"
        />

        <section className=" fixed w-full">
          <Navbar />
        </section>
        <section className="">
          <Hero />
        </section>
      </div>
      <section className="px-32 py-10">
        <Features />
      </section>
      <section className="">
        <AboutUs />
      </section>
      <section>
        <Contactus />
      </section>
    </main>
  );
};

export default Home;

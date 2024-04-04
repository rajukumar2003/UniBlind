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
      <section id="footer">
        <footer className="w-[60%] bottom-0 bg-[#B4D4FF] mx-auto black-shad flex justify-evenly">
          <p className=" text-xs p-5 w-fit">
            Contact Us:
            <br /> UniBlind Inc.
            <br /> 123 Main Street,
            <br /> City, State, Zip Code
            <br /> Phone: 123-456-7890
            <br /> Email: info@uniblind.com
            <br />
          </p>
          <p className="my-auto">
            Privacy Policy | Terms of Use | Copyright © 2024 UniBlind Inc.
          </p>
        </footer>
      </section>
    </main>
  );
};

export default Home;

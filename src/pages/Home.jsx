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
          className="h-full w-full object-contain object-right absolute top-0 right-0 max-sm:hidden"
        />

        <section className=" fixed w-full max-sm:z-50">
          <Navbar />
        </section>
        <section className="max-sm:z-0">
          <Hero />
        </section>
      </div>
      <section className="px-32 max-sm:px-10 py-10">
        <Features />
      </section>
      <section className="">
        <AboutUs />
      </section>
      <section id="footer">
        <footer className="w-3/5 max-sm:w-4/5 bottom-0 bg-[#B4D4FF] mx-auto black-shad flex justify-evenly">
          <p className=" text-xs p-5 w-fit">
            Contact Us:
            <br /> UniBlind Inc.
            <br /> B1, 2nd Floor, RoyalPG
            <br /> Marium Nagar, Uttar Pradesh, 201003
            <br /> Phone: 8791820055
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

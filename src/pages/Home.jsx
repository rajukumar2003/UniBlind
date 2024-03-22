import React from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/Hero";

const Home = () => {
  return (
    <main className="bg-gradient-to-r from-[#B4D4FF] to-white h-screen ">
      <div className="bg-Landbg h-screen bg-no-repeat bg-contain bg-right">
        <section>
          <Navbar />
        </section>
        <section className="my-auto">
          <Hero />
        </section>
      </div>
    </main>
  );
};

export default Home;

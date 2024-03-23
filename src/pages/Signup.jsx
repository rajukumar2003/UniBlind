import React from "react";
import { Logo } from "../assets/Icons";
import SignupPanel from "../Components/SignupPanel";
const Signup = () => {
  return (
    <section className="h-screen bg-my-gradient">
      <div className="flex flex-col h-screen bg-Signupbg bg-no-repeat bg-left-bottom bg-contain">
        <nav className="bg-transparent py-4 px-8 flex justify-between items-center">
          <img src={Logo} alt="Logo" className="h-8" />
          <span className="text-black font-bold text-xl">UniBlind</span>
        </nav>
        <div className="flex my-auto mr-40 ml-auto">
          <SignupPanel/>
        </div>
      </div>
    </section>
  );
};

export default Signup;

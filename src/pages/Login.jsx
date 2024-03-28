import React from "react";
import { Logo } from "../assets/Icons";
import { LoginBG } from "../assets/Images";
import LoginPanel from "../Components/LoginPanel";

const Login = () => {
  return (
    <section className="h-screen bg-my-gradient">
      <div className="flex flex-col h-screen relative">
        <img src={LoginBG} alt="Login Background"
          className="h-full w-65 object-cover object-bottom-left absolute top-0 left-0" />

        <nav className="bg-transparent py-4 px-8 flex justify-between items-center">
          <img src={Logo} alt="Logo" className="h-8" />
          <span className="text-black font-bold text-xl">UniBlind</span>
        </nav>
        <div className="flex my-auto mr-40 ml-auto">
          <LoginPanel />
        </div>
      </div>
    </section>
  );
};

export default Login;

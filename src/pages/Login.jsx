import React from "react";
import { Logo } from "../assets/Icons";
import LoginPanel from "../Components/LoginPanel";

const Login = () => {
  return (
    <section className="h-screen bg-my-gradient">
      <div className=" bg-Loginbg bg-no-repeat">
        <nav className="bg-transparent py-4 px-8">
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="h-8" />
            <span className="text-black font-bold text-xl ml-auto">
              UniBlind
            </span>
          </div>
        </nav>
        <div className="flex bg-white">
          <LoginPanel />
        </div>
      </div>
    </section>
  );
};

export default Login;

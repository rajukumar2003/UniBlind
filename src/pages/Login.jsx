import React from "react";
import { Logo } from "../assets/Icons";

const Login = () => {
  return (
    <section className="h-screen bg-my-gradient">
      <div className=" bg-Loginbg h-screen bg-no-repeat">
        <nav className="bg-transparent py-4 px-8">
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="h-8" />
            <span className="text-black font-bold text-xl ml-auto">
              UniBlind
            </span>
          </div>
        </nav>
        <div className="">{/* Component */}</div>
      </div>
    </section>
  );
};

export default Login;

import React from "react";
import { Logo } from "../assets/Icons";

const Navbar = () => {
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <nav className=" bg-transparent p-4 flex flex-row justify-between items-center max-sm:z-30 max-sm:justify-center max-sm:nav-glass max-sm:p-3 max-sm:m-3">
      <div>
        <img src={Logo} alt="UniBLind Logo" className=" mr-2 h-12 w-auto" />
      </div>
      <div>
        <ul className="flex space-x-4 ">
          <li>
            <button
              onClick={() => scrollToSection("features")}
              className="text-[#86B6F6] hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium font-montserrat"
            >
              Features
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("aboutus")}
              className="text-[#86B6F6] hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium font-montserrat"
            >
              About Us
            </button>
          </li>
          <li>
            <button
              onClick={() => scrollToSection("contactus")}
              className="text-[#86B6F6] hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium font-montserrat"
            >
              Contact Us
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;

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
    <header className=" bg-transparent p-4 flex justify-between items-center">
      <div>
        <img src={Logo} alt="UniBLind Logo" className="h-8 mr-2" />
      </div>
      <nav>
        <ul className="flex space-x-4">
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
      </nav>
    </header>
  );
};

export default Navbar;

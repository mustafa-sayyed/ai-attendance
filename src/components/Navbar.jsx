import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

function Navbar() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <nav className="bg-[#030712] block w-full z-20 top-0 start-0 border-b border-gray-600 ">
      <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
        <span className="text-2xl font-semibold whitespace-nowrap text-white">
          <Link to={"/"}>AI Attendance</Link>
        </span>

        <div className="flex md:order-2 space-x-3 md:space-x-0 ">
          <Link to="/get-started">
            <button
              type="button"
              className="hidden md:block text-white font-medium rounded-lg text-sm px-4 py-2 text-center bg-blue-600 hover:bg-blue-700 cursor-pointer">
              Get started
            </button>
          </Link>

          <button
            type="button"
            onClick={() => setIsVisible(!isVisible)}
            className="flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden text-gray-400 hover:bg-gray-700">
            <span className="sr-only">Open main menu</span>
            {isVisible ? <X size="24" /> : <Menu size="24" />}
          </button>
        </div>
        <div
          className={`md:flex items-center justify-between flex-col w-full md:w-auto hidden`}>
          <ul className="w-full flex flex-col space-y-5 md:space-y-0 p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 md:flex-row md:mt-0 md:border-0 bg-[#030712] border-gray-700">
            <NavLink
              className="hover:text-blue-500"
              to={"/"}
              onClick={() => setIsVisible(false)}>
              Home
            </NavLink>
            <NavLink
              className="hover:text-blue-500"
              to={"#about"}
              onClick={() => setIsVisible(false)}>
              About Us
            </NavLink>
            <NavLink
              className="hover:text-blue-500"
              to={"#contact"}
              onClick={() => setIsVisible(false)}>
              How it works
            </NavLink>
            <NavLink
              className="hover:text-blue-500"
              to={"/pricing"}
              onClick={() => setIsVisible(false)}>
              Pricing
            </NavLink>
            <NavLink
              className="hover:text-blue-500"
<<<<<<< HEAD
              to={"/contact-us"}
=======
              to={"/contact"}
>>>>>>> 79fb466c72f58fe168b1704d41fd3d7e6372ec6f
              onClick={() => setIsVisible(false)}>
              Contact Us
            </NavLink>
          </ul>
          <Link to="/get-started" className="w-full">
            <button
              type="button"
              onClick={() => setIsVisible(false)}
              className="block md:hidden mt-6 w-full text-white mx-auto font-medium rounded-lg text-sm px-4 py-2 text-center bg-blue-700 hover:bg-blue-800 cursor-pointer">
              Get started
            </button>
          </Link>
        </div>
      </div>
      <div
        className={`${
          isVisible ? "flex" : "hidden"
        } items-center justify-between flex-col p-6 md:hidden absolute z-50 bg-[#030712] w-full`}>
        <ul className="w-full flex flex-col space-y-5 md:space-y-0 p-4 md:p-0 mt-4 font-medium border rounded-lg md:space-x-8 md:flex-row md:mt-0 md:border-0 bg-[#030712] border-gray-700">
          <NavLink
            className="hover:text-blue-500"
            to={"/"}
            onClick={() => setIsVisible(false)}>
            Home
          </NavLink>
          <NavLink
            className="hover:text-blue-500"
            to={"#about"}
            onClick={() => setIsVisible(false)}>
            About Us
          </NavLink>
          <NavLink
            className="hover:text-blue-500"
            to={"#features"}
            onClick={() => setIsVisible(false)}>
            Features
          </NavLink>
          <NavLink
            className="hover:text-blue-500"
            to={"/contact-us"}
            onClick={() => setIsVisible(false)}>
            Contact Us
          </NavLink>
          <NavLink
            className="hover:text-blue-500"
            to={"/pricing"}
            onClick={() => setIsVisible(false)}>
            Pricing
          </NavLink>
          <NavLink
            className="hover:text-blue-500"
            to={"#contact"}
            onClick={() => setIsVisible(false)}>
            How it works
          </NavLink>
        </ul>
        <Link to="/get-started" className="w-full">
          <button
            type="button"
            onClick={() => setIsVisible(false)}
            className="block md:hidden mt-6 w-full text-white mx-auto font-medium rounded-lg text-sm px-4 py-2 text-center bg-blue-600 hover:bg-blue-700 cursor-pointer">
            Get started
          </button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;

import React from "react";
import facedetect from "../assets/cctv-class.png";

function Hero() {
  return (
    <div
      className="h-[90vh] xl:px-40 lg:px-20 md:px-16 sm:px-16 px-8 py-28 lg:py-32 mx-auto bg-linear-to-t from-blue-800 to-[#030712]"
      // style={{
      //   background: "rgb(25,60,184)",
      //   background: "linear-gradient(0deg, rgba(25,60,184,1) 0%, rgba(3,7,18,1) 100%)",
      // }}
    >
      <div className="flex md:flex-row justify-center items-center flex-col">
        <div>
          <div className="lg:text-6xl md:text-5xl sm:text-4xl font-[Mona sans] text-3xl">
            <span>AI-Powered <br></br> Attendance</span> - Fast, Accurate, Reliable.
          </div>
          <div className="text-xl mt-6 mb-3 sm:text-2xl md:text-3xl">
            No More Roll Calls—Just Facial Recognition.
          </div>
          <a href="/signin">
            <button
              className="py-4 px-6 rounded-4xl bg-blue-700 cursor-pointer hover:bg-blue-800 my-4"
              style={{ boxShadow: "0px 4px 24px #030712" }}>
              Get Started
            </button>
          </a>
        </div>
        <div>
          <img src={facedetect} alt="" className="w-xl sm:w-3xl lg:w-6xl" />
        </div>
      </div>
    </div>
  );
}

export default Hero;

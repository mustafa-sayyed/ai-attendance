import React from "react";
import {
  FaGraduationCap, // Student
  FaUserTie, // Institute Staff
  FaUniversity,
  FaChalkboard,
  FaChalkboardTeacher,
  FaUserGraduate, // Institute
} from "react-icons/fa";
import { FaChalkboardUser, FaPersonChalkboard, FaUserGear } from "react-icons/fa6";

function GetStarted() {
  const notify = () =>
    toast.error("Invelid username and Password.", {
      theme: "dark",
      className: "bg-red-600 font-bold text-red-600",
    });

  return (
    <div className="bg-[#030712] w-full min-h-[90vh]">
      <section className="text-gray-400  body-font">
        <div className="container px-5 py-16 md:py-24 mx-auto">
          <div className="flex flex-col text-center w-full mb-16">
            <h1 className="sm:text-5xl text-3xl font-medium title-font mb-4 text-blue-600">
              Welcome to Smarter AI Attendance Management
            </h1>
            <p className="lg:w-2/3 mx-auto leading-relaxed text-[14px] md:text-base">
              Eliminate manual roll calls with AI-powered facial recognition, real-time
              tracking, and automated insights. Our system adapts to students, faculty,
              and administrators alike.
            </p>
          </div>
          <div className="flex flex-wrap -m-4 text-center justify-center items-center">
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-800 px-4 py-6 rounded-lg flex flex-col gap-y-4 justify-center items-center">
                <FaUserGraduate size={48} color="#fff" />
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer">
                  <a href="/student/signup">Sign in as Student</a>
                </button>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-800 px-4 py-6 rounded-lg flex flex-col gap-y-4 justify-center items-center">
                <FaChalkboardTeacher size={48} color="#fff" />
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer">
                  <a href="/teacher/signup">Sign in as Institute Teacher</a>
                </button>
              </div>
            </div>
            <div className="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div className="border-2 border-gray-800 px-4 py-6 rounded-lg flex flex-col gap-y-4 justify-center items-center">
                <FaUniversity size={48} color="#fff" />
                <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer">
                  <a href="/institute/signup">Sign in as Institute</a>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default GetStarted;

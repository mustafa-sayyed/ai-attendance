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
  return (
    <div className="bg-[#030712] w-full min-h-[90vh]">
      <section class="text-gray-400  body-font">
        <div class="container px-5 py-24 mx-auto">
          <div class="flex flex-col text-center w-full mb-20">
            <h1 class="sm:text-5xl text-3xl font-medium title-font mb-4 text-blue-600">
              Welcome to Smarter AI Attendance Management
            </h1>
            <p class="lg:w-2/3 mx-auto leading-relaxed text-[18px]">
            Eliminate manual roll calls with AI-powered facial recognition, real-time tracking, and automated insights. Our system adapts to students, faculty, and administrators alike.
            </p>
          </div>
          <div class="flex flex-wrap -m-4 text-center justify-center items-center">
            <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div class="border-2 border-gray-800 px-4 py-6 rounded-lg flex flex-col gap-y-4 justify-center items-center">
                <FaUserGraduate size={48} color="#155dfc" />
                <button class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer">
                  Sign in as Student
                </button>
              </div>
            </div>
            <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div class="border-2 border-gray-800 px-4 py-6 rounded-lg flex flex-col gap-y-4 justify-center items-center">
                <FaChalkboardTeacher size={48} color="#155dfc"/>
                <button class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer">
                  Sign in as Institute Teacher
                </button>
              </div>
            </div>
            <div class="p-4 md:w-1/4 sm:w-1/2 w-full">
              <div class="border-2 border-gray-800 px-4 py-6 rounded-lg flex flex-col gap-y-4 justify-center items-center">
                <FaUniversity size={48} color="#155dfc"/>
                <button class="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition cursor-pointer">
                  Sign in as Institute
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

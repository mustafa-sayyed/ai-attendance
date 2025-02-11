import React from "react";
import Calendar from "../assets/image.png";
import policy from "../assets/policy.png";
import location from "../assets/location.png";
import face from "../assets/face.png";
import dashboard3 from "../assets/dashboard3.png";
import eventAttendance from "../assets/event-attendance.png";

function FeatureBlock() {
  return (
    <section className="p-4 lg:p-8 textwh bg-[#030712] max-w-screen-xl mx-auto">
      <div className="container space-y-12">
        <div className="flex flex-col w-full lg:flex-row">
          <div className="lg:w-[50%] w-full flex place-content-center">
            <img src={face} alt="" className="h-80" />
          </div>
          <div className={`flex flex-col justify-center flex-1 p-6 `}>
            <span className="text-xs uppercase dark:text-gray-100">Join, it's free</span>
            <h3 className="text-3xl font-bold">We're not reinventing the wheel</h3>
            <p className="my-6 dark:text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor aliquam
              possimus quas, error esse quos.
            </p>
          </div>
        </div>

        <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row-reverse">
          <div className="lg:w-[50%] w-full flex place-content-center">
            <img src={Calendar} alt="" className="h-80" />
          </div>
          <div className={`flex flex-col justify-center flex-1 p-6 `}>
            <span className="text-xs uppercase dark:text-gray-600">Join, it's free</span>
            <h3 className="text-3xl font-bold">We're not reinventing the wheel</h3>
            <p className="my-6 dark:text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor aliquam
              possimus quas, error esse quos.
            </p>
          </div>
        </div>

        <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row">
          <div className="lg:w-[50%] w-full flex place-content-center">
            <img src={policy} alt="" className="h-80 scale-[80%]" />
          </div>
          <div className={`flex flex-col justify-center flex-1 p-6 `}>
            <span className="text-xs uppercase dark:text-gray-600">Join, it's free</span>
            <h3 className="text-3xl font-bold">We're not reinventing the wheel</h3>
            <p className="my-6 dark:text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor aliquam
              possimus quas, error esse quos.
            </p>
          </div>
        </div>

        <div className="flex flex-col w-full lg:flex-row">
          <div className="lg:w-[50%] w-full flex place-content-center">
            <img src={dashboard3} alt="" className="h-80 opacity-95" />
          </div>
          <div className={`flex flex-col justify-center flex-1 p-6 `}>
            <span className="text-xs uppercase dark:text-gray-100">Join, it's free</span>
            <h3 className="text-3xl font-bold">We're not reinventing the wheel</h3>
            <p className="my-6 dark:text-gray-200">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor aliquam
              possimus quas, error esse quos.
            </p>
          </div>
        </div>

        <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row-reverse">
          <div className="lg:w-[50%] w-full flex place-content-center">
            <img src={location} alt="" className="h-80" />
          </div>
          <div className={`flex flex-col justify-center flex-1 p-6 `}>
            <span className="text-xs uppercase dark:text-gray-600">Join, it's free</span>
            <h3 className="text-3xl font-bold">We're not reinventing the wheel</h3>
            <p className="my-6 dark:text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor aliquam
              possimus quas, error esse quos.
            </p>
          </div>
        </div>

        <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row">
          <div className="lg:w-[50%] w-full flex place-content-center">
            <img src={eventAttendance} alt="" className="h-80" />
          </div>
          <div className={`flex flex-col justify-center flex-1 p-6 `}>
            <span className="text-xs uppercase dark:text-gray-600">Join, it's free</span>
            <h3 className="text-3xl font-bold">We're not reinventing the wheel</h3>
            <p className="my-6 dark:text-gray-600">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor aliquam
              possimus quas, error esse quos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeatureBlock;

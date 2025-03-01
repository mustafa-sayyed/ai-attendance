import React from "react";
import institute from "../assets/institute.svg";
import calendar from "../assets/calendar.svg";
import { FaUsers, FaCog, FaUserTag, FaFileAlt } from "react-icons/fa";

function HowItWorks() {
  return (
    <section className="text-gray-400 bg-[#030712] body-font">
      <div className="container px-5 py-24 mx-auto flex flex-wrap">
        <div className="flex relative pt-10 pb-20 sm:items-center md:w-2/3 mx-auto">
          <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
            <div className="h-full w-1 bg-gray-800 pointer-events-none"></div>
          </div>
          <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-blue-600 text-white relative z-10 title-font font-medium text-sm">
            1
          </div>
          <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
            <div className="flex-shrink-0 w-24 h-24 bg-gray-800 text-blue-600 rounded-full inline-flex items-center justify-center">
              <img src={institute} alt="Institute image" />
            </div>
            <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
              <h2 className="font-medium title-font text-white mb-1 text-xl">
                Register Your Institute
              </h2>
              <p className="leading-relaxed">
                Click on get started, Create your Institute by entering some basic details
              </p>
            </div>
          </div>
        </div>
        <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
          <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
            <div className="h-full w-1 bg-gray-800 pointer-events-none"></div>
          </div>
          <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-blue-600 text-white relative z-10 title-font font-medium text-sm">
            2
          </div>
          <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
            <div className="flex-shrink-0 w-24 h-24 bg-gray-800 text-blue-600 rounded-full inline-flex items-center justify-center">
              <FaUsers size={48} />
            </div>
            <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
              <h2 className="font-medium title-font text-white mb-1 text-xl">
                {" "}
                User Onboarding
              </h2>
              <p className="leading-relaxed">
                Share the registration token with students, faculty, and staff. Users
                register on the platform using the registration token to link their
                accounts to your institution.
              </p>
            </div>
          </div>
        </div>
        <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
          <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
            <div className="h-full w-1 bg-gray-800 pointer-events-none"></div>
          </div>
          <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-blue-600 text-white relative z-10 title-font font-medium text-sm">
            3
          </div>
          <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
            <div className="flex-shrink-0 w-24 h-24 bg-gray-800 text-blue-600 rounded-full inline-flex items-center justify-center">
              <FaCog size={48} />
            </div>
            <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
              <h2 className="font-medium title-font text-white mb-1 text-xl">
                System Configuration
              </h2>
              <p className="leading-relaxed">
                <span className="font-semibold">Integrate CCTV Cameras:</span> Connect
                classroom CCTV feeds to the system for facial recognition.
                <br />
                <span className="font-semibold">Upload Academic Calendar:</span> Add
                holidays, exams, and events to automate attendance schedules.
              </p>
            </div>
          </div>
        </div>
        <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
          <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
            <div className="h-full w-1 bg-gray-800 pointer-events-none"></div>
          </div>
          <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-blue-600 text-white relative z-10 title-font font-medium text-sm">
            4
          </div>
          <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
            <div className="flex-shrink-0 w-24 h-24 bg-gray-800 text-blue-600 rounded-full inline-flex items-center justify-center">
              <FaUserTag size={48} />
            </div>
            <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
              <h2 className="font-medium title-font text-white mb-1 text-xl">
                Assign Roles & Permissions
              </h2>
              <p className="leading-relaxed">
                Institute Admins assign roles (HOD, Class Coordinator, Teacher, Mentor)
                via the dashboard. <br />
                Customize permissions for each role (e.g., report access, attendance
                editing).
              </p>
            </div>
          </div>
        </div>
        <div className="flex relative pb-20 sm:items-center md:w-2/3 mx-auto">
          <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
            <div className="h-full w-1 bg-gray-800 pointer-events-none"></div>
          </div>
          <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-blue-600 text-white relative z-10 title-font font-medium text-sm">
            5
          </div>
          <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
            <div className="flex-shrink-0 w-24 h-24 bg-gray-800 text-blue-600 rounded-full inline-flex items-center justify-center">
              <img src={calendar} alt="" />
            </div>
            <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
              <h2 className="font-medium title-font text-white mb-1 text-xl">
                Start Attendance Tracking
              </h2>
              <p className="leading-relaxed">
                Enable automated attendance capture during classes/events via CCTV. <br />
                Teachers can also mark attendance manually if needed.
              </p>
            </div>
          </div>
        </div>
        <div className="flex relative pb-10 sm:items-center md:w-2/3 mx-auto">
          <div className="h-full w-6 absolute inset-0 flex items-center justify-center">
            <div className="h-full w-1 bg-gray-800 pointer-events-none"></div>
          </div>
          <div className="flex-shrink-0 w-6 h-6 rounded-full mt-10 sm:mt-0 inline-flex items-center justify-center bg-blue-600 text-white relative z-10 title-font font-medium text-sm">
            6
          </div>
          <div className="flex-grow md:pl-8 pl-6 flex sm:items-center items-start flex-col sm:flex-row">
            <div className="flex-shrink-0 w-24 h-24 bg-gray-800 text-blue-600 rounded-full inline-flex items-center justify-center">
              <FaFileAlt size={48} />
            </div>
            <div className="flex-grow sm:pl-6 mt-6 sm:mt-0">
              <h2 className="font-medium title-font text-white mb-1 text-xl">
                Generate Reports & Use Chatbot
              </h2>
              <p className="leading-relaxed">
                Access weekly/monthly reports from the dashboard (downloadable in custom
                formats). <br />
                Use the AI chatbot for instant queries (e.g., “Show my attendance for
                October”).
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;

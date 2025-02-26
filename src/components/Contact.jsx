import React from "react";
import { FaFacebook, FaXTwitter, FaGithub, FaLinkedinIn, } from "react-icons/fa6";

export default function Contact() {
  return (
    <section class=" bg-gradient-to-tr to-[#030712] ">
      <div class="container flex flex-col px-6 py-14 mx-auto max-w-7xl">
        <div class="flex-1 lg:flex lg:items-center lg:-mx-6 ">
          <div class="text-white lg:w-1/2 lg:mx-6">
            <h1 class="text-2xl font-semibold capitalize lg:text-4xl">Get a quote</h1>

            <p class="max-w-xl mt-6">
              Ask us everything and we would love to hear from you
            </p>

            <div class="mt-6 space-y-8 md:mt-8">
              <p class="flex items-start -mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 mx-2 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>

                <span class="mx-2 text-white truncate w-72">
                  Cecilia Chapman 711-2880 Nulla St. Mankato Mississippi 96522
                </span>
              </p>

              <p class="flex items-start -mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 mx-2 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>

                <span class="mx-2 text-white truncate w-72">(257) 563-7401</span>
              </p>

              <p class="flex items-start -mx-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="w-6 h-6 mx-2 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2">
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>

                <span class="mx-2 text-white truncate w-72">acb@example.com</span>
              </p>
            </div>

            <div class="mt-6 md:mt-8">
              <h3 class="text-gray-300 ">Follow us</h3>

              <div class="flex mt-4 -mx-1.5 ">
                <a
                  class="mx-1.5 text-gray-700 transition hover:text-gray-300 duration-300 transform"
                  href="#">
                  <FaXTwitter size={30}/>
                </a>

                <a
                  class="mx-1.5 text-gray-700 transition hover:text-gray-300 duration-300 transform"
                  href="#">
                  <FaGithub size={30}/>
                </a>

                <a
                  class="mx-1.5 text-gray-700 transition hover:text-gray-300 duration-300 transform"
                  href="#">
                  <FaLinkedinIn size={30}/>
                </a>

                <a
                  class="mx-1.5 text-gray-700 transition hover:text-gray-300 duration-300 transform"
                  href="#">
                  <FaFacebook size={30}/>
                </a>
              </div>
            </div>
          </div>

          <div class="mt-8 lg:w-1/2 lg:mx-6">
            <div class="w-full px-8 py-10 mx-auto overflow-hidden shadow-2xl rounded-xl border lg:max-w-xl">
              <h1 class="text-2xl font-medium text-gray-200">Contact form</h1>

              <form class="mt-4">
                <div class="flex-1">
                  <label class="block mb-2 text-sm text-gray-200">Full Name</label>
                  <input
                    type="text"
                    placeholder="John Doe"
                    class="block w-full px-5 py-3 mt-2 border border-gray-200 rounded-md dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-600 focus:ring-opacity-40 dark:focus:border-blue-600 focus:outline-none focus:ring"
                  />
                </div>

                <div class="flex-1 mt-6">
                  <label class="block mb-2 text-sm text-gray-200">Email address</label>
                  <input
                    type="email"
                    placeholder="johndoe@example.com"
                    class="block w-full px-5 py-3 mt-2 border rounded-md bg-gray-900 text-gray-300 border-gray-600 focus:border-blue-400 focus:ring-blue-600 focus:ring-opacity-40 dark:focus:border-blue-600 focus:outline-none focus:ring"
                  />
                </div>

                <div class="w-full mt-6">
                  <label class="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Message
                  </label>
                  <textarea
                    class="block w-full h-32 px-5 py-3 mt-2 placeholder-gray-400 border rounded-md md:h-48 bg-gray-900 text-gray-300 border-gray-600 focus:ring-blue-600 focus:ring-opacity-40 dark:focus:border-blue-600 focus:outline-none focus:ring"
                    placeholder="Message"></textarea>
                </div>

                <button class="w-full px-6 py-3 mt-6 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-700 rounded-md hover:bg-blue-800 focus:outline-none focus:ring focus:ring-blue-400 focus:ring-opacity-50 cursor-pointer">
                  get in touch
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

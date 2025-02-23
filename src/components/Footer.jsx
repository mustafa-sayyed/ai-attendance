import React from "react";
import { FaXTwitter, FaFacebook, FaGithub, FaLinkedinIn } from "react-icons/fa6";

function Footer() {
  return (
    <footer className="bg-[#030712] text-white">
      <div className="mx-auto max-w-screen-xl space-y-8 px-4 py-16 sm:px-6 lg:space-y-16 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div>
            <div className="text-white text-4xl">AI Attendance</div>

            <p className="mt-4 max-w-xs">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit. Esse non
              cupiditate quae nam molestias.
            </p>

            <ul className="mt-8 flex gap-6">
              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:text-gray-300">
                  <span className="sr-only">Facebook</span>
                  <FaFacebook size={30} />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:text-gray-300">
                  <span className="sr-only">Instagram</span>
                  <FaLinkedinIn size={30} />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:text-gray-300">
                  <span className="sr-only">Twitter</span>
                  <FaXTwitter size={30} />
                </a>
              </li>

              <li>
                <a
                  href="#"
                  rel="noreferrer"
                  target="_blank"
                  className="text-gray-700 transition hover:text-gray-300">
                  <span className="sr-only">GitHub</span>

                  <FaGithub size={30} />
                </a>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:col-span-2 lg:grid-cols-4">
            <div>
              <p className="font-semibold text-white">Services</p>

              <ul className="mt-6 space-y-4 text-base">
                <li>
                  <a href="#" className="text-gray-700 transition hover:text-gray-400">
                    1on1 Coaching
                  </a>
                </li>

                <li>
                  <a href="#" className="text-gray-700 transition hover:text-gray-400">
                    Company Review
                  </a>
                </li>

                <li>
                  <a href="#" className="text-gray-700 transition hover:text-gray-400">
                    Accounts Review
                  </a>
                </li>

                <li>
                  <a href="#" className="text-gray-700 transition hover:text-gray-400">
                    HR Consulting
                  </a>
                </li>

                <li>
                  <a href="#" className="text-gray-700 transition hover:text-gray-400">
                    SEO Optimisation
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-white">Company</p>

              <ul className="mt-6 space-y-4 text-base">
                <li>
                  <a href="#" className="text-gray-700 transition hover:text-gray-400">
                    About
                  </a>
                </li>

                <li>
                  <a href="#" className="text-gray-700 transition hover:text-gray-400">
                    Meet the Team
                  </a>
                </li>

                <li>
                  <a href="#" className="text-gray-700 transition hover:text-gray-400">
                    Accounts Review
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-white">Helpful Links</p>

              <ul className="mt-6 space-y-4 text-base">
                <li>
                  <a href="#" className="text-gray-700 transition hover:text-gray-400">
                    Contact
                  </a>
                </li>

                <li>
                  <a href="#" className="text-gray-700 transition hover:text-gray-400">
                    FAQs
                  </a>
                </li>

                <li>
                  <a href="#" className="text-gray-700 transition hover:text-gray-400">
                    Live Chat
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <p className="font-semibold text-white">Legal</p>

              <ul className="mt-6 space-y-4 text-base">
                <li>
                  <a href="#" className="text-gray-700 transition hover:text-gray-400">
                    Accessibility
                  </a>
                </li>

                <li>
                  <a href="#" className="text-gray-700 transition hover:text-gray-400">
                    Returns Policy
                  </a>
                </li>

                <li>
                  <a href="#" className="text-gray-700 transition hover:text-gray-400">
                    Refund Policy
                  </a>
                </li>

                <li>
                  <a href="#" className="text-gray-700 transition hover:text-gray-400">
                    Hiring-3 Statistics
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <p className="text-sm text-gray-500">
          &copy; 2022. Company Name. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;

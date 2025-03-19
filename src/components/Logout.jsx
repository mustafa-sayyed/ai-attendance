import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Logout = () => {
  const [redirect, setRedirect] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    if (redirect > 0) {
      const timer = setTimeout(() => setRedirect(redirect - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      navigate("/");
    }
  }, [redirect]);

  const currentHour = new Date().getHours();
  let greeting = "Good day";

  if (currentHour < 12) {
    greeting = "Good morning";
  } else if (currentHour < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good evening";
  }

  const particles = Array(12).fill(0);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden">
          {/* Top wave decoration */}
          <div className="h-3 bg-gradient-to-r from-brand-500 via-purple-500 to-blue-500"></div>

          <div className="p-6 text-center">
            {/* Success animation */}
            <div className="mb-8 relative">
              <div className="mx-auto w-24 h-24 rounded-full bg-green-50 dark:bg-green-900/10 flex items-center justify-center relative">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.2, type: "spring", stiffness: 150 }}>
                  <svg
                    className="w-12 h-12 text-green-500"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <motion.path
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.3, duration: 0.8, ease: "easeOut" }}
                      d="M5 13L9 17L19 7"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </motion.div>

                {particles.map((_, i) => {
                  const angle = (i / particles.length) * 2 * Math.PI;
                  const x = Math.cos(angle);
                  const y = Math.sin(angle);
                  const distance = 42;

                  return (
                    <motion.div
                      key={i}
                      className="absolute w-1.5 h-1.5 rounded-full bg-green-500"
                      initial={{
                        x: 0,
                        y: 0,
                        opacity: 0,
                      }}
                      animate={{
                        x: x * distance,
                        y: y * distance,
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        delay: 0.3 + i * 0.05,
                        duration: 0.8,
                        ease: "easeOut",
                      }}
                    />
                  );
                })}
              </div>
            </div>

            <motion.h1
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              Successfully Logged Out!
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 dark:text-gray-400 mb-6 text-sm md:text-base">
              {greeting}! Thank you for using our platform.
              <br />
              We hope to see you again soon.
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-sm text-gray-500 dark:text-gray-500 mb-6">
              Redirecting to login page in{" "}
              <span className="font-medium text-brand-500">{redirect}</span> seconds...
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-3">
              <Link
                to="/signin"
                className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-medium transition-all">
                Log In Again
              </Link>

              <Link
                to="/"
                className="flex-1 px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium transition-colors">
                Visit Home Page
              </Link>
            </motion.div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-6 text-center text-sm text-gray-500 dark:text-gray-500">
          <p>
            © {new Date().getFullYear()} AI Attendance System. All rights reserved.
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default Logout;

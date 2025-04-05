import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { LuTriangleAlert } from "react-icons/lu"; // Importing a better icon

const Unauthorized = () => {
  const navigate = useNavigate();
  const { status: isAuthenticated, roles } = useSelector((state) => state.auth);

  const goBack = () => {
    navigate(-1);
  };

  const goToDashboard = () => {
    if (isAuthenticated && roles.length > 0) {
      navigate(`/${roles[0]}/dashboard`);
    } else {
      navigate("/");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#030712] text-white p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
        className="max-w-md w-full text-center p-8 rounded-lg border border-gray-700 bg-[#111827] backdrop-blur-md bg-opacity-80 shadow-xl"
      >
        <h1 className="text-4xl font-bold mb-4 tracking-wide text-red-500">
          Access Denied
        </h1>
        <motion.div
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-red-500 mb-4"
        >
          <LuTriangleAlert className="mx-auto w-24 h-24 text-red-500" strokeWidth={1.5} />
        </motion.div>
        <p className="text-gray-300 mb-6 text-lg leading-relaxed">
          Oops! You don’t have permission to access this page.
        </p>
        <div className="flex space-x-4 justify-center">
          <motion.button
            onClick={goBack}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2.5 bg-gray-700 text-white rounded-lg transition-all shadow-lg hover:bg-gray-600"
          >
            Go Back
          </motion.button>
          <motion.button
            onClick={goToDashboard}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="px-5 py-2.5 bg-blue-600 text-white rounded-lg transition-all shadow-lg hover:bg-blue-500"
          >
            Go to Dashboard
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

export default Unauthorized;

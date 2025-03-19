import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { LuLogOut, LuCheck, LuX } from "react-icons/lu";

const LogoutModal = ({ isOpen, onClose }) => {
  const [loggingOut, setLoggingOut] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setLoggingOut(true);

    setTimeout(() => {
      localStorage.removeItem("token");
      sessionStorage.clear();

      navigate("/logout");
    }, 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-white dark:bg-gray-900 w-full max-w-md rounded-2xl shadow-xl overflow-hidden">
            <div className="relative">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-900 via-blue-500 to-brand-600"></div>

              <button
                onClick={onClose}
                disabled={loggingOut}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 dark:text-gray-400">
                <LuX size={20} />
              </button>

              <div className="p-6 pt-12 text-center">
                <div className="mx-auto w-20 h-20 flex items-center justify-center rounded-full bg-red-50 dark:bg-red-900/20 mb-6">
                  <LuLogOut className="w-10 h-10 text-red-500" />
                </div>

                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Ready to leave?
                </h3>

                <p className="text-gray-600 dark:text-gray-400 mb-8">
                  You're about to log out from your account, click on Yes, Log out me to
                  continue logout
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button
                    onClick={onClose}
                    disabled={loggingOut}
                    className="flex-1 px-6 py-3 rounded-lg border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium transition-colors disabled:opacity-50">
                    Cancel
                  </button>

                  <button
                    onClick={handleLogout}
                    disabled={loggingOut}
                    className="flex-1 px-6 py-3 rounded-lg bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium transition-all relative overflow-hidden disabled:opacity-50">
                    {loggingOut ? (
                      <span className="flex items-center justify-center gap-2">
                        <span className="loading loading-spinner"></span>
                        <span>Logging out...</span>
                      </span>
                    ) : (
                      "Yes, Log me out"
                    )}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LogoutModal;

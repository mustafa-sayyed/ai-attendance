import React, { useState, useEffect } from "react";
import {
  FaUniversity,
  FaEnvelope,
  FaBuilding,
  FaEdit,
  FaCheck,
  FaTimes,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

const InstituteProfile = () => {
  // Get institute data from Redux store
  const instituteData = useSelector((state) => state.auth.userData);

  // State for institute data
  const [institute, setInstitute] = useState({});
  const [editedInstitute, setEditedInstitute] = useState({});
  const [isEditing, setIsEditing] = useState(false);

  // Load institute data from Redux if available
  useEffect(() => {
    if (instituteData) {
      setInstitute(instituteData);
      setEditedInstitute(instituteData);
    }
  }, [instituteData]);

  // Handle edit form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedInstitute((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would usually dispatch an action to update Redux store
    console.log("Saving changes...", editedInstitute);

    // Update local state
    setInstitute(editedInstitute);
    setIsEditing(false);
  };

  console.log(institute);

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg w-full max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white/90">
          Institute Profile
        </h2>
        {!isEditing && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base w-full sm:w-auto justify-center sm:justify-start">
            <FaEdit /> Edit Profile
          </motion.button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.form
            key="edit-form"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            onSubmit={handleSubmit}
            className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                  Institute Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editedInstitute.name || ""}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  value={editedInstitute.email || ""}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 sm:mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditedInstitute({ ...institute });
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors flex items-center justify-center gap-2">
                <FaTimes /> Cancel
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                <FaCheck /> Save Changes
              </motion.button>
            </div>
          </motion.form>
        ) : (
          <motion.div
            key="profile-view"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-6 sm:space-y-8">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:space-x-6">
              <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 bg-blue-100 dark:bg-blue-600 rounded-full flex items-center justify-center">
                <FaUniversity className="text-blue-100 text-3xl sm:text-4xl" />
              </div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white/90 mb-1">
                  {institute.name}
                </h3>
                <div className="flex items-center justify-center sm:justify-start text-gray-600 dark:text-gray-400 mb-3">
                  <FaEnvelope className="mr-2" />
                  <span className="break-all">{institute.email}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 sm:p-6 rounded-xl">
              <h4 className="text-base sm:text-lg font-medium text-gray-800 dark:text-white/90 mb-3 sm:mb-4 flex items-center">
                <FaBuilding className="mr-2 text-blue-600 dark:text-blue-400" />
                Departments
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {Array.isArray(institute.departments) &&
                  institute.departments.map((dept, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ scale: 1.03 }}
                      className="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                      {dept.name}
                    </motion.div>
                  ))}
                {(!Array.isArray(institute.departments) ||
                  institute.departments.length === 0) && (
                  <div className="col-span-1 sm:col-span-3 text-center p-4 text-gray-500 dark:text-gray-400 italic">
                    No departments have been added.
                  </div>
                )}
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 sm:p-6 rounded-xl">
              <h4 className="text-base sm:text-lg font-medium text-gray-800 dark:text-white/90 mb-3 sm:mb-4">
                Stats Overview
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Departments
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white/90">
                    {Array.isArray(institute.departments)
                      ? institute.departments.length
                      : 0}
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Teachers
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white/90">
                    42
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Total Students
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white/90">
                    1250
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default InstituteProfile;

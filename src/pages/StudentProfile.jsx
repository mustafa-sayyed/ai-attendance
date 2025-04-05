import { useEffect, useState } from "react";
import {
  FaUserGraduate,
  FaEnvelope,
  FaIdCard,
  FaBuilding,
  FaBookOpen,
  FaEdit,
  FaChalkboardTeacher,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";

export default function StudentProfile({ student }) {
  const [studentData, setStudentData] = useState({});
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  const user = useSelector((state) => state.auth.userData);
  useEffect(() => {
    setStudentData(user);
    setFormData(user);
    console.log(user);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically make an API call to update the student data
    setStudentData(formData);
    setIsEditing(false);
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  console.log(formData);

  return (
    <div className="py-8 px-0 md:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white/90 mb-6">
          Student Profile
        </h1>

        <div className="space-y-6">
          {/* Profile Header Card */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardVariants}
            className="p-6 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-800/30 shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 overflow-hidden rounded-full border-4 border-indigo-100 dark:border-indigo-900">
                  <img
                    src={studentData.photo || "/placeholder-avatar.jpg"}
                    alt={studentData.name}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="text-center md:text-left">
                <h2 className="text-xl font-semibold text-gray-800 dark:text-white/90 mb-1">
                  {studentData.name}
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                  {studentData.class?.name} • {studentData.department?.name}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {studentData.institute?.name}
                </p>
              </div>

              <div className="ml-auto mt-4 md:mt-0">
                <button
                  onClick={() => setIsEditing(!isEditing)}
                  className="flex items-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 transition-colors">
                  <FaEdit />
                  {isEditing ? "Cancel" : "Edit Profile"}
                </button>
              </div>
            </div>
          </motion.div>

          {!isEditing ? (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="p-6 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-800/30 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-6">
                Personal Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-3">
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                    <FaUserGraduate className="text-indigo-500 dark:text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Full Name
                    </p>
                    <p className="text-xs md:text-sm font-medium text-gray-800 dark:text-white/90">
                      {studentData.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                    <FaEnvelope className="text-indigo-500 dark:text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Email Address
                    </p>
                    <p className="text-xs md:text-sm font-medium text-gray-800 dark:text-white/90">
                      {studentData.email}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                    <FaIdCard className="text-indigo-500 dark:text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Roll Number
                    </p>
                    <p className="text-xs md:text-sm font-medium text-gray-800 dark:text-white/90">
                      {studentData.rollno}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                    <FaBuilding className="text-indigo-500 dark:text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Institute
                    </p>
                    <p className="text-xs md:text-sm font-medium text-gray-800 dark:text-white/90">
                      {studentData.institute?.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                    <FaBookOpen className="text-indigo-500 dark:text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                      Department
                    </p>
                    <p className="text-xs md:text-sm font-medium text-gray-800 dark:text-white/90">
                      {studentData.department?.name}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-2 bg-indigo-50 dark:bg-indigo-900/30 rounded-lg">
                    <FaChalkboardTeacher className="text-indigo-500 dark:text-indigo-400" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Class</p>
                    <p className="text-xs md:text-sm font-medium text-gray-800 dark:text-white/90">
                      {studentData.class?.name}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial="hidden"
              animate="visible"
              variants={cardVariants}
              className="p-6 rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-800/30 shadow-sm">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90 mb-6">
                Edit Profile
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-sm placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-800 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-indigo-300 focus:ring-indigo-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-sm placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-800 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-indigo-300 focus:ring-indigo-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Roll Number
                    </label>
                    <input
                      type="number"
                      name="rollno"
                      value={formData.rollno}
                      onChange={handleChange}
                      className="h-11 w-full rounded-lg border appearance-none px-4 py-2.5 text-sm shadow-sm placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-800 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-indigo-300 focus:ring-indigo-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Profile Photo
                    </label>
                    <input
                      type="file"
                      name="photo"
                      className="h-11 w-full rounded-lg border appearance-none px-4 py-2 text-sm shadow-sm placeholder:text-gray-400 focus:outline-hidden focus:ring-3 dark:bg-gray-800 dark:placeholder:text-white/30 bg-transparent text-gray-800 border-gray-300 focus:border-indigo-300 focus:ring-indigo-500/20 dark:border-gray-700 dark:text-white/90 dark:focus:border-indigo-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700 transition-colors">
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-500/20 dark:bg-indigo-700 dark:hover:bg-indigo-600 transition-colors">
                    Save Changes
                  </button>
                </div>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

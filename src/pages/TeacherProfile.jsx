import React, { useState, useEffect, useRef } from "react";
import {
  FaEdit,
  FaUserTie,
  FaEnvelope,
  FaUniversity,
  FaChalkboardTeacher,
  FaCrown,
  FaCheck,
  FaTimes,
  FaPlus,
  FaTrash,
  FaCamera,
  FaImage,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";
import axios from "axios";

const TeacherProfile = ({ teacherData }) => {
  // State for teacher data
  const [teacher, setTeacher] = useState({});

  // State for editing mode
  const [isEditing, setIsEditing] = useState(false);
  const [editedTeacher, setEditedTeacher] = useState({ ...teacher });
  const [availableDepartments, setAvailableDepartments] = useState([]);

  // Photo upload states
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  const user = useSelector((state) => state.auth.userData);

  // Role display mapping
  const roleLabels = {
    teacher: "Teacher",
    mentor: "Mentor",
    hod: "Head of Department",
    principal: "Principal",
  };

  // Role color mapping
  const roleColors = {
    teacher: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
    mentor: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
    hod: "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200",
    principal: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  };

  useEffect(() => {
    const data = axios
      .get(
        `http://localhost:3000/api/v1/institute//get-departments/${user.institute._id}`
      )
      .then((res) => setAvailableDepartments(res.data.departments));

    if (user) {
      setTeacher(user);
      setEditedTeacher(user);
      // If user has a photo URL, set it
      if (user.photo) {
        setPhotoPreview(user.photo);
      }
    }
  }, [teacherData, user]);

  // Handle edit form changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTeacher((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Check if file is an image
    if (!file.type.startsWith("image/")) {
      alert("Please upload an image file");
      return;
    }

    // Check file size (limit to 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert("File size should be less than 5MB");
      return;
    }

    setProfilePhoto(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPhotoPreview(reader.result);
    };
    reader.readAsDataURL(file);

    // Update edited teacher with photo info
    setEditedTeacher((prev) => ({
      ...prev,
      photoUrl: "pending_upload", // This would be replaced with the actual URL after upload
      photoUpdated: true,
    }));
  };

  // Trigger file input click
  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  // Remove photo
  const handleRemovePhoto = () => {
    setProfilePhoto(null);
    setPhotoPreview(null);
    setEditedTeacher((prev) => ({
      ...prev,
      photoUrl: null,
      photoUpdated: true,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Here you would usually handle the photo upload to your server
    // and get back a URL for the photo which you would include in the userData

    // For this example, we'll simulate that the photo was uploaded successfully
    if (profilePhoto) {
      console.log("Uploading photo...", profilePhoto);
      // In a real application, you would upload the photo to your server/storage
      // and get back a URL which you would set in the teacher object
    }

    // Here you would usually send the updated data to your API
    console.log("Saving changes...", editedTeacher);

    // Update local state with the edited data
    setTeacher({
      ...editedTeacher,
      photoUrl: photoPreview, // In a real app, this would be the URL from your server
    });

    setIsEditing(false);
  };

  // Add department to teacher
  const handleAddDepartment = (e) => {
    const departmentId = e.target.value;
    if (!departmentId || departmentId === "select") return;

    const departmentToAdd = availableDepartments.find(
      (dept) => dept._id === departmentId
    );
    if (!departmentToAdd) return;

    // Check if department already exists in teacher's departments
    if (editedTeacher.departments?.some((dept) => dept._id === departmentId)) return;

    setEditedTeacher((prev) => ({
      ...prev,
      departments: [...(prev.departments || []), departmentToAdd],
    }));
  };

  // Remove department from teacher
  const handleRemoveDepartment = (deptId) => {
    setEditedTeacher((prev) => ({
      ...prev,
      departments: prev.departments.filter((dept) => dept._id !== deptId),
    }));
  };

  return (
    <div className="p-4 sm:p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg w-full max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 sm:mb-8">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-800 dark:text-white/90">
          Teacher Profile
        </h2>
        {!isEditing && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm sm:text-base">
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
            {/* Photo Upload Section */}
            <div className="flex flex-col items-center mb-6">
              <div className="relative mb-4">
                <div
                  className={`w-32 h-32 rounded-full overflow-hidden flex items-center justify-center border-4 ${
                    photoPreview
                      ? "border-blue-500"
                      : "border-gray-200 dark:border-gray-700"
                  } bg-gray-100 dark:bg-gray-800`}>
                  {photoPreview ? (
                    <img
                      src={photoPreview}
                      alt="Profile Preview"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FaUserTie className="text-blue-500 dark:text-blue-400 text-5xl" />
                  )}
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  type="button"
                  onClick={handlePhotoClick}
                  className="absolute bottom-0 right-0 p-2 bg-blue-500 text-white rounded-full shadow-lg">
                  <FaCamera />
                </motion.button>
              </div>

              <input
                type="file"
                ref={fileInputRef}
                onChange={handlePhotoChange}
                className="hidden"
                accept="image/*"
              />

              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={handlePhotoClick}
                  className="text-sm text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1">
                  <FaImage size={14} /> Change Photo
                </button>
                {photoPreview && (
                  <button
                    type="button"
                    onClick={handleRemovePhoto}
                    className="text-sm text-red-600 dark:text-red-400 hover:underline flex items-center gap-1">
                    <FaTrash size={14} /> Remove
                  </button>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editedTeacher.name || ""}
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
                  value={editedTeacher.email || ""}
                  onChange={handleChange}
                  className="w-full p-2 sm:p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                Institute
              </label>
              <input
                type="text"
                name="institute"
                value={editedTeacher.institute?.name || ""}
                disabled
                className="w-full p-2 sm:p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-700 text-gray-500 dark:text-gray-400"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Institute cannot be changed. Please contact administration.
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 sm:mb-2">
                Departments
              </label>

              <div className="grid grid-cols-1 gap-2 mb-3">
                {editedTeacher.departments?.map((dept) => (
                  <div
                    key={dept._id}
                    className="flex items-center justify-between bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700">
                    <span className="font-medium text-gray-800 dark:text-white/90">
                      {dept.name}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveDepartment(dept._id)}
                      className="p-1 text-red-500 hover:bg-red-100 dark:hover:bg-red-900/30 rounded-full">
                      <FaTrash />
                    </button>
                  </div>
                ))}
                {(!editedTeacher.departments ||
                  editedTeacher.departments.length === 0) && (
                  <div className="text-center p-3 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg text-gray-500 dark:text-gray-400">
                    No departments assigned. Add one below.
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-2">
                <select
                  onChange={handleAddDepartment}
                  defaultValue="select"
                  className="flex-1 p-2 sm:p-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="select">Select a department to add</option>
                  {availableDepartments.map((dept) => (
                    <option key={dept._id} value={dept._id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-end gap-3 mt-6 sm:mt-8">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => {
                  setIsEditing(false);
                  setEditedTeacher({ ...teacher });
                  if (teacher.photoUrl) {
                    setPhotoPreview(teacher.photoUrl);
                  } else {
                    setPhotoPreview(null);
                  }
                  setProfilePhoto(null);
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
              <motion.div className="flex-shrink-0 w-32 h-32 sm:w-28 sm:h-28 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center overflow-hidden border-2 border-gray-200 dark:border-gray-700">
                {photoPreview ? (
                  <img
                    src={photoPreview}
                    alt="Teacher Profile"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <FaUserTie className="text-blue-600 dark:text-blue-400 text-4xl" />
                )}
              </motion.div>
              <div className="flex-1 text-center sm:text-left">
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white/90 mb-1">
                  {teacher.name}
                </h3>
                <div className="flex items-center justify-center sm:justify-start text-gray-600 dark:text-gray-400 mb-3">
                  <FaEnvelope className="mr-2" />
                  <span className="break-all">{teacher.email}</span>
                </div>
                <div className="flex flex-wrap justify-center sm:justify-start gap-2">
                  {teacher?.roles?.map((role) => (
                    <span
                      key={role}
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${roleColors[role]}`}>
                      {role === "hod" || role === "principal" ? (
                        <FaCrown className="mr-1" />
                      ) : null}
                      {roleLabels[role]}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 sm:p-6 rounded-xl">
              <h4 className="text-base sm:text-lg font-medium text-gray-800 dark:text-white/90 mb-3 sm:mb-4 flex items-center">
                <FaUniversity className="mr-2 text-blue-600 dark:text-blue-400" />
                Institute
              </h4>
              <div className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                <p className="font-medium text-gray-800 dark:text-white/90">
                  {teacher?.institute?.name}
                </p>
              </div>
            </div>

            <div className="bg-gray-50 dark:bg-gray-800/50 p-4 sm:p-6 rounded-xl">
              <h4 className="text-base sm:text-lg font-medium text-gray-800 dark:text-white/90 mb-3 sm:mb-4 flex items-center">
                <FaChalkboardTeacher className="mr-2 text-blue-600 dark:text-blue-400" />
                Departments
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {teacher?.departments?.map((dept) => (
                  <motion.div
                    key={dept?._id}
                    whileHover={{ scale: 1.03 }}
                    className="bg-white dark:bg-gray-800 p-3 sm:p-4 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm">
                    <p className="font-medium text-gray-800 dark:text-white/90">
                      {dept?.name}
                    </p>
                  </motion.div>
                ))}
                {(!teacher?.departments || teacher.departments.length === 0) && (
                  <div className="col-span-1 sm:col-span-2 text-center p-4 text-gray-500 dark:text-gray-400 italic">
                    No departments assigned.
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TeacherProfile;

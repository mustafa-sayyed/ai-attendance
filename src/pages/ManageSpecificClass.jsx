import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { FiEdit, FiTrash2, FiSearch, FiX, FiPlus, FiCalendar, FiUsers } from "react-icons/fi";
import { LuLoader, LuBookOpen, LuBook, LuUserCheck } from "react-icons/lu";
import { SiGoogleclassroom } from "react-icons/si";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

// Sample data for class details
const classData = {
  id: 1,
  name: "Computer Science - 3rd Year",
  code: "CS-3",
  semester: "Fall 2023",
  studentsCount: 45,
  subjectsCount: 6,
  coordinator: {
    id: 3,
    name: "Dr. Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    photo: "/images/user/avatar-3.png"
  },
  createdAt: "2023-07-15",
  status: "active",
};

// Sample data for subjects
const sampleSubjects = [
  {
    id: 1,
    code: "CS301",
    name: "Data Structures and Algorithms",
    credits: 4,
    description: "Study of fundamental data structures and algorithms used in computing",
    teacher: {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@example.com",
      photo: "/images/user/avatar-1.png"
    },
  },
  {
    id: 2,
    code: "CS302",
    name: "Database Management Systems",
    credits: 3,
    description: "Introduction to database concepts, design, and implementation",
    teacher: {
      id: 2,
      name: "Prof. Michael Chen",
      email: "michael.chen@example.com",
      photo: "/images/user/avatar-2.png"
    },
  },
  {
    id: 3,
    code: "CS303",
    name: "Operating Systems",
    credits: 4,
    description: "Principles of operating systems, process management, memory management",
    teacher: {
      id: 5,
      name: "Dr. Alisha Patel",
      email: "alisha.patel@example.com",
      photo: "/images/user/avatar-5.png"
    },
  },
  {
    id: 4,
    code: "CS304",
    name: "Computer Networks",
    credits: 3,
    description: "Fundamentals of computer networking and network protocols",
    teacher: null,
  },
  {
    id: 5,
    code: "CS305",
    name: "Software Engineering",
    credits: 3,
    description: "Principles of software design, development, and maintenance",
    teacher: {
      id: 6,
      name: "Prof. David Wilson",
      email: "david.wilson@example.com",
      photo: "/images/user/avatar-6.png"
    },
  },
  {
    id: 6,
    code: "CS306",
    name: "Artificial Intelligence",
    credits: 4,
    description: "Introduction to AI concepts, algorithms, and applications",
    teacher: null,
  },
];

// Sample data for available teachers
const sampleTeachers = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@example.com",
    department: "cse",
    role: "professor",
    specialization: "Data Structures, Algorithms",
    photo: "/images/user/avatar-1.png",
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    email: "michael.chen@example.com",
    department: "cse",
    role: "professor",
    specialization: "Database Systems, Big Data",
    photo: "/images/user/avatar-2.png",
  },
  {
    id: 5,
    name: "Dr. Alisha Patel",
    email: "alisha.patel@example.com",
    department: "cse",
    role: "professor",
    specialization: "Operating Systems, Systems Programming",
    photo: "/images/user/avatar-5.png",
  },
  {
    id: 6,
    name: "Prof. David Wilson",
    email: "david.wilson@example.com",
    department: "cse",
    role: "professor",
    specialization: "Software Engineering, Project Management",
    photo: "/images/user/avatar-6.png",
  },
  {
    id: 7,
    name: "Dr. Lisa Cooper",
    email: "lisa.cooper@example.com",
    department: "cse",
    role: "associate professor",
    specialization: "Computer Networks, Security",
    photo: "/images/user/avatar-7.png",
  },
  {
    id: 8,
    name: "Prof. John Martinez",
    email: "john.martinez@example.com",
    department: "cse",
    role: "assistant professor",
    specialization: "Artificial Intelligence, Machine Learning",
    photo: "/images/user/avatar-8.png",
  },
];

// Form schema for subject
const subjectSchema = yup.object({
  code: yup.string().required("Subject code is required"),
  name: yup.string().required("Subject name is required"),
  credits: yup.number().required("Credits are required").min(1, "Credits must be at least 1").max(5, "Credits cannot exceed 5"),
  description: yup.string().required("Description is required"),
});

// Form schema for teacher assignment
const assignTeacherSchema = yup.object({
  teacherId: yup.string().required("Please select a teacher")
});

function ManageSpecificClass() {
  const { classId } = useParams();
  const [loading, setLoading] = useState(true);
  const [subjects, setSubjects] = useState([]);
  const [availableTeachers, setAvailableTeachers] = useState([]);
  const [classDetails, setClassDetails] = useState(null);
  
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [selectedTeacherSubject, setSelectedTeacherSubject] = useState(null);
  
  const [isSubjectModalOpen, setIsSubjectModalOpen] = useState(false);
  const [isTeacherModalOpen, setIsTeacherModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const [searchTerm, setSearchTerm] = useState("");

  // Form setup for subject
  const {
    register: registerSubject,
    handleSubmit: handleSubjectSubmit,
    formState: { errors: subjectErrors },
    reset: resetSubjectForm,
    setValue: setSubjectValue
  } = useForm({
    resolver: yupResolver(subjectSchema),
  });

  // Form setup for teacher assignment
  const {
    register: registerTeacher,
    handleSubmit: handleTeacherSubmit,
    formState: { errors: teacherErrors },
    reset: resetTeacherForm,
    setValue: setTeacherValue
  } = useForm({
    resolver: yupResolver(assignTeacherSchema)
  });

  // Load class data and subjects
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setClassDetails(classData);
      setSubjects(sampleSubjects);
      setAvailableTeachers(sampleTeachers);
      setLoading(false);
    }, 800);
  }, [classId]);

  // Handle subject form submission
  const onSubmitSubject = (data) => {
    setLoading(true);
    setTimeout(() => {
      if (selectedSubject) {
        // Update existing subject
        setSubjects(
          subjects.map((item) =>
            item.id === selectedSubject.id ? { ...item, ...data } : item
          )
        );
        toast.success("Subject updated successfully");
      } else {
        // Add new subject
        const newSubject = {
          id: subjects.length + 1,
          ...data,
          teacher: null,
        };
        setSubjects([...subjects, newSubject]);
        toast.success("Subject added successfully");
      }
      closeSubjectModal();
      setLoading(false);
    }, 600);
  };

  // Handle teacher assignment form submission
  const onAssignTeacher = (data) => {
    setLoading(true);
    setTimeout(() => {
      const teacherData = availableTeachers.find(teacher => teacher.id.toString() === data.teacherId);
      
      if (teacherData && selectedTeacherSubject) {
        // Assign the teacher to the subject
        setSubjects(
          subjects.map((item) =>
            item.id === selectedTeacherSubject.id ? { 
              ...item, 
              teacher: {
                id: teacherData.id,
                name: teacherData.name,
                email: teacherData.email,
                photo: teacherData.photo
              } 
            } : item
          )
        );
        toast.success(`${teacherData.name} assigned to ${selectedTeacherSubject.name}`);
      }
      closeTeacherModal();
      setLoading(false);
    }, 600);
  };

  // Handle delete subject
  const handleDeleteSubject = () => {
    setLoading(true);
    setTimeout(() => {
      setSubjects(subjects.filter((item) => item.id !== selectedSubject.id));
      toast.success("Subject removed successfully");
      setIsDeleteModalOpen(false);
      setSelectedSubject(null);
      setLoading(false);
    }, 600);
  };

  // Open modal for adding new subject
  const openAddSubjectModal = () => {
    setSelectedSubject(null);
    resetSubjectForm({
      code: "",
      name: "",
      credits: 3,
      description: "",
    });
    setIsSubjectModalOpen(true);
  };

  // Open modal for editing subject
  const openEditSubjectModal = (subject) => {
    setSelectedSubject(subject);
    setSubjectValue("code", subject.code);
    setSubjectValue("name", subject.name);
    setSubjectValue("credits", subject.credits);
    setSubjectValue("description", subject.description);
    setIsSubjectModalOpen(true);
  };

  // Open modal for assigning teacher
  const openAssignTeacherModal = (subject) => {
    setSelectedTeacherSubject(subject);
    setTeacherValue("teacherId", subject.teacher ? subject.teacher.id.toString() : "");
    setIsTeacherModalOpen(true);
  };

  // Close subject modal
  const closeSubjectModal = () => {
    setIsSubjectModalOpen(false);
    setSelectedSubject(null);
    resetSubjectForm();
  };

  // Close teacher assignment modal
  const closeTeacherModal = () => {
    setIsTeacherModalOpen(false);
    setSelectedTeacherSubject(null);
    resetTeacherForm();
  };

  // Filter subjects based on search
  const filteredSubjects = subjects.filter((subject) => {
    const matchesSearch =
      searchTerm === "" ||
      subject.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      subject.code.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch;
  });

  // Clear search
  const clearSearch = () => {
    setSearchTerm("");
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[calc(100vh-200px)] bg-white dark:bg-gray-900">
        <div className="h-16 w-16 border-4 border-blue-600 dark:border-blue-500 border-t-transparent dark:border-t-transparent rounded-full animate-spin"></div>
        <div className="mt-4 text-lg text-gray-800 dark:text-gray-200">Loading class details...</div>
      </div>
    );
  }

  return (
    <>
      <PageMeta title={`Manage ${classDetails?.name || 'Class'}`} description="AI Attendance System" />
      <PageBreadcrumb pageTitle={`Manage ${classDetails?.name || 'Class'}`} />

      {/* Class Overview - Simplified */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03] mb-6">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-center">
            <div className="h-16 w-16 flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg flex items-center justify-center">
              <SiGoogleclassroom className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
            </div>
            <div className="ml-5">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white/90">
                {classDetails.name}
              </h2>
              <div className="mt-1 text-sm text-gray-600 dark:text-gray-400 flex flex-wrap gap-x-4 gap-y-1">
                <span className="inline-flex items-center">
                  <FiCalendar className="mr-1 h-4 w-4 text-blue-600 dark:text-blue-400" />
                  {classDetails.semester}
                </span>
                <span className="inline-flex items-center">
                  <FiUsers className="mr-1 h-4 w-4 text-blue-600 dark:text-blue-400" />
                  {classDetails.studentsCount} Students
                </span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
            <div className="px-4 py-2 rounded-lg bg-gray-50 dark:bg-gray-800/60 text-sm">
              <div className="font-medium text-gray-700 dark:text-gray-300">Class Coordinator</div>
              <div className="flex items-center mt-1">
                <img 
                  src={classDetails.coordinator.photo} 
                  alt={classDetails.coordinator.name} 
                  className="h-7 w-7 rounded-full object-cover"
                />
                <span className="ml-2 text-gray-900 dark:text-white/90">
                  {classDetails.coordinator.name}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Subject Management */}
      <div className="space-y-6">
        {/* Header section with search and add button */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white/90">
                Subject Management
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Manage subjects and assign teachers for {classDetails.name}
              </p>
            </div>
            <button
              onClick={openAddSubjectModal}
              className="inline-flex items-center rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-blue-700 transition-colors dark:bg-blue-700 dark:hover:bg-blue-800"
            >
              <FiPlus className="mr-1.5 h-4 w-4" />
              Add Subject
            </button>
          </div>

          <div className="mt-6">
            {/* Search input */}
            <div className="relative max-w-md">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search subjects by name or code..."
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 pl-10 text-sm text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90"
              />
              <FiSearch className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
              
              {searchTerm && (
                <button
                  onClick={clearSearch}
                  className="absolute right-3 top-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                >
                  <FiX className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Subjects table */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
                  <span className="mt-2 text-gray-500 dark:text-gray-400">Loading subject data...</span>
                </div>
              </div>
            ) : filteredSubjects.length === 0 ? (
              <div className="flex items-center justify-center p-12">
                <div className="text-center">
                  <LuBook className="mx-auto h-12 w-12 text-gray-400 dark:text-gray-600" />
                  <h3 className="mb-2 mt-4 text-lg font-medium text-gray-800 dark:text-gray-300">No subjects found</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {searchTerm
                      ? "Try changing your search term"
                      : "Add new subjects to get started"}
                  </p>
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="mt-4 inline-flex items-center px-3 py-1.5 text-sm font-medium rounded-md border border-gray-300 dark:border-gray-700 text-blue-600 dark:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <FiX className="mr-1.5 h-4 w-4" />
                      Clear search
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Subject
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Subject Teacher
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Details
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-transparent">
                  {filteredSubjects.map((subject) => (
                    <tr 
                      key={subject.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-blue-100 dark:bg-blue-900/20 rounded-md flex items-center justify-center">
                            <LuBookOpen className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white/90">
                              {subject.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Code: {subject.code}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {subject.teacher ? (
                          <div className="flex items-center">
                            <div className="h-8 w-8 flex-shrink-0">
                              <img 
                                className="h-8 w-8 rounded-full object-cover" 
                                src={subject.teacher.photo} 
                                alt={subject.teacher.name} 
                              />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900 dark:text-white/90">
                                {subject.teacher.name}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {subject.teacher.email}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <button 
                            onClick={() => openAssignTeacherModal(subject)} 
                            className="inline-flex items-center px-3 py-1.5 rounded-md text-xs font-medium bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/40"
                          >
                            <LuUserCheck className="mr-1 h-3 w-3" />
                            Assign Teacher
                          </button>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white/90">
                          {subject.credits} Credits
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400 truncate max-w-xs">
                          {subject.description}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <div className="flex justify-end space-x-3">
                          {subject.teacher && (
                            <button
                              onClick={() => openAssignTeacherModal(subject)}
                              className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300"
                              title="Change Teacher"
                            >
                              <LuUserCheck className="h-4.5 w-4.5" />
                              <span className="sr-only">Change Teacher</span>
                            </button>
                          )}
                          <button
                            onClick={() => openEditSubjectModal(subject)}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            title="Edit Subject"
                          >
                            <FiEdit className="h-4.5 w-4.5" />
                            <span className="sr-only">Edit</span>
                          </button>
                          <button
                            onClick={() => {
                              setSelectedSubject(subject);
                              setIsDeleteModalOpen(true);
                            }}
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                            title="Delete Subject"
                          >
                            <FiTrash2 className="h-4.5 w-4.5" />
                            <span className="sr-only">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Add/Edit Subject Modal - Improved UI */}
      {isSubjectModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
            {/* Backdrop with improved light mode appearance */}
            <div 
              className="fixed inset-0 bg-gray-500/75 dark:bg-gray-900/80 backdrop-blur-sm transition-opacity" 
              aria-hidden="true"
              onClick={closeSubjectModal}
            ></div>
            
            {/* Modal panel */}
            <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              {/* Header with border */}
              <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
                <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white/90">
                  {selectedSubject ? 'Edit Subject' : 'Add New Subject'}
                </h3>
                <button
                  type="button"
                  onClick={closeSubjectModal}
                  className="rounded-full p-1 text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                >
                  <span className="sr-only">Close</span>
                  <FiX className="h-5 w-5" />
                </button>
              </div>
              
              {/* Form content */}
              <div className="px-6 py-4">
                <form onSubmit={handleSubjectSubmit(onSubmitSubject)} className="space-y-4">
                  {/* Subject Code */}
                  <div>
                    <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Subject Code
                    </label>
                    <input
                      type="text"
                      id="code"
                      {...registerSubject("code")}
                      className={`w-full rounded-lg border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white/90 ${
                        subjectErrors.code 
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 dark:border-red-600" 
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600"
                      }`}
                    />
                    {subjectErrors.code && (
                      <p className="mt-1 text-xs text-red-500 dark:text-red-400">{subjectErrors.code.message}</p>
                    )}
                  </div>
                  
                  {/* Subject Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Subject Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      {...registerSubject("name")}
                      className={`w-full rounded-lg border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white/90 ${
                        subjectErrors.name 
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 dark:border-red-600" 
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600"
                      }`}
                    />
                    {subjectErrors.name && (
                      <p className="mt-1 text-xs text-red-500 dark:text-red-400">{subjectErrors.name.message}</p>
                    )}
                  </div>
                  
                  {/* Credits */}
                  <div>
                    <label htmlFor="credits" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Credits
                    </label>
                    <select
                      id="credits"
                      {...registerSubject("credits")}
                      className={`w-full rounded-lg border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white/90 ${
                        subjectErrors.credits 
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 dark:border-red-600" 
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600"
                      }`}
                    >
                      {[1, 2, 3, 4, 5].map(credit => (
                        <option key={credit} value={credit}>{credit} {credit === 1 ? 'Credit' : 'Credits'}</option>
                      ))}
                    </select>
                    {subjectErrors.credits && (
                      <p className="mt-1 text-xs text-red-500 dark:text-red-400">{subjectErrors.credits.message}</p>
                    )}
                  </div>
                  
                  {/* Description */}
                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Description
                    </label>
                    <textarea
                      id="description"
                      rows="3"
                      {...registerSubject("description")}
                      className={`w-full rounded-lg border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white/90 ${
                        subjectErrors.description 
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 dark:border-red-600" 
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600"
                      }`}
                    ></textarea>
                    {subjectErrors.description && (
                      <p className="mt-1 text-xs text-red-500 dark:text-red-400">{subjectErrors.description.message}</p>
                    )}
                  </div>
                </form>
              </div>
              
              {/* Footer with actions */}
              <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex flex-row-reverse gap-2">
                <button
                  type="button"
                  onClick={handleSubjectSubmit(onSubmitSubject)}
                  disabled={loading}
                  className="inline-flex justify-center rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  {loading ? (
                    <>
                      <LuLoader className="mr-2 h-4 w-4 animate-spin" /> 
                      Processing...
                    </>
                  ) : selectedSubject ? (
                    'Update Subject'
                  ) : (
                    'Add Subject'
                  )}
                </button>
                <button
                  type="button"
                  onClick={closeSubjectModal}
                  className="inline-flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Assign Teacher Modal - Improved UI */}
      {isTeacherModalOpen && selectedTeacherSubject && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
            {/* Backdrop with improved light mode appearance */}
            <div 
              className="fixed inset-0 bg-gray-500/75 dark:bg-gray-900/80 backdrop-blur-sm transition-opacity" 
              aria-hidden="true"
              onClick={closeTeacherModal}
            ></div>
            
            {/* Modal panel */}
            <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              {/* Header with border */}
              <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white/90">
                    Assign Teacher
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    {selectedTeacherSubject.name} ({selectedTeacherSubject.code})
                  </p>
                </div>
                <button
                  type="button"
                  onClick={closeTeacherModal}
                  className="rounded-full p-1 text-gray-400 hover:text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 focus:outline-none"
                >
                  <span className="sr-only">Close</span>
                  <FiX className="h-5 w-5" />
                </button>
              </div>
              
              {/* Form content */}
              <div className="px-6 py-4">
                <form onSubmit={handleTeacherSubmit(onAssignTeacher)} className="space-y-4">
                  {selectedTeacherSubject.teacher && (
                    <div className="mb-4 bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
                      <p className="text-sm text-blue-800 dark:text-blue-300">
                        This subject is currently assigned to <span className="font-medium">{selectedTeacherSubject.teacher.name}</span>. 
                        Selecting a new teacher will reassign the subject.
                      </p>
                    </div>
                  )}

                  <div>
                    <label htmlFor="teacherId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Select Teacher
                    </label>
                    <select
                      id="teacherId"
                      {...registerTeacher("teacherId")}
                      className={`w-full rounded-lg border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white/90 ${
                        teacherErrors.teacherId 
                          ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 dark:border-red-600" 
                          : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600"
                      }`}
                    >
                      <option value="">Select a teacher</option>
                      {availableTeachers.map((teacher) => (
                        <option key={teacher.id} value={teacher.id}>
                          {teacher.name} ({teacher.specialization})
                        </option>
                      ))}
                    </select>
                    {teacherErrors.teacherId && (
                      <p className="mt-1 text-xs text-red-500 dark:text-red-400">{teacherErrors.teacherId.message}</p>
                    )}
                  </div>
                </form>
              </div>
              
              {/* Footer with actions */}
              <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex flex-row-reverse gap-2">
                <button
                  type="button"
                  onClick={handleTeacherSubmit(onAssignTeacher)}
                  disabled={loading}
                  className="inline-flex justify-center rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 dark:bg-blue-700 dark:hover:bg-blue-800"
                >
                  {loading ? (
                    <>
                      <LuLoader className="mr-2 h-4 w-4 animate-spin" /> 
                      Processing...
                    </>
                  ) : 'Assign Teacher'}
                </button>
                <button
                  type="button"
                  onClick={closeTeacherModal}
                  className="inline-flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal - Improved UI */}
      {isDeleteModalOpen && selectedSubject && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
            {/* Backdrop with improved light mode appearance */}
            <div 
              className="fixed inset-0 bg-gray-500/75 dark:bg-gray-900/80 backdrop-blur-sm transition-opacity"
              aria-hidden="true"
              onClick={() => setIsDeleteModalOpen(false)}
            ></div>
            
            {/* Modal panel */}
            <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="px-6 py-5">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10 dark:bg-red-900/30">
                    <FiTrash2 className="h-6 w-6 text-red-600 dark:text-red-400" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white/90">
                      Delete Subject
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete <span className="font-medium text-gray-700 dark:text-gray-300">{selectedSubject.name}</span>? This action cannot be undone.
                      </p>
                      {selectedSubject.teacher && (
                        <div className="mt-3 rounded-md bg-yellow-50 dark:bg-yellow-900/20 p-3">
                          <p className="text-sm text-yellow-700 dark:text-yellow-500">
                            Warning: This subject currently has a teacher assigned ({selectedSubject.teacher.name}).
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Footer with actions */}
              <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-4 flex flex-row-reverse gap-2">
                <button
                  type="button"
                  onClick={handleDeleteSubject}
                  disabled={loading}
                  className="inline-flex justify-center rounded-lg border border-transparent bg-red-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-400 dark:bg-red-700 dark:hover:bg-red-800"
                >
                  {loading ? (
                    <>
                      <LuLoader className="mr-2 h-4 w-4 animate-spin" /> 
                      Processing...
                    </>
                  ) : 'Delete Subject'}
                </button>
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="inline-flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
}

export default ManageSpecificClass;
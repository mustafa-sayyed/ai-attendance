import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { FiEdit, FiTrash2, FiX } from "react-icons/fi";
import { LuLoader, LuBookOpen } from "react-icons/lu";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

// Sample data for classes
const sampleClasses = [
  {
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
    status: "active"
  },
  {
    id: 2,
    name: "Computer Science - 2nd Year",
    code: "CS-2",
    semester: "Fall 2023",
    studentsCount: 52,
    subjectsCount: 7,
    coordinator: null,
    createdAt: "2023-07-15",
    status: "active"
  },
  {
    id: 3,
    name: "Computer Science - 1st Year",
    code: "CS-1",
    semester: "Fall 2023",
    studentsCount: 60,
    subjectsCount: 8,
    coordinator: {
      id: 2,
      name: "Prof. Michael Chen",
      email: "michael.chen@example.com",
      photo: "/images/user/avatar-2.png"
    },
    createdAt: "2023-07-15",
    status: "active"
  },
  {
    id: 4,
    name: "Computer Science - 4th Year",
    code: "CS-4",
    semester: "Fall 2023",
    studentsCount: 38,
    subjectsCount: 5,
    coordinator: {
      id: 5,
      name: "Dr. Alisha Patel",
      email: "alisha.patel@example.com",
      photo: "/images/user/avatar-5.png"
    },
    createdAt: "2023-07-15",
    status: "active"
  },
  {
    id: 5,
    name: "Computer Science - Special Topics",
    code: "CS-ST",
    semester: "Fall 2023",
    studentsCount: 25,
    subjectsCount: 3,
    coordinator: null,
    createdAt: "2023-08-10",
    status: "inactive"
  }
];

// Sample data for available teachers (potential coordinators)
const sampleTeachers = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@example.com",
    department: "cse",
    role: "professor",
    photo: "/images/user/avatar-1.png",
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    email: "michael.chen@example.com",
    department: "cse",
    role: "coordinator",
    photo: "/images/user/avatar-2.png",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    department: "cse",
    role: "coordinator",
    photo: "/images/user/avatar-3.png",
  },
  {
    id: 5,
    name: "Dr. Alisha Patel",
    email: "alisha.patel@example.com",
    department: "cse",
    role: "coordinator",
    photo: "/images/user/avatar-5.png",
  },
  {
    id: 6,
    name: "Prof. David Wilson",
    email: "david.wilson@example.com",
    department: "cse",
    role: "professor",
    photo: "/images/user/avatar-6.png",
  }
];

// Available semesters
const semesters = [
  { id: "fall2023", name: "Fall 2023" },
  { id: "spring2024", name: "Spring 2024" },
  { id: "summer2024", name: "Summer 2024" },
  { id: "fall2024", name: "Fall 2024" },
];

// Class form schema
const classSchema = yup.object({
  name: yup.string().required("Class name is required"),
  code: yup.string().required("Class code is required"),
  semester: yup.string().required("Semester is required"),
  coordinatorId: yup.string().nullable(),
  status: yup.string().required("Status is required")
});

function ManageClasses() {
  const [classes, setClasses] = useState([]);
  const [availableTeachers, setAvailableTeachers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedClass, setSelectedClass] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(classSchema),
    defaultValues: {
      status: "active",
    },
  });

  // Load classes and teachers data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setClasses(sampleClasses);
      setAvailableTeachers(sampleTeachers);
      setLoading(false);
    }, 800);
  }, []);

  // Handle form submission for adding/editing class
  const onSubmit = (data) => {
    // Simulate form submission
    setLoading(true);
    setTimeout(() => {
      const coordinatorData = data.coordinatorId 
        ? availableTeachers.find(teacher => teacher.id.toString() === data.coordinatorId) 
        : null;
      
      const formattedData = {
        ...data,
        coordinator: coordinatorData ? {
          id: coordinatorData.id,
          name: coordinatorData.name,
          email: coordinatorData.email,
          photo: coordinatorData.photo
        } : null
      };

      if (selectedClass) {
        // Update existing class
        setClasses(
          classes.map((item) =>
            item.id === selectedClass.id ? 
              { 
                ...item, 
                ...formattedData,
                // Preserve student and subject counts
                studentsCount: item.studentsCount,
                subjectsCount: item.subjectsCount 
              } : item
          )
        );
        toast.success("Class updated successfully");
      } else {
        // Add new class
        const newClass = {
          id: classes.length + 1,
          ...formattedData,
          studentsCount: 0,
          subjectsCount: 0,
          createdAt: new Date().toISOString().split("T")[0]
        };
        setClasses([...classes, newClass]);
        toast.success("Class added successfully");
      }
      closeModal();
      setLoading(false);
    }, 600);
  };

  // Handle delete class
  const handleDeleteClass = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setClasses(classes.filter((item) => item.id !== selectedClass.id));
      toast.success("Class removed successfully");
      setIsDeleteModalOpen(false);
      setSelectedClass(null);
      setLoading(false);
    }, 600);
  };

  // Open modal for adding new class
  const openAddModal = () => {
    setSelectedClass(null);
    reset({
      name: "",
      code: "",
      semester: "",
      coordinatorId: "",
      status: "active",
    });
    setIsModalOpen(true);
  };

  // Open modal for editing class
  const openEditModal = (classItem) => {
    setSelectedClass(classItem);
    setValue("name", classItem.name);
    setValue("code", classItem.code);
    setValue("semester", classItem.semester);
    setValue("coordinatorId", classItem.coordinator ? classItem.coordinator.id.toString() : "");
    setValue("status", classItem.status);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedClass(null);
    reset();
  };

  return (
    <>
      <PageMeta title="Manage Classes" description="AI Attendance System" />
      <PageBreadcrumb pageTitle="Manage Classes" />

      <div className="space-y-6">
        {/* Header section */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.02]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white/90">
              Class Management
            </h2>
            <button
              onClick={openAddModal}
              className="inline-flex items-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 transition-colors"
            >
              <LuBookOpen className="mr-1.5 h-4 w-4" />
              Add Class
            </button>
          </div>
        </div>

        {/* Classes table */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.02] overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
                  <span className="mt-2 text-gray-500 dark:text-gray-400">Loading class data...</span>
                </div>
              </div>
            ) : classes.length === 0 ? (
              <div className="flex items-center justify-center p-8">
                <div className="text-center">
                  <h3 className="mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">No classes found</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Add new classes to get started
                  </p>
                </div>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-900/40">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Class
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Class Coordinator
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
                  {classes.map((classItem) => (
                    <tr 
                      key={classItem.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-900/20 transition-colors"
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-indigo-100 dark:bg-indigo-900/20 rounded-md flex items-center justify-center">
                            <LuBookOpen className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white/90">
                              {classItem.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Code: {classItem.code}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {classItem.coordinator ? (
                          <div className="flex items-center">
                            <div className="h-8 w-8 flex-shrink-0">
                              <img 
                                className="h-8 w-8 rounded-full object-cover" 
                                src={classItem.coordinator.photo} 
                                alt={classItem.coordinator.name} 
                              />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900 dark:text-white/90">
                                {classItem.coordinator.name}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {classItem.coordinator.email}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <span className="text-sm text-amber-600 dark:text-amber-400 flex items-center">
                            <FiX className="mr-1 h-4 w-4" /> Not Assigned
                          </span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white/90">
                          {classItem.semester}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {classItem.studentsCount} Students • {classItem.subjectsCount} Subjects
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => openEditModal(classItem)}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            <FiEdit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </button>
                          <button
                            onClick={() => {
                              setSelectedClass(classItem);
                              setIsDeleteModalOpen(true);
                            }}
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                          >
                            <FiTrash2 className="h-4 w-4" />
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

      {/* Add/Edit Class Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-0 overflow-y-auto bg-gray-500 bg-opacity-75 transition-opacity dark:bg-gray-900 dark:bg-opacity-75">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
              &#8203;
            </span>
            
            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all dark:bg-gray-800 sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-md bg-transparent text-gray-400 hover:text-gray-500 focus:outline-none dark:text-gray-500 dark:hover:text-gray-400"
                >
                  <span className="sr-only">Close</span>
                  <FiX className="h-6 w-6" />
                </button>
              </div>
              
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white/90">
                    {selectedClass ? 'Edit Class' : 'Add New Class'}
                  </h3>
                  
                  <div className="mt-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      {/* Class Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Class Name
                        </label>
                        <input
                          type="text"
                          id="name"
                          {...register("name")}
                          className={`w-full rounded-lg border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white/90 ${
                            errors.name 
                              ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 dark:border-red-600" 
                              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600"
                          }`}
                        />
                        {errors.name && (
                          <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.name.message}</p>
                        )}
                      </div>
                      
                      {/* Class Code */}
                      <div>
                        <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Class Code
                        </label>
                        <input
                          type="text"
                          id="code"
                          {...register("code")}
                          className={`w-full rounded-lg border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white/90 ${
                            errors.code 
                              ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 dark:border-red-600" 
                              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600"
                          }`}
                        />
                        {errors.code && (
                          <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.code.message}</p>
                        )}
                      </div>

                      {/* Semester */}
                      <div>
                        <label htmlFor="semester" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Semester
                        </label>
                        <select
                          id="semester"
                          {...register("semester")}
                          className={`w-full rounded-lg border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white/90 ${
                            errors.semester 
                              ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 dark:border-red-600" 
                              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600"
                          }`}
                        >
                          <option value="">Select Semester</option>
                          {semesters.map((semester) => (
                            <option key={semester.id} value={semester.name}>
                              {semester.name}
                            </option>
                          ))}
                        </select>
                        {errors.semester && (
                          <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.semester.message}</p>
                        )}
                      </div>
                      
                      {/* Class Coordinator */}
                      <div>
                        <label htmlFor="coordinatorId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Class Coordinator
                        </label>
                        <select
                          id="coordinatorId"
                          {...register("coordinatorId")}
                          className="w-full rounded-lg border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white/90 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600"
                        >
                          <option value="">Select Coordinator (Optional)</option>
                          {availableTeachers.map((teacher) => (
                            <option key={teacher.id} value={teacher.id}>
                              {teacher.name} ({teacher.email})
                            </option>
                          ))}
                        </select>
                      </div>
                      
                      {/* Status - Hidden but kept for form validation */}
                      <div className="hidden">
                        <input
                          type="radio"
                          value="active"
                          {...register("status")}
                          defaultChecked
                        />
                      </div>
                      
                      <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full inline-flex justify-center rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 sm:ml-3 sm:w-auto sm:text-sm"
                        >
                          {loading ? (
                            <>
                              <LuLoader className="mr-2 h-4 w-4 animate-spin" /> 
                              Processing...
                            </>
                          ) : selectedClass ? (
                            'Update Class'
                          ) : (
                            'Add Class'
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={closeModal}
                          className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 sm:mt-0 sm:w-auto sm:text-sm"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && selectedClass && (
        <div className="fixed inset-0 z-0 overflow-y-auto bg-gray-500 bg-opacity-75 transition-opacity dark:bg-gray-900 dark:bg-opacity-75">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
              &#8203;
            </span>
            
            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all dark:bg-gray-800 sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div className="sm:flex sm:items-start">
                <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                  <FiTrash2 className="h-6 w-6 text-red-600" />
                </div>
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white/90">
                    Delete Class
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Are you sure you want to delete the {selectedClass.name} class? This action cannot be undone.
                      {selectedClass.studentsCount > 0 ? (
                        <span className="block mt-2 text-red-500 dark:text-red-400 font-medium">
                          Warning: This class has {selectedClass.studentsCount} students enrolled.
                        </span>
                      ) : null}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleDeleteClass}
                  disabled={loading}
                  className="inline-flex w-full justify-center rounded-lg border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-400 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  {loading ? (
                    <>
                      <LuLoader className="mr-2 h-4 w-4 animate-spin" /> 
                      Processing...
                    </>
                  ) : (
                    'Delete'
                  )}
                </button>
                <button
                  type="button"
                  onClick={() => setIsDeleteModalOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700 sm:mt-0 sm:w-auto sm:text-sm"
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
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        className="z-99999"
        theme="colored"
      />
    </>
  );
}

export default ManageClasses;
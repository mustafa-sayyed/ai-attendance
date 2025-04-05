import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { FiEdit, FiTrash2, FiSearch, FiX, FiUserPlus, FiUpload } from "react-icons/fi";
import { LuLoader, LuUser, LuUsers } from "react-icons/lu";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

// Sample data for classes
const classes = [
  { id: "cs-1", name: "Computer Science - 1st Year" },
  { id: "cs-2", name: "Computer Science - 2nd Year" },
  { id: "cs-3", name: "Computer Science - 3rd Year" },
  { id: "ee-1", name: "Electrical Engineering - 1st Year" },
  { id: "ee-2", name: "Electrical Engineering - 2nd Year" }
];

// Sample data for departments
const departments = [
  { id: "cse", name: "Computer Science" },
  { id: "ee", name: "Electrical Engineering" },
  { id: "me", name: "Mechanical Engineering" },
  { id: "civil", name: "Civil Engineering" }
];

// Sample data for students
const sampleStudents = [
  {
    id: 1,
    name: "John Smith",
    email: "john.smith@example.com",
    rollno: "CS2023001",
    department: "cse",
    class: "cs-3",
    status: "active",
    joinDate: "2023-08-15",
    photo: "/images/user/avatar-1.png"
  },
  {
    id: 2,
    name: "Emily Johnson",
    email: "emily.johnson@example.com",
    rollno: "CS2023045",
    department: "cse",
    class: "cs-3",
    status: "active",
    joinDate: "2023-08-15",
    photo: "/images/user/avatar-2.png"
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "michael.chen@example.com",
    rollno: "CS2023022",
    department: "cse",
    class: "cs-2",
    status: "active",
    joinDate: "2023-08-16",
    photo: "/images/user/avatar-3.png"
  },
  {
    id: 4,
    name: "Sarah Williams",
    email: "sarah.williams@example.com",
    rollno: "EE2023015",
    department: "ee",
    class: "ee-2",
    status: "active",
    joinDate: "2023-08-14",
    photo: "/images/user/avatar-4.png"
  },
  {
    id: 5,
    name: "David Rodriguez",
    email: "david.rodriguez@example.com",
    rollno: "CS2023078",
    department: "cse",
    class: "cs-3",
    status: "inactive",
    joinDate: "2023-08-10",
    photo: "/images/user/avatar-5.png"
  }
];

// Form validation schema for student
const studentSchema = yup.object({
  rollno: yup.string().required("Roll number is required"),
  department: yup.string().required("Department is required"),
  class: yup.string().required("Class is required")
});

function ManageStudents() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    resolver: yupResolver(studentSchema)
  });

  // Load students data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStudents(sampleStudents);
      setLoading(false);
    }, 800);
  }, []);

  // Handle form submission for updating student
  const onSubmit = (data) => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      if (selectedStudent) {
        // Update existing student
        setStudents(
          students.map((item) =>
            item.id === selectedStudent.id ? { 
              ...item, 
              rollno: data.rollno,
              department: data.department,
              class: data.class
            } : item
          )
        );
        toast.success("Student updated successfully");
      }
      closeModal();
      setLoading(false);
    }, 600);
  };

  // Handle delete student
  const handleDeleteStudent = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setStudents(students.filter((item) => item.id !== selectedStudent.id));
      toast.success("Student removed successfully");
      setIsDeleteModalOpen(false);
      setSelectedStudent(null);
      setLoading(false);
    }, 600);
  };

  // Open modal for editing student
  const openEditModal = (student) => {
    setSelectedStudent(student);
    setValue("rollno", student.rollno);
    setValue("department", student.department);
    setValue("class", student.class);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStudent(null);
    reset();
  };

  // Get class or department name by ID
  const getClassName = (classId) => classes.find((cls) => cls.id === classId)?.name || classId;
  const getDepartmentName = (deptId) => departments.find((dept) => dept.id === deptId)?.name || deptId;

  return (
    <>
      <PageMeta title="Manage Students" description="AI Attendance System" />
      <PageBreadcrumb pageTitle="Manage Students" />

      <div className="space-y-6">
        {/* Header section */}
        {/* <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white/90">
              Student Management
            </h2>
          </div>
        </div> */}

        {/* Students table */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.02] overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500 dark:border-blue-400"></div>
                  <span className="mt-2 text-gray-500 dark:text-gray-400">Loading students data...</span>
                </div>
              </div>
            ) : students.length === 0 ? (
              <div className="flex items-center justify-center p-8">
                <div className="text-center">
                  <h3 className="mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">No students found</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    There are no students in the system yet.
                  </p>
                </div>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Student
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Roll Number
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Class & Department
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Joined
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-transparent">
                  {students.map((student) => (
                    <tr 
                      key={student.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img 
                              className="h-10 w-10 rounded-full object-cover" 
                              src={student.photo} 
                              alt={student.name} 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white/90">
                              {student.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              {student.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-900 dark:text-white/90">
                        {student.rollno}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white/90">
                          {getClassName(student.class)}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {getDepartmentName(student.department)}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {new Date(student.joinDate).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => openEditModal(student)}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                            title="Edit Student"
                          >
                            <FiEdit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </button>
                          <button
                            onClick={() => {
                              setSelectedStudent(student);
                              setIsDeleteModalOpen(true);
                            }}
                            className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                            title="Delete Student"
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

      {/* Edit Student Modal */}
      {isModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 bg-gray-500/75 dark:bg-gray-900/80 backdrop-blur-sm transition-opacity" 
              onClick={closeModal}
              aria-hidden="true"
            ></div>
            
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
              &#8203;
            </span>
            
            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left shadow-xl transition-all dark:bg-gray-800 sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
              <div className="absolute top-0 right-0 pt-4 pr-4">
                <button
                  type="button"
                  onClick={closeModal}
                  className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none dark:bg-gray-800 dark:text-gray-500 dark:hover:text-gray-400"
                >
                  <span className="sr-only">Close</span>
                  <FiX className="h-6 w-6" />
                </button>
              </div>
              
              <div className="sm:flex sm:items-start">
                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                  <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white/90">
                    Edit Student
                  </h3>
                  
                  <div className="mt-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      {/* Student Information Preview (Read-only) */}
                      <div className="mb-6 flex items-center space-x-4">
                        <div className="h-16 w-16">
                          <img 
                            src={selectedStudent.photo} 
                            alt={selectedStudent.name} 
                            className="h-full w-full rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <h4 className="text-md font-medium text-gray-900 dark:text-white/90">
                            {selectedStudent.name}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {selectedStudent.email}
                          </p>
                        </div>
                      </div>
                      
                      {/* Roll Number - Editable */}
                      <div>
                        <label htmlFor="rollno" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Roll Number
                        </label>
                        <input
                          type="text"
                          id="rollno"
                          {...register("rollno")}
                          className={`w-full rounded-lg border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white/90 ${
                            errors.rollno 
                              ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 dark:border-red-600" 
                              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600"
                          }`}
                        />
                        {errors.rollno && (
                          <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.rollno.message}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* Class - Editable */}
                        <div>
                          <label htmlFor="class" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Class
                          </label>
                          <select
                            id="class"
                            {...register("class")}
                            className={`w-full rounded-lg border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white/90 ${
                              errors.class 
                                ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 dark:border-red-600" 
                                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600"
                            }`}
                          >
                            <option value="">Select Class</option>
                            {classes.map((cls) => (
                              <option key={cls.id} value={cls.id}>
                                {cls.name}
                              </option>
                            ))}
                          </select>
                          {errors.class && (
                            <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.class.message}</p>
                          )}
                        </div>
                        
                        {/* Department - Editable */}
                        <div>
                          <label htmlFor="department" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Department
                          </label>
                          <select
                            id="department"
                            {...register("department")}
                            className={`w-full rounded-lg border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white/90 ${
                              errors.department 
                                ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 dark:border-red-600" 
                                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600"
                            }`}
                          >
                            <option value="">Select Department</option>
                            {departments.map((dept) => (
                              <option key={dept.id} value={dept.id}>
                                {dept.name}
                              </option>
                            ))}
                          </select>
                          {errors.department && (
                            <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.department.message}</p>
                          )}
                        </div>
                      </div>
                      
                      <div className="mt-5 sm:mt-6 sm:flex sm:flex-row-reverse">
                        <button
                          type="submit"
                          disabled={loading}
                          className="w-full inline-flex justify-center rounded-lg border border-transparent bg-blue-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-blue-400 sm:ml-3 sm:w-auto sm:text-sm dark:bg-blue-700 dark:hover:bg-blue-800"
                        >
                          {loading ? (
                            <>
                              <LuLoader className="mr-2 h-4 w-4 animate-spin" /> 
                              Processing...
                            </>
                          ) : (
                            'Update Student'
                          )}
                        </button>
                        <button
                          type="button"
                          onClick={closeModal}
                          className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 sm:mt-0 sm:w-auto sm:text-sm"
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
      {isDeleteModalOpen && selectedStudent && (
        <div className="fixed inset-0 z-50 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
          <div className="flex min-h-screen items-center justify-center p-4 text-center sm:p-0">
            <div 
              className="fixed inset-0 bg-gray-500/75 dark:bg-gray-900/80 backdrop-blur-sm transition-opacity" 
              aria-hidden="true"
              onClick={() => setIsDeleteModalOpen(false)}
            ></div>
            
            <div className="relative transform overflow-hidden rounded-lg bg-white dark:bg-gray-800 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FiTrash2 className="h-6 w-6 text-red-600" />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg font-medium leading-6 text-gray-900 dark:text-white/90" id="modal-title">
                      Delete Student
                    </h3>
                    <div className="mt-2">
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Are you sure you want to delete {selectedStudent.name}? This action cannot be undone.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 dark:bg-gray-800 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  onClick={handleDeleteStudent}
                  disabled={loading}
                  className="inline-flex w-full justify-center rounded-lg border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 disabled:bg-red-400 sm:ml-3 sm:w-auto sm:text-sm dark:bg-red-700 dark:hover:bg-red-800"
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
                  className="mt-3 inline-flex w-full justify-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600 sm:mt-0 sm:w-auto sm:text-sm"
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
        theme="colored"
      />
    </>
  );
}

export default ManageStudents;
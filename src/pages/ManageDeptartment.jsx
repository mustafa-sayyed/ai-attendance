import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { FiEdit, FiTrash2, FiX } from "react-icons/fi";
import { LuLoader, LuBuilding } from "react-icons/lu";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

// Sample data for departments
const sampleDepartments = [
  {
    id: 1,
    name: "Computer Science",
    code: "CSE",
    hod: {
      id: 1,
      name: "Dr. Sarah Johnson",
      email: "sarah.johnson@example.com",
      photo: "/images/user/avatar-1.png"
    },
    studentsCount: 120,
    staffCount: 15,
    createdAt: "2020-06-15",
    status: "active"
  },
  {
    id: 2,
    name: "Electrical Engineering",
    code: "EEE",
    hod: {
      id: 4,
      name: "Prof. Robert Maxwell",
      email: "robert.maxwell@example.com",
      photo: "/images/user/avatar-4.png"
    },
    studentsCount: 95,
    staffCount: 12,
    createdAt: "2020-07-22",
    status: "active"
  },
  {
    id: 3,
    name: "Mechanical Engineering",
    code: "ME",
    hod: null,
    studentsCount: 105,
    staffCount: 10,
    createdAt: "2020-08-10",
    status: "active"
  },
  {
    id: 4,
    name: "Civil Engineering",
    code: "CE",
    hod: {
      id: 7,
      name: "Dr. Rajesh Kumar",
      email: "rajesh.kumar@example.com",
      photo: "/images/user/avatar-7.png"
    },
    studentsCount: 80,
    staffCount: 8,
    createdAt: "2020-09-05",
    status: "active"
  },
  {
    id: 5,
    name: "Information Technology",
    code: "IT",
    hod: null,
    studentsCount: 110,
    staffCount: 13,
    createdAt: "2021-01-15",
    status: "inactive"
  }
];

// Sample data for available staff (potential HODs)
const sampleStaff = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "123-456-7890",
    department: "cse",
    role: "hod",
    photo: "/images/user/avatar-1.png",
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    email: "michael.chen@example.com",
    phone: "234-567-8901",
    department: "eee",
    role: "teacher",
    photo: "/images/user/avatar-2.png",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    phone: "345-678-9012",
    department: "cse",
    role: "teacher",
    photo: "/images/user/avatar-3.png",
  },
  {
    id: 4,
    name: "Prof. Robert Maxwell",
    email: "robert.maxwell@example.com",
    phone: "456-789-0123",
    department: "eee",
    role: "hod",
    photo: "/images/user/avatar-4.png",
  },
  {
    id: 5,
    name: "Dr. Alisha Patel",
    email: "alisha.patel@example.com",
    phone: "567-890-1234",
    department: "me",
    role: "teacher",
    photo: "/images/user/avatar-5.png",
  },
  {
    id: 6,
    name: "Prof. David Wilson",
    email: "david.wilson@example.com",
    phone: "678-901-2345",
    department: "ce",
    role: "teacher",
    photo: "/images/user/avatar-6.png",
  },
  {
    id: 7,
    name: "Dr. Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "789-012-3456",
    department: "ce",
    role: "hod",
    photo: "/images/user/avatar-7.png",
  }
];

// Department form schema
const departmentSchema = yup.object({
  name: yup.string().required("Department name is required"),
  code: yup.string().required("Department code is required"),
  hodId: yup.string().nullable(),
  status: yup.string().required("Status is required")
});

function ManageDepartment() {
  const [departments, setDepartments] = useState([]);
  const [availableStaff, setAvailableStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(departmentSchema),
    defaultValues: {
      status: "active",
    },
  });

  // Load departments and staff data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setDepartments(sampleDepartments);
      setAvailableStaff(sampleStaff);
      setLoading(false);
    }, 800);
  }, []);

  // Handle form submission for adding/editing department
  const onSubmit = (data) => {
    // Simulate form submission
    setLoading(true);
    setTimeout(() => {
      const hodData = data.hodId ? availableStaff.find(staff => staff.id.toString() === data.hodId) : null;
      
      const formattedData = {
        ...data,
        hod: hodData ? {
          id: hodData.id,
          name: hodData.name,
          email: hodData.email,
          photo: hodData.photo
        } : null
      };

      if (selectedDepartment) {
        // Update existing department
        setDepartments(
          departments.map((item) =>
            item.id === selectedDepartment.id ? { ...item, ...formattedData } : item
          )
        );
        toast.success("Department updated successfully");
      } else {
        // Add new department
        const newDepartment = {
          id: departments.length + 1,
          ...formattedData,
          studentsCount: 0,
          staffCount: 0,
          createdAt: new Date().toISOString().split("T")[0]
        };
        setDepartments([...departments, newDepartment]);
        toast.success("Department added successfully");
      }
      closeModal();
      setLoading(false);
    }, 600);
  };

  // Handle delete department
  const handleDeleteDepartment = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setDepartments(departments.filter((item) => item.id !== selectedDepartment.id));
      toast.success("Department removed successfully");
      setIsDeleteModalOpen(false);
      setSelectedDepartment(null);
      setLoading(false);
    }, 600);
  };

  // Open modal for adding new department
  const openAddModal = () => {
    setSelectedDepartment(null);
    reset({
      name: "",
      code: "",
      hodId: "",
      status: "active",
    });
    setIsModalOpen(true);
  };

  // Open modal for editing department
  const openEditModal = (department) => {
    setSelectedDepartment(department);
    setValue("name", department.name);
    setValue("code", department.code);
    setValue("hodId", department.hod ? department.hod.id.toString() : "");
    setValue("status", department.status);
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDepartment(null);
    reset();
  };

  return (
    <>
      <PageMeta title="Manage Departments" description="AI Attendance System" />
      <PageBreadcrumb pageTitle="Manage Departments" />

      <div className="space-y-6">
        {/* Header section */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.02]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white/90">
              Department Management
            </h2>
            <button
              onClick={openAddModal}
              className="inline-flex items-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 transition-colors"
            >
              <LuBuilding className="mr-1.5 h-4 w-4" />
              Add Department
            </button>
          </div>
        </div>

        {/* Department table */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.02] overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
                  <span className="mt-2 text-gray-500 dark:text-gray-400">Loading department data...</span>
                </div>
              </div>
            ) : departments.length === 0 ? (
              <div className="flex items-center justify-center p-8">
                <div className="text-center">
                  <h3 className="mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">No departments found</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    Add new departments to get started
                  </p>
                </div>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-900/40">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Department
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Head of Department
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Statistics
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 bg-white dark:divide-gray-800 dark:bg-transparent">
                  {departments.map((department) => (
                    <tr 
                      key={department.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-900/20 transition-colors"
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-blue-100 dark:bg-blue-900/20 rounded-md flex items-center justify-center">
                            <LuBuilding className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white/90">
                              {department.name}
                            </div>
                            <div className="text-sm text-gray-500 dark:text-gray-400">
                              Code: {department.code}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        {department.hod ? (
                          <div className="flex items-center">
                            <div className="h-8 w-8 flex-shrink-0">
                              <img 
                                className="h-8 w-8 rounded-full object-cover" 
                                src={department.hod.photo} 
                                alt={department.hod.name} 
                              />
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900 dark:text-white/90">
                                {department.hod.name}
                              </div>
                              <div className="text-xs text-gray-500 dark:text-gray-400">
                                {department.hod.email}
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
                          {department.studentsCount} Students
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {department.staffCount} Staff Members
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => openEditModal(department)}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            <FiEdit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </button>
                          <button
                            onClick={() => {
                              setSelectedDepartment(department);
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

      {/* Add/Edit Department Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-0 overflow-y-auto bg-gray-500 bg-opacity-75 transition-opacity dark:bg-gray-900 dark:bg-opacity-75">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
              &#8203;
            </div>
            
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
                    {selectedDepartment ? 'Edit Department' : 'Add New Department'}
                  </h3>
                  
                  <div className="mt-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      {/* Department Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Department Name
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
                      
                      {/* Department Code */}
                      <div>
                        <label htmlFor="code" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Department Code
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
                      
                      {/* Head of Department */}
                      <div>
                        <label htmlFor="hodId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Head of Department
                        </label>
                        <select
                          id="hodId"
                          {...register("hodId")}
                          className={`w-full rounded-lg border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white/90 border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600`}
                        >
                          <option value="">Select HOD (Optional)</option>
                          {availableStaff.map((staff) => (
                            <option key={staff.id} value={staff.id}>
                              {staff.name} ({staff.email})
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
                          ) : selectedDepartment ? (
                            'Update Department'
                          ) : (
                            'Add Department'
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
      {isDeleteModalOpen && selectedDepartment && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-gray-500 bg-opacity-75 transition-opacity dark:bg-gray-900 dark:bg-opacity-75">
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
                    Delete Department
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Are you sure you want to delete the {selectedDepartment.name} department? This action cannot be undone.
                      {selectedDepartment.studentsCount > 0 || selectedDepartment.staffCount > 0 ? (
                        <span className="block mt-2 text-red-500 dark:text-red-400 font-medium">
                          Warning: This department has {selectedDepartment.studentsCount} students and {selectedDepartment.staffCount} staff members associated with it.
                        </span>
                      ) : null}
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleDeleteDepartment}
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
        className="z-999999"
        theme="colored"
      />
    </>
  );
}

export default ManageDepartment;
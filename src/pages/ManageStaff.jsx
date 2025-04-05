import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { FiEdit, FiTrash2, FiPlus, FiSearch, FiFilter, FiX } from "react-icons/fi";
import { LuLoader, LuCheck, LuUserPlus } from "react-icons/lu";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";

const staffRoles = [
  { id: "teacher", name: "Teacher" },
  { id: "hod", name: "Head of Department" },
  { id: "coordinator", name: "Class Coordinator" },
  { id: "admin", name: "Administrator" },
  { id: "staff", name: "Non-teaching Staff" },
];

const departments = [
  { id: "cse", name: "Computer Science" },
  { id: "ee", name: "Electrical Engineering" },
  { id: "me", name: "Mechanical Engineering" },
  { id: "civil", name: "Civil Engineering" },
  { id: "admin", name: "Administration" },
];

// Sample data for demonstration
const sampleStaff = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    email: "sarah.johnson@example.com",
    phone: "123-456-7890",
    role: "hod",
    department: "cse",
    status: "active",
    joinDate: "2021-08-15",
    photo: "/images/user/avatar-1.png",
  },
  {
    id: 2,
    name: "Prof. Michael Chen",
    email: "michael.chen@example.com",
    phone: "234-567-8901",
    role: "teacher",
    department: "ee",
    status: "active",
    joinDate: "2022-01-10",
    photo: "/images/user/avatar-2.png",
  },
  {
    id: 3,
    name: "Dr. Emily Rodriguez",
    email: "emily.rodriguez@example.com",
    phone: "345-678-9012",
    role: "coordinator",
    department: "cse",
    status: "active",
    joinDate: "2021-09-05",
    photo: "/images/user/avatar-3.png",
  },
  {
    id: 4,
    name: "Prof. James Wilson",
    email: "james.wilson@example.com",
    phone: "456-789-0123",
    role: "teacher",
    department: "me",
    status: "inactive",
    joinDate: "2020-11-20",
    photo: "/images/user/avatar-4.png",
  },
  {
    id: 5,
    name: "Mrs. Aisha Patel",
    email: "aisha.patel@example.com",
    phone: "567-890-1234",
    role: "admin",
    department: "admin",
    status: "active",
    joinDate: "2021-03-15",
    photo: "/images/user/avatar-5.png",
  },
];

// Form schema for staff
const staffSchema = yup.object({
  name: yup.string().required("Full name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  phone: yup.string().required("Phone number is required"),
  role: yup.string().required("Role is required"),
  department: yup.string().required("Department is required"),
  status: yup.string().required("Status is required"),
});

function ManageStaff() {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [filterDept, setFilterDept] = useState("");
  const [filterStatus, setFilterStatus] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(staffSchema),
    defaultValues: {
      status: "active",
    },
  });

  // Load staff data
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setStaff(sampleStaff);
      setLoading(false);
    }, 800);
  }, []);

  // Handle form submission for adding/editing staff
  const onSubmit = (data) => {
    // Simulate form submission
    setLoading(true);
    setTimeout(() => {
      if (selectedStaff) {
        // Update existing staff
        setStaff(
          staff.map((item) =>
            item.id === selectedStaff.id ? { ...item, ...data } : item
          )
        );
        toast.success("Staff updated successfully");
      } else {
        // Add new staff
        const newStaff = {
          id: staff.length + 1,
          ...data,
          joinDate: new Date().toISOString().split("T")[0],
          photo: "/images/user/avatar-1.png", // Default avatar
        };
        setStaff([...staff, newStaff]);
        toast.success("Staff added successfully");
      }
      closeModal();
      setLoading(false);
    }, 600);
  };

  // Handle delete staff
  const handleDeleteStaff = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setStaff(staff.filter((item) => item.id !== selectedStaff.id));
      toast.success("Staff removed successfully");
      setIsDeleteModalOpen(false);
      setSelectedStaff(null);
      setLoading(false);
    }, 600);
  };

  // Open modal for adding new staff
  const openAddModal = () => {
    setSelectedStaff(null);
    reset({
      name: "",
      email: "",
      phone: "",
      role: "",
      department: "",
      status: "active",
    });
    setIsModalOpen(true);
  };

  // Open modal for editing staff
  const openEditModal = (staffMember) => {
    setSelectedStaff(staffMember);
    Object.keys(staffMember).forEach((key) => {
      if (key !== "id" && key !== "joinDate" && key !== "photo") {
        setValue(key, staffMember[key]);
      }
    });
    setIsModalOpen(true);
  };

  // Close modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedStaff(null);
    reset();
  };

  // Filter staff based on search and filters
  const filteredStaff = staff.filter((staffMember) => {
    const matchesSearch =
      searchTerm === "" ||
      staffMember.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      staffMember.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = filterRole === "" || staffMember.role === filterRole;
    const matchesDept = filterDept === "" || staffMember.department === filterDept;
    const matchesStatus = filterStatus === "" || staffMember.status === filterStatus;

    return matchesSearch && matchesRole && matchesDept && matchesStatus;
  });

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setFilterRole("");
    setFilterDept("");
    setFilterStatus("");
  };

  // Get role or department name by ID
  const getRoleName = (roleId) => staffRoles.find((role) => role.id === roleId)?.name || roleId;
  const getDepartmentName = (deptId) => departments.find((dept) => dept.id === deptId)?.name || deptId;

  return (
    <>
      <PageMeta title="Manage Staff" description="AI Attendance System" />
      <PageBreadcrumb pageTitle="Manage Staff" />

      <div className="space-y-6">
        {/* Header section with search and filters */}
        <div className="rounded-2xl border border-gray-200 bg-white p-6 dark:border-gray-800 dark:bg-white/[0.03]">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white/90">
              Staff Management
            </h2>
            <button
              onClick={openAddModal}
              className="inline-flex items-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600 transition-colors"
            >
              <LuUserPlus className="mr-1.5 h-4 w-4" />
              Add New Staff
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {/* Search input */}
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search staff..."
                className="w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 pl-10 text-sm text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90"
              />
              <FiSearch className="absolute left-3 top-3 h-4 w-4 text-gray-500 dark:text-gray-400" />
            </div>

            {/* Role filter */}
            <div>
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2.5 text-sm text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90"
              >
                <option value="">Filter by Role</option>
                {staffRoles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Department filter */}
            <div>
              <select
                value={filterDept}
                onChange={(e) => setFilterDept(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2.5 text-sm text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90"
              >
                <option value="">Filter by Department</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>

            {/* Status filter */}
            <div className="flex gap-2">
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="w-full rounded-lg border border-gray-300 bg-transparent px-3 py-2.5 text-sm text-gray-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:text-white/90"
              >
                <option value="">Filter by Status</option>
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
              </select>

              {(searchTerm || filterRole || filterDept || filterStatus) && (
                <button
                  onClick={clearFilters}
                  className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                >
                  <FiX className="h-4 w-4" />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Staff table */}
        <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
          <div className="overflow-x-auto">
            {loading ? (
              <div className="flex items-center justify-center p-8">
                <div className="flex flex-col items-center">
                  <div className="h-12 w-12 animate-spin rounded-full border-b-2 border-blue-500"></div>
                  <span className="mt-2 text-gray-500 dark:text-gray-400">Loading staff data...</span>
                </div>
              </div>
            ) : filteredStaff.length === 0 ? (
              <div className="flex items-center justify-center p-8">
                <div className="text-center">
                  <h3 className="mb-2 text-lg font-medium text-gray-700 dark:text-gray-300">No staff found</h3>
                  <p className="text-gray-500 dark:text-gray-400">
                    {searchTerm || filterRole || filterDept || filterStatus
                      ? "Try changing your search or filters"
                      : "Add new staff to get started"}
                  </p>
                </div>
              </div>
            ) : (
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                <thead className="bg-gray-50 dark:bg-gray-800/50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Staff
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Role & Department
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Contact
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500 dark:text-gray-400">
                      Status
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
                  {filteredStaff.map((staffMember) => (
                    <tr 
                      key={staffMember.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors"
                    >
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img 
                              className="h-10 w-10 rounded-full object-cover" 
                              src={staffMember.photo} 
                              alt={staffMember.name} 
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white/90">
                              {staffMember.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white/90">
                          {getRoleName(staffMember.role)}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {getDepartmentName(staffMember.department)}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white/90">
                          {staffMember.email}
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          {staffMember.phone}
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4">
                        <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          staffMember.status === 'active' 
                            ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300' 
                            : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300'
                        }`}>
                          {staffMember.status === 'active' ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                        {new Date(staffMember.joinDate).toLocaleDateString()}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => openEditModal(staffMember)}
                            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                          >
                            <FiEdit className="h-4 w-4" />
                            <span className="sr-only">Edit</span>
                          </button>
                          <button
                            onClick={() => {
                              setSelectedStaff(staffMember);
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

      {/* Add/Edit Staff Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity dark:bg-gray-900 dark:bg-opacity-75" onClick={closeModal}></div>
            
            <span className="hidden sm:inline-block sm:h-screen sm:align-middle" aria-hidden="true">
              &#8203;
            </span>
            
            <div className="inline-block transform overflow-hidden rounded-lg bg-white px-4 pt-5 pb-4 text-left align-bottom shadow-xl transition-all dark:bg-gray-800 sm:my-8 sm:w-full sm:max-w-lg sm:p-6 sm:align-middle">
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
                    {selectedStaff ? 'Edit Staff Member' : 'Add New Staff Member'}
                  </h3>
                  
                  <div className="mt-4">
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      {/* Name */}
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Full Name
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
                      
                      {/* Email */}
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Email
                        </label>
                        <input
                          type="email"
                          id="email"
                          {...register("email")}
                          className={`w-full rounded-lg border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white/90 ${
                            errors.email 
                              ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 dark:border-red-600" 
                              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600"
                          }`}
                        />
                        {errors.email && (
                          <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.email.message}</p>
                        )}
                      </div>
                      
                      {/* Phone */}
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Phone Number
                        </label>
                        <input
                          type="text"
                          id="phone"
                          {...register("phone")}
                          className={`w-full rounded-lg border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white/90 ${
                            errors.phone 
                              ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 dark:border-red-600" 
                              : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600"
                          }`}
                        />
                        {errors.phone && (
                          <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.phone.message}</p>
                        )}
                      </div>
                      
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        {/* Role */}
                        <div>
                          <label htmlFor="role" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Role
                          </label>
                          <select
                            id="role"
                            {...register("role")}
                            className={`w-full rounded-lg border px-3 py-2 text-gray-800 focus:outline-none focus:ring-2 dark:bg-gray-700 dark:text-white/90 ${
                              errors.role 
                                ? "border-red-300 focus:border-red-500 focus:ring-red-500/20 dark:border-red-600" 
                                : "border-gray-300 focus:border-blue-500 focus:ring-blue-500/20 dark:border-gray-600"
                            }`}
                          >
                            <option value="">Select Role</option>
                            {staffRoles.map((role) => (
                              <option key={role.id} value={role.id}>
                                {role.name}
                              </option>
                            ))}
                          </select>
                          {errors.role && (
                            <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.role.message}</p>
                          )}
                        </div>
                        
                        {/* Department */}
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
                      
                      {/* Status */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Status
                        </label>
                        <div className="mt-1 flex items-center space-x-4">
                          <div className="flex items-center">
                            <input
                              id="active"
                              type="radio"
                              value="active"
                              {...register("status")}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                            />
                            <label htmlFor="active" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                              Active
                            </label>
                          </div>
                          <div className="flex items-center">
                            <input
                              id="inactive"
                              type="radio"
                              value="inactive"
                              {...register("status")}
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 dark:border-gray-600"
                            />
                            <label htmlFor="inactive" className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                              Inactive
                            </label>
                          </div>
                        </div>
                        {errors.status && (
                          <p className="mt-1 text-xs text-red-500 dark:text-red-400">{errors.status.message}</p>
                        )}
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
                          ) : selectedStaff ? (
                            'Update Staff'
                          ) : (
                            'Add Staff'
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
      {isDeleteModalOpen && selectedStaff && (
        <div className="fixed inset-0 z-50 overflow-y-auto">
          <div className="flex min-h-screen items-end justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
            <div 
              className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity dark:bg-gray-900 dark:bg-opacity-75"
              onClick={() => setIsDeleteModalOpen(false)}
            ></div>
            
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
                    Delete Staff Member
                  </h3>
                  <div className="mt-2">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Are you sure you want to delete {selectedStaff.name}? This action cannot be undone.
                    </p>
                  </div>
                </div>
              </div>
              <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleDeleteStaff}
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
        className={`z-999999`}
        theme="colored"
      />
    </>
  );
}

export default ManageStaff;
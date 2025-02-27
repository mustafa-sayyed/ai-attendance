import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  FiUser,
  FiMail,
  FiLock,
  FiUpload,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

const departments = ["Computer Science", "Mathematics", "Physics", "Chemistry"];
const classes = ["Class A", "Class B", "Class C"];

function RegistrationForm() {
  const [currentStep, setCurrentStep] = useState(1);
  const [photoPreview, setPhotoPreview] = useState(null);

  const schema = yup.object({
    collegeName: yup.string().required("College Name is required"),
    registrationToken: yup.string().required("Registration Token is required"),
    department: yup.string().required("Department is required"),
    class: yup.string().required("Class is required"),
    rollNumber: yup.string().required("Roll Number is required"),
    fullName: yup.string().required("Full Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    photo: yup.mixed().required("Photo is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({ resolver: yupResolver(schema) });

  const handleNext = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const onSubmit = (data) => {
    console.log("Form Data Submitted:", data);
    alert("Registration Successful!");
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setValue("photo", file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex h-screen w-full justify-center items-center overflow-hidden px-2 bg-[#030712]">
      <form
        className="relative flex w-[400px] flex-col space-y-5 rounded-lg border border-gray-700 bg-[#111827] px-6 py-10 shadow-xl sm:mx-auto"
        onSubmit={handleSubmit(onSubmit)}>
        {/* Header */}
        <div className="mx-auto mb-4 space-y-3 text-center">
          <h1 className="text-3xl font-bold text-gray-200">Register</h1>
          <p className="text-gray-400">Complete your registration in 3 steps</p>
          <div className="flex justify-between items-center text-gray-400">
            <span>Step {currentStep} of 3</span>
            <div className="flex gap-2">
              <div
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  currentStep >= 1 ? "bg-[#155dfc]" : "bg-gray-700"
                }`}></div>
              <div
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  currentStep >= 2 ? "bg-[#155dfc]" : "bg-gray-700"
                }`}></div>
              <div
                className={`h-2 w-2 rounded-full transition-all duration-300 ${
                  currentStep === 3 ? "bg-[#155dfc]" : "bg-gray-700"
                }`}></div>
            </div>
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 1 && (
          <div className="space-y-5">
            <div>
              <div className="relative">
                <input
                  type="text"
                  id="collegeName"
                  {...register("collegeName")}
                  className={`peer block w-full appearance-none rounded-lg border border-gray-600 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-200 focus:border-[#155dfc] focus:outline-none focus:ring-0 ${
                    errors.collegeName ? "border-red-400 focus:border-red-400" : ""
                  }`}
                  placeholder=" "
                />
                <label
                  htmlFor="collegeName"
                  className={`absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-[#111827] px-2 text-sm text-gray-400 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#155dfc] ${
                    errors.collegeName ? "text-red-400 peer-focus:text-red-400" : ""
                  }`}>
                  College Name
                </label>
              </div>
              {errors.collegeName && (
                <p className="text-xs ml-1 mt-1 text-red-400">
                  {errors.collegeName.message}
                </p>
              )}
            </div>
            <div>
              <div className="relative">
                <input
                  type="text"
                  id="registrationToken"
                  {...register("registrationToken")}
                  className={`peer block w-full appearance-none rounded-lg border border-gray-600 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-200 focus:border-[#155dfc] focus:outline-none focus:ring-0 ${
                    errors.registrationToken ? "border-red-400 focus:border-red-400" : ""
                  }`}
                  placeholder=" "
                />
                <label
                  htmlFor="registrationToken"
                  className={`absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-[#111827] px-2 text-sm text-gray-400 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#155dfc] ${
                    errors.registrationToken ? "text-red-400 peer-focus:text-red-400" : ""
                  }`}>
                  Registration Token
                </label>
              </div>
              {errors.registrationToken && (
                <p className="text-xs ml-1 mt-1 text-red-400">
                  {errors.registrationToken.message}
                </p>
              )}
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div className="space-y-5">
            <div>
              <div className="relative">
                <select
                  id="department"
                  {...register("department")}
                  className={`peer block w-full appearance-none rounded-lg border border-gray-600 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-200 focus:border-[#155dfc] focus:outline-none focus:ring-0 ${
                    errors.department ? "border-red-400 focus:border-red-400" : ""
                  }`}>
                  <option value="">Select Department</option>
                  {departments.map((dept, index) => (
                    <option key={index} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="department"
                  className={`absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-[#111827] px-2 text-sm text-gray-400 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#155dfc] ${
                    errors.department ? "text-red-400 peer-focus:text-red-400" : ""
                  }`}>
                  Department
                </label>
              </div>
              {errors.department && (
                <p className="text-xs ml-1 mt-1 text-red-400">
                  {errors.department.message}
                </p>
              )}
            </div>
            <div>
              <div className="relative">
                <select
                  id="class"
                  {...register("class")}
                  className={`peer block w-full appearance-none rounded-lg border border-gray-600 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-200 focus:border-[#155dfc] focus:outline-none focus:ring-0 ${
                    errors.class ? "border-red-400 focus:border-red-400" : ""
                  }`}>
                  <option value="">Select Class</option>
                  {classes.map((cls, index) => (
                    <option key={index} value={cls}>
                      {cls}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="class"
                  className={`absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-[#111827] px-2 text-sm text-gray-400 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#155dfc] ${
                    errors.class ? "text-red-400 peer-focus:text-red-400" : ""
                  }`}>
                  Class
                </label>
              </div>
                {errors.class && (
                  <p className="text-xs ml-1 mt-1 text-red-400">{errors.class.message}</p>
                )}
            </div>
            <div>
              <div className="relative">
                <input
                  type="text"
                  id="rollNumber"
                  {...register("rollNumber")}
                  className={`peer block w-full appearance-none rounded-lg border border-gray-600 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-200 focus:border-[#155dfc] focus:outline-none focus:ring-0 ${
                    errors.rollNumber ? "border-red-400 focus:border-red-400" : ""
                  }`}
                  placeholder=" "
                />
                <label
                  htmlFor="rollNumber"
                  className={`absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-[#111827] px-2 text-sm text-gray-400 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#155dfc] ${
                    errors.rollNumber ? "text-red-400 peer-focus:text-red-400" : ""
                  }`}>
                  Roll Number
                </label>
              </div>
                {errors.rollNumber && (
                  <p className="text-xs ml-1 mt-1 text-red-400">
                    {errors.rollNumber.message}
                  </p>
                )}
            </div>
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-5">
            <div>
              <div className="relative">
                <input
                  type="text"
                  id="fullName"
                  {...register("fullName")}
                  className={`peer block w-full appearance-none rounded-lg border border-gray-600 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-200 focus:border-[#155dfc] focus:outline-none focus:ring-0 ${
                    errors.fullName ? "border-red-400 focus:border-red-400" : ""
                  }`}
                  placeholder=" "
                />
                <label
                  htmlFor="fullName"
                  className={`absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-[#111827] px-2 text-sm text-gray-400 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#155dfc] ${
                    errors.fullName ? "text-red-400 peer-focus:text-red-400" : ""
                  }`}>
                  Full Name
                </label>
              </div>
                {errors.fullName && (
                  <p className="text-xs ml-1 mt-1 text-red-400">
                    {errors.fullName.message}
                  </p>
                )}
            </div>
            <div>
              <div className="relative">
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className={`peer block w-full appearance-none rounded-lg border border-gray-600 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-200 focus:border-[#155dfc] focus:outline-none focus:ring-0 ${
                    errors.email ? "border-red-400 focus:border-red-400" : ""
                  }`}
                  placeholder=" "
                />
                <label
                  htmlFor="email"
                  className={`absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-[#111827] px-2 text-sm text-gray-400 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#155dfc] ${
                    errors.email ? "text-red-400 peer-focus:text-red-400" : ""
                  }`}>
                  Email
                </label>
              </div>
                {errors.email && (
                  <p className="text-xs ml-1 mt-1 text-red-400">{errors.email.message}</p>
                )}
            </div>
            <div>
              <div className="relative">
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  className={`peer block w-full appearance-none rounded-lg border border-gray-600 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-200 focus:border-[#155dfc] focus:outline-none focus:ring-0 ${
                    errors.password ? "border-red-400 focus:border-red-400" : ""
                  }`}
                  placeholder=" "
                />
                <label
                  htmlFor="password"
                  className={`absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-[#111827] px-2 text-sm text-gray-400 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#155dfc] ${
                    errors.password ? "text-red-400 peer-focus:text-red-400" : ""
                  }`}>
                  Password
                </label>
              </div>
                {errors.password && (
                  <p className="text-xs ml-1 mt-1 text-red-400">
                    {errors.password.message}
                  </p>
                )}
            </div>
            <div>
              <div className="relative">
                <input
                  type="file"
                  id="photo"
                  onChange={handlePhotoChange}
                  className={`peer block w-full appearance-none rounded-lg border border-gray-600 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-200 focus:border-[#155dfc] focus:outline-none focus:ring-0 ${
                    errors.photo ? "border-red-400 focus:border-red-400" : ""
                  }`}
                />
                <label
                  htmlFor="photo"
                  className={`absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-[#111827] px-2 text-sm text-gray-400 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#155dfc] ${
                    errors.photo ? "text-red-400 peer-focus:text-red-400" : ""
                  }`}>
                  Upload Photo
                </label>
              </div>
                {errors.photo && (
                  <p className="text-xs ml-1 mt-1 text-red-400">{errors.photo.message}</p>
                )}
                {photoPreview && (
                  <div className="mt-4">
                    <img
                      src={photoPreview}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded-lg border-2 border-blue-500 shadow-lg"
                    />
                  </div>
                )}
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition disabled:opacity-50 flex justify-center items-center">
            <FiChevronLeft className="inline-block mr-2" /> Previous
          </button>
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-4 py-2 rounded-lg bg-[#155dfc] text-white hover:bg-[#1447e6] transition flex justify-center items-center">
              Next <FiChevronRight className="inline-block ml-2" />
            </button>
          ) : (
            <button 
              type="submit"
              className="px-4 py-2 rounded-lg bg-green-500 text-white hover:bg-green-600 transition">
              Submit
            </button>
          )}
        </div>
      </form>
    </div>
  );
}

export default RegistrationForm;

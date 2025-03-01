import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

function InstituteSignup() {
  const [loading, setLoading] = useState(false);

  const schema = yup.object({
    collegeName: yup.string().required("Colege Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setFocus,
  } = useForm({ resolver: yupResolver(schema)});

  const onSubmit = (data) => {
    setLoading(true);
    console.log("Form Data Submitted:", data);
    alert("Registration Successful!");
  };

  React.useEffect(() => setFocus("collegeName"), []);

  return (
    <div className="flex h-[90vh] w-full justify-center items-center overflow-hidden px-2 bg-[#030712]">
      <form
        className="relative flex w-[400px] flex-col space-y-5 rounded-lg border border-gray-700 bg-[#111827] px-6 py-10 shadow-xl sm:mx-auto"
        onSubmit={handleSubmit(onSubmit)}>
        {/* Header */}
        <div className="mx-auto mb-4 space-y-3 text-center">
          <h1 className="text-3xl font-bold text-gray-200">Register</h1>
          <p className="text-gray-400 text-base">
            Register to Streamline Your Attendance
          </p>
        </div>

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
              <p className="text-xs ml-1 mt-1 text-red-400">{errors.password.message}</p>
            )}
          </div>
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-4">
          <button
            type="submit"
            className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer flex justify-center items-center">
            {loading ? <span className="loading loading-spinner"></span> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default InstituteSignup;

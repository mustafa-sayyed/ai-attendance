import React, { useState } from "react";
import { FiKey, FiMail } from "react-icons/fi";
import { useForm } from "react-hook-form";

const ForgotPassword = () => {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const submitHandler = (data) => {
    setLoading(true);
    console.log(data);
  };

  return (
    <div className="min-h-[90vh] flex items-center justify-center bg-[#030712] px-2">
      <div
        className="relative flex w-[400px] flex-col space-y-5 rounded-lg border border-gray-700 bg-[#111827] px-8 py-10 shadow-xl sm:mx-auto"
        onSubmit={handleSubmit(submitHandler)}>
        <div className="text-center">
          <div className="mx-auto bg-blue-700 rounded-full w-16 h-16 flex items-center justify-center">
            <FiKey size={32} className="text-white" />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-200">Forgot Password?</h1>
          <p className="mt-2 text-gray-400 text-sm">
            Don't worry, we'll send you reset instructions.
          </p>
        </div>
        <form className="mt-1">
          <div>
            <div className="relative w-full">
              <input
                type="text"
                id="email"
                className={`peer block w-full appearance-none rounded-lg border border-gray-600 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-200 focus:border-[#155dfc] focus:bg-transparent focus:outline-none focus:ring-0 ${
                  errors.email ? "border-red-400 focus:border-red-400" : ""
                }`}
                placeholder=" "
                {...register("email", {
                  required: "Enter a required",
                  pattern: {
                    value: /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/gm,
                    message: "Enter a valid email",
                  },
                })}
              />
              <label
                htmlFor="email"
                className={`absolute left-1 top-2 z-10 -translate-y-4 scale-75 transhtmlForm cursor-text select-none bg-[#111827] px-2 text-sm text-gray-400 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#155dfc] ${
                  errors.email ? "text-red-400 peer-focus:text-red-400" : ""
                } `}>
                Enter Your Email
              </label>
            </div>
            <p className="text-xs ml-1 mt-1 text-red-400">{errors.email?.message}</p>
          </div>
          <button
            type="submit"
            className="mt-4 w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={loading}
            >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>
        <p className="text-center text-gray-400">
          Remember you password?
          <a
            href="/signin"
            className="whitespace-nowrap font-semibold text-gray-200 hover:underline ml-1">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;

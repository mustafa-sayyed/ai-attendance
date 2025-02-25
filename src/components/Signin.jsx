import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {toast, ToastContainer} from "react-toastify";

function Signin() {
  const schema = yup
    .object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    })
    .required();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const submitHandler = (data) => {
    setLoading(true);
    console.log(data);
  };
  return (
    <div className="flex h-[90vh] w-full justify-center items-center overflow-hidden px-2 bg-[#030712]">
      <form
        className="relative flex w-96 flex-col space-y-5 rounded-lg border border-gray-700 bg-[#111827] px-5 py-10 shadow-xl sm:mx-auto"
        onSubmit={handleSubmit(submitHandler)}>
        <div className="mx-auto mb-2 space-y-3">
          <h1 className="text-center text-3xl font-bold text-gray-200">Sign in</h1>
          <p className="text-gray-400">Sign in to access your account</p>
        </div>

        <div>
          <div className="relative mt-2 w-full">
            <input
              type="text"
              id="email"
              className={`peer block w-full appearance-none rounded-lg border border-gray-600 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-200 focus:border-[#155dfc] focus:outline-none focus:ring-0 ${errors.email ? "border-red-400 focus:border-red-400" : ""}`}
              placeholder=" "
              {...register("email", {
                required: "Email is required.",
                pattern: /[A-Za-z0-9\._%+\-]+@[A-Za-z0-9\.\-]+\.[A-Za-z]{2,}/gm,
              })}
              // aria-invalid={errors.email ? "true" : "false"}
            />
            <label
              htmlFor="email"
              className={`absolute left-1 top-2 z-10 -translate-y-4 scale-75 transhtmlForm cursor-text select-none bg-[#111827] px-2 text-sm text-gray-400 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#155dfc] ${errors.email ? "text-red-400 peer-focus:text-red-400" : "" } `}>
              Enter Your Email
            </label>
          </div>
          <p className="text-xs ml-1 mt-1 text-red-400">{errors.email?.message}</p>
        </div>

        <div>
          <div className="relative mt-2 w-full">
            <input
              type="password"
              id="password"
              className={`peer block w-full appearance-none rounded-lg border border-gray-600 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-200 focus:border-[#155dfc] focus:outline-none focus:ring-0 ${errors.password ? "border-red-400 focus:border-red-400" : ""}`}
              placeholder=" "
              {...register("password", {
                required: "Password is required",
              })}
              // aria-invalid={errors.email ? "true" : "false"}
            />
            <label
              htmlFor="password"
              className={`absolute left-1 top-2 z-10 -translate-y-4 scale-75 transhtmlForm cursor-text select-none bg-[#111827] px-2 text-sm text-gray-400 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#155dfc] ${errors.password ? "text-red-400 peer-focus:text-red-400" : "" } `}>
              Enter Your Password
            </label>
          </div>
          <p className="text-xs ml-1 mt-1 text-red-400">{errors.password?.message}</p>
        </div>
        <a className="text-right text-xs text-gray-400 hover:underline -mt-3" href="#">
          Forgot your password?
        </a>
        <button className="shrink-0 inline-block w-full rounded-lg bg-[#155dfc] py-2.5 font-bold text-white cursor-pointer hover:bg-[#1447e6]">
          {loading ? (
              <span className="loading loading-spinner"></span>
          ) : (
            "Sign in"
          )}
        </button>

        <p className="text-center text-gray-400">
          Don't have an account?
          <a
            href="#"
            className="whitespace-nowrap font-semibold text-gray-200 hover:underline ml-1">
            Sign up
          </a>
        </p>
      </form>
    </div>
  );
}

export default Signin;

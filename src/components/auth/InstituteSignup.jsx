import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../features/authSlice";

function InstituteSignup() {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schema = yup.object({
    name: yup.string().required("College Name is required"),
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
  } = useForm({ resolver: yupResolver(schema) });

  const handleErrors = (error) => {
    toast.error(error);
  };

  const handleSuccess = (message) => {
    toast.success(message);
  };

  const onSubmit = (data) => {
    setIsFormSubmitting(true);
    axios
      .post("http://localhost:3000/api/v1/institute/signup", data)
      .then((res) => {
        handleSuccess(res.data.msg);
        localStorage.setItem("token", res.data.token);
        setTimeout(() => {
          setIsFormSubmitting(false);
          navigate("/institute/dashboard");
        }, 1000);
      })
      .catch((err) => {
        if (err.response) {
          handleErrors(err.response.data.msg);
        } else {
          handleErrors("Connection Error, No Internet Connection");
        }
        setIsFormSubmitting(false);
      });
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:3000/api/v1/institute/get-current-institute", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          console.log(res);

          if (res.status === 200) {
            dispatch(login({ userData: res.data.user, roles: ["institute"] }));
            setTimeout(() => {
              navigate("/institute/dashboard");
            }, 1300);
          } else {
            // localStorage.removeItem("token");
            console.log("removing token from localstorage");
          }
        })
        .catch((err) => {
          if (!err.response) {
            handleErrors("Network Error, Check Your Internet Connection");
          }
          // localStorage.removeItem("token");
          console.log("removing token from localstorage");
        });
    } else {
      setFocus("name");
    }
  }, []);

  return loading ? (
    <div className="flex flex-col justify-center items-center h-[90vh] text-white bg-[#030712]">
      <div className="loading loading-spinner h-16 w-16 bg-blue-700"></div>
      <div className="mt-4 text-lg">Loding......</div>
    </div>
  ) : (
    <div className="flex h-[90vh] w-full justify-center items-center overflow-hidden px-2 bg-[#030712]">
      <form
        className="relative flex w-[400px] flex-col space-y-5 rounded-lg border border-gray-700 bg-[#111827] px-6 py-10 shadow-xl sm:mx-auto"
        onSubmit={handleSubmit(onSubmit)}>
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
                id="name"
                {...register("name")}
                className={`peer block w-full appearance-none rounded-lg border border-gray-600 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-200 
                  focus:border-[#155dfc] focus:outline-none focus:ring-0 ${
                    errors.name ? "border-red-400 focus:border-red-400" : ""
                  }`}
                placeholder=" "
              />
              <label
                htmlFor="name"
                className={`absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-[#111827] px-2 text-sm text-gray-400 duration-300 
                  peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 
                  peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#155dfc] ${
                    errors.name ? "text-red-400 peer-focus:text-red-400" : ""
                  }`}>
                College Name
              </label>
            </div>
            {errors.name && (
              <p className="text-xs ml-1 mt-1 text-red-400">{errors.name.message}</p>
            )}
          </div>
          <div>
            <div className="relative">
              <input
                type="email"
                id="email"
                {...register("email")}
                className={`peer block w-full appearance-none rounded-lg border border-gray-600 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-200 
                  focus:border-[#155dfc] focus:outline-none focus:ring-0 ${
                    errors.email ? "border-red-400 focus:border-red-400" : ""
                  }`}
                placeholder=" "
              />
              <label
                htmlFor="email"
                className={`absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-[#111827] px-2 text-sm text-gray-400 duration-300 
                  peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 
                  peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#155dfc] ${
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
                className={`peer block w-full appearance-none rounded-lg border border-gray-600 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-200 
                  focus:border-[#155dfc] focus:outline-none focus:ring-0 ${
                    errors.password ? "border-red-400 focus:border-red-400" : ""
                  }`}
                placeholder=" "
              />
              <label
                htmlFor="password"
                className={`absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-[#111827] px-2 text-sm text-gray-400 duration-300 
                  peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 
                  peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#155dfc] ${
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

        {/* Submit Button */}
        <div className="flex justify-between mt-4">
          <button
            type="submit"
            disabled={isFormSubmitting}
            className="w-full px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer flex justify-center items-center">
            {isFormSubmitting ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "Submit"
            )}
          </button>
        </div>
      </form>
      <ToastContainer
        theme="colored"
        position="top-right"
        autoClose={5000}
        closeButton={true}
        draggable={true}
      />
    </div>
  );
}

export default InstituteSignup;

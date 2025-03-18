import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../features/authSlice";
import axios from "axios";

function Signin() {
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schema = yup.object({
    role: yup.string().required("Role is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    password: yup.string().required("Password is required"),
  });

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm({ resolver: yupResolver(schema) });

  const submitHandler = async (data) => {
    setIsFormSubmitting(true);

    let endpoint = "";
    switch (data.role) {
      case "students":
        endpoint = "http://localhost:3000/api/v1/student/signin";
        break;
      case "teachers":
        endpoint = "http://localhost:3000/api/v1/teacher/signin";
        break;
      case "institute":
        endpoint = "http://localhost:3000/api/v1/institute/signin";
        break;
      default:
        endpoint = "http://localhost:3000/api/v1/student/signin";
    }

    axios
      .post(endpoint, {
        email: data.email,
        password: data.password,
      })
      .then((res) => {
        toast.success(res.data.msg);
        localStorage.setItem("token", res.data.token);
        setIsFormSubmitting(false);
        setTimeout(() => {
          navigate(`/${data.role}/dashboard`);
        }, 1500);
      })
      .catch((err) => {
        setTimeout(() => {
          toast.error(err.response?.data?.msg || "Invalid email or password");
          setIsFormSubmitting(false);
        }, 1500);
      });
  };

  const handleErrors = (error) => {
    toast.error(error);
  };

  const handleSuccess = (message) => {
    toast.success(message);
  };

  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .get("http://localhost:3000/api/v1/auth/get-current-user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch(login({ userData: res.data.user, roles: [res.data.role] }));
            setTimeout(() => {
              navigate(`/${res.data.role}/dashboard`);
            }, 1300);
          } else {
            localStorage.removeItem("token");
            console.log("removing token from localstorage");
          }
        })
        .catch((err) => {
          if (!err.response) {
            handleErrors("Network Error, Check Your Internet Connection");
          }
          localStorage.removeItem("token");
          console.log("removing token from localstorage");
        });
    }
    setTimeout(() => {

      setLoading(false);
    }, 1500)
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
        onSubmit={handleSubmit(submitHandler)}>
        <div className="mx-auto mb-2 space-y-3">
          <h1 className="text-center text-3xl font-bold text-gray-200">Sign in</h1>
          <p className="text-gray-400">Sign in to access your account</p>
        </div>

        <div>
          <div className="relative mt-3 w-full">
            <select
              id="role"
              {...register("role")}
              className={`peer block w-full appearance-none rounded-lg border border-gray-600 bg-[#111827] px-4 py-3 text-sm text-gray-200 focus:border-[#155dfc] focus:outline-none focus:ring-0 ${
                errors.role ? "border-red-400 focus:border-red-400" : ""
              }`}>
              <option value="" className="text-gray-400">
                Select your Role
              </option>
              <option value="students" className="text-gray-400">
                Student
              </option>
              <option value="teachers" className="text-gray-400">
                Teacher
              </option>
              <option value="institute" className="text-gray-400">
                Institute
              </option>
            </select>
            <label
              htmlFor="role"
              className={`absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-[#111827] px-2 text-sm text-gray-400 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#155dfc] ${
                errors.role ? "text-red-400 peer-focus:text-red-400" : ""
              }`}>
              Select your Role
            </label>
          </div>
          {errors.role && (
            <p className="text-xs ml-1 mt-1 text-red-400">{errors.role.message}</p>
          )}
        </div>

        <div>
          <div className="relative mt-3 w-full">
            <input
              type="text"
              id="email"
              className="peer block w-full appearance-none rounded-lg border border-gray-600 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-200 focus:border-[#155dfc] focus:outline-none focus:ring-0"
              placeholder=" "
              {...register("email")}
            />
            <label
              htmlFor="email"
              className="absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-[#111827] px-2 text-sm text-gray-400 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#155dfc]">
              Enter Your Email
            </label>
          </div>
          <p className="text-xs ml-1 mt-1 text-red-400">{errors.email?.message}</p>
        </div>

        <div>
          <div className="relative mt-0 w-full">
            <input
              type="password"
              id="password"
              className="peer block w-full appearance-none rounded-lg border border-gray-600 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-200 focus:border-[#155dfc] focus:outline-none focus:ring-0"
              placeholder=" "
              {...register("password")}
            />
            <label
              htmlFor="password"
              className="absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-[#111827] px-2 text-sm text-gray-400 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#155dfc]">
              Enter Your Password
            </label>
          </div>
          <p className="text-xs ml-1 mt-1 text-red-400">{errors.password?.message}</p>
        </div>

        <a
          className="text-right text-xs text-gray-400 hover:underline -mt-3"
          href="/forgot-password">
          Forgot your password?
        </a>

        <button
          className="shrink-0 inline-block w-full rounded-lg bg-blue-600 py-2.5 font-bold text-white cursor-pointer hover:bg-blue-700"
          type="submit">
          {isFormSubmitting ? (
            <span className="loading loading-spinner"></span>
          ) : (
            "Sign in"
          )}
        </button>

        <p className="text-center text-gray-400">
          Don't have an account?
          <a
            href="/get-started"
            className="whitespace-nowrap font-semibold text-gray-200 hover:underline ml-1">
            Sign up
          </a>
        </p>
      </form>
      <ToastContainer
        theme="colored"
        position="top-right"
        autoClose={4000}
        closeButton={true}
        draggable={true}
      />
    </div>
  );
}

export default Signin;

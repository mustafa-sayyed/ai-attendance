import React, { useState } from "react";
import { set, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../features/authSlice";

function TeacherSignup() {
  const [institutes, setInstitutes] = useState([]);
  const [departments, setDepartments] = useState([]); // departments from the chosen institute
  const [currentStep, setCurrentStep] = useState(1);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Three-step validation schema:
  // Step 1: institute and registrationToken
  // Step 2: departments (at least one required)
  // Step 3: teacher details: name, email, password
  const schema = [
    yup.object({
      institute: yup.string().required("Institute is required"),
      registrationToken: yup.string().required("Registration Token is required"),
    }),
    yup.object({
      departments: yup
        .array()
        .min(1, "Select at least one department")
        .of(yup.string().required()),
    }),
    yup.object({
      name: yup.string().required("Full Name is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
  ];

  const currentSchema = schema[currentStep - 1];

  const {
    register,
    handleSubmit,
    formState: { errors },
    trigger,
    setFocus,
    setValue,
  } = useForm({
    resolver: yupResolver(currentSchema),
    mode: "onChange",
  });

  // Toast handlers
  const handleErrors = (error) => {
    toast.error(error);
  };

  const handleSuccess = (message) => {
    toast.success(message);
  };

  const handleToken = (token) => {
    localStorage.setItem("token", token);
  };

  // Next and Prev functions
  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid && currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const submitHandler = (data) => {
    console.log(data);

    setIsFormSubmitting(true);
    axios
      .post("http://localhost:3000/api/v1/teacher/signup", data)
      .then((res) => {
        handleSuccess(res.data.msg);
        handleToken(res.data.token);
        dispatch(login({ userData: res.data.user, roles: ["teacher"] }));
        setTimeout(() => {
          setIsFormSubmitting(false);
          navigate("/teachers/dashboard");
        }, 1000);
      })
      .catch((error) => {
        if (error) {
          setTimeout(() => {
            handleErrors(error.response?.data?.msg);
            setIsFormSubmitting(false);
          }, 1000);
        }
      });
  };

  const authStatus = useSelector(state => state.auth.status)

  // Fetch institutes if no token exists
  React.useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setFocus("institute");
      axios
        .get("http://localhost:3000/api/v1/institute/")
        .then((res) => {
          setInstitutes(res.data.institutes);
          setLoading(false);
        })
        .catch((err) => handleErrors("Connection Error, No Internet Connection"));
    } else if(token && !authStatus) {
      axios
        .get("http://localhost:3000/api/v1/teacher/get-current-teacher", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch(login({ userData: res.data.user, roles: ["student"] }));
            setTimeout(() => {
              navigate("/teachers/dashboard");
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
    }
  }, []);

  // When institute is selected, update departments from that institute
  const handleInstituteChange = (e) => {
    const selectedInstituteId = e.target.value;
    setValue("institute", selectedInstituteId);
    // Find the selected institute (assuming institutes are returned with a "departments" array)
    const selectedInstitute = institutes.find((inst) => inst._id === selectedInstituteId);
    if (selectedInstitute) {
      setDepartments(selectedInstitute.departments || []);
    } else {
      setDepartments([]);
    }
  };

  return loading ? (
    <div className="flex flex-col justify-center items-center h-[90vh] w-full text-white bg-[#030712]">
      <div className="loading loading-spinner h-16 w-16 bg-blue-700"></div>
      <div className="mt-4 text-lg">Loding......</div>
    </div>
  ) : (
    <div className="flex h-[90vh] w-full justify-center items-center overflow-hidden px-2 bg-[#030712]">
      <form className="relative flex w-[400px] flex-col space-y-5 rounded-lg border border-gray-700 bg-[#111827] px-6 py-10 shadow-xl sm:mx-auto">
        {/* Header */}
        <div className="mx-auto mb-4 space-y-3 text-center">
          <h1 className="text-3xl font-bold text-gray-200">Register</h1>
          <p className="text-gray-400">Complete your registration in 3 steps</p>
          <div className="flex justify-between items-center text-gray-400">
            <span>Step {currentStep} of 3</span>
            <div className="flex gap-2">
              {[1, 2, 3].map((step) => (
                <div
                  key={step}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    currentStep >= step ? "bg-[#155dfc]" : "bg-gray-700"
                  }`}></div>
              ))}
            </div>
          </div>
        </div>

        {currentStep === 1 && (
          <div className="space-y-5">
            <div>
              <div className="relative">
                <select
                  id="institute"
                  {...register("institute")}
                  onChange={handleInstituteChange}
                  className={`peer block w-full appearance-none rounded-lg border border-gray-600 bg-[#111827] px-4 py-3 text-sm text-gray-200 focus:border-[#155dfc] focus:outline-none focus:ring-0 ${
                    errors.institute ? "border-red-400 focus:border-red-400" : ""
                  }`}>
                  <option value="" className="text-gray-400">
                    Select Institute
                  </option>
                  {institutes?.map((inst, index) => (
                    <option
                      key={index}
                      value={inst._id}
                      className="bg-[#111827] text-gray-200">
                      {inst.name}
                    </option>
                  ))}
                </select>
                <label
                  htmlFor="institute"
                  className={`absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-[#111827] px-2 text-sm text-gray-400 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#155dfc] ${
                    errors.institute ? "text-red-400 peer-focus:text-red-400" : ""
                  }`}>
                  Institute
                </label>
              </div>
              {errors.institute && (
                <p className="text-xs ml-1 mt-1 text-red-400">
                  {errors.institute.message}
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
            <p className="text-gray-200">Select the department where you teach:</p>
            <div className="flex flex-col gap-2">
              {departments.length > 0 ? (
                departments.map((dept) => (
                  <label key={dept._id} className="flex items-center gap-2 text-gray-200">
                    <input
                      type="checkbox"
                      value={dept._id}
                      {...register("departments")}
                      className="form-checkbox"
                    />
                    {dept.name}
                  </label>
                ))
              ) : (
                <p className="text-gray-400">No departments available</p>
              )}
            </div>
            {errors.departments && (
              <p className="text-xs ml-1 mt-1 text-red-400">
                {errors.departments.message}
              </p>
            )}
          </div>
        )}

        {currentStep === 3 && (
          <div className="space-y-5">
            <div>
              <div className="relative">
                <input
                  type="text"
                  id="name"
                  {...register("name")}
                  className={`peer block w-full appearance-none rounded-lg border border-gray-600 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-200 focus:border-[#155dfc] focus:outline-none focus:ring-0 ${
                    errors.name ? "border-red-400 focus:border-red-400" : ""
                  }`}
                  placeholder=" "
                />
                <label
                  htmlFor="name"
                  className={`absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-[#111827] px-2 text-sm text-gray-400 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#155dfc] ${
                    errors.name ? "text-red-400 peer-focus:text-red-400" : ""
                  }`}>
                  Full Name
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
          </div>
        )}

        <div className="flex justify-between mt-6">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentStep === 1}
            className="w-[120px] px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition disabled:opacity-50 cursor-pointer flex justify-center items-center">
            <FiChevronLeft className="inline-block mr-2" /> Previous
          </button>
          {currentStep < 3 ? (
            <button
              type="button"
              onClick={handleNext}
              className="w-[120px] px-4 py-2 rounded-lg bg-[#155dfc] text-white hover:bg-[#1447e6] transition cursor-pointer flex justify-center items-center">
              Next <FiChevronRight className="inline-block ml-2" />
            </button>
          ) : (
            <button
              type="button"
              disabled={isFormSubmitting}
              onClick={handleSubmit(submitHandler)}
              className="w-[120px] px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer flex justify-center items-center">
              {isFormSubmitting ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Submit"
              )}
            </button>
          )}
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

export default TeacherSignup;

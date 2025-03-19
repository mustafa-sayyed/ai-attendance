import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FiUpload, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { FaUserCircle } from "react-icons/fa";
import { IKContext, IKUpload } from "imagekitio-react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { login } from "../../features/authSlice";

const urlEndpoint = import.meta.env.VITE_IMAGEKIT_URL;
const publicKey = import.meta.env.VITE_IMAGEKIT_PUBLIC_KEY;
const url = import.meta.env.VITE_IMAGEKIT_SERVER_URL;

const authenticator = async () => {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Request failed with status ${response.status}: ${errorText}`);
    }

    const data = await response.json();
    const { signature, expire, token } = data;

    return { signature, expire, token };
  } catch (error) {
    throw new Error(`ImageKit Authentication request failed: ${error.message}`);
  }
};

function StudentSignup() {
  const [institutes, setInstitutes] = useState([]);
  const [departments, setDepartments] = useState([]);
  const [classes, setClasses] = useState([]);
  const [currentStep, setCurrentStep] = useState(1);
  const [photoPreview, setPhotoPreview] = useState(null);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const schema = [
    yup.object({
      institute: yup.string().required("Institute Name is required"),
      registrationToken: yup.string().required("Registration Token is required"),
    }),
    yup.object({
      department: yup.string().required("Department is required"),
      class: yup.string().required("Class is required"),
      rollno: yup
        .number()
        .typeError("Rollno must be a number")
        .required("Roll Number is required"),
    }),
    yup.object({
      name: yup.string().required("Full Name is required"),
      email: yup.string().email("Invalid email").required("Email is required"),
      password: yup
        .string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
    }),
    yup.object({
      photo: yup.string().required("Photo is required"),
    }),
  ];

  const currentSchema = schema[currentStep - 1];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    getValues,
    setFocus,
    trigger,
  } = useForm({ resolver: yupResolver(currentSchema), mode: "onChange" });

  const handleNext = async () => {
    const isValid = await trigger();
    if (isValid && currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const handleErrors = (error) => {
    toast.error(error);
  };

  const handleSuccess = (message) => {
    toast.success(message);
  };

  const handleToken = (token) => {
    localStorage.setItem("token", token);
  };

  const submitHandler = (data) => {
    setIsFormSubmitting(true);
    axios
      .post("http://localhost:3000/api/v1/student/signup", {
        ...data,
        cls: data.class,
      })
      .then((res) => {
        handleSuccess(res.data.msg);
        handleToken(res.data.token);
        const result = dispatch(login({ userData: res.data.user, roles: ["student"] }));
        console.log(result);
        setTimeout(() => {
          setIsFormSubmitting(false);
          navigate("/students/dashboard");
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

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImageUpload = (image) => {
    setValue("photo", image.url);
  };

  React.useEffect(() => {
    // const token = localStorage.getItem("token");
    // if (token) {
    //   axios
    //     .get("http://localhost:3000/api/v1/student/get-current-student", {
    //       headers: {
    //         Authorization: `Bearer ${token}`,
    //       },
    //     })
    //     .then((res) => {
    //       if (res.status === 200) {
    //         dispatch(login({ userData: res.data.user, roles: ["student"] }));
    //         setTimeout(() => {
    //           navigate("/students/dashboard");
    //         }, 1300);
    //       } else {
    //         localStorage.removeItem("token");
    //         console.log("removing token from localstorage");
    //       }
    //     })
    //     .catch((err) => {
    //       if (!err.response) {
    //         handleErrors("Network Error, Check Your Internet Connection");
    //       }
    //       // localStorage.removeItem("token");
    //       console.log("removing token from localstorage");
    //     });
    // } else {
    // }
    setFocus("institute");
    axios
      .get("http://localhost:3000/api/v1/institute/")
      .then((res) => {
        setInstitutes(res.data.institutes);
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      })
      .catch((err) => handleErrors("Connection Error, No Internet Connection"));
  }, []);

  const handleinstituteChange = (e) => {
    const selectedInstituteId = e.target.value;
    setValue("institute", selectedInstituteId);

    if (institutes) {
      const selectedInstitute = institutes.find(
        (institute) => institute._id === selectedInstituteId
      );

      if (selectedInstitute) {
        setDepartments(selectedInstitute.departments);
        setClasses([]);
      }
    }
  };

  const handleDepartmentChange = (e) => {
    const selectedDeptId = e.target.value;
    setValue("department", selectedDeptId);

    if (institutes) {
      const selectedDepartment = departments.find((dept) => dept._id === selectedDeptId);

      if (selectedDepartment) {
        setClasses(selectedDepartment.class);
      }
    }
  };

  return loading ? (
    <div className="flex flex-col justify-center items-center h-[90vh] text-white bg-[#030712]">
      <div className="loading loading-spinner h-16 w-16 bg-blue-700"></div>
      <div className="mt-4 text-lg">Loding......</div>
    </div>
  ) : (
    <div className="flex h-[90vh] w-full justify-center items-center overflow-hidden px-2 bg-[#030712]">
      <form className="relative flex w-[400px] flex-col space-y-5 rounded-lg border border-gray-700 bg-[#111827] px-6 py-10 shadow-xl sm:mx-auto">
        {/* Header */}
        <div className="mx-auto mb-4 space-y-3 text-center">
          <h1 className="text-3xl font-bold text-gray-200">Register</h1>
          <p className="text-gray-400">Complete your registration in 4 steps</p>
          <div className="flex justify-between items-center text-gray-400">
            <span>Step {currentStep} of 4</span>
            <div className="flex gap-2">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`h-2 w-2 rounded-full transition-all duration-300 ${
                    currentStep >= step ? "bg-[#155dfc]" : "bg-gray-700"
                  }`}></div>
              ))}
            </div>
          </div>
        </div>

        {/* Step Content */}
        {currentStep === 1 && (
          <div className="space-y-5">
            <div>
              <div className="relative">
                <select
                  id="institute"
                  {...register("institute")}
                  onChange={handleinstituteChange}
                  className={`peer block w-full appearance-none rounded-lg border border-gray-600 bg-[#111827] px-4 py-3 text-sm text-gray-200 focus:border-[#155dfc] focus:outline-none focus:ring-0 ${
                    errors.institute ? "border-red-400 focus:border-red-400" : ""
                  }`}>
                  <option value="" className="text-gray-400">
                    Select Institute
                  </option>
                  {institutes?.map((clg, index) => (
                    <option
                      key={index}
                      value={clg._id}
                      className="bg-[#111827] text-gray-200">
                      {clg.name}
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
            <div>
              <div className="relative">
                <select
                  id="department"
                  {...register("department")}
                  onChange={handleDepartmentChange}
                  className={`peer block w-full appearance-none rounded-lg border border-gray-600 bg-[#111827] px-4 py-3 text-sm text-gray-200 focus:border-[#155dfc] focus:outline-none focus:ring-0 ${
                    errors.department ? "border-red-400 focus:border-red-400" : ""
                  }`}>
                  <option value="" className="text-gray-400">
                    Select Department
                  </option>
                  {departments.map((dept, index) => (
                    <option
                      key={index}
                      value={dept._id}
                      className="bg-[#111827] text-gray-200">
                      {dept.name}
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
                  className={`peer block w-full appearance-none rounded-lg border border-gray-600 bg-[#111827] px-4 py-3 text-sm text-gray-200 focus:border-[#155dfc] focus:outline-none focus:ring-0 ${
                    errors.class ? "border-red-400 focus:border-red-400" : ""
                  }`}>
                  <option value="" className="text-gray-400">
                    Select Classes
                  </option>
                  {classes.map((cls, index) => (
                    <option
                      key={index}
                      value={cls._id}
                      className="bg-[#111827] text-gray-200">
                      {cls.name}
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
                  id="rollno"
                  {...register("rollno")}
                  className={`peer block w-full appearance-none rounded-lg border border-gray-600 bg-transparent px-2.5 pt-4 pb-2.5 text-sm text-gray-200 focus:border-[#155dfc] focus:outline-none focus:ring-0 ${
                    errors.rollno ? "border-red-400 focus:border-red-400" : ""
                  }`}
                  placeholder=" "
                />
                <label
                  htmlFor="rollno"
                  className={`absolute left-1 top-2 z-10 -translate-y-4 scale-75 transform cursor-text select-none bg-[#111827] px-2 text-sm text-gray-400 duration-300 peer-placeholder-shown:top-1/2 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:scale-100 peer-focus:top-2 peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:px-2 peer-focus:text-[#155dfc] ${
                    errors.rollno ? "text-red-400 peer-focus:text-red-400" : ""
                  }`}>
                  Roll Number
                </label>
              </div>
              {errors.rollno && (
                <p className="text-xs ml-1 mt-1 text-red-400">{errors.rollno.message}</p>
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

        {currentStep === 4 && (
          <div className="space-y-5">
            <div className="mb-5 text-center">
              <div className="shadow-inset relative mx-auto mb-5 h-32 w-32 rounded-full border bg-gray-100">
                {photoPreview ? (
                  <img
                    id="image"
                    className="h-32 w-full rounded-full object-cover"
                    src={photoPreview}
                    alt="Profile Preview"
                  />
                ) : (
                  <FaUserCircle className="h-32 w-full rounded-full object-cover text-[#111827]" />
                )}
              </div>
              <label
                htmlFor="fileInput"
                className="inline-flex cursor-pointer items-center justify-between rounded-lg border bg-white px-4 py-2 text-left font-medium text-gray-600 shadow-sm hover:bg-gray-100 focus:outline-none">
                <FiUpload className="-mt-1 mr-1 inline-flex h-6 w-6 flex-shrink-0" />
                Browse Photo
              </label>
              <div className="mx-auto mt-2 w-48 text-center text-xs text-gray-500">
                Click to add profile picture
              </div>
              <IKContext
                publicKey={publicKey}
                urlEndpoint={urlEndpoint}
                authenticator={authenticator}>
                <IKUpload
                  fileName="test-upload.png"
                  onError={(e) => console.log("Error", e)}
                  onUploadProgress={(e) =>
                    setImageUploadProgress(((e.loaded / e.total) * 100).toFixed(0))
                  }
                  onSuccess={handleImageUpload}
                  onUploadStart={() => setIsImageUploading(true)}
                  id="fileInput"
                  className="hidden"
                  onChange={handlePhotoChange}
                />
              </IKContext>
              {isImageUploading && (
                <div>
                  <div className="mb-2 mt-3 flex justify-between items-center">
                    <h3 className="text-sm text-gray-400 flex justify-center items-center">
                      {imageUploadProgress < 100
                        ? "Image is Uploading......"
                        : "Image Uploaded Successfully"}
                    </h3>
                    <span className="text-sm text-gray-400">{imageUploadProgress}%</span>
                  </div>
                  <div
                    className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700"
                    role="progressbar"
                    aria-valuenow="25"
                    aria-valuemin="0"
                    aria-valuemax="100">
                    <div
                      className="flex flex-col justify-center rounded-full overflow-hidden text-xs text-white text-center whitespace-nowrap transition duration-500 dark:bg-blue-700"
                      style={{ width: `${imageUploadProgress}%` }}></div>
                  </div>
                </div>
              )}
              {errors.photo && (
                <p className="text-xs ml-1 mt-1 text-red-400">{errors.photo.message}</p>
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
            className="w-[120px] px-4 py-2 rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 transition disabled:opacity-50 cursor-pointer flex justify-center items-center">
            <FiChevronLeft className="inline-block mr-2" /> Previous
          </button>
          {currentStep < 4 ? (
            <button
              type="button"
              onClick={handleNext}
              className="w-[120px] px-4 py-2 rounded-lg bg-[#155dfc] text-white hover:bg-[#1447e6] transition cursor-pointer flex justify-center items-center">
              Next <FiChevronRight className="inline-block ml-2" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleSubmit(submitHandler)}
              disabled={
                isFormSubmitting || (imageUploadProgress < 100 && imageUploadProgress > 0)
              }
              className="w-[120px] px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition cursor-pointer flex justify-center items-center disabled:cursor-not-allowed disabled:opacity-80">
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
        closeButton="true"
        draggable="true"
      />
    </div>
  );
}

export default StudentSignup;

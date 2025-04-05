import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import {
  LuCamera,
  LuUserCheck,
  LuClipboardList,
  LuCalendar,
  LuCheck,
  LuX,
  LuLoader,
  LuCircleAlert,
  LuClock,
  LuUsers,
  LuCopy,
  LuArrowLeft,
} from "react-icons/lu";
import { SiGoogleclassroom } from "react-icons/si";
import axios from "axios";

export default function TakeAttendance() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [hasClass, setHasClass] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState("not-taken"); // "not-taken", "in-progress", "taken"
  const [students, setStudents] = useState([]);
  const [showClassForm, setShowClassForm] = useState(true);
  const [attendanceAlreadyTaken, setAttendanceAlreadyTaken] = useState(false);
  const [attendanceData, setAttendanceData] = useState(null);

  // Form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Mock data for select boxes
  const subjectOptions = [
    { value: "CSE101", label: "Introduction to Computer Science" },
    { value: "MAT201", label: "Linear Algebra" },
    { value: "PHY301", label: "Quantum Physics" },
    { value: "ENG102", label: "Academic Writing" },
  ];

  const classOptions = [
    { value: "CS-A", label: "Computer Science - A Section" },
    { value: "CS-B", label: "Computer Science - B Section" },
    { value: "EE-A", label: "Electrical Engineering - A Section" },
    { value: "ME-A", label: "Mechanical Engineering - A Section" },
  ];

  const roomOptions = [
    { value: "101", label: "Room 101" },
    { value: "102", label: "Room 102" },
    { value: "201", label: "Lab 201" },
    { value: "301", label: "Conference Hall 301" },
  ];

  const [classDetails, setClassDetails] = useState({
    subject: "",
    class: "",
    roomNumber: "",
    time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    date: new Date().toLocaleDateString(),
    totalStudents: 30,
  });

  // Sample student data
  const sampleStudents = [
    { id: 1, name: "Alice Johnson", rollNo: "CS2301", status: "present" },
    { id: 2, name: "Bob Smith", rollNo: "CS2302", status: "present" },
    { id: 3, name: "Charlie Brown", rollNo: "CS2303", status: "absent" },
    { id: 4, name: "Diana Parker", rollNo: "CS2304", status: "present" },
    { id: 5, name: "Ethan Hunt", rollNo: "CS2305", status: "present" },
    { id: 6, name: "Fiona Apple", rollNo: "CS2306", status: "present" },
    { id: 7, name: "George Miller", rollNo: "CS2307", status: "absent" },
    { id: 8, name: "Hannah Montana", rollNo: "CS2308", status: "present" },
    { id: 9, name: "Ian McKellen", rollNo: "CS2309", status: "present" },
    { id: 10, name: "Julia Roberts", rollNo: "CS2310", status: "present" },
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  // Form submission handler using React Hook Form
  const onSubmitClassForm = async (data) => {
    setClassDetails({
      ...classDetails,
      subject:
        subjectOptions.find((option) => option.value === data.subject)?.label ||
        data.subject,
      class:
        classOptions.find((option) => option.value === data.cls)?.label || data.cls,
      roomNumber:
        roomOptions.find((option) => option.value === data.roomNo)?.label ||
        data.roomNo,
    });

    console.log(data, classDetails);

    const token = localStorage.getItem("token");

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/attendance/initiate-attendance",
        {
          ...data,
          isAttendanceTaken: false,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      

      const isAttendanceTaken = response.data.isAttendanceTaken;

      if (isAttendanceTaken) {
        setAttendanceAlreadyTaken(true);
      } else {
        setShowClassForm(false);
      }
    } catch (error) {
      console.error("Error initiating attendance:", error);
      // For demo purposes, continuing without error
      setShowClassForm(false);
    }
  };

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setAttendanceStatus("in-progress");

    // Prepare data for backend
    const attendanceSessionData = {
      method: option,
      classInfo: classDetails,
      timestamp: new Date().toISOString(),
      sessionId: `${classDetails.class}-${Date.now()}`,
    };

    setAttendanceData(attendanceSessionData);

    // Simulate API call to get students
    setStudents([]);
    fetchStudentsWithDelay();
  };

  const fetchStudentsWithDelay = async () => {
    try {
      // This will be replaced with actual API call
      for (let i = 0; i < sampleStudents.length; i++) {
        await new Promise((resolve) => setTimeout(resolve, 300));
        setStudents((prev) => [...prev, sampleStudents[i]]);

        // When all students are loaded, set attendance as taken
        if (i === sampleStudents.length - 1) {
          setTimeout(() => {
            setAttendanceStatus("taken");

            // Update attendance data with student information
            setAttendanceData((prev) => ({
              ...prev,
              students: sampleStudents,
              presentCount: sampleStudents.filter((s) => s.status === "present").length,
              absentCount: sampleStudents.filter((s) => s.status === "absent").length,
              completedAt: new Date().toISOString(),
            }));
          }, 500);
        }
      }
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  // Toggle student status for manual attendance
  const toggleStudentStatus = (studentId) => {
    if (selectedOption === "manual" && attendanceStatus === "taken") {
      setStudents((prevStudents) =>
        prevStudents.map((student) =>
          student.id === studentId
            ? { ...student, status: student.status === "present" ? "absent" : "present" }
            : student
        )
      );

      // Update attendance data after toggling status
      setTimeout(() => {
        const updatedStudents = students.map((student) =>
          student.id === studentId
            ? { ...student, status: student.status === "present" ? "absent" : "present" }
            : student
        );

        setAttendanceData((prev) => ({
          ...prev,
          students: updatedStudents,
          presentCount: updatedStudents.filter((s) => s.status === "present").length,
          absentCount: updatedStudents.filter((s) => s.status === "absent").length,
          updatedAt: new Date().toISOString(),
        }));
      }, 100);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "present":
        return "text-green-600 dark:text-green-400";
      case "absent":
        return "text-red-600 dark:text-red-400";
      default:
        return "text-gray-900 dark:text-white/90";
    }
  };

  const getAttendanceStatusBadge = () => {
    switch (attendanceStatus) {
      case "not-taken":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300">
            Not Taken
          </span>
        );
      case "in-progress":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
            <LuLoader className="w-3 h-3 mr-1 animate-spin" />
            In Progress
          </span>
        );
      case "taken":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
            <LuCheck className="w-3 h-3 mr-1" />
            Attendance Taken
          </span>
        );
      default:
        return null;
    }
  };

  const resetAttendance = () => {
    setSelectedOption(null);
    setAttendanceStatus("not-taken");
    setStudents([]);
  };

  // Submit attendance data to backend
  const handleAttendanceSubmit = () => {
    // Final attendance data to send to backend
    const finalAttendanceData = {
      ...attendanceData,
      students: students.map(({ id, rollNo, status }) => ({ id, rollNo, status })),
      submittedAt: new Date().toISOString(),
    };

    console.log("Sending attendance data to backend:", finalAttendanceData);

    // Here you would typically call an API
    // Example: await axios.post('/api/attendance', finalAttendanceData);

    alert("Attendance submitted successfully!");
    resetAttendance();
    setShowClassForm(true);
  };

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-screen bg-white dark:bg-gray-900">
        <div className="h-16 w-16 border-4 border-blue-600 dark:border-blue-500 border-t-transparent dark:border-t-transparent rounded-full animate-spin"></div>
        <div className="mt-4 text-lg text-gray-800 dark:text-gray-200">Loading...</div>
      </div>
    );
  }

  return (
    <div>
      <PageMeta title="Take Attendance" description="AI Attendance System" />
      <PageBreadcrumb pageTitle="Take Attendance" />

      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.02] overflow-hidden shadow-sm">
        {/* Class Details Header */}
        {!showClassForm && (
          <div className="border-b border-gray-200 dark:border-gray-800 p-5 lg:p-6 bg-gradient-to-r from-blue-50/50 to-transparent dark:from-blue-900/10 dark:to-transparent">
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white/90">
                  {classDetails.subject}
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                  {classDetails.class} - Room {classDetails.roomNumber}
                </p>
              </div>
              <div className="mt-3 md:mt-0 flex flex-col md:items-end">
                <div className="flex items-center mb-1">
                  <LuCalendar className="mr-1.5 text-blue-600 dark:text-blue-400 h-4 w-4" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {classDetails.date}
                  </span>
                </div>
                <div className="flex items-center">
                  <LuClock className="mr-1.5 text-blue-600 dark:text-blue-400 h-4 w-4" />
                  <span className="text-sm text-gray-700 dark:text-gray-300 mr-3">
                    {classDetails.time}
                  </span>
                  <LuUsers className="mr-1.5 text-blue-600 dark:text-blue-400 h-4 w-4" />
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {classDetails.totalStudents} Students
                  </span>
                </div>
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300 mr-2">
                Attendance Status:
              </span>
              {getAttendanceStatusBadge()}
            </div>
          </div>
        )}

        {/* Main Content */}
        <div className="p-5 lg:p-6">
          {!hasClass ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                <LuCalendar className="w-10 h-10 text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 dark:text-white/90 mb-2">
                No Classes Scheduled
              </h3>
              <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
                There are no classes scheduled for today. Please check your calendar for
                upcoming classes.
              </p>
              <button
                onClick={() => navigate("/teachers/calendar")}
                className="inline-flex items-center px-5 py-2.5 border border-transparent text-sm font-medium rounded-lg shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors dark:bg-blue-700 dark:hover:bg-blue-800 dark:focus:ring-blue-800">
                View Calendar
              </button>
            </div>
          ) : (
            <>
              {showClassForm ? (
                <div className="max-w-2xl mx-auto">
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/20 mb-4">
                      <SiGoogleclassroom className="w-8 h-8 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-900 dark:text-white/90 mb-2">
                      Class Details
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                      Please enter the following details before taking attendance
                    </p>
                  </div>

                  {attendanceAlreadyTaken ? (
                    <div className="bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg p-5 my-6">
                      <div className="flex">
                        <div className="flex-shrink-0">
                          <LuCircleAlert className="h-6 w-6 text-amber-500 dark:text-amber-400" />
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-amber-800 dark:text-amber-300">
                            Attendance Already Taken
                          </h3>
                          <div className="mt-2 text-sm text-amber-700 dark:text-amber-200">
                            <p>
                              Attendance has already been recorded for this class today.
                              Would you like to:
                            </p>
                            <div className="mt-4 flex flex-wrap gap-3">
                              <button
                                className="px-4 py-2 text-sm font-medium rounded-lg bg-white dark:bg-gray-800 border border-amber-300 dark:border-amber-700/50 text-amber-800 dark:text-amber-200 hover:bg-amber-50 dark:hover:bg-amber-900/20 transition-colors"
                                onClick={() => setAttendanceAlreadyTaken(false)}>
                                View Existing Attendance
                              </button>
                              <button
                                className="px-4 py-2 text-sm font-medium rounded-lg bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 hover:bg-amber-200 dark:hover:bg-amber-900/50 transition-colors"
                                onClick={() => {
                                  setAttendanceAlreadyTaken(false);
                                  setShowClassForm(false);
                                }}>
                                Take New Attendance
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <form
                      onSubmit={handleSubmit(onSubmitClassForm)}
                      className="space-y-5 bg-gray-50 dark:bg-gray-900/20 rounded-xl p-6 border border-gray-100 dark:border-gray-800 shadow-sm">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div>
                          <label
                            htmlFor="subject"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Subject
                          </label>
                          <select
                            id="subject"
                            {...register("subject", { required: "Subject is required" })}
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white/90 transition-colors">
                            <option value="">Select Subject</option>
                            {subjectOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          {errors.subject && (
                            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                              {errors.subject.message}
                            </p>
                          )}
                        </div>
                        <div>
                          <label
                            htmlFor="cls"
                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                            Class
                          </label>
                          <select
                            id="cls"
                            {...register("cls", { required: "Class is required" })}
                            className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white/90 transition-colors">
                            <option value="">Select Class</option>
                            {classOptions.map((option) => (
                              <option key={option.value} value={option.value}>
                                {option.label}
                              </option>
                            ))}
                          </select>
                          {errors.cls && (
                            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                              {errors.cls.message}
                            </p>
                          )}
                        </div>
                      </div>
                      <div>
                        <label
                          htmlFor="roomNo"
                          className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                          Room Number
                        </label>
                        <select
                          id="roomNo"
                          {...register("roomNo", {
                            required: "Room number is required",
                          })}
                          className="w-full px-4 py-2.5 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white/90 transition-colors">
                          <option value="">Select Room</option>
                          {roomOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                        {errors.roomNo && (
                          <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
                            {errors.roomNo.message}
                          </p>
                        )}
                      </div>
                      <div className="pt-3">
                        <button
                          type="submit"
                          className="w-full px-5 py-3 bg-blue-600 dark:bg-blue-700 text-white font-medium rounded-lg hover:bg-blue-700 dark:hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-600 transition-colors shadow-sm">
                          Begin Attendance
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              ) : !selectedOption ? (
                <div className="max-w-4xl mx-auto">
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white/90 mb-6 text-center">
                    Select Attendance Method
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                    <AttendanceOption
                      icon={<LuCamera className="w-8 h-8" />}
                      title="Camera Detection"
                      description="Take attendance using face recognition via CCTV camera"
                      onClick={() => handleOptionSelect("camera")}
                      disabled={attendanceStatus !== "not-taken"}
                    />
                    <AttendanceOption
                      icon={<LuUserCheck className="w-8 h-8" />}
                      title="Student Self Check-in"
                      description="Allow students to mark their own attendance using mobile devices"
                      onClick={() => handleOptionSelect("self")}
                      disabled={attendanceStatus !== "not-taken"}
                    />
                    <AttendanceOption
                      icon={<LuClipboardList className="w-8 h-8" />}
                      title="Manual Attendance"
                      description="Manually mark attendance for each student"
                      onClick={() => handleOptionSelect("manual")}
                      disabled={attendanceStatus !== "not-taken"}
                    />
                  </div>
                </div>
              ) : (
                <div className="animate-fadeIn max-w-4xl mx-auto">
                  <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                    <div className="flex items-center">
                      {selectedOption === "camera" && (
                        <LuCamera className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
                      )}
                      {selectedOption === "self" && (
                        <LuUserCheck className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
                      )}
                      {selectedOption === "manual" && (
                        <LuClipboardList className="h-6 w-6 mr-2 text-blue-600 dark:text-blue-400" />
                      )}
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white/90">
                        {selectedOption === "camera" && "Camera Detection"}
                        {selectedOption === "self" && "Student Self Check-in"}
                        {selectedOption === "manual" && "Manual Attendance"}
                      </h3>
                    </div>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setShowClassForm(true)}
                        className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                        <LuArrowLeft className="mr-1.5 h-4 w-4" />
                        Change Class
                      </button>
                      <button
                        onClick={resetAttendance}
                        className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg ${
                          attendanceStatus === "taken"
                            ? "bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white"
                            : "bg-gray-100 dark:bg-gray-800 text-gray-400 dark:text-gray-500 cursor-not-allowed"
                        } transition-colors`}
                        disabled={attendanceStatus !== "taken"}>
                        {attendanceStatus === "taken" ? "Start New" : "Processing..."}
                      </button>
                    </div>
                  </div>

                  {selectedOption === "camera" && (
                    <div className="bg-gray-50 dark:bg-gray-900/30 rounded-xl p-6 mb-6 border border-gray-100 dark:border-gray-800">
                      <div className="aspect-video max-w-3xl mx-auto bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden shadow-inner flex items-center justify-center border border-gray-200 dark:border-gray-700">
                        {attendanceStatus === "in-progress" ? (
                          <div className="animate-pulse text-gray-600 dark:text-gray-400 text-center">
                            <LuCamera className="w-16 h-16 mx-auto mb-3" />
                            <p className="text-lg font-medium">Processing camera feed</p>
                            <p className="text-sm mt-2 text-gray-500 dark:text-gray-500">
                              Using CCTV camera for facial recognition
                            </p>
                          </div>
                        ) : (
                          <div className="text-gray-600 dark:text-gray-400 text-center">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/20 mb-3">
                              <LuCheck className="w-8 h-8 text-green-600 dark:text-green-400" />
                            </div>
                            <p className="text-lg font-medium">Camera detection complete</p>
                            <p className="text-sm mt-2 text-gray-500 dark:text-gray-500">
                              All students have been identified
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedOption === "self" && (
                    <div className="bg-gray-50 dark:bg-gray-900/30 rounded-xl p-6 mb-6 border border-gray-100 dark:border-gray-800">
                      <div className="max-w-lg mx-auto">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white/90 mb-3">
                          Student Self Check-in
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-5">
                          Students can check in using the following link or QR code on
                          their mobile devices:
                        </p>
                        <div className="bg-white dark:bg-gray-800 rounded-lg p-4 flex items-center justify-between mb-5 border border-gray-200 dark:border-gray-700 shadow-sm">
                          <code className="text-blue-600 dark:text-blue-400 text-sm">
                            https://attendance.example.com/check-in/{classDetails.class}-
                            {classDetails.roomNumber}
                          </code>
                          <button className="inline-flex items-center px-3 py-1.5 text-sm text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors">
                            <LuCopy className="mr-1.5 h-4 w-4" />
                            Copy
                          </button>
                        </div>
                        <div className="flex justify-center">
                          <div className="w-40 h-40 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 flex items-center justify-center shadow-sm">
                            <div className="w-32 h-32 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                              <span className="text-sm text-gray-500 dark:text-gray-400">
                                QR Code
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {selectedOption === "manual" && (
                    <div className="bg-gray-50 dark:bg-gray-900/30 rounded-xl p-6 mb-6 border border-gray-100 dark:border-gray-800">
                      <div className="max-w-lg mx-auto text-center">
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white/90 mb-3">
                          Manual Attendance
                        </h4>
                        <p className="text-gray-600 dark:text-gray-400 mb-4">
                          Students will be loaded below. Mark each student as present or
                          absent manually.
                        </p>
                        {attendanceStatus === "in-progress" && (
                          <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300">
                            <div className="animate-spin rounded-full h-4 w-4 border-2 border-blue-600 dark:border-blue-400 border-t-transparent dark:border-t-transparent mr-2"></div>
                            <span>Preparing attendance sheet...</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Student List */}
                  <div className="mt-6">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-4 gap-3">
                      <div>
                        <h4 className="text-lg font-medium text-gray-900 dark:text-white/90 flex items-center">
                          Student Attendance
                          {attendanceStatus === "in-progress" && (
                            <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-300">
                              <LuLoader className="w-3 h-3 mr-1 animate-spin" />
                              Updating
                            </span>
                          )}
                        </h4>
                        {attendanceStatus === "in-progress" && (
                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                            Data is being updated in real-time
                          </p>
                        )}
                      </div>

                      {attendanceStatus === "taken" && (
                        <div className="flex items-center justify-center px-4 py-2 bg-gray-50 dark:bg-gray-800 rounded-lg border border-gray-100 dark:border-gray-700">
                          <div className="text-center">
                            <div className="flex items-center justify-center">
                              <span className="text-green-600 dark:text-green-400 font-medium text-lg">
                                {students.filter((s) => s.status === "present").length}
                              </span>
                              <span className="text-gray-600 dark:text-gray-400 mx-1">/</span>
                              <span className="text-gray-700 dark:text-gray-300 font-medium text-lg">
                                {students.length}
                              </span>
                            </div>
                            <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                              Present
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="overflow-hidden bg-white dark:bg-transparent border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm">
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                          <thead className="bg-gray-50 dark:bg-gray-900/40">
                            <tr>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Roll No
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Name
                              </th>
                              <th
                                scope="col"
                                className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                Status
                              </th>
                              {selectedOption === "manual" &&
                                attendanceStatus === "taken" && (
                                  <th
                                    scope="col"
                                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                                    Action
                                  </th>
                                )}
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200 dark:bg-transparent dark:divide-gray-800">
                            {students.map((student, index) => (
                              <tr
                                key={student.id}
                                className="animate-fadeIn transition-colors hover:bg-gray-50 dark:hover:bg-gray-900/20"
                                style={{ animationDelay: `${index * 150}ms` }}>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                  {student.rollNo}
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  <span className="text-sm font-medium text-gray-900 dark:text-white/90">
                                    {student.name}
                                  </span>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap">
                                  {student.status === "present" ? (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300">
                                      <LuCheck className="w-3 h-3 mr-1" />
                                      Present
                                    </span>
                                  ) : (
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300">
                                      <LuX className="w-3 h-3 mr-1" />
                                      Absent
                                    </span>
                                  )}
                                </td>
                                {selectedOption === "manual" &&
                                  attendanceStatus === "taken" && (
                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                      <button
                                        onClick={() => toggleStudentStatus(student.id)}
                                        className={`inline-flex items-center px-3 py-1 rounded-lg text-xs font-medium ${
                                          student.status === "present"
                                            ? "bg-gray-100 hover:bg-gray-200 text-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-white"
                                            : "bg-green-100 hover:bg-green-200 text-green-800 dark:bg-green-900/30 dark:hover:bg-green-900/50 dark:text-green-300"
                                        } transition-colors`}>
                                        {student.status === "present" ? (
                                          <>
                                            <LuX className="w-3 h-3 mr-1" />
                                            Mark Absent
                                          </>
                                        ) : (
                                          <>
                                            <LuCheck className="w-3 h-3 mr-1" />
                                            Mark Present
                                          </>
                                        )}
                                      </button>
                                    </td>
                                  )}
                              </tr>
                            ))}
                            {attendanceStatus === "in-progress" &&
                              students.length < sampleStudents.length && (
                                <tr>
                                  <td
                                    colSpan={selectedOption === "manual" ? "4" : "3"}
                                    className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                    <div className="flex items-center justify-center space-x-2">
                                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600 dark:border-blue-400"></div>
                                      <span>Loading more students...</span>
                                    </div>
                                  </td>
                                </tr>
                              )}
                          </tbody>
                        </table>
                      </div>
                    </div>

                    {attendanceStatus === "taken" && (
                      <div className="mt-6 text-right">
                        <button
                          onClick={handleAttendanceSubmit}
                          className="inline-flex items-center px-5 py-2.5 bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800 text-white font-medium rounded-lg transition-colors shadow-sm">
                          <LuCheck className="mr-1.5 h-4 w-4" />
                          Save Attendance
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

const AttendanceOption = ({ icon, title, description, onClick, disabled }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    className={`flex flex-col items-center justify-center p-6 rounded-xl border text-center transition transform hover:scale-[1.02] ${
      disabled
        ? "opacity-50 cursor-not-allowed border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/20"
        : "border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/10 hover:border-blue-300 dark:hover:border-blue-800/50 hover:shadow-md dark:hover:bg-gray-900/30"
    }`}>
    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-medium text-gray-900 dark:text-white/90 mb-2">{title}</h3>
    <p className="text-sm text-gray-600 dark:text-gray-400">{description}</p>
  </button>
);
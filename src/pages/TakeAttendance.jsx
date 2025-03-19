import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PageBreadcrumb from "../components/common/PageBreadCrumb";
import PageMeta from "../components/common/PageMeta";
import { LuCamera, LuUserCheck, LuClipboardList, LuCalendar } from "react-icons/lu";

export default function TakeAttendance() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [hasClass, setHasClass] = useState(true);
  const [selectedOption, setSelectedOption] = useState(null);
  const [attendanceStatus, setAttendanceStatus] = useState("not-taken"); // "not-taken", "in-progress", "taken"
  const [students, setStudents] = useState([]);
  const [classDetails, setClassDetails] = useState({
    subject: "Introduction to Software Engineering",
    class: "CS-101",
    time: "10:00 AM - 11:30 AM",
    date: "March 18, 2025",
    totalStudents: 30
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
    // Simulate loading data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
    setAttendanceStatus("in-progress");
    
    // Simulate loading students with delay
    setStudents([]);
    const loadStudentsWithDelay = async () => {
      for (let i = 0; i < sampleStudents.length; i++) {
        await new Promise(resolve => setTimeout(resolve, 300));
        setStudents(prev => [...prev, sampleStudents[i]]);
        
        // When all students are loaded, set attendance as taken
        if (i === sampleStudents.length - 1) {
          setTimeout(() => {
            setAttendanceStatus("taken");
          }, 500);
        }
      }
    };
    
    loadStudentsWithDelay();
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "present":
        return "text-blue-600";
      case "absent":
        return "text-gray-500";
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
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            In Progress
          </span>
        );
      case "taken":
        return (
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
            Attendance Taken
          </span>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div>
      <PageMeta
        title="Take Attendance | AI Attendance System"
        description="Take attendance for your class using camera, manual entry or student self-check-in"
      />
      <PageBreadcrumb pageTitle="Take Attendance" />

      <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
        {/* Class Details Header */}
        <div className="border-b border-gray-200 dark:border-gray-800 p-5 lg:p-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white/90">{classDetails.subject}</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{classDetails.class}</p>
            </div>
            <div className="mt-3 md:mt-0 flex flex-col md:items-end">
              <div className="flex items-center mb-1">
                <LuCalendar className="mr-1 text-gray-500 dark:text-gray-400" />
                <span className="text-sm text-gray-600 dark:text-gray-300">{classDetails.date}</span>
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">{classDetails.time} • {classDetails.totalStudents} Students</p>
            </div>
          </div>
          <div className="mt-4 flex items-center">
            <span className="text-sm text-gray-600 dark:text-gray-300 mr-2">Attendance Status:</span>
            {getAttendanceStatusBadge()}
          </div>
        </div>

        {/* Main Content */}
        <div className="p-5 lg:p-6">
          {!hasClass ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 dark:bg-gray-800 mb-4">
                <LuCalendar className="w-8 h-8 text-gray-500 dark:text-gray-400" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white/90 mb-2">No Classes Scheduled</h3>
              <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                There are no classes scheduled for today. Please check your calendar for upcoming classes.
              </p>
              <button 
                onClick={() => navigate('/teachers/calendar')}
                className="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                View Calendar
              </button>
            </div>
          ) : (
            <>
              {!selectedOption ? (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <AttendanceOption 
                    icon={<LuCamera className="w-8 h-8" />}
                    title="Camera Detection"
                    description="Take attendance using face recognition via camera"
                    onClick={() => handleOptionSelect('camera')}
                    disabled={attendanceStatus !== "not-taken"}
                  />
                  <AttendanceOption 
                    icon={<LuUserCheck className="w-8 h-8" />}
                    title="Student Self Check-in"
                    description="Allow students to mark their own attendance"
                    onClick={() => handleOptionSelect('self')}
                    disabled={attendanceStatus !== "not-taken"}
                  />
                  <AttendanceOption 
                    icon={<LuClipboardList className="w-8 h-8" />}
                    title="Manual Attendance"
                    description="Manually mark attendance for each student"
                    onClick={() => handleOptionSelect('manual')}
                    disabled={attendanceStatus !== "not-taken"}
                  />
                </div>
              ) : (
                <div className="animate-fadeIn">
                  <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white/90">
                      {selectedOption === 'camera' && 'Camera Detection'}
                      {selectedOption === 'self' && 'Student Self Check-in'}
                      {selectedOption === 'manual' && 'Manual Attendance'}
                    </h3>
                    <button
                      onClick={() => {
                        if (attendanceStatus === "taken") {
                          setSelectedOption(null);
                          setAttendanceStatus("not-taken");
                        }
                      }}
                      className={`px-4 py-2 text-sm font-medium rounded-md ${
                        attendanceStatus === "taken"
                          ? "bg-blue-600 hover:bg-blue-700 text-white"
                          : "bg-gray-100 text-gray-400 cursor-not-allowed dark:bg-gray-800"
                      }`}
                      disabled={attendanceStatus !== "taken"}
                    >
                      {attendanceStatus === "taken" ? "Start New" : "Processing..."}
                    </button>
                  </div>

                  {selectedOption === 'camera' && (
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 mb-6 text-center">
                      <div className="aspect-video max-w-2xl mx-auto bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center">
                        {attendanceStatus === "in-progress" ? (
                          <div className="animate-pulse text-gray-500 dark:text-gray-400">
                            <LuCamera className="w-16 h-16 mx-auto mb-2" />
                            <p>Processing camera feed...</p>
                          </div>
                        ) : (
                          <div className="text-gray-500 dark:text-gray-400">
                            <LuCamera className="w-16 h-16 mx-auto mb-2" />
                            <p>Camera detection complete</p>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {selectedOption === 'self' && (
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 mb-6">
                      <div className="max-w-md mx-auto">
                        <h4 className="font-medium text-gray-900 dark:text-white/90 mb-2">Student Self Check-in</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          Students can check in using the following link or QR code:
                        </p>
                        <div className="bg-white dark:bg-gray-900 rounded-md p-3 flex items-center justify-between mb-4">
                          <code className="text-blue-600 dark:text-blue-400 text-sm">
                            https://attendance.example.com/check-in/CS101-18032025
                          </code>
                          <button className="text-sm text-blue-600 dark:text-blue-400">
                            Copy
                          </button>
                        </div>
                        <div className="flex justify-center">
                          <div className="w-32 h-32 bg-white dark:bg-gray-900 rounded-md flex items-center justify-center">
                            <span className="text-sm text-gray-500 dark:text-gray-400">QR Code</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Student List */}
                  <div className="mt-6">
                    <h4 className="text-md font-medium text-gray-900 dark:text-white/90 mb-4">
                      Student Attendance
                      {attendanceStatus === "in-progress" && (
                        <span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                          (Updating in real-time)
                        </span>
                      )}
                    </h4>
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
                        <thead className="bg-gray-50 dark:bg-gray-800/50">
                          <tr>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                              Roll No
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                              Name
                            </th>
                            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider dark:text-gray-400">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:bg-transparent dark:divide-gray-800">
                          {students.map((student, index) => (
                            <tr 
                              key={student.id} 
                              className="animate-fadeIn" 
                              style={{animationDelay: `${index * 300}ms`}}
                            >
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                                {student.rollNo}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white/90">
                                {student.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm">
                                <span className={getStatusColor(student.status)}>
                                  {student.status === "present" ? "Present" : "Absent"}
                                </span>
                              </td>
                            </tr>
                          ))}
                          {attendanceStatus === "in-progress" && students.length < sampleStudents.length && (
                            <tr>
                              <td colSpan="3" className="px-6 py-4 text-center text-sm text-gray-500 dark:text-gray-400">
                                <div className="flex items-center justify-center">
                                  <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-blue-600 mr-2"></div>
                                  Loading more students...
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
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
    className={`flex flex-col items-center justify-center p-6 rounded-xl border border-gray-200 dark:border-gray-800 text-center transition transform hover:scale-[1.02] ${
      disabled 
        ? "opacity-50 cursor-not-allowed" 
        : "hover:border-blue-300 hover:shadow-md dark:hover:border-blue-800/50"
    }`}
  >
    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 mb-4">
      {icon}
    </div>
    <h3 className="text-lg font-medium text-gray-900 dark:text-white/90 mb-2">{title}</h3>
    <p className="text-sm text-gray-500 dark:text-gray-400">{description}</p>
  </button>
);
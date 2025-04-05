import axios from "axios";
import { useState, useRef, useEffect } from "react";
import {
  LuBellRing,
  LuCalendarX,
  LuCamera,
  LuCheck,
  LuCircleAlert,
} from "react-icons/lu";
import { useSelector } from "react-redux";
import socket from "../utils/socket";

const GiveAttendance = () => {
  const [hasLectureAttendance, setHasLectureAttendance] = useState(false);

  // Component states
  const [stage, setStage] = useState("initial"); // initial, code-entry, camera, processing, success, error
  const [attendanceCode, setAttendanceCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [videoStream, setVideoStream] = useState(null);
  const [processingStatus, setProcessingStatus] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [imageData, setImageData] = useState("");
  const [progress, setProgress] = useState(0); // for progress bar

  const encoding = useSelector((state) => state.auth.userData.encoding);

  // References
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Function to handle code submission
  const handleCodeSubmit = (e) => {
    e.preventDefault();
    setCodeError("");

    if (!attendanceCode || attendanceCode.length < 4) {
      setCodeError("Please enter a valid attendance code");
      return;
    }

    // Mock API validation - in a real app this would be an API call to validate the code
    if (attendanceCode === "1234") {
      setStage("camera");
      startCamera();
    } else {
      setCodeError("Invalid attendance code. Please try again.");
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 620 },
        },
        audio: false,
      });

      setVideoStream(stream);

      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (err) {
      console.error("Error accessing camera:", err);
      setStage("error");
      setResultMessage(
        "Could not access camera. Please check permissions and try again."
      );
    }
  };

  const stopCamera = () => {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop());
      setVideoStream(null);
    }
  };

  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    context.filter = "brightness(1.1)";
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    const capturedImageData = canvas.toDataURL("image/jpeg");
    setImageData(capturedImageData);

    setStage("processing");
    setProcessingStatus("Analyzing facial data...");
    animateProgress();

    setTimeout(() => {
      processAttendance(capturedImageData);
    }, 1500);
  };

  const animateProgress = () => {
    setProgress(0);
    const duration = 2200;
    const target = 100;
    const intervalTime = 50;
    const increment = target / (duration / intervalTime);

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev + increment >= target) {
          clearInterval(interval);
          return target;
        }
        return prev + increment;
      });
    }, intervalTime);
  };

  const processAttendance = async (capturedImageData) => {
    try {
      setProcessingStatus("Verifying identity...");

      let imageBase64 = capturedImageData.split(",")[1];

      const res = await axios.post(
        "http://127.0.0.1:5000/student-attendance",
        {
          image: imageBase64,
          encoding: encoding,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (res.status === 200) {
        setProgress(100);
        setTimeout(() => {
          setStage("success");
          setResultMessage(
            `Attendance recorded successfully. Face matched! Date: ${new Date().toLocaleString()}`
          );
        }, 500);
      }
    } catch (error) {
      console.error("Error while taking attendance:", error);

      let errorMessage = "An unexpected error occurred. Please try again.";

      if (error.response) {
        if (error.response.status === 400) {
          errorMessage = `${error.response.data?.error} Face recognition failed. Please try again or contact support.`;
        } else if (error.response.status === 404) {
          errorMessage = "Face not found in the image. Please try again.";
        } else if (error.response.status === 500) {
          errorMessage = "Server error. Please try again later.";
        }
      }

      setStage("error");
      setResultMessage(errorMessage);
    }
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);



  // JSX for different stages
  const renderStageContent = () => {
    switch (stage) {
      case "initial":
        return (
          <div className="flex flex-col items-center text-center transition-all duration-500 ease-in-out transform hover:scale-105">
            <div className="mb-6">
              <div className="w-16 h-16 bg-brand-50 flex items-center justify-center rounded-full mb-4 shadow-md">
                <LuCamera className="w-8 h-8 text-brand-500" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Give Attendance
              </h2>
              <p className="text-gray-600 dark:text-gray-400">
                Enter the attendance code provided by your instructor to start the
                attendance process.
              </p>
            </div>
            <button
              onClick={() => setStage("code-entry")}
              className="bg-brand-500 hover:bg-brand-600 text-white py-2 px-8 rounded-lg transition-colors duration-300">
              Start
            </button>
          </div>
        );

      case "code-entry":
        return (
          <div className="w-full max-w-md animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Enter Attendance Code
            </h2>
            <form onSubmit={handleCodeSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="attendanceCode"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Attendance Code
                </label>
                <input
                  id="attendanceCode"
                  type="text"
                  value={attendanceCode}
                  onChange={(e) => setAttendanceCode(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:text-white transition-colors"
                  placeholder="Enter code (e.g. 1234)"
                />
                {codeError && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {codeError}
                  </p>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex-1 bg-brand-500 hover:bg-brand-600 text-white py-2 px-4 rounded-lg transition-colors">
                  Verify Code
                </button>
              </div>
            </form>
          </div>
        );

      case "camera":
        return (
          <div className="w-full max-w-xl animate-fadeIn">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Face Recognition
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Position your face in the camera frame and click "Take Attendance" when
              ready.
            </p>

            <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-4 shadow-lg">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover rounded-lg transition-all duration-300"
              />
              {/* Hidden canvas for image capture */}
              <canvas ref={canvasRef} className="hidden" />

              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                Camera Active
              </div>
            </div>

            <div className="flex justify-end">
              <button
                onClick={captureImage}
                className="flex-1 bg-brand-500 hover:bg-brand-600 text-white py-2 px-4 rounded-lg transition-all duration-300">
                Take Attendance
              </button>
            </div>
          </div>
        );

      case "processing":
        return (
          <div className="flex flex-col items-center text-center animate-fadeIn">
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center rounded-full mb-4 shadow-md">
              <span className="w-8 h-8 text-blue-500 loading loading-spinner animate-spin" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Processing
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{processingStatus}</p>

            <div className="w-40 max-w-md bg-gray-100 dark:bg-gray-800 rounded-full h-2.5 overflow-hidden">
              <div
                className="bg-blue-500 w-40 h-2.5 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        );

      case "success":
        return (
          <div className="flex flex-col items-center text-center animate-fadeIn">
            <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 flex items-center justify-center rounded-full mb-4 shadow-md">
              <LuCheck className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Success!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{resultMessage}</p>
          </div>
        );

      case "error":
        return (
          <div className="flex flex-col items-center text-center animate-fadeIn">
            <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 flex items-center justify-center rounded-full mb-4 shadow-md">
              <LuCircleAlert className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Error
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">{resultMessage}</p>
            <button
              onClick={() => setStage("initial")}
              className="mt-4 bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg transition-colors">
              Try Again
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return hasLectureAttendance ? (
    <div className="w-full p-4">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-800 transition-all">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          {renderStageContent()}
        </div>
      </div>
    </div>
  ) : (
    <div className="w-full p-4">
      <div className="bg-white dark:bg-gray-900 shadow-md rounded-lg p-6 border border-gray-200 dark:border-gray-800 transition-all">
        <div className="flex flex-col items-center justify-center min-h-[400px] text-center">
          <div className="mb-6">
            <div className="w-20 h-20 bg-gray-50 dark:bg-gray-800 flex items-center justify-center rounded-full mb-4 shadow-md">
              <LuCalendarX className="w-10 h-10 text-gray-400 dark:text-gray-500" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-3">
              No Active Attendance Sessions
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-md mx-auto mb-6">
              There are currently no classes or lectures requiring attendance. You'll
              receive a notification when an instructor starts an attendance session.
            </p>

            <div className="bg-brand-50 dark:bg-gray-800/50 rounded-lg p-4 max-w-md mx-auto border border-brand-100 dark:border-gray-700">
              <div className="flex items-center mb-3">
                <LuBellRing className="w-5 h-5 text-brand-500 mr-2" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                  Attendance Notifications
                </h3>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                You'll be notified when your instructors start attendance sessions for
                your enrolled courses.
              </p>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-700 dark:text-gray-300">
                  Notification Status
                </span>
                <span className="flex items-center text-green-600 dark:text-green-400">
                  <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                  Active
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiveAttendance;

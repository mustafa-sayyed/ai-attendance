import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { LuCamera, LuCheck, LuCircleAlert } from "react-icons/lu";

const GiveAttendance = () => {
  // Component states
  const [stage, setStage] = useState("initial"); // initial, code-entry, camera, processing, success, error
  const [attendanceCode, setAttendanceCode] = useState("");
  const [codeError, setCodeError] = useState("");
  const [videoStream, setVideoStream] = useState(null);
  const [processingStatus, setProcessingStatus] = useState("");
  const [resultMessage, setResultMessage] = useState("");
  const [imageData, setImageData] = useState("");

  // References
  const videoRef = useRef(null);
  const canvasRef = useRef(null);

  // Function to handle code submission
  const handleCodeSubmit = (e) => {
    e.preventDefault();
    setCodeError("");

    // Validate the attendance code (in real app, check against API)
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

  // Function to start the camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 620 },
          //   height: { ideal: 780 },
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

  // Function to stop the camera
  const stopCamera = () => {
    if (videoStream) {
      videoStream.getTracks().forEach((track) => track.stop());
      setVideoStream(null);
    }
  };

  // Function to capture image and send for processing
  const captureImage = () => {
    if (!videoRef.current || !canvasRef.current) return;

    const video = videoRef.current;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw video frame to canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Convert canvas to data URL
    const imageData = canvas.toDataURL("image/jpeg");
    setImageData(imageData);

    // Move to processing stage
    // setStage("processing");
    setProcessingStatus("Analyzing facial data...");

    // In real app: Send image data to the backend for facial recognition
    // Here we're simulating the API call with a timeout
    setTimeout(() => {
      processAttendance(imageData);
    }, 2000);
  };

  // Function to process attendance (simulated)
  const processAttendance = async (imageData) => {
    imageData = imageData.split(",")[1];

    const res = await axios.post("http://127.0.0.1:5000/student-attendance", {
      headers: {
        "Content-Type": "application/json",
      },
      image: imageData,
    });


    // Mock processing - this would be an API call in a real app
    setProcessingStatus("Verifying identity...");

    // Simulate API response delay
    // setTimeout(() => {
    //   // Mock response - 90% chance of success
    //   const success = Math.random() < 0.9;

    //   if (success) {
    //     setStage("success");
    //     setResultMessage(
    //       `Attendance recorded successfully. Face matched! Date: ${new Date().toLocaleString()}`
    //     );
    //   } else {
    //     setStage("error");
    //     setResultMessage("Face recognition failed. Please try again or contact support.");
    //   }

    //   // Stop the camera after processing
    //   stopCamera();
    // }, 1500);
  };

  // Cleanup function to stop camera when component unmounts
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
          <div className="flex flex-col items-center text-center">
            <div className="mb-6">
              <div className="w-16 h-16 bg-brand-50 flex items-center justify-center rounded-full mb-4">
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
              className="bg-brand-500 hover:bg-brand-600 text-white py-2 px-8 rounded-lg transition-colors">
              Start
            </button>
          </div>
        );

      case "code-entry":
        return (
          <div className="w-full max-w-md">
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
                  className="w-full px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-500 focus:border-brand-500 dark:bg-gray-800 dark:text-white"
                  placeholder="Enter code (e.g. 1234)"
                />
                {codeError && (
                  <p className="mt-1 text-sm text-red-600 dark:text-red-400">
                    {codeError}
                  </p>
                )}
              </div>
              <div className="flex space-x-3">
                {/* <button
                  type="button"
                  onClick={() => setStage("initial")}
                  className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                  Back
                </button> */}
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
          <div className="w-full max-w-xl">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Face Recognition
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Position your face in the camera frame and click "Take Attendance" when
              ready.
            </p>

            <div className="relative bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden mb-4">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover rounded-lg"
              />

              {/* Hidden canvas for image capture */}
              <canvas ref={canvasRef} className="hidden" />

              <div className="absolute bottom-4 left-4 bg-black bg-opacity-50 text-white px-3 py-1 rounded-full text-sm">
                Camera Active
              </div>
            </div>

            <div className="flex space-x-3">
              {/* <button
                onClick={() => {
                  stopCamera();
                  setStage("code-entry");
                }}
                className="px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800">
                Back
              </button> */}
              <button
                onClick={captureImage}
                className="flex-1 bg-brand-500 hover:bg-brand-600 text-white py-2 px-4 rounded-lg transition-colors">
                Take Attendance
              </button>
            </div>
          </div>
        );

      case "processing":
        return (
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-50 dark:bg-blue-900/20 flex items-center justify-center rounded-full mb-4">
              <span className="w-8 h-8 text-blue-500 loading loading-spinner" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Processing
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">{processingStatus}</p>
            <a href={imageData} download={true} className="btn btn-accent mb-4">
              Download image
            </a>

            <div className="w-full max-w-md bg-gray-100 dark:bg-gray-800 rounded-full h-2.5">
              <div
                className="bg-blue-500 h-2.5 rounded-full animate-pulse"
                style={{ width: "75%" }}></div>
            </div>
          </div>
        );

      case "success":
        return (
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-green-50 dark:bg-green-900/20 flex items-center justify-center rounded-full mb-4">
              <LuCheck className="w-8 h-8 text-green-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Success!
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{resultMessage}</p>
            {/* <button
              onClick={() => setStage("initial")}
              className="mt-6 bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg transition-colors">
              Done
            </button> */}
          </div>
        );

      case "error":
        return (
          <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-red-50 dark:bg-red-900/20 flex items-center justify-center rounded-full mb-4">
              <LuCircleAlert className="w-8 h-8 text-red-500" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              Error
            </h2>
            <p className="text-gray-600 dark:text-gray-400">{resultMessage}</p>
            <button
              onClick={() => setStage("initial")}
              className="mt-6 bg-gray-500 hover:bg-gray-600 text-white py-2 px-6 rounded-lg transition-colors">
              Try Again
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <div className="bg-white dark:bg-gray-900 shadow-sm rounded-lg p-6 border border-gray-200 dark:border-gray-800">
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          {renderStageContent()}
        </div>
      </div>
    </div>
  );
};

export default GiveAttendance;

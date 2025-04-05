import React, { useEffect } from "react";
import { Routes, Route, Outlet } from "react-router-dom";

import {
  About,
  Contact,
  ForgotPassword,
  HowItWorks,
  InstituteSignup,
  Navbar,
  Pricing,
  Signin as PublicSignin,
  StudentSignup,
  TeacherSignup,
  Logout,
  AuthLayout,
} from "./components";
import {
  GetStarted,
  Home,
  Blank,
  Calendar,
  TakeAttendance,
  InstituteProfile,
  StudentProfile,
  TeacherProfile,
  ManageStaff,
  ManageDepartment,
  ManageClasses,
  ManageSpecificClass,
  ManageStudents,
} from "./pages";

// Dashboard and UI components
import { InstituteLayout, StudentLayout, TeacherLayout } from "./layout";
import { NotFound, Unauthorized } from "./pages/OtherPage";
import { Alerts, Avatars, Badges, Buttons, Images, Videos } from "./pages/UiElements";
import { LineChart, BarChart } from "./pages/Charts";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Dashboard from "./pages/Dashboard/Dashboard";
import GiveAttendancePage from "./pages/GiveAttendance";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "./features/authSlice";
import socket from "./utils/socket";
import { toast, ToastContainer } from "react-toastify";

const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

function App() {
  const dispatch = useDispatch();
  const authStatus = useSelector((state) => state.auth.status);
  const [loading, setLoading] = React.useState(true);

  const token = localStorage.getItem("token");
  const role = useSelector((state) => state?.auth?.roles?.[0]) || null;
  const classId = useSelector((state) => state?.auth?.userData?.class?._id) || null;
  const teacherId = useSelector((state) => state?.auth?.userData?._id) || null;

  console.log(role, classId, teacherId);

  const handleInfo = (msg) => {
    toast.info(msg);
  };

  useEffect(() => {
    if (token && authStatus) {
      if (role && role === "student" && classId) {
        socket.emit("joinRoom", classId);

        socket.on("give-attendance", (data) => {
          handleInfo(data.msg);
          console.log(data);
        });
      } else if (role && role === "teacher") {
        socket.emit("joinTeacherRoom", teacherId);
      }
    }
  }, [authStatus, role, classId, teacherId]);

  React.useEffect(() => {
    if (token && !authStatus) {
      axios
        .get("http://localhost:3000/api/v1/auth/get-current-user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          if (res.status === 200) {
            dispatch(login({ userData: res.data.user, roles: res.data.role }));
          } else {
            localStorage.removeItem("token");
            console.log("removing token from localstorage");
          }
        })
        .catch((err) => {
          if (!err.response) {
            console.log("Network Error, Check Your Internet Connection", err);
          }
          localStorage.removeItem("token");
          console.log("removing token from localstorage");
        });
    }
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  return loading ? (
    <div className="flex flex-col justify-center items-center h-screen text-white bg-[#030712]">
      <div className="loading loading-spinner h-16 w-16 bg-blue-700"></div>
      <div className="mt-4 text-lg">Loading...</div>
    </div>
  ) : (
    <>
      <ToastContainer
        theme="colored"
        position="top-right"
        autoClose={5000}
        closeOnClick="true"
        closeButton="true"
        draggable="true"
        className={`z-99999`}
      />
      <ScrollToTop />
      <Routes>
        {/* Public Routes - No authentication required */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/student/signup" element={<StudentSignup />} />
          <Route path="/teacher/signup" element={<TeacherSignup />} />
          <Route path="/institute/signup" element={<InstituteSignup />} />
        </Route>
        <Route path="/signin" element={<PublicSignin />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/unauthorized" element={<Unauthorized />} />

        <Route
          path="/teacher"
          element={
            <AuthLayout requireAuth={true} allowedRoles={["teacher", "student"]}>
              <TeacherLayout />
            </AuthLayout>
          }>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<TeacherProfile />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="blank" element={<Blank />} />
          <Route path="take-attendance" element={<TakeAttendance />} />
          <Route path="attendance-overview" element={<Blank />} />
          <Route path="reports" element={<Blank />} />
          <Route path="settings" element={<Blank />} />
          <Route
            path="manage-deptartment-classes"
            element={
              <AuthLayout requireAuth={true} allowedRoles={["teacher", "hod", "student"]}>
                <ManageClasses />
              </AuthLayout>
            }
          />
          <Route
            path="manage-class"
            element={
              <AuthLayout requireAuth={true} allowedRoles={["teacher", "cc", "student"]}>
                <ManageSpecificClass />
              </AuthLayout>
            }
          />
          <Route
            path="manage-students"
            element={
              <AuthLayout requireAuth={true} allowedRoles={["teacher", "cc", "student"]}>
                <ManageStudents />
              </AuthLayout>
            }
          />
        </Route>

        {/* Student Routes - Authentication required with 'students' role */}
        <Route
          path="/student"
          element={
            <AuthLayout requireAuth={true} allowedRoles={["student", "teacher"]}>
              <StudentLayout />
            </AuthLayout>
          }>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="profile" element={<StudentProfile />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="blank" element={<Blank />} />
          <Route path="give-attendance" element={<GiveAttendancePage />} />
          <Route path="attendance-overview" element={<Blank />} />
          <Route path="reports" element={<Blank />} />
          <Route path="settings" element={<Blank />} />
          <Route path="form-elements" element={<FormElements />} />
          <Route path="basic-tables" element={<BasicTables />} />
          <Route path="alerts" element={<Alerts />} />
          <Route path="avatars" element={<Avatars />} />
          <Route path="badge" element={<Badges />} />
          <Route path="buttons" element={<Buttons />} />
          <Route path="images" element={<Images />} />
          <Route path="videos" element={<Videos />} />
          <Route path="line-chart" element={<LineChart />} />
          <Route path="bar-chart" element={<BarChart />} />
        </Route>

        {/* Institute Routes - Authentication required with 'institute' role */}
        <Route
          path="/institute"
          element={
            <AuthLayout
              requireAuth={true}
              allowedRoles={["institute", "student", "teacher"]}>
              <InstituteLayout />
            </AuthLayout>
          }>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="take-attendance" element={<Blank />} />
          <Route path="attendance-overview" element={<Blank />} />
          <Route path="manage-staff" element={<ManageStaff />} />
          <Route path="manage-departments" element={<ManageDepartment />} />
          <Route path="reports" element={<Blank />} />
          <Route path="profile" element={<InstituteProfile />} />
          <Route path="settings" element={<Blank />} />
          <Route path="blank" element={<Blank />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

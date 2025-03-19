import React from "react";
import { BrowserRouter, Routes, Route, Outlet, useNavigate } from "react-router-dom";

// Landing / Public components
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
} from "./components";
import { GetStarted, Home, Blank, Calendar, UserProfiles, TakeAttendance } from "./pages";
import AuthLayout from "./layout/AuthLayout";

// Dashboard and UI components
import NotFound from "./pages/OtherPage/NotFound";
import { Alerts, Avatars, Badges, Buttons, Images, Videos } from "./pages/UiElements";
import { LineChart, BarChart } from "./pages/Charts";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import InstituteLayout from "./layout/Institute/AppLayout";
import StudentLayout from "./layout/Student/AppLayout";
import TeacherLayout from "./layout/Teachers/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Dashboard from "./pages/Dashboard/Dashboard";
import GiveAttendancePage from "./pages/GiveAttendance";
import axios from "axios";
import { useDispatch } from "react-redux";
import { login } from "./features/authSlice";

const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = React.useState(true);

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
    }, 1500);
  }, []);

  return loading ? (
    <div className="flex flex-col justify-center items-center h-screen text-white bg-[#030712]">
      <div className="loading loading-spinner h-16 w-16 bg-blue-700"></div>
      <div className="mt-4 text-lg">Loding......</div>
    </div>
  ) : (
    <>
      <ScrollToTop />
      {/* Global Navbar from public pages */}

      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/signin" element={<PublicSignin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/student/signup" element={<StudentSignup />} />
          <Route path="/teacher/signup" element={<TeacherSignup />} />
          <Route path="/institute/signup" element={<InstituteSignup />} />
          <Route path="/logout" element={<Logout />} />
        </Route>

        {/* Dashboard Layout */}
        <Route path="/teachers" element={<InstituteLayout />}>
          {/* Dashboard Home */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Other Dashboard / UI Routes */}
          <Route path="profile" element={<UserProfiles />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="blank" element={<Blank />} />
          <Route path="take-attendance" element={<TakeAttendance />} />
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
        <Route path="/students" element={<StudentLayout />}>
          {/* Dashboard Home */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Other Dashboard / UI Routes */}
          <Route path="profile" element={<UserProfiles />} />
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
        <Route path="/institute" element={<TeacherLayout />}>
          {/* Dashboard Home */}
          <Route path="dashboard" element={<Dashboard />} />

          {/* Other Dashboard / UI Routes */}
          <Route path="profile" element={<UserProfiles />} />
          <Route path="calendar" element={<Calendar />} />
          <Route path="blank" element={<Blank />} />
          <Route path="take-attendance" element={<Blank />} />
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
        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
      </>
  );
}

export default App;

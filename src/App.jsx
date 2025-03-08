import React from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";

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
} from "./components";
import { GetStarted, Home } from "./pages";
import AuthLayout from "./layout/AuthLayout";

// Dashboard and UI components
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Videos from "./pages/UiElements/Videos";
import Images from "./pages/UiElements/Images";
import Alerts from "./pages/UiElements/Alerts";
import Badges from "./pages/UiElements/Badges";
import Avatars from "./pages/UiElements/Avatars";
import Buttons from "./pages/UiElements/Buttons";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import Calendar from "./pages/Calendar";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/Institute/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Dashboard from "./pages/Dashboard/Dashboard";

const PublicLayout = () => (
  <>
    <Navbar />
    <Outlet />
  </>
);

function App() {
  return (
    <BrowserRouter>
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
        </Route>

        {/* Dashboard Layout */}
        <Route element={<AppLayout />}>
          {/* Dashboard Home */}
          <Route path="/dashboard" element={<Dashboard />} />

          {/* Other Dashboard / UI Routes */}
          <Route path="/profile" element={<UserProfiles />} />
          <Route path="/calendar" element={<Calendar />} />
          <Route path="/blank" element={<Blank />} />
          <Route path="/take-attendance" element={<Blank />} />
          <Route path="/attendance-overview" element={<Blank />} />
          <Route path="/reports" element={<Blank />} />
          <Route path="/settings" element={<Blank />} />
          <Route path="/form-elements" element={<FormElements />} />
          <Route path="/basic-tables" element={<BasicTables />} />
          <Route path="/alerts" element={<Alerts />} />
          <Route path="/avatars" element={<Avatars />} />
          <Route path="/badge" element={<Badges />} />
          <Route path="/buttons" element={<Buttons />} />
          <Route path="/images" element={<Images />} />
          <Route path="/videos" element={<Videos />} />
          <Route path="/line-chart" element={<LineChart />} />
          <Route path="/bar-chart" element={<BarChart />} />
        </Route>

        {/* Fallback Route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

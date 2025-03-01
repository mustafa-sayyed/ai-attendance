import React from "react";
import {
  About,
  Contact,
  ForgotPassword,
  HowItWorks,
  InstituteSignup,
  Navbar,
  Pricing,
  Signin,
  StudentSignup,
  TeacherSignup,
} from "./components";
import { GetStarted, Home } from "./pages";
import { Routes, Route, BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <div className="bg-[#030712] text-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/get-started" element={<GetStarted />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/contact-us" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/student/signup" element={<StudentSignup />} />
          <Route path="/teacher/signup" element={<TeacherSignup />} />
          <Route path="/institute/signup" element={<InstituteSignup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

import React from "react";
import { Contact, Navbar, Pricing } from "./components";
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
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

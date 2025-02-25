import React from "react";

function CTA() {
  return (
    <section className="h-[70vh] bg-linear-to-b from-[#030712] to-blue-800 " 
    >
      <div className="flex flex-col items-center justify-center h-full w-full">
        <h2 className="lg:text-5xl md:text-4xl sm:text-4xl font-[Mona sans] text-3xl font-bold text-white text-center">
          Streamline Your Attendance with AI
        </h2>
        <p className="mt-4 md:text-2xl text-xl text-white">Ready to get started?</p>
        <a href="/signin">
          <button
            className="mt-6 px-6 py-3 text-white bg-linear-90 from-[#030712] to-blue-600 rounded-full hover:from-[#030712] hover:to-blue-700 cursor-pointer"
            >
            Get Started
          </button>
        </a>
      </div>
    </section>
  );
}

export default CTA;

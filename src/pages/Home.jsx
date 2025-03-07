import React from "react";
import { CTA, FeatureBlock, Footer, Hero } from "../components";

function Home() {
  return (
    <div className="bg-[#030712] text-white">
      <Hero />
      <FeatureBlock />
      <CTA />
      <Footer />
    </div>
  );
}

export default Home;

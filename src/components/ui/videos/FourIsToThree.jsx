import React from "react";

const FourIsToThree = ({ src }) => {
  return (
    <div className="video-container">
      <video src={src} controls />
    </div>
  );
};

export default FourIsToThree;

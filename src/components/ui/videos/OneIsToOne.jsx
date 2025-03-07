import React from "react";

const OneIsToOne = ({ src }) => {
  return (
    <div className="video-container">
      <video src={src} controls />
    </div>
  );
};

export default OneIsToOne;

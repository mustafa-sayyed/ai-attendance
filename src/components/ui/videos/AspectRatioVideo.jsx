import React from "react";

const AspectRatioVideo = ({ src, aspectRatio }) => {
  return (
    <div className={`video-container aspect-ratio-${aspectRatio}`}>
      <video src={src} controls />
    </div>
  );
};

export default AspectRatioVideo;

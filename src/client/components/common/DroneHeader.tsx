// src/components/common/ServiceHeader.tsx

import React from "react";

interface ServiceHeaderProps {
  title: string;
  //   video: string;
}

const ServiceHeader: React.FC<ServiceHeaderProps> = ({ title }) => {
  return (
    <div className="relative w-full h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background video */}
      <video
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline
      >
        <source
          src="https://res.cloudinary.com/dnh4lkqlw/video/upload/v1759071332/Waterfall_drone_clip__zo1hp0.mp4"
          type="video/mp4"
        />
      </video>
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Title */}
      <h1 className="relative z-10 text-4xl md:text-6xl font-extrabold text-white text-center px-6 drop-shadow-2xl tracking-wide">
        {title}
      </h1>
    </div>
  );
};

export default ServiceHeader;

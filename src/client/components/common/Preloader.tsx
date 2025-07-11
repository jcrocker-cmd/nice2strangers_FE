// import React from "react";
// import smileyLogo from "../../assets/img/logo.png"; // adjust path if needed
// import "../../assets/css/main.css";

// const SmileyPreloader: React.FC = () => {
//   return (
//     <div className="flex items-center justify-center h-screen bg-black preloader-wrapper ">
//       <div className="relative w-36 h-36">
//         {/* Spinning ring */}
//         <div className="absolute inset-4 border-4 border-t-yellow-400 border-white/10 rounded-full animate-spin"></div>

//         {/* Center logo */}
//         <img
//           src={smileyLogo}
//           alt="Smiley Logo"
//           className="absolute w-24 h-24 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
//         />
//       </div>
//     </div>
//   );
// };

// export default SmileyPreloader;

import React, { useState, useEffect } from "react";
import smileyLogo from "../../../assets/img/logo.png"; // adjust path if needed
import "../../../assets/css/main.css";

const SmileyPreloader: React.FC = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Start fade-out after 3 seconds
    const timer = setTimeout(() => {
      setFadeOut(true); // Trigger fade-out animation
    }, 3000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  return (
    <div
      className={`preloader-wrapper flex items-center justify-center h-screen bg-black ${
        fadeOut ? "fade-out" : ""
      }`}
    >
      <div className="relative w-36 h-36">
        {/* Spinning ring */}
        <div className="absolute inset-5 border-4 border-t-yellow-400 border-white/10 rounded-full animate-spin"></div>

        {/* Center logo */}
        <img
          src={smileyLogo}
          alt="Smiley Logo"
          className="absolute w-24 h-24 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        />
      </div>
    </div>
  );
};

export default SmileyPreloader;

import "../../../assets/css/main.css";
//import droneVideo from "https://res.cloudinary.com/dnh4lkqlw/video/upload/v1759071332/Waterfall_drone_clip__zo1hp0.mp4";
import { Link } from "react-router-dom";

interface DroneServiceCardProps {
  title?: string;
  description?: string;
  buttonText?: string;
}

const DroneServiceCard = ({
  title = "Drone Service",
  description = "Aerial photography, video & mapping",
  buttonText = "GET A QUOTE",
}: DroneServiceCardProps) => {
  return (
    <div className="relative w-[350px] md:w-[720px] h-[350px] rounded-xl overflow-hidden shadow-lg">
      {/* Video Background */}
      <video
        className="w-full h-full object-cover"
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

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-6 py-6 md:px-10 md:py-10">
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
          {title}
        </h2>
        <p className="text-sm md:text-lg text-white/80 mb-4">{description}</p>
        <Link
          to="/drone-services"
          className="bg-[#E1A451] text-white font-bold text-sm py-2 px-4 rounded hover:bg-[#c8954e]"
        >
          {buttonText}
        </Link>
      </div>
    </div>
  );
};

export default DroneServiceCard;

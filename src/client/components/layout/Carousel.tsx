import React, { useState, useEffect } from "react";
import Section from "../common/Section";
import Slide_1 from "../../../assets/img/image4.webp";
import Slide_2 from "../../../assets/img/image5.webp";
import Slide_3 from "../../../assets/img/image6.webp";
import { Link } from "react-router-dom";

interface Slide {
  id: number;
  image: string;
  alt: string;
  heading: string;
  buttonText?: string;
  link?: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: Slide_1,
    alt: "Slide 1",
    heading: "Capture stunning aerial views with our drones",
    buttonText: "GET A QUOTE",
    link: "/drone-services",
  },
  {
    id: 2,
    image: Slide_2,
    alt: "Slide 2",
    heading: "Turning creativity into impact across social platforms.",
    buttonText: "DISCOVER",
    link: "/social-media-creation",
  },
  {
    id: 3,
    image: Slide_3,
    alt: "Slide 3",
    heading: "Turning raw clips into stories that connect.",
    buttonText: "GET STARTED",
    link: "/video-editing",
  },
];

const CustomCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Section id="carousel-page" className="mt-[80px]">
      <div className="relative w-full overflow-hidden h-[90vh] font-grotesk">
        {/* Slide Track */}
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div
              key={slide.id}
              className="w-full flex-shrink-0 h-full relative"
            >
              {/* Slide Image */}
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />

              {/* Dark overlay + text + button */}
              <div className="absolute inset-0 bg-black/50 flex flex-col justify-center items-center text-center px-4 sm:px-6 md:px-10">
                <h2 className="text-white  sm:text-lg md:text-2xl lg:text-3xl mb-4 leading-snug max-w-2xl font-light">
                  {slide.heading}
                </h2>
                {slide.buttonText && (
                  <Link to={slide.link || "#"}>
                    <button className="bg-[#E1A451] text-white font-bold text-lg sm:text-xl md:text-xl py-3 px-8 md:py-4 md:px-10 rounded hover:bg-[#c8954e]">
                      {slide.buttonText}
                    </button>
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 absolute bottom-4 left-1/2 transform -translate-x-1/2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full cursor-pointer ${
                index === currentIndex ? "bg-gray-800" : "bg-gray-400"
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </div>
    </Section>
  );
};

export default CustomCarousel;

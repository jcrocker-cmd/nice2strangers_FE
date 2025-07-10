import React, { useState, useEffect } from "react";
import Section from "../common/Section";
import Slide_1 from "../../../assets/img/image1.png";
import Slide_2 from "../../../assets/img/image2.png";
import Slide_3 from "../../../assets/img/image3.png";

interface Slide {
  id: number;
  image: string;
  alt: string;
}

const slides: Slide[] = [
  { id: 1, image: Slide_1, alt: "Slide 1" },
  { id: 2, image: Slide_2, alt: "Slide 2" },
  { id: 3, image: Slide_3, alt: "Slide 3" },
];

const CustomCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  //   const goToPrev = () => {
  //     setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  //   };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Section id="carousel-page">
      <div className="relative w-full overflow-hidden h-screen">
        {/* Slide Track */}
        <div
          className="flex transition-transform duration-700 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {slides.map((slide) => (
            <div key={slide.id} className="w-full flex-shrink-0 h-full">
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        {/* Dots */}
        <div className="flex justify-center mt-4 gap-2 absolute bottom-4 left-1/2 transform -translate-x-1/2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-2 h-2 rounded-full ${
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

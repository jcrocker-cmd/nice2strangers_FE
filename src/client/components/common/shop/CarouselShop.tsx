import React, { useState, useEffect } from "react";
import Slide_1 from "../../../../assets/img/image1.webp";
import Slide_2 from "../../../../assets/img/image1.webp";
import Slide_3 from "../../../../assets/img/image1.webp";

interface Slide {
  id: number;
  image: string;
  alt: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
}

const slides: Slide[] = [
  {
    id: 1,
    image: Slide_1,
    alt: "Slide 1",
    title: "Fresh Arrivals",
    description: "Check out the latest collection of T-shirts now available.",
    buttonText: "Shop Now",
    buttonLink: "/shop-page",
  },
  {
    id: 2,
    image: Slide_2,
    alt: "Slide 2",
    title: "Stylish Shoes",
    description: "Comfort and style combined — explore our new shoe line.",
    buttonText: "Explore Shoes",
    buttonLink: "/shoes",
  },
  {
    id: 3,
    image: Slide_3,
    alt: "Slide 3",
    title: "Top Picks",
    description: "Discover the most popular items loved by our customers.",
    buttonText: "View Collection",
    buttonLink: "/collection",
  },
];

interface CarouselProps {
  height?: string; // Tailwind height class
}

const CustomCarousel: React.FC<CarouselProps> = ({ height = "h-[500px]" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  useEffect(() => {
    const interval = setInterval(goToNext, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`relative w-full overflow-hidden rounded-2xl ${height}`}>
      {/* Slide Track */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-full flex-shrink-0 h-full relative overflow-hidden rounded-2xl"
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />

            {/* Text Overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-start px-10 bg-black/40 text-white rounded-2xl">
              <h2 className="text-4xl font-bold mb-3">{slide.title}</h2>
              <p className="text-lg mb-5 max-w-md">{slide.description}</p>
              <a
                href={slide.buttonLink}
                className="bg-yellow-500 text-2xl hover:bg-yellow-600 text-black px-6 py-2 rounded-lg font-semibold transition"
              >
                {slide.buttonText}
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Dots */}
      <div className="flex justify-center mt-4 gap-2 absolute bottom-4 left-1/2 transform -translate-x-1/2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full ${
              index === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default CustomCarousel;

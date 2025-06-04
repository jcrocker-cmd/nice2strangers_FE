// components/SplideCarousel.tsx
import React from "react";
import "@splidejs/react-splide/css";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import Wrapper from "../common/Wrapper";
import Section from "../common/Section";
import { SocialIcon } from "react-social-icons";
import img1 from "../../assets/img/w_1.png";
import img2 from "../../assets/img/w_2.png";
import img3 from "../../assets/img/w_3.png";
import "../../assets/css/main.css";

const dummyImages = [img1, img2, img3, img1, img2, img3];

const socialLinks = [
  { name: "Facebook", url: "https://www.facebook.com/yourusername" },
  { name: "YouTube", url: "https://www.youtube.com/yourchannel" },
  { name: "TikTok", url: "https://www.tiktok.com/@yourusername" },
  { name: "Instagram", url: "https://www.instagram.com/yourusername" },
];

const SplideCarousel: React.FC = () => {
  return (
    <Wrapper
      id="watch-page"
      className="bg-gradient-to-tr from-black to-gray-600 h-auto"
    >
      <Section className="watch-section max-w-6xl mx-auto px-4 py-20">
        <h1 className="text-white text-4xl font-bold text-center">
          Watch My Contents
        </h1>
        {/* Social Links */}
        <div className="flex justify-center space-x-8 mb-10 mt-8">
          {socialLinks.map(({ name, url }) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Watch on ${name}`}
              className="transform transition-transform hover:scale-110"
            >
              <SocialIcon
                url={url}
                fgColor="#fff"
                style={{ height: 40, width: 40 }}
              />
            </a>
          ))}
        </div>
        <Splide
          options={{
            type: "loop",
            perPage: 3,
            focus: "center",
            gap: "2rem",
            autoplay: true,
            interval: 3000,
            pagination: false,
            arrows: true,
            breakpoints: {
              1024: { perPage: 2 },
              640: { perPage: 1 },
            },
          }}
          className="relative"
        >
          {dummyImages.map((src, index) => (
            <SplideSlide key={index}>
              <div className="rounded-2xl overflow-hidden w-full max-w-md mx-auto aspect-[3/4] bg-black cursor-pointer">
                <img
                  src={src}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </Section>
    </Wrapper>
  );
};

export default SplideCarousel;

import { useEffect, useState } from "react";
import ScrollReveal from "scrollreveal";
import Wrapper from "../common/Wrapper";
import Section from "../common/Section";
import "../../../assets/css/main.css";
import Marquee from "react-fast-marquee";

const categories = [
  "All Products",
  "Shoes",
  "Caps",
  "Women",
  "T-shirts",
  "Men",
];

const Footer = () => {
  const [activeCategory, setActiveCategory] = useState(0); // ← now using index

  useEffect(() => {
    ScrollReveal().reveal(".shop-section", {
      delay: 400,
      duration: 1000,
      distance: "50px",
      origin: "bottom",
    });
  }, []);

  return (
    <>
      <div className="bg-[#f5c518] p-4 font-grotesk font-semibold text-center">
        The ONLY Official Nice2strangers Merch Store
      </div>

      <Wrapper id="shop-header" className="w-full py-15 text-black">
        <Section className="shop-section max-w-[1080px] mx-auto px-10 py-16 rounded-4xl">
          <h1 className="text-6xl text-center font-extrabold">Shop</h1>

          <div className="shop-buttons flex justify-center mt-10 gap-3 flex-wrap">
            {categories.map((category, index) => (
              <button
                key={category}
                onClick={() => setActiveCategory(index)}
                className={`border border-black cursor-pointer px-5 py-2 rounded-lg transition duration-200 ${
                  activeCategory === index
                    ? "bg-black text-white"
                    : "text-black"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </Section>
      </Wrapper>

      <Marquee
        direction="right"
        speed={50}
        gradient={false}
        className="bg-[#f5c518] text-black font-grotesk font-semibold text-center p-4"
      >
        <div className="font-bold font-poppins text-5xl mx-10 whitespace-nowrap">
          🛍️ LIMITED TIME OFFER — GRAB YOUR FAVORITES NOW!
        </div>
        <div className="font-bold font-poppins text-5xl mx-10 whitespace-nowrap">
          ⏳ ONLY FEW LEFT IN STOCK!
        </div>
        <div className="font-bold font-poppins text-5xl mx-10 whitespace-nowrap">
          🔥 ORDER NOW!
        </div>
      </Marquee>
    </>
  );
};

export default Footer;

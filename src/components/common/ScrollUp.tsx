import { useState, useEffect } from "react";
import { IoIosArrowUp } from "react-icons/io";
import "../../assets/css/main.css";

const ScrollUp = () => {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > window.innerHeight * 1.2) {
        setShowScroll(true);
      } else {
        setShowScroll(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div>
      <a
        href="#"
        className={`scrollup ${showScroll ? "show-scroll" : ""}`}
        id="scroll-up"
        onClick={(e) => {
          e.preventDefault(); // Prevent default anchor behavior
          scrollToTop();
        }}
        aria-label="Scroll to top of the page"
      >
        <IoIosArrowUp className="scrollup-icon text-xl" />
      </a>
    </div>
  );
};

export default ScrollUp;

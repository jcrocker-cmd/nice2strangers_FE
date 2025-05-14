import "../../assets/css/navbar.css";
import logo from "../../assets/img/logo.png";
import { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
import Section from "../common/Section";
// State
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "../state/store";
// import { toggleMenu, closeMenu } from "../state/navbar/navbarSlice";

function Navbar() {
  // const dispatch = useDispatch<lippDispatch>();
  // const isOpen = useSelector((state: RootState) => state.navbar.isOpen);
  const [isSticky, setIsSticky] = useState(false);
  // const location = useLocation();

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <Section className={`navbar-wrapper ${isSticky ? "sticky" : ""}`}>
      <nav className="navbar mx-auto max-w-[1080px]">
        <ul className="nav-left flex w-1/2 justify-end navbar-links">
          <li className="nav-link">Home</li>
          <li
            className="nav-link"
            onClick={() => scrollToSection("about-page")}
          >
            About
          </li>
          <li
            className="nav-link"
            onClick={() => scrollToSection("services-page")}
          >
            Services
          </li>
        </ul>

        {/* <div className="logo-wrapper"> */}
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        {/* </div> */}
        <ul className="nav-right flex w-1/2 navbar-links">
          <li className="nav-link ">Watch</li>
          <li
            className="nav-link"
            onClick={() => scrollToSection("contact-page")}
          >
            Contact
          </li>
          <span className="shop-button">Shop</span>
        </ul>
      </nav>
    </Section>
  );
}

export default Navbar;

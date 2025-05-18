import { Link } from "react-router-dom";
import logo from "../../assets/img/logo.png";

interface NavbarMobileMenuProps {
  toggleMenu: () => void;
}

const NavbarMobile = ({ toggleMenu }: NavbarMobileMenuProps) => {
  return (
    <>
      <div className="fullscreen-menu">
        <Link to="/">
          {" "}
          <img src={logo} alt="logo" className="w-[100px]" />
        </Link>
        <button className="close-button" onClick={toggleMenu}>
          ✕
        </button>
        <ul>
          <li>
            <Link to="/about-us">About Us</Link>
          </li>
          <li>
            <Link to="/services" onClick={toggleMenu}>
              Services
            </Link>
          </li>
          <li>
            <Link to="/ministries" onClick={toggleMenu}>
              Ministries
            </Link>
          </li>
          <li>
            <a href="/gallery" onClick={toggleMenu}>
              Gallery
            </a>
          </li>
          <li>
            <Link to="/contact-us" onClick={toggleMenu}>
              Contact Us
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default NavbarMobile;

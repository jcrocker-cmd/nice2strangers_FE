import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { HiOutlineShoppingCart } from "react-icons/hi2";
import { RiMenuFill } from "react-icons/ri";
import logo from "../../../../assets/img/logo.png";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="sticky top-0 w-full z-[9999]">
      <div
        className={`w-full transition-all duration-300 ${
          isSticky ? "bg-white shadow-md" : "bg-transparent"
        }`}
      >
        {/* Official Bar */}
        <div
          className={`bg-[#f5c518] text-center font-grotesk font-semibold text-black 
          transition-all duration-300 overflow-hidden 
          max-h-20 opacity-100 py-3
          text-sm
        `}
        >
          The ONLY Official Nice2strangers Merch Store
        </div>

        {/* Navbar */}
        <nav className="max-w-[1280px] mx-auto flex items-center px-6 py-4 font-poppins font-light">
          {/* Left: Logo (20%) */}
          <div className="basis-[20%] flex-shrink-0">
            <Link to="/" className="flex-shrink-0">
              <img src={logo} alt="Logo" className="h-12" />
            </Link>
          </div>

          {/* Center: Links (60%) */}
          <ul className="basis-[60%] hidden md:flex justify-center gap-8 text-lg font-normal">
            <li>
              <Link to="/" className="hover:text-yellow-500 transition">
                All Products
              </Link>
            </li>
            <li>
              <Link to="/about" className="hover:text-yellow-500 transition">
                Shoes
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-yellow-500 transition">
                Caps
              </Link>
            </li>
            <li>
              <Link to="/services" className="hover:text-yellow-500 transition">
                T-Shirts
              </Link>
            </li>
          </ul>

          {/* Right: Icons (20%) */}
          <ul className="basis-[20%] hidden md:flex justify-end gap-6 text-2xl items-center">
            <li>
              <Link to="/login" className="hover:text-yellow-500 transition">
                <FaUser />
              </Link>
            </li>
            <li>
              <Link
                to="/shop-page"
                className="hover:text-yellow-500 transition"
              >
                <HiOutlineShoppingCart />
              </Link>
            </li>
          </ul>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-2xl ml-auto"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <RiMenuFill />
          </button>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-white shadow-lg px-6 py-4 space-y-4">
            <Link to="/" className="block hover:text-yellow-500">
              Home
            </Link>
            <Link to="/about" className="block hover:text-yellow-500">
              About
            </Link>
            <Link to="/services" className="block hover:text-yellow-500">
              Services
            </Link>
            <Link to="/watch" className="block hover:text-yellow-500">
              Watch
            </Link>
            <Link to="/contact" className="block hover:text-yellow-500">
              Contact
            </Link>
            <Link
              to="/shop-page"
              className="block flex items-center gap-2 hover:text-yellow-500"
            >
              <HiOutlineShoppingCart /> Shop
            </Link>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;

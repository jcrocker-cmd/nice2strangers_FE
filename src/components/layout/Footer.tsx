import { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import Wrapper from "../common/Wrapper";
import Section from "../common/Section";
import logo from "../../assets/img/logo.png";
import "../../assets/css/main.css";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
} from "react-icons/fa6";

const Footer = () => {
  useEffect(() => {
    ScrollReveal().reveal(".footer-section", {
      delay: 400,
      duration: 2000,
      distance: "50px",
      origin: "bottom",
    });
  }, []);
  return (
    <Wrapper id="footer-page" className="w-full py-20 bg-[#F7F0D7] text-black">
      <Section className="footer-section max-w-[1080px] mx-auto px-10 py-10 rounded-4xl ">
        <img src={logo} alt="Logo" className="h-20 mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-16 border-b border-[#575252]/20">
          <div>
            <h3 className="mb-6 font-semibold text-2xl">Company</h3>

            <ul className="space-y-2 text-base">
              <li>
                <a href="#">Websites</a>
              </li>
              <li>
                <a href="#">Collections</a>
              </li>
              <li>
                <a href="#">Elements</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 font-semibold text-2xl">Company</h3>
            <ul className="space-y-2 text-base">
              <li>
                <a href="#">Academy</a>
              </li>
              <li>
                <a href="#">Jobs</a>
              </li>
              <li>
                <a href="#">Market</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 font-semibold text-2xl">Help</h3>
            <ul className="space-y-2 text-base">
              <li>
                <a href="#">FAQs</a>
              </li>
              <li>
                <a href="#">About Us</a>
              </li>
              <li>
                <a href="#">Contact Us</a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-between">
            <div>
              <p className="uppercase text-sm tracking-widest">
                Got something in mind?
              </p>
              <h2 className="text-4xl font-bold mt-2">Let's talk</h2>
            </div>
            <div className="flex space-x-4 mt-6">
              <a href="#">
                <FaFacebookF />
              </a>
              <a href="#">
                <FaXTwitter />
              </a>
              <a href="#">
                <FaInstagram />
              </a>
              <a href="#">
                <FaYoutube />
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2  justify-between items-center text-xs text-black/70 mt-6">
          <div className="flex space-x-4">
            Copyright &copy; nice2strangers 2025 All rights reserved.
          </div>

          <div className="flex space-x-4 justify-end">
            <a href="#">Cookies Policy</a>
            <a href="#">Legal Terms</a>
            <a href="#">Privacy Policy</a>
          </div>
        </div>
      </Section>
    </Wrapper>
  );
};

export default Footer;

import { useEffect, useState } from "react";
import ScrollReveal from "scrollreveal";
import Wrapper from "./Wrapper";
import Section from "./Section";
import logo from "../../../assets/img/logo.png";
import "../../../assets/css/main.css";
import axios from "axios";
import { ApiRoutes } from "../../../constants/constants";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa6";

interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  youtube?: string;
  tiktok?: string;
}

const Footer = () => {
  const [links, setLinks] = useState<SocialLinks>({});

  useEffect(() => {
    ScrollReveal().reveal(".footer-section", {
      delay: 400,
      duration: 2000,
      distance: "50px",
      origin: "bottom",
    });

    const fetchLinks = async () => {
      try {
        const res = await axios.get(ApiRoutes.SocialLinks.getAll);
        setLinks(res.data);
      } catch (err) {
        console.error("Failed to fetch social links", err);
      }
    };

    fetchLinks();
  }, []);
  return (
    <Wrapper id="footer-page" className="w-full py-20 bg-[#F7F0D7] text-black ">
      <Section className="footer-section max-w-[1080px] mx-auto px-10 py-10 rounded-4xl ">
        <img src={logo} alt="Logo" className="h-20 mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 pb-16 border-b border-[#575252]/20">
          <div>
            <h3 className="mb-6 font-semibold text-2xl">General</h3>

            <ul className="space-y-2 text-base">
              <li>
                <a href="/">Home Page</a>
              </li>
              <li>
                <a href="/shop-page">Shop Page</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 font-semibold text-2xl">Services</h3>
            <ul className="space-y-2 text-base">
              <li>
                <a href="/social-media-consulting">Social Media Consulting</a>
              </li>
              <li>
                <a href="/social-media-creation">Social Media Creation</a>
              </li>
              <li>
                <a href="/video-editing">Video Editing</a>
              </li>
              <li>
                <a href="/drone-services">Drone Services</a>
              </li>
              <li>
                <a href="/software-creation">Software Creation</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-6 font-semibold text-2xl">Help</h3>
            <ul className="space-y-2 text-base">
              <li>
                <a href="/faqs">FAQs</a>
              </li>
              <li>
                <a href="/about-us">About Us</a>
              </li>
              <li>
                <a href="/contact">Contact Us</a>
              </li>
            </ul>
          </div>

          <div className="flex flex-col">
            <div>
              <p className="uppercase text-sm tracking-widest">
                Got something in mind?
              </p>
              <h2 className="text-4xl font-bold mt-2">Let's talk</h2>
            </div>
            <div className="flex space-x-4 mt-6 text-xl">
              <a
                href={links.facebook || "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FaFacebookF />
              </a>
              <a
                href={links.twitter || "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <FaXTwitter />
              </a>
              <a
                href={links.instagram || "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FaInstagram />
              </a>
              <a
                href={links.youtube || "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <FaYoutube />
              </a>
              <a
                href={links.tiktok || "#"}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <FaTiktok />
              </a>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-black/70 mt-6 gap-2 text-center">
          <div className="space-x-4">
            Copyright &copy; nice2strangers 2025 All rights reserved.
          </div>

          <div className="flex space-x-4">
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

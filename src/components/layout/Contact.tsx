import { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import React from "react";
import icon from "../../assets/img/icon.png";
import Section from "../common/Section";
import Wrapper from "../common/Wrapper";
import "../../assets/css/main.css";

const ContactForm: React.FC = () => {
  useEffect(() => {
    ScrollReveal().reveal(".contact-container", {
      delay: 400,
      duration: 2000,
      distance: "50px",
      origin: "bottom",
    });
  }, []);
  return (
    <Wrapper
      id="contact-page"
      className="bg-[#F7F0D7] flex flex-col items-center justify-center px-4"
    >
      <Section className="contact-section mx-auto max-w-[1080px] relative flex flex-col items-center justify-center py-20">
        <h1 className="text-4xl md:text-4xl font-bold mb-10 text-black text-center">
          Contact Us!
        </h1>

        <div className="relative contact-container bg-[#F5E3A1] rounded-2xl p-6 md:p-10 w-full shadow-lg mt-25">
          {/* Floating Emoji */}
          <div className="absolute -top-22 left-1/2 transform -translate-x-1/2">
            <img src={icon} alt="emoji" className="w-40 " />
          </div>

          <form className="pt-10 space-y-5 w-[350px]">
            <div>
              <label className="block text-black ">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="mt-1 w-full bg-white rounded-xl border-none px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div>
              <label className="block text-black ">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="mt-1 w-full bg-white rounded-xl border-none px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <div>
              <label className="block text-black ">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                rows={4}
                className="mt-1 w-full bg-white rounded-xl border-none px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#e0a44d] cursor-pointer text-white  py-2 rounded-md transition-all duration-200"
            >
              SUBMIT
            </button>
          </form>
        </div>
      </Section>
    </Wrapper>
  );
};

export default ContactForm;

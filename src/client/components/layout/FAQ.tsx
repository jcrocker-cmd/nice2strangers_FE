import { useEffect, useState } from "react";
import axios from "axios";
import ScrollReveal from "scrollreveal";
import { ChevronDown, ChevronUp } from "lucide-react";
import Wrapper from "../common/Wrapper";
import Section from "../common/Section";
import "../../../assets/css/main.css";
import { ApiRoutes } from "../../../constants/constants";

interface FAQ {
  id: string;
  question: string;
  answer: string;
  isActive: boolean;
  createdDate?: string;
}

const FAQs = () => {
  const [faqs, setFaqs] = useState<FAQ[]>([]);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Fetch FAQs from backend
  const fetchFAQs = async () => {
    try {
      const res = await axios.get(ApiRoutes.FAQs.getFAQs);
      setFaqs(res.data);
    } catch (error) {
      console.error("Error fetching FAQs:", error);
    }
  };

  // Reveal animation
  useEffect(() => {
    ScrollReveal().reveal(".faq-row", {
      delay: 200,
      duration: 1500,
      distance: "40px",
      origin: "bottom",
      interval: 100,
    });
    fetchFAQs();
  }, []);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const activeFaqs = faqs.filter((faq) => faq.isActive === true);

  return (
    <Wrapper
      id="faq-page"
      className="faq-wrapper w-full py-20 bg-[#F5E3A1] text-black"
    >
      <Section className="faq-section font-grotesk max-w-[900px] mx-auto px-6 md:px-10 py-10 flex flex-col justify-center items-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-10 text-black text-center leading-tight">
          Frequently Asked Questions
        </h1>

        <div className="faq-container w-full flex flex-col gap-4">
          {activeFaqs.length === 0 ? (
            <p className="text-gray-500 text-center">No FAQs available yet.</p>
          ) : (
            activeFaqs.map((faq, index) => (
              <div
                key={faq.id}
                className="faq-row bg-white rounded-xl shadow-md transition-all duration-300"
              >
                {/* Question button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center px-6 py-4 text-left focus:outline-none cursor-pointer"
                >
                  <span className="font-medium text-lg md:text-xl">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`text-[#E1A451] transform transition-transform duration-300 ${
                      openIndex === index ? "rotate-180" : "rotate-0"
                    }`}
                    size={24}
                  />
                </button>

                {/* Answer dropdown */}
                <div
                  className={`overflow-hidden transition-[max-height] duration-500 ease-in-out ${
                    openIndex === index ? "max-h-96" : "max-h-0"
                  }`}
                >
                  <div className="px-6 pb-4 text-gray-700 text-sm md:text-base border-t border-gray-200">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Section>
    </Wrapper>
  );
};

export default FAQs;

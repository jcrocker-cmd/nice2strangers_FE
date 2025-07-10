import Wrapper from "../common/Wrapper";
import Section from "../common/Section";
import "../../../assets/css/main.css";

const NewsletterSignup = () => {
  return (
    <Wrapper className="bg-[#F59E0B] text-white w-full py-12 px-4">
      <Section className="newsletter-section mx-auto text-center max-w-[1080px]">
        <h2 className="text-3xl font-bold mb-4">Subscribe To Our Newsletter</h2>
        <p className="mb-6 text-sm md:text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nunc
          justo, sagittis suscipit ultricies at, varius non velit.
        </p>
        <form className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="text"
            placeholder="Enter your name"
            className="px-4 py-2 w-full sm:w-1/3 rounded border-1 border-white text-white focus:outline-none"
          />
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-2 w-full sm:w-1/3 rounded border-1 border-white text-white focus:outline-none"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-white text-gray-900 font-semibold rounded hover:bg-gray-200 transition"
          >
            SUBMIT
          </button>
        </form>
      </Section>
    </Wrapper>
  );
};

export default NewsletterSignup;

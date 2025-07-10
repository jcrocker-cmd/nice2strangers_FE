import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import Aboutpage from "./About";
import ContactForm from "./Contact";
import Carousel from "./Carousel";
import Services from "./Services";
import Section from "../common/Section";
import NewsletterSignup from "./Newsletter";
import GlideCarousel from "./GlideCarousel";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <Section id="home-page">
        <Carousel />
        <Aboutpage />
        <Services />
        <GlideCarousel />
        <ContactForm />
        <NewsletterSignup />
        <Footer />
      </Section>
    </>
  );
};

export default Homepage;

import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import Aboutpage from "../../components/layout/About";
import ContactForm from "../../components/layout/Contact";
import Carousel from "../../components/layout/Carousel";
import Services from "../../components/layout/Services";
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

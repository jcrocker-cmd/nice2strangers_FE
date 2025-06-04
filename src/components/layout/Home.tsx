import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Aboutpage from "../../components/layout/About";
import ContactForm from "../../components/layout/Contact";
import Carousel from "../../components/layout/Carousel";
import Services from "../../components/layout/Services";
import Section from "../common/Section";
import NewsletterSignup from "./Newsletter";
import GlideCarousel from "./Watch";

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

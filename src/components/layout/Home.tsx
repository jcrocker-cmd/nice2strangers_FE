import Navbar from "../../components/layout/Navbar";
import Footer from "../../components/layout/Footer";
import Aboutpage from "../../components/layout/About";
import ContactForm from "../../components/layout/Contact";
import Carousel from "../../components/layout/Carousel";
import Services from "../../components/layout/Services";
import Section from "../common/Section";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <Section id="home-page">
        <Carousel />
        <Aboutpage />
        <Services />
        <ContactForm />
        <Footer />
      </Section>
    </>
  );
};

export default Homepage;

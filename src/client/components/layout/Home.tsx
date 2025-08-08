import Navbar from "../common/Navbar";
import Footer from "../common/Footer";
import Aboutpage from "./About";
import ContactForm from "./Contact";
import Carousel from "./Carousel";
import Services from "./Services";
import Section from "../common/Section";
import NewsletterSignup from "./Newsletter";
import GlideCarousel from "./GlideCarousel";

interface HomepageProps{
  setIsGlobalLoading: (value: boolean) => void;
}

const Homepage = ({setIsGlobalLoading}: HomepageProps) => {
  
  
  return (
    <>
      <Navbar />
      <Section id="home-page">
        <Carousel />
        <Aboutpage />
        <Services />
        <GlideCarousel />
        <ContactForm setIsGlobalLoading={setIsGlobalLoading}/>
        <NewsletterSignup  setIsGlobalLoading={setIsGlobalLoading}/>
        <Footer />
      </Section>
    </>
  );
};

export default Homepage;

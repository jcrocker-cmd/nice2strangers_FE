import Navbar from "../components/layout/Navbar";
import TitlePage from "../components/common/Title";
import Footer from "../components/layout/Footer";
import BG from "../assets/img/contact-sample.webp"; // Assuming you have a background image

const SocialMediaConsulting = () => {
  return (
    <>
      <Navbar />
      <TitlePage titleText="Social Media Consulting" backgroundImageUrl={BG} />
      <Footer />
    </>
  );
};

export default SocialMediaConsulting;

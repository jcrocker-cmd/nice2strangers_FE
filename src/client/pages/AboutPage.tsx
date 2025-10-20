import Aboutpage from "../components/layout/About";
import Footer from "../components/common/Footer";
import Navbar from "./services/Navbar";

const AboutPage = () => {
  return (
    <>
      <Navbar />
      <div className="mt-20 md:mt-20 sm:mt-12">
        <Aboutpage />
        <Footer />
      </div>
    </>
  );
};

export default AboutPage;

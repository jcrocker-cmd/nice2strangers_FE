import GlideCarousel from "../components/layout/GlideCarousel";
import Footer from "../components/common/Footer";
import Navbar from "./services/Navbar";

const WatchPage = () => {
  return (
    <>
      <Navbar />
      <div className="mt-20 md:mt-20 sm:mt-12">
        <GlideCarousel />
        <Footer />
      </div>
    </>
  );
};

export default WatchPage;

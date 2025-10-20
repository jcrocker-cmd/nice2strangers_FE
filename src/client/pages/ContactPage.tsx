import Contact from "../components/layout/Contact";
import Footer from "../components/common/Footer";
import Navbar from "./services/Navbar";

interface HomepageProps {
  setIsGlobalLoading: (value: boolean) => void;
}

const ContactPage = ({ setIsGlobalLoading }: HomepageProps) => {
  return (
    <>
      <Navbar />
      <div className="mt-20 md:mt-20 sm:mt-12">
        <Contact setIsGlobalLoading={setIsGlobalLoading} />
        <Footer />
      </div>
    </>
  );
};

export default ContactPage;

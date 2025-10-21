import ServiceHeader from "../../components/common/ServiceHeader";
import ContactForm from "../../components/layout/Inquiry/VideoEditing";
import VideoHeaderImg from "../../../assets/img/image6.webp";
import Footer from "../../components/common/Footer";
import Navbar from "./Navbar";

const VideoEditingPage = () => {
  return (
    <div className="font-grotesk">
      <Navbar />
      <div className="mt-20 md:mt-16 sm:mt-12">
        <ServiceHeader
          title="Professional Video Editing Services"
          image={VideoHeaderImg}
        />
      </div>

      {/* Description */}
      <section className="max-w-[1080px] mx-auto px-6 py-16 text-center">
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          Our video editing service transforms your raw footage into a polished,
          cinematic experience. Whether you need edits for marketing campaigns,
          social media, or professional presentations, we deliver top-notch
          quality tailored to your vision. With attention to detail, creative
          transitions, and professional color grading, we make your content
          stand out.
        </p>
      </section>

      {/* Contact Form */}
      <div className="bg-gray-100 py-12">
        <ContactForm />
      </div>
      <Footer />
    </div>
  );
};

export default VideoEditingPage;

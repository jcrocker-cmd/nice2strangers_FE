import ServiceHeader from "../../components/common/ServiceHeader";
import ContactForm from "../../components/layout/Inquiry/SocialMediaCreation";
import VideoHeaderImg from "../../../assets/img/image4.png";
import Footer from "../../components/common/Footer";

const VideoEditingPage = () => {
  return (
    <div className="font-grotesk">
      {/* Header */}
      <ServiceHeader
        title="Social Media Content Creation"
        image={VideoHeaderImg}
      />

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

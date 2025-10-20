import ServiceHeader from "../../components/common/ServiceHeader";
import ContactForm from "../../components/layout/Inquiry/SocialMediaConsulting";
import VideoHeaderImg from "../../../assets/img/image5.png";
import Footer from "../../components/common/Footer";
import Navbar from "./Navbar";

const VideoEditingPage = () => {
  return (
    <div className="font-grotesk">
      <Navbar />
      <div className="mt-20 md:mt-16 sm:mt-12">
        <ServiceHeader title="Social Media Consulting" image={VideoHeaderImg} />
      </div>

      {/* Description */}
      <section className="max-w-[1080px] mx-auto px-6 py-16 text-center">
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
          Our social media content creation service is designed to help your
          brand stand out with engaging and high-quality visuals. From
          eye-catching graphics and professional videos to reels, stories, and
          ad creatives, we produce content that connects with your target
          audience. Whether you’re looking for consistent posting,
          campaign-specific material, or a full content strategy, we provide
          creative solutions that drive engagement and strengthen your online
          presence.
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

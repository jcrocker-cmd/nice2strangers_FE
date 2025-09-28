import ServiceHeader from "../../components/common/ServiceHeader";
import ContactForm from "../../components/layout/Inquiry/SoftwareCreation";
import VideoHeaderImg from "../../../assets/img/image5.png";
import Footer from "../../components/common/Footer";

const VideoEditingPage = () => {
  return (
    <div className="font-grotesk">
      {/* Header */}
      <ServiceHeader title="Website & App Creation" image={VideoHeaderImg} />

      {/* Description */}
      <section className="max-w-[1080px] mx-auto px-6 py-16 text-center">
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
          Our website and app creation service turns your vision into a fully
          functional digital product. Whether you need a responsive website, a
          mobile app, or a full-stack solution, we design and develop with
          performance, scalability, and user experience in mind. From concept to
          deployment, we ensure your digital presence works seamlessly across
          all devices.
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

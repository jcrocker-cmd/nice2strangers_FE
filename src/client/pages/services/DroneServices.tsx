import ServiceHeader from "../../components/common/DroneHeader";
import ContactForm from "../../components/layout/Inquiry/DroneServices";
import Footer from "../../components/common/Footer";
//import DroneVideo from "https://res.cloudinary.com/dnh4lkqlw/video/upload/v1759071332/Waterfall_drone_clip__zo1hp0.mp4";

const DroneServicesPage = () => {
  return (
    <div className="font-grotesk">
      {/* No image, no video → gradient header will be used */}
      <ServiceHeader title="Drone Services" />

      <section className="max-w-[1080px] mx-auto px-6 py-16 text-center">
        <p className="text-lg md:text-xl text-gray-700 leading-relaxed mb-6">
          Our drone services deliver breathtaking aerial photography and
          videography to elevate your projects. Whether it’s real estate,
          events, construction site monitoring, or cinematic productions, we
          provide high-quality aerial shots with precision and creativity.
          Safety and professionalism are always our top priorities.
        </p>
      </section>

      <div className="bg-gray-100 py-12">
        <ContactForm />
      </div>
      <Footer />
    </div>
  );
};

export default DroneServicesPage;

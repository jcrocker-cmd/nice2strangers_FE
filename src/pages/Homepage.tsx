// import Navbar from "../components/layout/Navbar";
// import Footer from "../components/layout/Footer";
// import Aboutpage from "./Aboutpage";
// import ContactForm from "../components/layout/Contact";
// import Carousel from "../components/layout/Carousel";
// import Services from "../components/layout/Services";
// import SmileyPreloader from "../components/common/Preloader";

// const Homepage = () => {
//   return (
//     <>
//       <Navbar></Navbar>
//       <Carousel></Carousel>
//       {/* <div className="bg-black w-full h-screen">Hompage</div> */}
//       <Aboutpage></Aboutpage>
//       <Services></Services>
//       <ContactForm></ContactForm>
//       <Footer />
//       <SmileyPreloader />
//     </>
//   );
// };

// export default Homepage;

import { useEffect, useState } from "react";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Aboutpage from "../components/layout/About";
import ContactForm from "../components/layout/Contact";
import Carousel from "../components/layout/Carousel";
import Services from "../components/layout/Services";
import SmileyPreloader from "../components/common/Preloader";

const Homepage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // Show preloader for 3 seconds
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  if (loading) return <SmileyPreloader />;

  return (
    <>
      <Navbar />
      <Carousel />
      <Aboutpage />
      <Services />
      <ContactForm />
      <Footer />
    </>
  );
};

export default Homepage;

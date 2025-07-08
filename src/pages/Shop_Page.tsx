import { useEffect, useState } from "react";
import Shop_Header from "../components/layout/Shop_Header";
import SmileyPreloader from "../components/common/Preloader";
import Shop_Content from "../components/layout/Shop_Content";
import Navbar from "../components/common/Navbar";

const Homepage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // Show preloader for 3 seconds
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  if (loading) return <SmileyPreloader />;

  return (
    <>
      {/* <Navbar /> */}
      <Shop_Header />
      <Shop_Content />
    </>
  );
};

export default Homepage;

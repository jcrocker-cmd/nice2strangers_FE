import { useEffect, useState } from "react";
import Home from "../components/layout/Home";
import SmileyPreloader from "../components/common/Preloader";

const Homepage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000); // Show preloader for 3 seconds
    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  if (loading) return <SmileyPreloader />;

  return (
    <>
      <Home />
    </>
  );
};

export default Homepage;

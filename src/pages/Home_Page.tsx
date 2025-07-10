import { useEffect, useState } from "react";
import Home from "../client/components/layout/Home";
import SmileyPreloader from "../client/components/common/Preloader";

const Homepage = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // Show preloader for 3 seconds
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

import Home from "../components/layout/Home";
import { useState } from "react";
import { BaseSpinner } from "../components/common/ProgressSpinner";

const Homepage = () => {
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);
  return (
    <>
    {isGlobalLoading && <BaseSpinner />}
      <Home setIsGlobalLoading={setIsGlobalLoading}/>
    </>
  );
};

export default Homepage;

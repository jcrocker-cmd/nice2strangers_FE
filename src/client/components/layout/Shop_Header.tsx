import { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import Wrapper from "../common/Wrapper";
import Section from "../common/Section";
import "../../../assets/css/main.css";
import Navbar from "../common/shop/NavbarShop";
import CarouselShop from "../common/shop/CarouselShop";
import ShopTitle from "../common/shop/ShopeTitle";
import ShopMarque from "../common/shop/ShopMarque";

const Footer = () => {
  useEffect(() => {
    ScrollReveal().reveal(".shop-section", {
      delay: 400,
      duration: 1000,
      distance: "50px",
      origin: "bottom",
    });
  }, []);

  return (
    <>
      <Navbar></Navbar>
      <Wrapper id="shop-header" className="w-full  text-black">
        <ShopTitle />
        <Section className="shop-section max-w-[1200px] mx-auto px-4 py-4 mt-10 rounded-4xl">
          <CarouselShop></CarouselShop>
        </Section>
      </Wrapper>
      <ShopMarque />
    </>
  );
};

export default Footer;

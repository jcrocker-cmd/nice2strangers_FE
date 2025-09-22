import Marquee from "react-fast-marquee";

const ShopMarque = () => {
  return (
    <div className="w-full my-6">
      <Marquee
        direction="right"
        speed={50}
        gradient={false}
        className="bg-[#f5c518] text-black font-grotesk font-semibold text-center p-4 z-40"
      >
        <div className="font-bold font-poppins text-5xl mx-10 whitespace-nowrap">
          🛍️ LIMITED TIME OFFER — GRAB YOUR FAVORITES NOW!
        </div>
        <div className="font-bold font-poppins text-5xl mx-10 whitespace-nowrap">
          ⏳ ONLY FEW LEFT IN STOCK!
        </div>
        <div className="font-bold font-poppins text-5xl mx-10 whitespace-nowrap">
          🔥 ORDER NOW!
        </div>
      </Marquee>
    </div>
  );
};

export default ShopMarque;

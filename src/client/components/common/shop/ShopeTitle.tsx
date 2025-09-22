const ShopTitle = () => {
  return (
    <section className="relative text-center py-16 px-6 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-yellow-100 via-white to-yellow-50 opacity-70 -z-10" />
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[500px] h-[500px] bg-yellow-200/20 rounded-full blur-3xl -z-10" />

      {/* Title Content */}
      <h1 className="text-4xl md:text-8xl font-extrabold mb-4 bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 bg-clip-text text-transparent drop-shadow-sm">
        SHOP
      </h1>

      <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto font-grotesk">
        Discover{" "}
        <span className="font-semibold text-yellow-600">
          exclusive products
        </span>{" "}
        at unbeatable prices. Shop the latest trends and timeless classics.
      </p>

      {/* Call-to-Action */}
      {/* <div className="mt-8">
        <a
          href="/shop-page"
          className="inline-block px-8 py-3 text-lg font-semibold rounded-full 
          bg-yellow-500 text-black hover:bg-yellow-600 transition shadow-md hover:shadow-xl"
        >
          Start Shopping
        </a>
      </div> */}
    </section>
  );
};

export default ShopTitle;

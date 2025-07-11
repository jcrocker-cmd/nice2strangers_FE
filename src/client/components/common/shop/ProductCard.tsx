import React from "react";

interface ProductCardProps {
  name: string;
  priceInCents: number;
  onAddToCart: () => void;
  onBuyNow: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ name, priceInCents, onAddToCart, onBuyNow }) => {
  return (
    <div className="bg-white shadow-md rounded-xl w-full max-w-sm border border-gray-200 hover:shadow-lg transition">
      <div className="mb-4">
        <img
          src="https://res.cloudinary.com/dnh4lkqlw/image/upload/v1751951597/images_vftshi.jpg"
          alt={name}
          className="object-cover w-full rounded-t-xl h-90"
        />
      </div>
      <div className="p-6">
          <h2 className="text-xl font-semibold mb-2">{name}</h2>
          <p className="text-gray-700 text-lg mb-4">${(priceInCents / 100).toFixed(2)}</p>
          <div className="flex gap-2">
            <button
              onClick={onAddToCart}
              className="cursor-pointer flex-1 px-4 py-2 bg-gray-200 text-black rounded hover:bg-gray-300 transition"
            >
              Add to Cart
            </button>
            <button
              onClick={onBuyNow}
              className="cursor-pointer flex-1 px-4 py-2 bg-black text-white rounded hover:bg-gray-900 transition"
            >
              Buy Now
            </button>
          </div>
      </div>
    </div>
  );
};

export default ProductCard;

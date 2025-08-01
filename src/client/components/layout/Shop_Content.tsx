import ProductCard from "../common/shop/ProductCard";
import Section from "../common/Section";
import Wrapper from "../common/Wrapper";
import axios from "axios";
import { useEffect, useState } from "react";
import type { Stripe } from "@stripe/stripe-js";
import "../../../assets/css/main.css";
import { stripePromise } from "../../../lib/stripe";
import { ApiRoutes } from "../../../constants/constants";

interface Product {
  id: string;
  productName: string;
  priceInCents: number;
  image: string;
  isActive?: boolean;
}

const Shop_Content = () => {
  const [products, setProducts] = useState<Product[]>([]);

  const handleAddToCart = (name: string) => {
    console.log("Added to cart:", name);
  };

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await axios.get<Product[]>(
          "https://localhost:7095/api/Product/products"
        );
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching transactions stats", error);
      }
    };
    fetchCount();
  }, []);

  const handleCheckout = async (product: Product) => {
    try {
      const { data } = await axios.post(ApiRoutes.Payments.createCheckout, [
        product,
      ]);

      const stripe: Stripe | null = await stripePromise;
      if (stripe && data.sessionId) {
        await stripe.redirectToCheckout({ sessionId: data.sessionId });
      } else {
        console.error("Stripe not loaded or sessionId missing");
      }
    } catch (err) {
      console.error("Checkout error:", err);
    }
  };

  return (
    <Wrapper id="shop-content" className="w-full py-5 text-black">
      <Section className="shop-body max-w-[1400px] mx-auto px-5 py-5">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 gap-y-10">
          {products
            .filter((p) => p.isActive)
            .map((p) => (
              <ProductCard
                key={p.id}
                name={p.productName}
                imageUrl={`${ApiRoutes.baseUrl}${p.image}`}
                priceInCents={p.priceInCents}
                onAddToCart={() => handleAddToCart(p.id)}
                onBuyNow={() => handleCheckout(p)}
              />
            ))}
        </div>
      </Section>
    </Wrapper>
  );
};

export default Shop_Content;

import ProductCard from "../common/shop/ProductCard";
import Section from "../common/Section";
import Wrapper from "../common/Wrapper";
import axios from "axios";
import { useEffect, useState } from "react";
import type { Stripe } from "@stripe/stripe-js";
import "../../../assets/css/main.css";
import { stripePromise } from "../../../lib/stripe";
import { ApiRoutes } from "../../../constants/constants";
import { getUser } from "../../../constants/user";
import Swal from "sweetalert2";

interface Product {
  id: string;
  productName: string;
  priceInCents: number;
  image: string;
  isActive?: boolean;
}

const Shop_Content = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  const handleAddToCart = async (productId: string) => {
    try {
      const userId = getUser()?.userId;
      const payload = {
        userId,
        productId,
        quantity: quantities[productId] || 1,
      };

      await axios.post(ApiRoutes.Cart.addToCart, payload);
      Swal.fire("Success", "Added to cart!", "success");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get<Product[]>(ApiRoutes.Product.getProducts);
        setProducts(res.data);

        // Initialize quantity for each product = 1
        const initialQuantities: Record<string, number> = {};
        res.data.forEach((p) => (initialQuantities[p.id] = 1));
        setQuantities(initialQuantities);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  const handleQuantityChange = (productId: string, value: number) => {
    setQuantities((prev) => ({
      ...prev,
      [productId]: Math.max(1, value), // enforce min = 1
    }));
  };

  const handleCheckout = async (product: Product) => {
    try {
      const qty = quantities[product.id] || 1;
      const userId = getUser()?.userId;
      const payload = [
        {
          userId: userId,
          productId: product.id,
          productName: product.productName,
          priceInCents: product.priceInCents,
          quantity: qty,
        },
      ];

      const { data } = await axios.post(
        ApiRoutes.Payments.createCheckout,
        payload
      );

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 gap-y-10">
          {products
            .filter((p) => p.isActive)
            .map((p) => (
              <ProductCard
                key={p.id}
                name={p.productName}
                imageUrl={`${ApiRoutes.baseUrl}${p.image}`}
                priceInCents={p.priceInCents}
                quantity={quantities[p.id] || 1}
                onQuantityChange={(value) => handleQuantityChange(p.id, value)}
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

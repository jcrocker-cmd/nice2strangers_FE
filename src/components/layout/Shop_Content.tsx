import ProductCard from '../common/shop/ProductCard'
import Section from '../common/Section';
import Wrapper from '../common/Wrapper';
import axios from 'axios';
import type { Stripe } from '@stripe/stripe-js';
import "../../assets/css/main.css";
import { stripePromise } from '../../lib/stripe';
import { ApiRoutes } from '../api/api';


interface Product {
  name: string;
  priceInCents: number;
}

const Shop_Content = () => {
      const products = [
    { name: "Modern T-Shirt", priceInCents: 2500 },
    { name: "Leather Shoes", priceInCents: 5200 },
    { name: "Leather Shoes", priceInCents: 3200 },
    { name: "Leather Shoes", priceInCents: 3200 },
    { name: "Leather Shoes", priceInCents: 3200 },
    { name: "Leather Shoes", priceInCents: 3200 },
    { name: "Leather Shoes", priceInCents: 3200 },
    ];

  const handleAddToCart = (name: string) => {
    console.log("Added to cart:", name);
  };

  // const handleBuyNow = (name: string) => {
  //   console.log("Buying:", name);
  // };

    const handleCheckout = async (product: Product) => {
    try {
      const { data } = await axios.post(ApiRoutes.createCheckout, [product]);

      const stripe: Stripe | null = await stripePromise;
      if (stripe && data.sessionId) {
        await stripe.redirectToCheckout({ sessionId: data.sessionId });
      } else {
        console.error('Stripe not loaded or sessionId missing');
      }
    } catch (err) {
      console.error('Checkout error:', err);
    }
  };

  return (
    <Wrapper id="shop-content" className="w-full py-5 text-black">
          <Section className="shop-body max-w-[1080px] mx-auto px-5 py-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 gap-y-10">
            {products.map((p) => (
                <ProductCard
                key={p.name}
                name={p.name}
                priceInCents={p.priceInCents}
                onAddToCart={() => handleAddToCart(p.name)}
                onBuyNow={() => handleCheckout(p)}
                />
            ))}
            </div>
        </Section>
    </Wrapper>
)
}

export default Shop_Content

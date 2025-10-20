import { useState } from "react";
import Cart from "../components/common/shop/Cart";

const DemoCart = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Classic T-Shirt",
      image: "https://via.placeholder.com/80",
      price: 499,
      quantity: 1,
    },
    {
      id: 2,
      name: "Denim Jeans",
      image: "https://via.placeholder.com/80",
      price: 1299,
      quantity: 2,
    },
  ]);

  const updateQuantity = (id: number, quantity: number) =>
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, quantity } : item))
    );

  const removeItem = (id: number) =>
    setItems((prev) => prev.filter((item) => item.id !== id));

  return (
    <div className="min-h-screen bg-gray-50 p-10">
      <Cart
        items={items}
        onUpdateQuantity={updateQuantity}
        onRemove={removeItem}
      />
    </div>
  );
};

export default DemoCart;

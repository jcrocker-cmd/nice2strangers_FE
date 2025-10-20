import React, { useState, useEffect } from "react";
import { Minus, Plus, Trash2 } from "lucide-react";
import { ApiRoutes } from "../../../../constants/constants";
import type { Stripe } from "@stripe/stripe-js";
import { stripePromise } from "../../../../lib/stripe";
import axios from "axios";
import { getUser } from "../../../../constants/user";

const userId = getUser()?.userId || "";

interface CartItem {
  id: string;
  productId: string;
  productName: string;
  image: string;
  price: number;
  quantity: number;
}

const Cart: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  const toggleCheck = (id: string) => {
    setCheckedItems((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );
  };

  useEffect(() => {
    axios.get(ApiRoutes.Cart.getCart(userId)).then((res) => setCart(res.data));
  }, []);

  const handleQuantity = async (id: string, delta: number) => {
    const updated = cart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.quantity + delta) }
        : item
    );
    setCart(updated);

    const item = updated.find((i) => i.id === id);
    if (item) {
      await axios.post(ApiRoutes.Cart.updateItem, {
        id: item.id,
        quantity: item.quantity,
      });
    }
  };

  const removeChecked = async () => {
    const itemsToRemove = cart.filter((i) => checkedItems.includes(i.id));

    for (const item of itemsToRemove) {
      await axios.delete(ApiRoutes.Cart.removeItem(item.id), {
        data: { userId, productId: item.id },
      });
    }

    setCart((prev) => prev.filter((i) => !checkedItems.includes(i.id)));
    setCheckedItems([]);
  };

  const total = cart
    .filter((item) => checkedItems.includes(item.id))
    .reduce((acc, item) => acc + (item.price * item.quantity) / 100, 0);

  const allChecked = checkedItems.length === cart.length && cart.length > 0;

  const toggleAll = () => {
    if (allChecked) setCheckedItems([]);
    else setCheckedItems(cart.map((item) => item.id));
  };

  const handleProceedCheckout = async () => {
    try {
      const selectedItems = cart.filter((i) => checkedItems.includes(i.id));

      if (selectedItems.length === 0) {
        alert("Please select at least one item to checkout");
        return;
      }

      // Prepare the payload list
      const payload = selectedItems.map((item) => ({
        productId: item.productId,
        productName: item.productName,
        priceInCents: item.price,
        quantity: item.quantity,
        userId: userId,
      }));

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
    } catch (error) {
      console.error("Checkout error:", error);
    }
  };

  return (
    <div className="min-h-100vh] bg-gray-50 flex justify-center py-6">
      <div className="relative w-full bg-white rounded-2xl shadow-md flex flex-col overflow-hidden">
        {/* Scrollable item list */}
        <div className="flex-1 overflow-y-auto p-6 max-h-[70vh]">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800">
            Shopping Cart
          </h2>

          {cart.length === 0 ? (
            <div className="text-center py-16 text-gray-500">
              <p className="text-lg">Your cart is empty 🛒</p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="flex items-center border-b pb-2 mb-2">
                <input
                  type="checkbox"
                  checked={allChecked}
                  onChange={toggleAll}
                  className="w-4 h-4 accent-primary"
                />
                <span className="ml-2 text-sm text-gray-600">Select All</span>
              </div>

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-4 bg-gray-50 rounded-xl p-3 hover:shadow-sm transition"
                >
                  <input
                    type="checkbox"
                    checked={checkedItems.includes(item.id)}
                    onChange={() => toggleCheck(item.id)}
                    className="w-4 h-4 accent-primary"
                  />
                  <img
                    src={`${ApiRoutes.baseUrl}${item.image}`}
                    alt={item.productName}
                    className="w-20 h-20 rounded-lg object-cover border"
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-800">
                      {item.productName}
                    </h3>
                    <p className="text-primary font-semibold">
                      $
                      {(item.price / 100).toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <button
                        className="p-1 rounded-md border hover:bg-gray-100"
                        onClick={() => handleQuantity(item.id, -1)}
                      >
                        <Minus size={14} />
                      </button>
                      <span className="font-medium">{item.quantity}</span>
                      <button
                        className="p-1 rounded-md border hover:bg-gray-100"
                        onClick={() => handleQuantity(item.id, 1)}
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>
                  <button
                    className="text-gray-400 hover:text-red-500 transition"
                    onClick={() =>
                      setCart((prev) => prev.filter((x) => x.id !== item.id))
                    }
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Sticky bottom checkout bar */}
        {cart.length > 0 && (
          <div className="sticky bottom-0 bg-white border-t  p-4 flex justify-between items-center z-10">
            <div className="flex items-center gap-2 text-gray-700">
              <span>{checkedItems.length} item(s) selected</span>
              <button
                onClick={removeChecked}
                disabled={checkedItems.length === 0}
                className="ml-3 text-sm text-red-500 hover:underline disabled:text-gray-300"
              >
                Remove Selected
              </button>
            </div>

            <div className="flex items-center gap-6">
              <div className="text-right">
                <p className="text-sm text-gray-500">Total</p>
                <p className="text-xl font-semibold text-primary">
                  $
                  {total.toLocaleString(undefined, {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
              <button
                className="bg-primary text-white px-6 py-2 rounded-xl hover:bg-primary/80 disabled:bg-gray-300"
                disabled={checkedItems.length === 0}
                onClick={handleProceedCheckout}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;

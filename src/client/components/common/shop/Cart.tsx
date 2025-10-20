import React from "react";
import { Minus, Plus, Trash2 } from "lucide-react";

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartProps {
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

const Cart: React.FC<CartProps> = ({ items, onUpdateQuantity, onRemove }) => {
  const total = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">
        Shopping Cart
      </h2>

      {items.length === 0 ? (
        <p className="text-gray-500 text-center py-10">Your cart is empty 🛒</p>
      ) : (
        <>
          <div className="divide-y divide-gray-200">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between py-4 gap-4"
              >
                {/* Product Info */}
                <div className="flex items-center gap-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div>
                    <h3 className="font-medium text-gray-800">{item.name}</h3>
                    <p className="text-sm text-gray-500">
                      ₱{item.price.toLocaleString()}
                    </p>
                  </div>
                </div>

                {/* Quantity Controls */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={() =>
                      onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))
                    }
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                  >
                    <Minus className="w-4 h-4 text-gray-600" />
                  </button>
                  <span className="w-8 text-center font-medium">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
                  >
                    <Plus className="w-4 h-4 text-gray-600" />
                  </button>
                </div>

                {/* Subtotal */}
                <div className="w-24 text-right font-medium text-gray-700">
                  ₱{(item.price * item.quantity).toLocaleString()}
                </div>

                {/* Remove */}
                <button
                  onClick={() => onRemove(item.id)}
                  className="p-2 text-red-500 hover:text-red-600"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>

          {/* Summary */}
          <div className="mt-6 border-t pt-4 flex items-center justify-between">
            <span className="text-lg font-medium text-gray-700">Total</span>
            <span className="text-xl font-semibold text-indigo-600">
              ₱{total.toLocaleString()}
            </span>
          </div>

          <button className="mt-6 w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-xl font-medium transition">
            Proceed to Checkout
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;

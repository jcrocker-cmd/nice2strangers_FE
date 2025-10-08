import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Icon from '../../../assets/img/success-order.png'

const OrderSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-white px-6 font-grotesk">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: "spring", duration: 0.8 }}
        className="bg-white shadow-xl rounded-3xl p-10 w-full max-w-md text-center"
      >
        <motion.img
          src={Icon} // 🟢 your downloaded icon
          alt="Success"
          className="w-28 h-28 mx-auto mb-6"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        />

        <h1 className="text-3xl font-bold text-green-600 mb-3">
          Order Successful!
        </h1>
        <p className="text-gray-600 mb-8">
          Thank you for your purchase. Your order has been placed successfully.
          We’ve sent a confirmation email to your inbox.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/shop-page")}
          className="w-full py-3 bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition"
        >
          Continue Shopping
        </motion.button>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;

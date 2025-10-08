import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import Icon from '../../../assets/img/failed-order.png'


const FailedOrder = () => {
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
          src={Icon}
          alt="Order Failed"
          className="w-28 h-28 mx-auto mb-6"
          initial={{ rotate: 90, opacity: 0, scale: 0.8 }}
          animate={{ rotate: 135, opacity: 1, scale: 1 }} // ⟵ rotate 45° to turn + into ×
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        <h1 className="text-3xl font-bold text-red-600 mb-3">
          Order Failed!
        </h1>
        <p className="text-gray-600 mb-8">
        Oops! Something went wrong while processing your order.  
        Please try again or contact our support team for assistance.
        </p>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/shop-page")}
          className="w-full py-3 bg-red-600 text-white font-semibold rounded-xl shadow hover:bg-red-700 transition"
        >
          Try Again
        </motion.button>
      </motion.div>
    </div>
  );
};

export default FailedOrder;


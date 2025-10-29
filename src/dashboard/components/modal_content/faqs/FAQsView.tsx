import CustomButton from "../../common/CustomModalButton";
import StatusBadge from "../../common/StatusBadge";
import { ApiRoutes } from "../../../../constants/constants";

interface Product {
  id: string;
  question: string;
  answer: string;
  createdDate: string;
  isActive: boolean;
}

interface ProductsContentViewProps {
  item: Product;
  setIsOpen: (open: boolean) => void;
}

const ProductsContentView = ({ item, setIsOpen }: ProductsContentViewProps) => {
  return (
    <div className="max-w-full mx-auto mt-4 p-6 bg-white rounded-3xl shadow-xl border border-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        View FAQ
      </h2>

      <div className="space-y-4">
        {/* Product Name */}
        <div className="bg-gray-50 px-4 py-3 rounded-lg shadow-sm flex gap-2 flex-col justify-between">
          <span className="font-semibold text-gray-600">Question:</span>
          <span className="text-gray-800">{item.question}</span>
        </div>

        {/* Category */}
        <div className="bg-gray-50 px-4 py-3 rounded-lg shadow-sm flex gap-2 flex-col justify-between">
          <span className="font-semibold text-gray-600">Answer:</span>
          <span className="text-gray-800">{item.answer}</span>
        </div>

        {/* Stocks */}
        <div className="bg-gray-50 px-4 py-3 rounded-lg shadow-sm flex gap-2 items-center">
          <span className="font-semibold text-gray-600">Status:</span>
          <span className="text-gray-800">
            <div>
              {item.isActive ? (
                <StatusBadge
                  sx="border-success text-success"
                  message="Active"
                />
              ) : (
                <StatusBadge sx="border-danger text-danger" message="Deleted" />
              )}
            </div>
          </span>
        </div>

        {/* Created Date */}
        <div className="bg-gray-50 px-4 py-3 rounded-lg shadow-sm flex gap-2 flex-col justify-between">
          <span className="font-semibold text-gray-600">Created Date:</span>
          <span className="text-gray-800">{item.createdDate}</span>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <CustomButton variant="danger" onClick={() => setIsOpen(false)}>
          Close
        </CustomButton>
      </div>
    </div>
  );
};

export default ProductsContentView;

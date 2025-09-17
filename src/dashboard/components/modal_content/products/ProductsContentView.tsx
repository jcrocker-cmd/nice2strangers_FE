import CustomButton from "../../common/CustomModalButton";
import { ApiRoutes } from "../../../../constants/constants";

interface Product {
  id: string;
  productName: string;
  category: string;
  description: string;
  stocks: number;
  priceInCents: number;
  image: string;
  createdDate: string;
}

interface ProductsContentViewProps {
  product: Product;
  setIsOpen: (open: boolean) => void;
}

const ProductsContentView = ({
  product,
  setIsOpen,
}: ProductsContentViewProps) => {
  return (
    <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-3xl shadow-xl border border-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        View Product
      </h2>

      <div className="space-y-4">
        {/* Product Name */}
        <div className="bg-gray-50 px-4 py-3 rounded-lg shadow-sm flex justify-between">
          <span className="font-semibold text-gray-600">Name:</span>
          <span className="text-gray-800">{product.productName}</span>
        </div>

        {/* Category */}
        <div className="bg-gray-50 px-4 py-3 rounded-lg shadow-sm flex justify-between">
          <span className="font-semibold text-gray-600">Category:</span>
          <span className="text-gray-800">{product.category}</span>
        </div>

        {/* Stocks */}
        <div className="bg-gray-50 px-4 py-3 rounded-lg shadow-sm flex justify-between">
          <span className="font-semibold text-gray-600">Stocks:</span>
          <span className="text-gray-800">{product.stocks}</span>
        </div>

        {/* Price */}
        <div className="bg-gray-50 px-4 py-3 rounded-lg shadow-sm flex justify-between">
          <span className="font-semibold text-gray-600">Price:</span>
          <span className="text-gray-800">
            ${(product.priceInCents / 100).toFixed(2)}
          </span>
        </div>

        {/* Created Date */}
        <div className="bg-gray-50 px-4 py-3 rounded-lg shadow-sm flex justify-between">
          <span className="font-semibold text-gray-600">Created Date:</span>
          <span className="text-gray-800">{product.createdDate}</span>
        </div>

        {/* Description */}
        <div className="bg-gray-50 px-4 py-3 rounded-lg shadow-sm">
          <span className="font-semibold text-gray-600">Description:</span>
          <p className="text-gray-800 mt-1">{product.description}</p>
        </div>

        {/* Image */}
        <div className="bg-gray-50 px-4 py-3 rounded-lg shadow-sm flex justify-center">
          <img
            src={`${ApiRoutes.baseUrl}/${product.image}`}
            alt={product.productName}
            className="rounded-xl w-48 h-48 object-cover shadow-md"
          />
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

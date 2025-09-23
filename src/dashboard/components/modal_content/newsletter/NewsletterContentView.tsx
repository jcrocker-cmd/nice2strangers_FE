import CustomButton from "../../common/CustomModalButton";
interface Newsletter {
  id: string;
  name: string;
  email: string;
  createdDate: string;
}

interface ProductsContentViewProps {
  item: Newsletter;
  setIsOpen: (open: boolean) => void;
}

const ProductsContentView = ({ item, setIsOpen }: ProductsContentViewProps) => {
  return (
    <div className="max-w-full mx-auto mt-4 p-6 bg-white rounded-3xl shadow-xl border border-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        View Subscriber
      </h2>

      <div className="space-y-4">
        {/* Product Name */}
        <div className="bg-gray-50 px-4 py-3 rounded-lg shadow-sm flex justify-between">
          <span className="font-semibold text-gray-600">Name:</span>
          <span className="text-gray-800">{item.name}</span>
        </div>

        {/* Category */}
        <div className="bg-gray-50 px-4 py-3 rounded-lg shadow-sm flex justify-between">
          <span className="font-semibold text-gray-600">Email:</span>
          <span className="text-gray-800">{item.email}</span>
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

import CustomButton from "../../../common/CustomModalButton";
import type { DroneServiceInquiry } from "../../../../types/services/services";
interface ProductsContentViewProps {
  item: DroneServiceInquiry;
  setIsOpen: (open: boolean) => void;
}

const InquiryView = ({ item, setIsOpen }: ProductsContentViewProps) => {
  return (
    <div className="max-w-full mx-auto mt-4 p-6 bg-white rounded-3xl shadow-xl border border-gray-100">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        View Inquiry
      </h2>

      <div className="space-y-4">
        <div className="bg-gray-50 px-4 py-3 rounded-lg shadow-sm flex justify-between">
          <span className="font-semibold text-gray-600">Name:</span>
          <span className="text-gray-800">{item.name}</span>
        </div>

        <div className="bg-gray-50 px-4 py-3 rounded-lg shadow-sm flex justify-between">
          <span className="font-semibold text-gray-600">Email:</span>
          <span className="text-gray-800">{item.email}</span>
        </div>

        <div className="bg-gray-50 px-4 py-3 rounded-lg shadow-sm flex justify-between">
          <span className="font-semibold text-gray-600">Service Type:</span>
          <span className="text-gray-800">{item.serviceType}</span>
        </div>

        <div className="bg-gray-50 px-4 py-3 rounded-lg shadow-sm flex flex-col justify-between">
          <span className="font-semibold text-gray-600">Location:</span>
          <span className="text-gray-800">{item.location}</span>
        </div>

        <div className="bg-gray-50 px-4 py-3 rounded-lg shadow-sm flex flex-col justify-between">
          <span className="font-semibold text-gray-600">Budget:</span>
          <span className="text-gray-800">{item.budget}</span>
        </div>

        <div className="bg-gray-50 px-4 py-3 rounded-lg shadow-sm flex flex-col justify-between">
          <span className="font-semibold text-gray-600">Pref. Date:</span>
          <span className="text-gray-800">{item.date}</span>
        </div>

        <div className="bg-gray-50 px-4 py-3 rounded-lg shadow-sm flex flex-col justify-between">
          <span className="font-semibold text-gray-600">Message:</span>
          <span className="text-gray-800">{item.message}</span>
        </div>

        <div className="bg-gray-50 px-4 py-3 rounded-lg shadow-sm flex flex-col justify-between">
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

export default InquiryView;

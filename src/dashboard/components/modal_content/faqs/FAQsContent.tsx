import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { ApiRoutes, SWAL } from "../../../../constants/constants";

type FormData = {
  question: string;
  answer: string;
  createdDate: string;
  isActive: boolean;
};

interface ProductsContentProps {
  handleRefresh: () => void;
  setIsOpen: (boolean: any) => void;
}

const ProductsContent = ({
  handleRefresh,
  setIsOpen,
}: ProductsContentProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      await axios.post(ApiRoutes.FAQs.addFAQ, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      Swal.fire({
        icon: SWAL.ICON.success,
        title: "Created!",
        text: "The FAQ has been successfully created.",
      });

      reset();
      setIsOpen(false);
      handleRefresh();
    } catch (error: any) {
      Swal.fire({
        icon: SWAL.ICON.error,
        title: "Creation failed",
        text: "An error occurred.",
      });
    }
  };

  return (
    <div className="max-w-full mx-auto mt-4 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Add New FAQ
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
        encType="multipart/form-data"
      >
        {/* Product Name */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Question
          </label>
          <input
            {...register("question", { required: "Question is required" })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter question"
          />
          {errors.question && (
            <p className="mt-1 text-xs text-red-500">
              {errors.question.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Answer
          </label>
          <textarea
            {...register("answer", { required: "Answer is required" })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter answer"
            rows={6}
          />
          {errors.answer && (
            <p className="mt-1 text-xs text-red-500">{errors.answer.message}</p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-2 px-4 rounded-md transition-colors"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ProductsContent;

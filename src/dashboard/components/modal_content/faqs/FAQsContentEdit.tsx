import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ApiRoutes, SWAL } from "../../../../constants/constants";
import CustomButton from "../../common/CustomModalButton";

type FormData = {
  question: string;
  answer: string;
};

interface ContentProps {
  handleRefresh: () => void;
  setIsOpen: (boolean: any) => void;
  item?: any;
}

const ProductsContent = ({ handleRefresh, setIsOpen, item }: ContentProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const [isEditable, setIsEditable] = useState(false);

  // Pre-fill form when product changes
  useEffect(() => {
    if (item) {
      reset({
        question: item.question,
        answer: item.answer,
      });
      setIsEditable(false); // lock fields by default
    }
  }, [item, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      await axios.put(`${ApiRoutes.FAQs.updateFAQ}/${item.id}`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      Swal.fire({
        icon: SWAL.ICON.success,
        title: "Updated!",
        text: "The product has been successfully updated.",
      });

      reset();
      setIsOpen(false);
      handleRefresh();
    } catch (error: any) {
      Swal.fire({
        icon: SWAL.ICON.error,
        title: "Update failed",
        text: "An error occurred.",
      });
    }
  };

  return (
    <div className="max-w-full mx-auto mt-4 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Edit FAQ
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
        encType="multipart/form-data"
      >
        {/* Product Name */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            FAQ Question
          </label>
          <input
            {...register("question", { required: "Question is required" })}
            disabled={!isEditable}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter question"
          />
          {errors.question && (
            <p className="mt-1 text-xs text-red-500">
              {errors.question.message}
            </p>
          )}
        </div>

        {/* Answer */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Answer
          </label>
          <textarea
            {...register("answer", { required: "Answer is required" })}
            disabled={!isEditable}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter answer"
            rows={6}
          />
          {errors.answer && (
            <p className="mt-1 text-xs text-red-500">{errors.answer.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-3">
          {/* Cancel */}
          <CustomButton variant="danger" onClick={() => setIsOpen(false)}>
            Cancel
          </CustomButton>

          {/* Edit */}
          <CustomButton
            variant="secondary"
            disabled={isEditable}
            onClick={() => setIsEditable(true)}
          >
            Edit
          </CustomButton>

          {/* Submit */}
          <CustomButton
            type="submit"
            variant="primary"
            disabled={!isEditable || isSubmitting}
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </CustomButton>
        </div>
      </form>
    </div>
  );
};

export default ProductsContent;

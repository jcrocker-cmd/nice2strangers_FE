import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { ApiRoutes, SWAL } from "../../../../constants/constants";
import CustomButton from "../../common/CustomModalButton";

type FormData = {
  subject: string;
  content: string;
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
      await axios.post(ApiRoutes.Newsletter.sendNewsletter, {
        subject: data.subject,
        body: data.content, // backend expects "Body"
      });

      Swal.fire({
        icon: SWAL.ICON.success,
        title: "Sent!",
        text: "The newsletter has been successfully sent.",
      });

      reset();
      setIsOpen(false);
      handleRefresh();
    } catch (error: any) {
      Swal.fire({
        icon: SWAL.ICON.error,
        title: "Send failed",
        text: "An error occurred while sending the newsletter.",
      });
    }
  };

  return (
    <div className="max-w-full mx-auto mt-4 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Send Newsletter
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
        encType="multipart/form-data"
      >
        {/* Product Name */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Subject
          </label>
          <input
            {...register("subject", { required: "Subject is required" })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter subject"
          />
          {errors.subject && (
            <p className="mt-1 text-xs text-red-500">
              {errors.subject.message}
            </p>
          )}
        </div>

        {/* Category */}
        <textarea
          {...register("content", {
            required: "Content is required",
            minLength: {
              value: 150,
              message: "Content must be at least 150 characters long",
            },
          })}
          className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          placeholder="Enter content (min 150 characters)"
          rows={6}
        />
        {errors.content && (
          <p className="mt-1 text-xs text-red-500">{errors.content.message}</p>
        )}

        {/* Submit Button */}
        <CustomButton
            type="submit"
            disabled={isSubmitting}
            variant="primary"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </CustomButton>
      </form>
    </div>
  );
};

export default ProductsContent;

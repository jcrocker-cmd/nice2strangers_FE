import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { ApiRoutes, SWAL } from "../../../../constants/constants";

type FormData = {
  subject: string;
  content: string;
};

interface ProductsContentProps {
  handleRefresh: () => void;
  setIsOpen: (boolean: any) => void;
  recipientEmail: string; 
}

const InquiryReply = ({
  handleRefresh,
  setIsOpen,
  recipientEmail 
}: ProductsContentProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

const onSubmit = async (data: FormData) => {
    try {
      await axios.post(ApiRoutes.ContactUs.sendReply, {
        email: recipientEmail,
        subject: data.subject,
        body: data.content,
      });

      Swal.fire({
        icon: SWAL.ICON.success,
        title: "Sent!",
        text: `Reply has been sent to ${recipientEmail}.`,
      });

      reset();
      setIsOpen(false);
      handleRefresh();
    } catch (error: any) {
      Swal.fire({
        icon: SWAL.ICON.error,
        title: "Send failed",
        text: "An error occurred while sending the reply.",
      });
    }
  };

  return (
    <div className="max-w-full mx-auto mt-4 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Reply to {recipientEmail}
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
              value: 50,
              message: "Content must be at least 50 characters long",
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
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white py-2 px-4 rounded-md transition-colors"
        >
          {isSubmitting ? "Sending..." : "Send Reply"}
        </button>
      </form>
    </div>
  );
};

export default InquiryReply;

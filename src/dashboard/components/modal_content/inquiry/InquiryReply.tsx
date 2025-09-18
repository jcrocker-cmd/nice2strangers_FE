import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { ApiRoutes, SWAL } from "../../../../constants/constants";
import CustomButton from "../../common/CustomModalButton";

interface ContactUs {
  id: string;
  name: string;
  subject: string;
  body: string;
  toEmail: string;
  isReplied: boolean;
  createdDate: string;
}

interface ReplyForm {
  subject: string;
  body: string;
}

interface ProductsContentProps {
  handleRefresh: () => void;
  setIsOpen: (open: boolean) => void;
  item: ContactUs;
}

const InquiryReply = ({ handleRefresh, setIsOpen, item }: ProductsContentProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ReplyForm>();

  const onSubmit = async (data: ReplyForm) => {
    try {
      await axios.post(ApiRoutes.ContactUs.sendReply, {
        Id: item.id,        // PascalCase
        Email: item.toEmail,
        Subject: data.subject,
        Body: data.body,
      });

      Swal.fire({
        icon: SWAL.ICON.success,
        title: "Sent!",
        text: `Reply has been sent to ${item.toEmail}.`,
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
        Reply to {item.toEmail}
      </h2>
      

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
        encType="multipart/form-data"
      >
        {/* Subject */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Subject
          </label>
          <input
            {...register("subject", { required: "Subject is required" })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter subject"
            value={`Re: ${item.subject}`}
            readOnly
          />
          {errors.subject && (
            <p className="mt-1 text-xs text-red-500">{errors.subject.message}</p>
          )}
        </div>

        {/* Body */}
        <textarea
          {...register("body", {
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
        {errors.body && (
          <p className="mt-1 text-xs text-red-500">{errors.body.message}</p>
        )}

        {/* Submit Button */}
          <CustomButton
            type="submit"
            disabled={isSubmitting}
            variant="primary"
          >
            {isSubmitting ? "Sending..." : "Send Reply"}
          </CustomButton>
      </form>
    </div>
  );
};

export default InquiryReply;

import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { ApiRoutes } from "../../../../constants/constants";

interface SocialMediaConsultingFormInputs {
  Name: string;
  Email: string;
  Platforms: string[];
  Goals: string;
  Budget: string;
  Duration: string;
  Message: string;
}

const SocialMediaConsultingForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<SocialMediaConsultingFormInputs>();

  const onSubmit = async (formData: SocialMediaConsultingFormInputs) => {
    try {
      await axios.post(ApiRoutes.Services.postSMCService, formData);
      Swal.fire(
        "Success!",
        "Your consulting request has been sent!",
        "success"
      );
      reset();
    } catch (error) {
      Swal.fire("Error!", "Failed to send request", "error");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-8">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        Social Media Consulting
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            {...register("Name", { required: "Name is required" })}
            placeholder="Jane Doe"
            className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
              errors.Name
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-yellow-400"
            }`}
          />
          {errors.Name && (
            <p className="mt-1 text-xs text-red-500">{errors.Name.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Email
          </label>
          <input
            type="email"
            {...register("Email", { required: "Email is required" })}
            placeholder="you@example.com"
            className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
              errors.Email
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-yellow-400"
            }`}
          />
          {errors.Email && (
            <p className="mt-1 text-xs text-red-500">{errors.Email.message}</p>
          )}
        </div>

        {/* Platforms */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Platforms You Need Help With
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              "Facebook",
              "Instagram",
              "Twitter/X",
              "LinkedIn",
              "TikTok",
              "YouTube",
            ].map((platform) => (
              <label key={platform} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  value={platform}
                  {...register("Platforms")}
                  className="w-4 h-4 accent-yellow-500 border-gray-300 rounded cursor-pointer focus:ring-2 focus:ring-yellow-400"
                />
                <span className="text-sm text-gray-700">{platform}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Goals */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Main Goal
          </label>
          <select
            {...register("Goals", { required: "Please select a goal" })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Select goal</option>
            <option value="Brand Awareness">Brand Awareness</option>
            <option value="Lead Generation">Lead Generation</option>
            <option value="Engagement">Increase Engagement</option>
            <option value="Sales Conversion">Sales Conversion</option>
            <option value="Community Growth">Community Growth</option>
          </select>
          {errors.Goals && (
            <p className="mt-1 text-xs text-red-500">{errors.Goals.message}</p>
          )}
        </div>

        {/* Budget */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Budget Range
          </label>
          <input
            {...register("Budget", { required: "Budget is required" })}
            placeholder="e.g. $500 - $1000"
            className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
              errors.Budget
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-yellow-400"
            }`}
          />
          {errors.Budget && (
            <p className="mt-1 text-xs text-red-500">{errors.Budget.message}</p>
          )}
        </div>

        {/* Duration */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Campaign Duration
          </label>
          <select
            {...register("Duration", { required: "Duration is required" })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Select duration</option>
            <option value="1 month">1 Month</option>
            <option value="3 months">3 Months</option>
            <option value="6 months">6 Months</option>
            <option value="12 months">12 Months</option>
          </select>
          {errors.Duration && (
            <p className="mt-1 text-xs text-red-500">
              {errors.Duration.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Additional Details
          </label>
          <textarea
            rows={4}
            {...register("Message", { required: "Message is required" })}
            placeholder="Tell us more about your brand and goals..."
            className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
              errors.Message
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-yellow-400"
            }`}
          />
          {errors.Message && (
            <p className="mt-1 text-xs text-red-500">
              {errors.Message.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full py-3 bg-yellow-500 text-white rounded-md font-semibold hover:bg-yellow-600 transition disabled:opacity-70"
        >
          {isSubmitting ? "Sending..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
};

export default SocialMediaConsultingForm;

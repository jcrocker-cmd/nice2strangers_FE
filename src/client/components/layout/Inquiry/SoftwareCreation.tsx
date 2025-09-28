import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { ApiRoutes } from "../../../../constants/constants";

interface WebAppFormInputs {
  Name: string;
  Email: string;
  ProjectType: string;
  Platform: string;
  Budget: string;
  Timeline: string;
  Message: string;
}

const WebAppForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<WebAppFormInputs>();

  const onSubmit = async (formData: WebAppFormInputs) => {
    try {
      await axios.post(ApiRoutes.ContactUs.postContact, formData);
      Swal.fire("Success!", "Your request has been sent!", "success");
      reset();
    } catch (error) {
      Swal.fire("Error!", "Failed to send request", "error");
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-md p-8">
      <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
        Website/App Creation
      </h2>

      <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
        {/* Name */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Full Name
          </label>
          <input
            {...register("Name", { required: "Name is required" })}
            placeholder="John Doe"
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

        {/* Project Type */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Project Type
          </label>
          <select
            {...register("ProjectType", {
              required: "Project type is required",
            })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Select type</option>
            <option value="Website">Website</option>
            <option value="Mobile App">Mobile App</option>
            <option value="Web + Mobile">Website & Mobile App</option>
            <option value="E-commerce">E-commerce Platform</option>
            <option value="Other">Other</option>
          </select>
          {errors.ProjectType && (
            <p className="mt-1 text-xs text-red-500">
              {errors.ProjectType.message}
            </p>
          )}
        </div>

        {/* Platform */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Target Platform
          </label>
          <select
            {...register("Platform", { required: "Platform is required" })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Select platform</option>
            <option value="Web">Web</option>
            <option value="iOS">iOS</option>
            <option value="Android">Android</option>
            <option value="Cross-Platform">Cross-Platform</option>
          </select>
          {errors.Platform && (
            <p className="mt-1 text-xs text-red-500">
              {errors.Platform.message}
            </p>
          )}
        </div>

        {/* Budget */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Budget Range
          </label>
          <input
            {...register("Budget", { required: "Budget is required" })}
            placeholder="e.g. $1000 - $5000"
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

        {/* Timeline */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Expected Timeline
          </label>
          <select
            {...register("Timeline", { required: "Timeline is required" })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Select timeline</option>
            <option value="2-4 weeks">2–4 weeks</option>
            <option value="1-2 months">1–2 months</option>
            <option value="3+ months">3+ months</option>
            <option value="Flexible">Flexible</option>
          </select>
          {errors.Timeline && (
            <p className="mt-1 text-xs text-red-500">
              {errors.Timeline.message}
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
            placeholder="Tell us about your project..."
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

export default WebAppForm;

// src/components/layout/Inquiry/DroneInquiryForm.tsx

import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { ApiRoutes } from "../../../../constants/constants";

interface DroneFormInputs {
  Name: string;
  Email: string;
  ServiceType: string;
  Location: string;
  Budget: string;
  Date: string;
  Message: string;
}

const DroneInquiryForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<DroneFormInputs>();

  const onSubmit = async (formData: DroneFormInputs) => {
    try {
      await axios.post(ApiRoutes.Services.postDroneService, formData);
      Swal.fire(
        "Success!",
        "Your drone service request has been sent!",
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
        Drone Service Inquiry
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

        {/* Service Type */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Service Type
          </label>
          <select
            {...register("ServiceType", {
              required: "Service type is required",
            })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Select service</option>
            <option value="Real Estate">Real Estate Aerials</option>
            <option value="Event">Event Coverage</option>
            <option value="Construction">Construction Site Monitoring</option>
            <option value="Cinematic">Cinematic Production</option>
            <option value="Survey">Survey & Mapping</option>
            <option value="Other">Other</option>
          </select>
          {errors.ServiceType && (
            <p className="mt-1 text-xs text-red-500">
              {errors.ServiceType.message}
            </p>
          )}
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Shoot Location
          </label>
          <input
            {...register("Location", { required: "Location is required" })}
            placeholder="City / Venue / Area"
            className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
              errors.Location
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-yellow-400"
            }`}
          />
          {errors.Location && (
            <p className="mt-1 text-xs text-red-500">
              {errors.Location.message}
            </p>
          )}
        </div>

        {/* Date */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Preferred Date
          </label>
          <input
            type="date"
            {...register("Date", { required: "Date is required" })}
            className={`w-full rounded-md border px-3 py-2 text-sm focus:outline-none focus:ring-2 ${
              errors.Date
                ? "border-red-500 focus:ring-red-400"
                : "border-gray-300 focus:ring-yellow-400"
            }`}
          />
          {errors.Date && (
            <p className="mt-1 text-xs text-red-500">{errors.Date.message}</p>
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

export default DroneInquiryForm;

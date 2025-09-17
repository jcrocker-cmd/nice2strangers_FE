import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { ApiRoutes, SWAL } from "../../../../constants/constants";

type FormData = {
  productName: string;
  category: string;
  description: string;
  stocks: number;
  priceInCents: number;
  image: FileList;
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
      const formData = new FormData();
      formData.append("ProductName", data.productName);
      formData.append("Category", data.category);
      formData.append("Description", data.description);
      formData.append("Stocks", data.stocks.toString());
      formData.append("PriceInCents", data.priceInCents.toString());
      formData.append("Image", data.image[0]);

      await axios.post(ApiRoutes.Product.addProduct, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      Swal.fire({
        icon: SWAL.ICON.success,
        title: "Created!",
        text: "The product has been successfully created.",
      });
      reset(); // clear form after success
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
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Add New Product
      </h2>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-5"
        encType="multipart/form-data"
      >
        {/* Product Name */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Product Name
          </label>
          <input
            {...register("productName", { required: "Name is required" })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter product name"
          />
          {errors.productName && (
            <p className="mt-1 text-xs text-red-500">
              {errors.productName.message}
            </p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            {...register("category", { required: "Category is required" })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter category"
          />
          {errors.category && (
            <p className="mt-1 text-xs text-red-500">
              {errors.category.message}
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
            })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter description"
            rows={3}
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-500">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Stocks & Price in two columns */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Stocks
            </label>
            <input
              type="number"
              {...register("stocks", { required: "Stocks is required" })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
            {errors.stocks && (
              <p className="mt-1 text-xs text-red-500">
                {errors.stocks.message}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Price (in Dollars)
            </label>
            <input
              type="number"
              step="0.01"
              {...register("priceInCents", { required: "Price is required" })}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
            />
            {errors.priceInCents && (
              <p className="mt-1 text-xs text-red-500">
                {errors.priceInCents.message}
              </p>
            )}
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            className="block w-full text-sm text-gray-600 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {errors.image && (
            <p className="mt-1 text-xs text-red-500">{errors.image.message}</p>
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

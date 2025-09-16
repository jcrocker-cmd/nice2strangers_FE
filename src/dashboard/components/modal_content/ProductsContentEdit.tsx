import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { ApiRoutes, SWAL } from "../../../constants/constants";
import CustomButton from "../common/CustomModalButton";

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
  product?: any;
}

const ProductsContent = ({ handleRefresh, setIsOpen, product }: ProductsContentProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const [isEditable, setIsEditable] = useState(false);

  // Pre-fill form when product changes
  useEffect(() => {
    if (product) {
      reset({
        productName: product.productName,
        category: product.category,
        description: product.description,
        stocks: product.stocks,
        priceInCents: product.priceInCents / 100, // backend stores in cents
      });
      setIsEditable(false); // lock fields by default
    }
  }, [product, reset]);

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      formData.append("ProductName", data.productName);
      formData.append("Category", data.category);
      formData.append("Description", data.description);
      formData.append("Stocks", data.stocks.toString());
      formData.append("PriceInCents", data.priceInCents.toString());
      if (data.image && data.image.length > 0) {
        formData.append("Image", data.image[0]);
      }


      await axios.put(
        `${ApiRoutes.Product.updateProduct}/${product.id}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

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
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white rounded-2xl shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
        Edit Product
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
            disabled={!isEditable}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter product name"
          />
          {errors.productName && (
            <p className="mt-1 text-xs text-red-500">{errors.productName.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Category
          </label>
          <input
            {...register("category", { required: "Category is required" })}
            disabled={!isEditable}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter category"
          />
          {errors.category && (
            <p className="mt-1 text-xs text-red-500">{errors.category.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            {...register("description", { required: "Description is required" })}
            disabled={!isEditable}
            className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter description"
            rows={3}
          />
          {errors.description && (
            <p className="mt-1 text-xs text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Stocks & Price */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">
              Stocks
            </label>
            <input
              type="number"
              {...register("stocks", { required: "Stocks is required" })}
              disabled={!isEditable}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0"
            />
            {errors.stocks && (
              <p className="mt-1 text-xs text-red-500">{errors.stocks.message}</p>
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
              disabled={!isEditable}
              className="w-full rounded-md border border-gray-300 px-3 py-2 text-sm disabled:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="0.00"
            />
            {errors.priceInCents && (
              <p className="mt-1 text-xs text-red-500">
                {errors.priceInCents.message}
              </p>
            )}
          </div>
        </div>

        {/* Image */}
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-700">
            Product Image
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Price is required" })}
            disabled={!isEditable}
            className="block w-full text-sm text-gray-600 disabled:bg-gray-100 file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          {errors.image && (
            <p className="mt-1 text-xs text-red-500">{errors.image.message}</p>
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

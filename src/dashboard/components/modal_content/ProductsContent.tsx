import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { ApiRoutes, SWAL } from "../../../constants/constants";
import { useState } from "react";
import 'react-quill/dist/quill.snow.css';

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

const ProductsContent = ({ handleRefresh, setIsOpen}: ProductsContentProps) => {
  const [value, setValue] = useState('')
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

      await axios.post(
        ApiRoutes.Product.addProduct,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

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
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
        encType="multipart/form-data"
      >
        <div>
          <label className="block">Product Name</label>
          <input
            {...register("productName", { required: "Name is required" })}
            className="input"
          />
          {errors.productName && (
            <p className="text-red-500 text-sm">{errors.productName.message}</p>
          )}
        </div>

        <div>
          <label className="block">Category</label>
          <input
            {...register("category", { required: "category is required" })}
            className="input"
          />
          {errors.category && (
            <p className="text-red-500 text-sm">{errors.category.message}</p>
          )}
        </div>

        <div>
          <label className="block">Description</label>
          <input
            {...register("description", {
              required: "description is required",
            })}
            className="input"
          />
          {errors.description && (
            <p className="text-red-500 text-sm">{errors.description.message}</p>
          )}
        </div>

        <div>
          <label className="block">Stocks</label>
          <input
            {...register("stocks", {
              required: "stocks is required",
            })}
            className="number"
          />
          {errors.stocks && (
            <p className="text-red-500 text-sm">{errors.stocks.message}</p>
          )}
        </div>

        <div>
          <label className="block">Price in Dollars</label>
          <input
            {...register("priceInCents", {
              required: "Price is required",
            })}
            className="number"
          />
          {errors.priceInCents && (
            <p className="text-red-500 text-sm">
              {errors.priceInCents.message}
            </p>
          )}
        </div>

        <div>
          <label className="block">Images</label>
          <input
            {...register("image", { required: "Images are required" })}
            className="file-input"
            type="file"
            accept="image/*"
          />
          {errors.image && (
            <p className="text-red-500 text-sm">{errors.image.message}</p>
          )}
        </div>
        <button
          type="submit"
          disabled={isSubmitting}
          className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
        >
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
};

export default ProductsContent;

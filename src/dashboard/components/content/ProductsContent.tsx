import { useForm } from "react-hook-form";
import axios from "axios";

type FormData = {
  productName: string;
  priceInCents: number;
  image: FileList;
};

const ProductsContent = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    try {
      const formData = new FormData();
      formData.append("productName", data.productName);
      formData.append("priceInCents", data.priceInCents.toString());
      formData.append("image", data.image[0]);

      const response = await axios.post(
        "https://localhost:7095/api/Product/addProduct",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Product created:", response.data);
      reset(); // clear form after success
    } catch (error) {
      console.error("Error creating product:", error);
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
          <label className="block">Price in Cents</label>
          <input
            {...register("priceInCents", {
              required: "Price is required",
            })}
            className="input"
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

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import {
  FaFacebookF,
  FaXTwitter,
  FaInstagram,
  FaYoutube,
  FaTiktok,
} from "react-icons/fa6";
import Swal from "sweetalert2";
import { ApiRoutes } from "../../../constants/constants";
import { Spinner } from "../common/ProgressSpinner";

interface SocialLinks {
  facebook: string;
  instagram: string;
  twitter: string;
  youtube: string;
  tiktok: string;
}

interface SocialProps {
  setIsGlobalLoading: (value: boolean) => void;
}

const SocialLinksEditor = ({}: SocialProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<SocialLinks>();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const res = await axios.get(ApiRoutes.SocialLinks.getAll);
        reset(res.data);
      } catch (error) {
        console.error("Error fetching social links:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLinks();
  }, [reset]);

  const onSubmit = async (data: SocialLinks) => {
    try {
      await axios.put(ApiRoutes.SocialLinks.update, data, {
        headers: { "Content-Type": "application/json" },
      });
      Swal.fire({
        icon: "success",
        title: "Updated!",
        text: "Social links have been successfully updated.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update failed",
        text: "Something went wrong while saving your changes.",
      });
    }
  };

  const inputs = [
    {
      key: "facebook",
      icon: <FaFacebookF className="text-white text-lg" />,
      bg: "bg-[#1877F2]", // Facebook blue
    },
    {
      key: "twitter",
      icon: <FaXTwitter className="text-white text-lg" />,
      bg: "bg-black",
    },
    {
      key: "instagram",
      icon: <FaInstagram className="text-white text-lg" />,
      bg: "bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500",
    },
    {
      key: "youtube",
      icon: <FaYoutube className="text-white text-lg" />,
      bg: "bg-[#FF0000]",
    },
    {
      key: "tiktok",
      icon: <FaTiktok className="text-white text-lg" />,
      bg: "bg-[#010101]",
    },
  ] as const;

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[50vh]">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto bg-white rounded-xl shadow p-6 md:p-8">
      <h1 className="text-2xl md:text-3xl font-bold mb-8 text-gray-800 text-center">
        Social Media Links
      </h1>

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
        {inputs.map(({ key, icon, bg }) => (
          <div
            key={key}
            className="flex items-center w-full rounded-md overflow-hidden border border-gray-300 focus-within:ring-2 focus-within:ring-[#E1A451]"
          >
            <div
              className={`flex justify-center items-center w-12 h-10 ${bg} flex-shrink-0`}
            >
              {icon}
            </div>
            <input
              type="url"
              placeholder="Enter link..."
              {...register(key as keyof SocialLinks)}
              className="w-full px-3 py-2 text-sm text-gray-700 outline-none"
            />
          </div>
        ))}

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-success text-white font-medium px-6 py-2 rounded-md hover:bg-success cursor-pointer transition-colors disabled:opacity-60"
          >
            {isSubmitting ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default SocialLinksEditor;

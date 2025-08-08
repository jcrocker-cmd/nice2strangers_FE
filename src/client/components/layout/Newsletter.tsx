import Wrapper from "../common/Wrapper";
import Section from "../common/Section";
import "../../../assets/css/main.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { ApiRoutes, SWAL } from "../../../constants/constants";

type FormData = {
  name: string;
  email: string;
};

interface HomepageProps {
  setIsGlobalLoading: (value: boolean) => void;
}

const NewsletterSignup = ({ setIsGlobalLoading }: HomepageProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsGlobalLoading(true);
    try {
      await axios.post(ApiRoutes.Newsletter.postNewsletter, data);
      Swal.fire({
        icon: SWAL.ICON.success,
        title: "Created!",
        text: "The product has been successfully created.",
      });
      reset();
    } catch (err) {
      Swal.fire({
        icon: SWAL.ICON.error,
        title: "Creation failed",
        text: "An error occurred.",
      });
    } finally {
      setIsGlobalLoading(false);
    }
  };

  return (
    <Wrapper className="bg-[#F59E0B] text-white w-full py-12 px-4">
      <Section className="newsletter-section mx-auto text-center max-w-[1080px]">
        <h2 className="text-3xl font-bold mb-4">Subscribe To Our Newsletter</h2>
        <p className="mb-6 text-sm md:text-base">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam nunc
          justo, sagittis suscipit ultricies at, varius non velit.
        </p>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            required
            placeholder="Enter your name"
            className="input px-4 py-2 w-full sm:w-1/3 rounded border-1 border-white text-white focus:outline-none"
          />
          <input
            {...register("email", { required: "Email is required" })}
            type="email"
            required
            placeholder="Enter your email"
            className="input px-4 py-2 w-full sm:w-1/3 rounded border-1 border-white text-white focus:outline-none"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-2 bg-white text-gray-900 font-semibold cursor-pointer rounded hover:bg-gray-200 transition"
          >
            {isSubmitting ? "Submitting..." : "Submit"}
          </button>
        </form>
      </Section>
    </Wrapper>
  );
};

export default NewsletterSignup;

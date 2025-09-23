import { useEffect } from "react";
import ScrollReveal from "scrollreveal";
import icon from "../../../assets/img/icon.png";
import Section from "../common/Section";
import Wrapper from "../common/Wrapper";
import "../../../assets/css/main.css";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../state/store";
import { useDispatch } from "react-redux";
import { setIsSubmitting } from "../../../state/submission/submissionSlice";
import Swal from "sweetalert2";
import { ApiRoutes } from "../../../constants/constants";

interface FormInputs {
  Name: string;
  Subject: string;
  Message: string;
  ToEmail: string;
}

interface HomepageProps {
  setIsGlobalLoading: (value: boolean) => void;
}

const ContactForm = ({ setIsGlobalLoading }: HomepageProps) => {
  const dispatch = useDispatch<AppDispatch>();
  const isSubmitting = useSelector(
    (state: RootState) => state.submission.isSubmitting
  );
  useEffect(() => {
    ScrollReveal().reveal(".contact-container", {
      delay: 400,
      duration: 2000,
      distance: "50px",
      origin: "bottom",
    });
  }, []);

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormInputs>();

  // onSubmit handler
  const onSubmit = (formData: FormInputs) => {
    dispatch(setIsSubmitting(true));
    setIsGlobalLoading(true);
    axios
      .post(ApiRoutes.ContactUs.postContact, formData)
      .then((response) => {
        Swal.fire("Success!", "Email Sent Successfully", "success");
        console.log(response.data);
        reset();
      })
      .catch((error) => {
        Swal.fire("Error!", "Failed to send email", "error");
        console.error(error);
        reset();
      })
      .finally(() => {
        dispatch(setIsSubmitting(false));
        setIsGlobalLoading(false);
      });
  };

  return (
    <Wrapper
      id="contact-page"
      className="bg-[#F7F0D7] flex flex-col items-center justify-center px-4"
    >
      <Section className="contact-section mx-auto max-w-[1080px] relative flex flex-col items-center justify-center py-20">
        <h1 className="text-4xl md:text-4xl font-bold mb-10 text-black text-center">
          Contact Us!
        </h1>

        <div className="relative contact-container bg-[#F5E3A1] rounded-2xl p-6 md:p-10 w-full shadow-lg mt-25">
          {/* Floating Emoji */}
          <div className="absolute -top-22 left-1/2 transform -translate-x-1/2">
            <img src={icon} alt="emoji" className="w-40 " />
          </div>

          <form
            className="pt-10 space-y-5 w-[350px]"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <label className="block text-black ">
                Name <span className="text-red-500">*</span>
              </label>
              <input
                id="Name"
                type="text"
                className="mt-1 w-full bg-white rounded-xl border-none px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                {...register("Name", { required: "Name is required." })}
              />
              {errors.Name && (
                <p className="text-red-500 text-sm">{errors.Name.message}</p>
              )}
            </div>

            <div>
              <label className="block text-black ">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                id="ToEmail"
                type="text"
                className="mt-1 w-full bg-white rounded-xl border-none px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                {...register("ToEmail", {
                  required: "Email is required.",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email address.",
                  },
                  maxLength: {
                    value: 50,
                    message: "Email must be at most 50 characters long.",
                  },
                })}
              />
              {errors.ToEmail && (
                <p className="text-red-500 text-sm">{errors.ToEmail.message}</p>
              )}
            </div>

            <div>
              <label className="block text-black ">
                Subject <span className="text-red-500">*</span>
              </label>
              <input
                id="subject"
                type="text"
                className="mt-1 w-full bg-white rounded-xl border-none px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                {...register("Subject", { required: "Subject is required." })}
              />
              {errors.Subject && (
                <p className="text-red-500 text-sm">{errors.Subject.message}</p>
              )}
            </div>

            <div>
              <label className="block text-black ">
                Message <span className="text-red-500">*</span>
              </label>
              <textarea
                id="message"
                rows={4}
                className="mt-1 w-full bg-white rounded-xl border-none px-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                {...register("Message", { required: "Message is required." })}
              />
              {errors.Message && (
                <p className="text-red-500 text-sm">{errors.Message.message}</p>
              )}
            </div>

            <button
              type="submit"
              className="w-full bg-[#e0a44d] cursor-pointer text-white  py-2 rounded-md transition-all duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
      </Section>
    </Wrapper>
  );
};

export default ContactForm;

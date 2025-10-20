import { FcGoogle } from "react-icons/fc";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { ApiRoutes, SWAL } from "../../../constants/constants";
import { Roles } from "../../../constants/constants";

interface LoginFormInputs {
  email: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post(ApiRoutes.Auth.login, {
        email: data.email,
        password: data.password,
      });

      const { token, email, role, firstName, lastName, userId } = response.data;

      // Save token in localStorage (or cookies)
      localStorage.setItem("token", token);
      localStorage.setItem("email", email);
      localStorage.setItem("role", role);
      localStorage.setItem("firstName", firstName);
      localStorage.setItem("lastName", lastName);
      localStorage.setItem("userId", userId);
      if (role === Roles.ADMIN) {
        navigate("/dashboard");
      } else if (role === Roles.USER) {
        navigate("/shop-page");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      Swal.fire({
        icon: SWAL.ICON.error,
        title: "Failed",
        text: error.response?.data?.message || "Invalid email or password",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        {/* Header */}
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Welcome Back
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Login to your account
        </p>

        {/* Form */}
        <form className="space-y-5" onSubmit={handleSubmit(onSubmit)}>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: "Email is required" })}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none ${
                errors.email
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-yellow-400"
              }`}
            />
            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••"
              {...register("password", { required: "Password is required" })}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:outline-none ${
                errors.password
                  ? "border-red-500 focus:ring-red-400"
                  : "border-gray-300 focus:ring-yellow-400"
              }`}
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}

            {/* Show password & Forgot link */}
            <div className="flex items-center justify-between mt-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showPassword}
                  onChange={(e) => setShowPassword(e.target.checked)}
                  className="w-4 h-4 accent-yellow-500 border-gray-300 rounded cursor-pointer focus:ring-2 focus:ring-yellow-400"
                />
                <span className="text-sm text-gray-600">Show password</span>
              </label>

              <a
                href="/forgot-password"
                className="text-sm text-yellow-500 font-medium hover:underline"
              >
                Forgot password?
              </a>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 transition"
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-300" />
          <span className="text-gray-400 text-sm">OR</span>
          <div className="flex-1 h-px bg-gray-300" />
        </div>

        {/* Google Login */}
        <button
          onClick={() => (window.location.href = ApiRoutes.Auth.googleLogin)}
          className="w-full flex items-center cursor-pointer justify-center gap-3 py-3 border border-gray-300 rounded-xl hover:bg-gray-50 transition"
        >
          <FcGoogle className="text-xl" />
          <span className="font-medium">Sign in with Google</span>
        </button>

        {/* Footer */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-yellow-500 font-medium hover:underline"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

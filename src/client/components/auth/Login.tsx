import { FcGoogle } from "react-icons/fc";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate, useLocation } from "react-router-dom";
import { ApiRoutes, SWAL } from "../../../constants/constants";
import { Roles } from "../../../constants/constants";
import { setUser } from "../../../constants/user";

interface LoginFormInputs {
  email: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
}

const Login: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormInputs>();

    useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");

    if (token) {
      try {
        // Decode token payload (JWT base64)
        const payload = JSON.parse(atob(token.split(".")[1]));

        // Extract info from claims (based on your C# code)
        const email = payload["email"] || payload["http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress"];
        const role = payload["role"] || payload["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
        const firstName = payload["firstName"] || payload["given_name"] || "";
        const lastName = payload["lastName"] || payload["family_name"] || "";

        // Save in localStorage
        setUser({ email, firstName, lastName, role, token });

        // Clean up URL
        window.history.replaceState({}, document.title, "/");

        // Redirect based on role
        if (role === Roles.ADMIN) navigate("/dashboard");
        else if (role === Roles.USER) navigate("/shop-page");
        else navigate("/");
      } catch (err) {
        console.error("Failed to decode token:", err);
      }
    }
  }, [location, navigate]);

  const onSubmit = async (data: LoginFormInputs) => {
    try {
      const response = await axios.post(ApiRoutes.Auth.login, {
        email: data.email,
        password: data.password,
      });

      const { token, email, role, firstName, lastName } = response.data;
      setUser({ email, firstName, lastName, role, token });

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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 font-grotesk">
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
            className="w-full py-3 bg-black text-white rounded-xl cursor-pointer font-semibold hover:bg-gray-900 transition"
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
          onClick={() =>
            (window.location.href =
              "https://api.nice2strangers.org/api/Auth/google-login")
          }
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

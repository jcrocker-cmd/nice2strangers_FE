import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { ApiRoutes } from "../../../constants/constants";
import axios from "axios";

const ResetPassword = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // token typically comes from the reset-link: /reset-password?token=XXXXX

  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      setErr("Invalid or missing reset token.");
    }
  }, [token]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMsg(null);
    setErr(null);

    if (!token) {
      setErr("Missing reset token.");
      return;
    }
    if (password.length < 8) {
      setErr("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirm) {
      setErr("Passwords do not match.");
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with your API call to actually reset the password.
      // Example (pseudo):
      await axios.post(ApiRoutes.Auth.resetPassword, {
        email,
        token,
        newPassword: password,
      });

      // Simulate success:
      await new Promise((r) => setTimeout(r, 800));
      setMsg("Password updated successfully. Redirecting to login...");
      setTimeout(() => navigate("/login"), 1500);
    } catch (e) {
      setErr("Failed to reset password. The link may have expired.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 font-grotesk">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-gray-900">
          Create a New Password
        </h2>
        <p className="text-sm text-gray-500 text-center mb-6">
          Enter a new password for your account.
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              New password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Confirm password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              placeholder="••••••••"
              required
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-yellow-400 focus:outline-none transition"
            />
          </div>

          <div className="flex items-center justify-between mt-1">
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
              href="/login"
              className="text-sm text-yellow-500 font-medium hover:underline"
            >
              Back to login
            </a>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-black text-white rounded-xl font-semibold hover:bg-gray-900 transition disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update password"}
          </button>
        </form>

        {msg && (
          <div className="mt-4 text-sm text-green-600 bg-green-50 p-3 rounded">
            {msg}
          </div>
        )}
        {err && (
          <div className="mt-4 text-sm text-red-600 bg-red-50 p-3 rounded">
            {err}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;

import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPassword } from "../features/auth/authThunks";
import { resetPasswordSchema } from "../validator/auth.validator";
import { useSearchParams, useNavigate, Link } from "react-router";
import { resetAuthState } from "../features/auth/authSlice";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { NotepadText } from "lucide-react";

const ResetPassword = () => {
  const [form, setForm] = useState({
    otp: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const [params] = useSearchParams();
  const email = params.get("email");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, passwordReset } = useSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (passwordReset) {
      navigate("/login");
    }
  }, [passwordReset, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = resetPasswordSchema.safeParse({
      email,
      ...form,
    });

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});
    dispatch(resetPassword({ email, ...form }));
  };

  return (
    <div className="w-full min-h-screen bg-[#0d0d12] flex items-center justify-center px-6 py-20">
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.05 }}
        className="w-full max-w-md p-8 rounded-[32px] bg-[#15151b] shadow-2xl border border-[#252530]"
      >
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="bg-[#e6b000] text-black p-2 rounded-lg">
            <NotepadText size={20} />
          </div>

          <h2 className="font-semibold text-2xl text-white">Notegenius_AI</h2>
        </div>

        {/* Heading */}

        <h1 className="text-2xl md:text-3xl font-semibold text-center leading-snug mb-4 text-white">
          Create a new
          <span className="text-[#e6b000] px-1 py-1 rounded-full inline-flex items-center">
            Password
          </span>
        </h1>

        <p className="text-gray-400 text-center text-sm md:text-base leading-relaxed mb-2">
          Enter the verification code sent to
        </p>

        <p className="text-center text-sm font-medium text-gray-200 mb-8 break-all">
          {email}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* OTP */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-300">OTP</label>

            <input
              name="otp"
              type="text"
              value={form.otp}
              onChange={handleChange}
              placeholder="••••••"
              maxLength={6}
              className="w-full px-4 py-3 rounded-xl border border-[#2a2a35] bg-[#1a1a22] text-gray-100 placeholder-gray-500 text-sm tracking-[0.35em] text-center focus:outline-none focus:ring-2 focus:ring-[#e6b000] focus:border-transparent transition"
            />

            {errors.otp && (
              <p className="text-red-400 text-xs">{errors.otp[0]}</p>
            )}
          </div>

          {/* New Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-300">
              New Password
            </label>

            <input
              name="newPassword"
              type="password"
              value={form.newPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-[#2a2a35] bg-[#1a1a22] text-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#e6b000] focus:border-transparent transition"
            />

            {errors.newPassword && (
              <p className="text-red-400 text-xs">{errors.newPassword[0]}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-300">
              Confirm Password
            </label>

            <input
              name="confirmPassword"
              type="password"
              value={form.confirmPassword}
              onChange={handleChange}
              placeholder="••••••••"
              className="w-full px-4 py-3 rounded-xl border border-[#2a2a35] bg-[#1a1a22] text-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#e6b000] focus:border-transparent transition"
            />

            {errors.confirmPassword && (
              <p className="text-red-400 text-xs">
                {errors.confirmPassword[0]}
              </p>
            )}
          </div>

          {/* API Error */}
          {error && <p className="text-red-400 text-xs text-center">{error}</p>}

          {/* Submit */}
          <motion.button
            type="submit"
            whileHover={{ opacity: 0.9, scale: 1.03 }}
            whileTap={{ opacity: 1, scale: 0.98 }}
            disabled={loading}
            className="w-full py-3 bg-[#e6b000] text-black rounded-full shadow-md text-sm font-medium disabled:opacity-60"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </motion.button>
        </form>

        {/* Back */}
        <div className="flex justify-center mt-6">
          <Link
            to="/login"
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            <ArrowLeft size={12} />
            Back to login
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default ResetPassword;

import { useState, useEffect } from "react";
import { useSearchParams, useNavigate, Link } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { verifyOtp } from "../features/auth/authThunks";
import { verifyOtpSchema } from "../validator/auth.validator";
import { IoSparklesSharp } from "react-icons/io5";
import { motion } from "motion/react";
import { ArrowLeft } from "lucide-react";
import { NotepadText } from "lucide-react";

const VerifyOtp = () => {
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});

  const [params] = useSearchParams();
  const email = params.get("email");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth,
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = verifyOtpSchema.safeParse({ email, otp });

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});
    dispatch(verifyOtp({ email, otp }));
  };

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

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
          Verify your{" "}
          <span className="text-[#e6b000] px-1 py-1 rounded-full inline-flex items-center gap-2">
            Email
          </span>
        </h1>

        <p className="text-gray-400 text-center text-sm md:text-base leading-relaxed mb-2">
          We sent a 6-digit verification code to
        </p>

        <p className="text-center text-sm font-medium text-gray-200 mb-8 break-all">
          {email}
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* OTP */}
          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-300">
              Enter OTP
            </label>

            <input
              type="text"
              placeholder="••••••"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              maxLength={6}
              className="w-full px-4 py-3 rounded-xl border border-[#2a2a35] bg-[#1a1a22] text-gray-100 placeholder-gray-500 text-sm tracking-[0.35em] text-center focus:outline-none focus:ring-2 focus:ring-[#e6b000] focus:border-transparent transition"
            />

            {errors.otp && (
              <p className="text-red-400 text-xs">{errors.otp[0]}</p>
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
            {loading ? "Verifying..." : "Verify OTP"}
          </motion.button>
        </form>

        {/* Extra text */}
        <p className="text-center text-xs text-gray-500 mt-6">
          Didn’t receive the code?{" "}
          <button className="text-[#e6b000] hover:underline">Resend OTP</button>
        </p>

        {/* Back */}
        <div className="flex justify-center mt-4">
          <Link
            to="/register"
            className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors"
          >
            <ArrowLeft size={12} />
            Back to register
          </Link>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyOtp;

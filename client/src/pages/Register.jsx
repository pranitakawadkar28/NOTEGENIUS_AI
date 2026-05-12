import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { registerSchema } from "../validator/auth.validator";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authThunks";
import { resetAuthState } from "../features/auth/authSlice";
import { IoSparklesSharp } from "react-icons/io5";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { ArrowLeft } from "lucide-react";
import { NotepadText } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL;

const Register = ({ isModel = false, switchAuth, onClose }) => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, isRegistered } = useSelector((state) => state.auth);

  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);

  useEffect(() => {
    if (isRegistered) {
      navigate(`/verify-otp?email=${form.email}`);
      if (isModel) onClose?.();
    }
  }, [isRegistered, navigate, form.email, isModel, onClose]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = registerSchema.safeParse(form);

    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }

    setErrors({});
    dispatch(registerUser(result.data));
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE}/api/auth/google`;
  };

  return (
    <div
      className={`w-full relative overflow-hidden ${
        isModel
          ? "py-4"
          : "min-h-screen bg-[#08080e] flex items-center justify-center px-6 py-20"
      }`}
    >
      {/* Background Glow */}
      {!isModel && (
        <>
          <div className="absolute top-[-180px] right-[-120px] w-[420px] h-[420px] rounded-full bg-purple-500/10 blur-3xl" />
          <div className="absolute bottom-[-180px] left-[-120px] w-[380px] h-[380px] rounded-full bg-yellow-500/10 blur-3xl" />

          {/* Grid */}
          <div
            className="absolute inset-0 opacity-[0.04]"
            style={{
              backgroundImage: `
              linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
            `,
              backgroundSize: "56px 56px",
              maskImage:
                "radial-gradient(circle at center, black 35%, transparent 90%)",
            }}
          />
        </>
      )}

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className={`
        relative z-10 w-full overflow-hidden border border-white/10 shadow-[0_40px_100px_rgba(0,0,0,0.65)]
        ${
          isModel
            ? "max-w-md rounded-3xl bg-[#15151b] p-8"
            : "max-w-6xl grid lg:grid-cols-2 rounded-[32px]"
        }
      `}
      >
        {/* LEFT SIDE */}
        {!isModel && (
          <div className="hidden lg:flex relative flex-col justify-center bg-gradient-to-br from-[#101018] to-[#151320] px-14 py-16 border-r border-white/5 overflow-hidden">
            {/* Glow */}
            <div className="absolute bottom-[-100px] right-[-100px] w-[260px] h-[260px] rounded-full bg-purple-500/10 blur-3xl" />

            {/* Tag */}
            <div className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full border border-[#e6b000]/20 bg-[#e6b000]/10 mb-8">
              <div className="w-2 h-2 rounded-full bg-[#e6b000] animate-pulse" />
              <span className="text-xs font-semibold tracking-wide text-[#e6b000]">
                AI-Powered Study Platform
              </span>
            </div>

            {/* Heading */}
            <h1 className="text-5xl font-bold leading-[1.05] tracking-[-2px] text-white mb-6">
              Create 
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text px-3 text-transparent italic">
                Smart
              </span>
              <br />
              <span className="bg-gradient-to-r from-[#e6b000] to-yellow-300 bg-clip-text text-transparent italic">
                AI Notes
              </span>{" "}
              for <br />
              Exams
            </h1>

            {/* Description */}
            <p className="text-gray-400 leading-7 text-[15px] max-w-md mb-10">
              Generate AI-powered notes, diagrams, summaries & printable PDFs
              instantly for smarter exam preparation.
            </p>

            {/* Benefits */}
            <div className="space-y-5">
              {[
                "Generate notes instantly with AI",
                "Create diagrams & flowcharts",
                "Export beautiful PDF notes",
                "Perfect for exam preparation",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.08 }}
                  className="flex items-center gap-4"
                >
                  <div className="w-8 h-8 rounded-xl border border-[#e6b000]/20 bg-[#e6b000]/10 flex items-center justify-center text-[#e6b000] text-sm">
                    ✦
                  </div>

                  <span className="text-sm text-gray-300">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* RIGHT SIDE */}
        <div className={`bg-[#15151b] ${isModel ? "" : "px-8 md:px-14 py-12"}`}>
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <div className="bg-[#e6b000] text-black p-2 rounded-xl">
              <NotepadText size={20} />
            </div>

            <h2 className="font-semibold text-2xl text-white">Notegenius_AI</h2>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-center leading-tight text-white mb-4">
            Create your account{" "}
            <span className="block mt-2 bg-gradient-to-r from-[#e6b000] to-yellow-300 bg-clip-text text-transparent">
              AI Notes
            </span>
          </h1>

          <p className="text-gray-400 text-center text-sm md:text-base leading-relaxed mb-8">
            AI-powered notes for smarter exam prep — generate notes, diagrams &
            PDFs instantly.
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            {/* Username */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-300">
                Username
              </label>

              <input
                name="username"
                value={form.username}
                onChange={handleChange}
                placeholder="john_doe"
                className="w-full px-4 py-3 rounded-2xl border border-[#2a2a35] bg-[#1a1a22] text-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#e6b000] transition"
              />

              {errors.username && (
                <p className="text-red-400 text-xs">{errors.username[0]}</p>
              )}
            </div>

            {/* Email */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-300">Email</label>

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-4 py-3 rounded-2xl border border-[#2a2a35] bg-[#1a1a22] text-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#e6b000] transition"
              />

              {errors.email && (
                <p className="text-red-400 text-xs">{errors.email[0]}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-1">
              <label className="text-sm font-medium text-gray-300">
                Password
              </label>

              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3 rounded-2xl border border-[#2a2a35] bg-[#1a1a22] text-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#e6b000] transition"
              />

              {errors.password && (
                <p className="text-red-400 text-xs">{errors.password[0]}</p>
              )}
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-400 text-xs text-center">{error}</p>
            )}

            {/* Submit */}
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={loading}
              className="w-full py-3 mt-2 bg-[#e6b000] hover:bg-yellow-400 text-black rounded-full font-semibold transition disabled:opacity-60"
            >
              {loading ? "Signing up..." : "Sign Up"}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#252530]" />
            <span className="text-xs text-gray-500">or</span>
            <div className="flex-1 h-px bg-[#252530]" />
          </div>

          {/* Google */}
          <motion.button
            type="button"
            onClick={handleGoogleLogin}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 py-3 border border-[#2a2a35] bg-[#1a1a22] rounded-full text-sm font-medium text-gray-200"
          >
            <FcGoogle size={20} />
            Continue with Google
          </motion.button>

          {/* Login */}
          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{" "}
            {isModel ? (
              <button
                onClick={switchAuth}
                className="text-[#e6b000] font-medium hover:underline"
              >
                Sign in
              </button>
            ) : (
              <Link
                to="/login"
                className="text-[#e6b000] font-medium hover:underline"
              >
                Sign in
              </Link>
            )}
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;

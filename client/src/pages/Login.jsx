import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../features/auth/authThunks";
import { Link, useNavigate } from "react-router";
import { loginSchema } from "../validator/auth.validator";
import { resetAuthState } from "../features/auth/authSlice";
import { IoSparklesSharp } from "react-icons/io5";
import { motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { BsRobot } from "react-icons/bs";
import { ArrowLeft, NotepadText, Eye, EyeOff } from "lucide-react";

const API_BASE = import.meta.env.VITE_API_URL;

const Login = ({ isModel = false, switchAuth }) => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPass, setShowPass] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((s) => s.auth);

  useEffect(() => {
    return () => {
      dispatch(resetAuthState());
    };
  }, [dispatch]);
  useEffect(() => {
    if (isAuthenticated && !isModel) navigate("/");
  }, [isAuthenticated, navigate, isModel]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = loginSchema.safeParse(form);
    if (!result.success) {
      setErrors(result.error.flatten().fieldErrors);
      return;
    }
    setErrors({});
    dispatch(loginUser(form));
  };

  const handleGoogleLogin = () => {
    window.location.href = `${API_BASE}/api/auth/google`;
  };

  const benefits = [
    { icon: "✦", text: "100 free credits on signup" },
    { icon: "✦", text: "High-yield, revision-ready exam notes" },
    { icon: "✦", text: "Auto-generated diagrams & charts" },
    { icon: "✦", text: "Download clean, printable PDFs" },
  ];

  return (
    <div
      className={`w-full ${
        isModel
          ? "py-4"
          : "min-h-screen bg-[#08080e] flex items-center justify-center px-6 py-20 overflow-hidden relative"
      }`}
    >
      {/* Background Glow */}
      {!isModel && (
        <>
          <div className="absolute top-[-180px] right-[-120px] w-[500px] h-[500px] rounded-full bg-purple-500/10 blur-3xl" />
          <div className="absolute bottom-[-160px] left-[-100px] w-[400px] h-[400px] rounded-full bg-yellow-500/10 blur-3xl" />
        </>
      )}

      <motion.div
        initial={{ opacity: 0, y: 32 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className={`
        relative z-10 w-full overflow-hidden
        ${
          isModel
            ? "max-w-md rounded-[28px]"
            : "max-w-6xl grid md:grid-cols-2 rounded-[32px]"
        }
        border border-white/10 bg-[#101018] shadow-[0_40px_100px_rgba(0,0,0,0.6)]
      `}
      >
        {/* ───────────────── LEFT SIDE ───────────────── */}
        {!isModel && (
          <div className="hidden md:flex flex-col justify-center bg-gradient-to-br from-[#0f0f1a] to-[#12101e] px-14 py-16 border-r border-white/5 relative overflow-hidden">
            {/* Glow */}
            <div className="absolute bottom-[-80px] right-[-80px] w-[280px] h-[280px] rounded-full bg-purple-500/10 blur-3xl" />

            {/* Tag */}
            <div className="inline-flex items-center gap-2 w-fit px-4 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/10 mb-8">
              <span className="w-2 h-2 rounded-full bg-[#e6b000] animate-pulse" />

              <span className="text-xs font-semibold tracking-wide text-[#e6b000]">
                AI-Powered Study Platform
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-5xl font-extrabold leading-[1.05] tracking-[-2px] text-white mb-5">
              Welcome <br />
              Back to{" "}
              <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent italic">
                Smart
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-400 to-purple-300 bg-clip-text text-transparent">
                AI Notes
              </span>
            </h2>

            {/* Description */}
            <p className="text-[15px] leading-7 text-[#8f90aa] max-w-md mb-10">
              Continue creating exam notes, diagrams & printable PDFs — powered
              by AI.
            </p>

            {/* Features */}
            <div className="space-y-4">
              {[
                "Generate smart AI notes instantly",
                "Create diagrams & visual summaries",
                "Export beautiful printable PDFs",
                "Study faster with AI-powered learning",
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 + i * 0.08 }}
                  className="flex items-center gap-3 border-b border-white/5 pb-4"
                >
                  <div className="w-6 h-6 rounded-md bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-[#e6b000] text-xs">
                    ✦
                  </div>

                  <span className="text-sm text-[#a3a3bf]">{item}</span>
                </motion.div>
              ))}
            </div>
          </div>
        )}

        {/* ───────────────── RIGHT SIDE ───────────────── */}
        <div className={`${isModel ? "p-8" : "p-10 md:p-14"} bg-[#15151b]`}>
          {/* Logo */}
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-[#e6b000] text-black p-2 rounded-lg">
              <NotepadText size={20} />
            </div>

            <h2 className="font-semibold text-2xl text-white">Notegenius_AI</h2>
          </div>

          {/* Heading */}
          <h1 className="text-3xl md:text-4xl font-bold text-center leading-tight mb-4 text-white">
            Welcome back to
            <span className="text-[#e6b000] px-14 inline-flex items-center gap-2">
              AI Notes
            </span>
          </h1>

          <p className="text-gray-400 text-center text-sm md:text-base leading-relaxed mb-8">
            Continue creating AI notes, diagrams & PDFs for your exam prep.
          </p>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {/* Email */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-gray-300">Email</label>

              <input
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="john@example.com"
                className="w-full px-4 py-3.5 rounded-2xl border border-[#2a2a35] bg-[#1a1a22] text-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#e6b000] transition"
              />

              {errors.email && (
                <p className="text-red-400 text-xs">{errors.email[0]}</p>
              )}
            </div>

            {/* Password */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium text-gray-300">
                  Password
                </label>

                <Link
                  to="/forgot-password"
                  className="text-xs text-[#e6b000] hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>

              <input
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="w-full px-4 py-3.5 rounded-2xl border border-[#2a2a35] bg-[#1a1a22] text-gray-100 placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-[#e6b000] transition"
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
              className="w-full py-3.5 bg-[#e6b000] text-black rounded-2xl shadow-lg text-sm font-semibold disabled:opacity-60"
            >
              {loading ? "Signing in..." : "Sign In"}
            </motion.button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6">
            <div className="flex-1 h-px bg-[#252530]" />
            <span className="text-gray-500 text-xs">or</span>
            <div className="flex-1 h-px bg-[#252530]" />
          </div>

          {/* Google */}
          <motion.button
            type="button"
            onClick={handleGoogleLogin}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full flex items-center justify-center gap-3 py-3.5 border border-[#2a2a35] bg-[#1a1a22] rounded-2xl text-sm font-medium text-gray-200"
          >
            <FcGoogle size={20} />
            Continue with Google
          </motion.button>

          {/* Footer */}
          <p className="text-center text-sm text-gray-400 mt-8">
            Don&apos;t have an account?{" "}
            <Link
              to="/register"
              className="text-[#e6b000] font-medium hover:underline"
            >
              Sign up
            </Link>
          </p>

          {!isModel && (
            <div className="flex justify-center mt-4">
              <Link
                to="/"
                className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-300 transition-colors"
              >
                <ArrowLeft size={12} />
                Back to home
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default Login;

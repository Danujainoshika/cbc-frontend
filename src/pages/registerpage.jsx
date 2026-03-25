import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

export default function RegisterPage() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  function validateForm() {
    const nextErrors = {};

    if (!email.trim()) {
      nextErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(email)) {
      nextErrors.email = "Enter a valid email address.";
    }

    if (!firstName.trim()) {
      nextErrors.firstName = "First name is required.";
    }

    if (!lastName.trim()) {
      nextErrors.lastName = "Last name is required.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    } else if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    if (!confirmPassword) {
      nextErrors.confirmPassword = "Please confirm your password.";
    } else if (password !== confirmPassword) {
      nextErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  async function register(e) {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix the highlighted fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      await axios.post(import.meta.env.VITE_API_URL + "/api/users/", {
        email: email.trim(),
        password,
        firstname: firstName.trim(),
        lastname: lastName.trim(),
      });
      toast.success("Registration successful. Please login.");
      navigate("/login");
    } catch (error) {
      const message = error?.response?.data?.message || "Registration failed. Please try again.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    
    <div className="w-full min-h-screen flex flex-col md:flex-row bg-[url('/bg.jpg')] bg-cover bg-center relative overflow-hidden">
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)/90] via-[var(--color-secondary)/65] to-[var(--color-accent)/45] backdrop-blur-sm"></div>
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(255,255,255,0.18),transparent_42%),radial-gradient(circle_at_80%_0%,rgba(255,157,0,0.24),transparent_35%)]"></div>

      {/* LEFT — Brand Section */}
      <div className="relative z-10 hidden md:flex w-1/2 flex-col justify-center px-16 text-[var(--color-primary)]">
        <h1 className="text-6xl font-bold mb-4 leading-tight drop-shadow-lg tracking-tight">
          Crystal <span className="text-[var(--color-accent)]">Beauty</span> Clear
        </h1>
        <p className="text-lg text-[var(--color-primary)/90] leading-relaxed max-w-lg drop-shadow-sm">
          Discover your inner glow with <b>CBC</b> 💎 — where luxury meets confidence.
          Indulge in premium cosmetics crafted to make you shine naturally.
        </p>
        <div className="mt-8 text-sm text-[var(--color-primary)/70] italic tracking-wide">
          “Where beauty meets clarity — naturally.”
        </div>
      </div>

      {/* RIGHT — Register Form */}
      <div className="relative z-10 flex w-full md:w-1/2 justify-center items-center px-5 sm:px-10 py-8 sm:py-16">
        <form
          onSubmit={register}
          className="w-full max-w-lg bg-gradient-to-b from-white/25 to-white/10 backdrop-blur-2xl border border-white/35 rounded-3xl shadow-[0_24px_70px_rgba(20,20,20,0.35)] p-6 sm:p-9 md:p-10 flex flex-col items-center animate-fadeIn"
          noValidate
        >
          <div className="absolute -inset-px -z-10 rounded-3xl bg-gradient-to-r from-white/20 via-transparent to-[var(--color-accent)]/35 blur-sm"></div>
          
          {/* Logo */}
          <img
            src="/logo.png"
            alt="CBC Logo"
            className="w-[128px] h-[128px] sm:w-[144px] sm:h-[144px] object-cover drop-shadow-xl mb-3 hover:scale-105 transition-transform duration-300"
          />

          {/* Heading */}
          <h2 className="text-3xl font-bold text-[var(--color-primary)] drop-shadow-sm text-center tracking-tight">
            Register
          </h2>
          <p className="text-sm text-[var(--color-primary)/80] text-center mb-6">
            Create your account to continue your beauty journey with <b>CBC</b>.
          </p>

          {/* Input Fields */}
          <div className="w-full space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-primary)/90] mb-1">
                Email
              </label>
              <input
                type="email"
                placeholder="Enter your email"
                className={`w-full h-12 px-4 rounded-xl bg-[var(--color-primary)]/95 border border-transparent text-[var(--color-secondary)] focus:ring-4 focus:ring-[var(--color-accent)]/40 focus:border-[var(--color-accent)]/40 focus:outline-none placeholder-[var(--color-secondary)/55] transition-all shadow-sm ${
                  errors.email ? "ring-2 ring-red-400" : ""
                }`}
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
              {errors.email && <p className="mt-1 text-xs text-red-200">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
              <label className="block text-sm font-medium text-[var(--color-primary)/90] mb-1">
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter your first name"
                className={`w-full h-12 px-4 rounded-xl bg-[var(--color-primary)]/95 border border-transparent text-[var(--color-secondary)] focus:ring-4 focus:ring-[var(--color-accent)]/40 focus:border-[var(--color-accent)]/40 focus:outline-none placeholder-[var(--color-secondary)/55] transition-all shadow-sm ${
                  errors.firstName ? "ring-2 ring-red-400" : ""
                }`}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
              {errors.firstName && <p className="mt-1 text-xs text-red-200">{errors.firstName}</p>}
              </div>

              <div>
              <label className="block text-sm font-medium text-[var(--color-primary)/90] mb-1">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter your last name"
                className={`w-full h-12 px-4 rounded-xl bg-[var(--color-primary)]/95 border border-transparent text-[var(--color-secondary)] focus:ring-4 focus:ring-[var(--color-accent)]/40 focus:border-[var(--color-accent)]/40 focus:outline-none placeholder-[var(--color-secondary)/55] transition-all shadow-sm ${
                  errors.lastName ? "ring-2 ring-red-400" : ""
                }`}
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
              {errors.lastName && <p className="mt-1 text-xs text-red-200">{errors.lastName}</p>}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-primary)/90] mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className={`w-full h-12 px-4 rounded-xl bg-[var(--color-primary)]/95 border border-transparent text-[var(--color-secondary)] focus:ring-4 focus:ring-[var(--color-accent)]/40 focus:border-[var(--color-accent)]/40 focus:outline-none placeholder-[var(--color-secondary)/55] transition-all shadow-sm ${
                  errors.password ? "ring-2 ring-red-400" : ""
                }`}
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
              {errors.password && <p className="mt-1 text-xs text-red-200">{errors.password}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-primary)/90] mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Re-enter your password"
                className={`w-full h-12 px-4 rounded-xl bg-[var(--color-primary)]/95 border border-transparent text-[var(--color-secondary)] focus:ring-4 focus:ring-[var(--color-accent)]/40 focus:border-[var(--color-accent)]/40 focus:outline-none placeholder-[var(--color-secondary)/55] transition-all shadow-sm ${
                  errors.confirmPassword ? "ring-2 ring-red-400" : ""
                }`}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              {errors.confirmPassword && <p className="mt-1 text-xs text-red-200">{errors.confirmPassword}</p>}
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 mt-6 bg-gradient-to-r from-[var(--color-accent)] to-amber-500 text-[var(--color-primary)] font-semibold rounded-xl shadow-lg hover:shadow-[0_0_25px_rgba(255,157,0,0.6)] hover:brightness-105 hover:scale-[1.02] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isSubmitting ? "Registering..." : "Register"}
          </button>

          {/* Divider */}
          <div className="w-full flex items-center my-6">
            <hr className="flex-1 border-[var(--color-primary)/30]" />
            <span className="mx-3 text-xs text-[var(--color-primary)/70]">or</span>
            <hr className="flex-1 border-[var(--color-primary)/30]" />
          </div>

          {/* Signup Link */}
          <p className="text-sm text-[var(--color-primary)/80] text-center ">
            Already have an account?{" "}
            <Link className="text-[var(--color-accent)] hover:underline cursor-pointer font-medium" to="/login">
              Login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

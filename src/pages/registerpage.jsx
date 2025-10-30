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
  const navigate = useNavigate();

  async function register() {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }
    try {
      await axios.post(import.meta.env.VITE_API_URL + "/api/users/", {
        email: email,
        password: password,
        firstname: firstName,
        lastname: lastName,
      });
      toast.success("Registration successful. Please login.");
      navigate("/login");
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  }

  return (
    
    <div className="w-full h-screen flex flex-col md:flex-row bg-[url('./bg.jpg')] bg-cover bg-center relative overflow-hidden overflow-y-scroll">
      {/* Overlay */}
      <div className="absolute  inset-0 bg-gradient-to-br from-[var(--color-secondary)/90] via-[var(--color-secondary)/60] to-[var(--color-accent)/50] backdrop-blur-sm"></div>

      {/* LEFT — Brand Section */}
      <div className="relative z-10 hidden md:flex w-1/2 flex-col justify-center px-16 text-[var(--color-primary)]">
        <h1 className="text-6xl font-bold mb-4 leading-tight drop-shadow-lg">
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
      <div className="relative z-10 flex w-full md:w-1/2 justify-center items-center px-6 sm:px-10 py-6 sm:py-16">
        <div className="w-full max-w-md bg-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-[0_0_50px_rgba(255,255,255,0.1)] p-6 sm:p-10 md:p-12 flex flex-col items-center animate-fadeIn space-y-2">
          
          {/* Logo */}
          <img
            src="/logo.png"
            alt="CBC Logo"
            className="w-[100px] h-[100px]  object-cover drop-shadow-xl mb-2 hover:scale-110 transition-transform duration-300"
          />

          {/* Heading */}
          <h2 className="text-3xl font-bold text-[var(--color-primary)]  drop-shadow-sm text-center">
            Register
          </h2>

          {/* Input Fields */}
          <div className="w-full space-y-4">
            <div>
              <label className="block text-sm font-medium text-[var(--color-primary)/90] mb-1">
                Email
              </label>
              <input
                type="text"
                placeholder="Enter your email"
                className="w-full h-12 px-4 rounded-xl bg-[var(--color-primary)]/90 text-[var(--color-secondary)] focus:ring-4 focus:ring-[var(--color-accent)]/50 focus:outline-none placeholder-[var(--color-secondary)/50] transition-all shadow-sm"
                onChange={(e) => setemail(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-primary)/90] mb-1">
                First Name
              </label>
              <input
                type="text"
                placeholder="Enter your first name"
                className="w-full h-12 px-4 rounded-xl bg-[var(--color-primary)]/90 text-[var(--color-secondary)] focus:ring-4 focus:ring-[var(--color-accent)]/50 focus:outline-none placeholder-[var(--color-secondary)/50] transition-all shadow-sm"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-primary)/90] mb-1">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Enter your last name"
                className="w-full h-12 px-4 rounded-xl bg-[var(--color-primary)]/90 text-[var(--color-secondary)] focus:ring-4 focus:ring-[var(--color-accent)]/50 focus:outline-none placeholder-[var(--color-secondary)/50] transition-all shadow-sm"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-primary)/90] mb-1">
                Password
              </label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full h-12 px-4 rounded-xl bg-[var(--color-primary)]/90 text-[var(--color-secondary)] focus:ring-4 focus:ring-[var(--color-accent)]/50 focus:outline-none placeholder-[var(--color-secondary)/50] transition-all shadow-sm"
                onChange={(e) => setpassword(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-primary)/90] mb-1">
                Confirm Password
              </label>
              <input
                type="password"
                placeholder="Re-enter your password"
                className="w-full h-12 px-4 rounded-xl bg-[var(--color-primary)]/90 text-[var(--color-secondary)] focus:ring-4 focus:ring-[var(--color-accent)]/50 focus:outline-none placeholder-[var(--color-secondary)/50] transition-all shadow-sm"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Register Button */}
          <button
            onClick={register}
            className="w-full h-12 mt-6 bg-gradient-to-r from-[var(--color-accent)] to-amber-500 text-[var(--color-primary)] font-semibold rounded-xl shadow-lg hover:shadow-[0_0_25px_rgba(255,157,0,0.6)] hover:scale-[1.04] transition-all duration-300"
          >
            Register
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
        </div>
      </div>
    </div>
  );
}

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function LoginPage() {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  async function login() {
    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + "/api/users/login",
        {
          email: email,
          password: password,
        }
      );
      localStorage.setItem("token", response.data.token);
      const user = response.data.user;
      console.log(user)

      if (user.role === "admin") {
        navigate("/admin");
        toast.success("Login successful");
      } else {
        navigate("/");
        toast.success("Login successful");
      }
    } catch (error) {
      toast.error("Login failed. Please check your credentials");
    }
  }

  return (
    <div className="w-full h-screen flex bg-[url('./bg.jpg')] bg-cover bg-center relative overflow-hidden">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)/80] to-[var(--color-accent)/40] backdrop-blur-[2px]"></div>

      {/* LEFT SIDE — Brand Description */}
      <div className="relative z-10 w-1/2 hidden md:flex flex-col justify-center items-start px-16 text-[var(--color-primary)]">
        <h1 className="text-5xl font-bold mb-4 leading-tight drop-shadow-md">
        Crystal <span className="text-[var(--color-accent)]">Beauty</span> Clear
        </h1>
        <p className="text-lg text-[var(--color-primary)/90] leading-relaxed max-w-lg">
          Discover your inner glow with <b>CBC</b> 💎 —  
          where luxury meets confidence. Indulge in premium cosmetics crafted to make you shine naturally.
        </p>
        <div className="mt-8 text-sm text-[var(--color-primary)/70] italic">
          “Where beauty meets clarity — naturally.”
        </div>
      </div>

      {/* RIGHT SIDE — Login Form */}
      <div className="relative z-10 w-full md:w-1/2 flex justify-center items-center">
        <div className="w-[90%] sm:w-[450px] md:w-[400px] bg-[var(--color-primary)]/25 backdrop-blur-2xl border border-white/20 rounded-3xl shadow-2xl p-10 flex flex-col justify-center items-center gap-5 animate-fadeIn">
          
          {/* Logo at the top */}
          <img
            src="/logo.png"
            alt="CBC Logo"
            className="w-28 h-28 object-contain mb-2 drop-shadow-lg hover:scale-105 transition-transform duration-300"
          />

          {/* Form title */}
          <h2 className="text-3xl font-semibold text-[var(--color-secondary)] mb-1">
            Welcome back to CBC
          </h2>
          <p className="text-sm text-[var(--color-secondary)/80] mb-4 text-center">
             Please log in to continue your beauty journey.
          </p>

          {/* Email input */}
          <input
            type="text"
            placeholder="Enter your email"
            className="w-full h-12 px-4 rounded-xl bg-[var(--color-primary)]/80 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] placeholder-[var(--color-secondary)/60] text-[var(--color-secondary)] shadow-sm transition-all"
            onChange={(e) => setemail(e.target.value)}
          />

          {/* Password input */}
          <input
            type="password"
            placeholder="Enter your password"
            className="w-full h-12 px-4 rounded-xl bg-[var(--color-primary)]/80 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] placeholder-[var(--color-secondary)/60] text-[var(--color-secondary)] shadow-sm transition-all"
            onChange={(e) => setpassword(e.target.value)}
          />

          {/* Login button */}
          <button
            onClick={login}
            className="w-full h-12 mt-2 bg-gradient-to-r from-[var(--color-accent)] to-amber-500 text-[var(--color-primary)] font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-[1.03] transition-all duration-300"
          >
            Login
          </button>

          {/* Signup link */}
          <p className="text-sm text-[var(--color-secondary)/70] mt-3">
            Don’t have an account?{" "}
            <span className="text-[var(--color-accent)] hover:underline cursor-pointer">
              Create one now
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function ChangePasswordPage() {
    const [step, setStep] = useState("email");
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();

    async function sendOtp() {
        try {
           await axios.get(import.meta.env.VITE_API_URL + "/api/users/send-otp/"+email);
           toast.success("OTP sent to your email"); 
           setStep("otp");
        } catch (error) {
            toast.error("Failed to send OTP. Please try again.");
        }
    }

    async function changePassword() {
        if (newPassword !== confirmPassword) {
            toast.error("Passwords do not match.");
            return;
        }
        try {
           await axios.post(import.meta.env.VITE_API_URL + "/api/users/change-password", {
                email: email,
                otp: otp,
                newPassword: newPassword
           }).then(()=>{
                toast.success("Password changed successfully. Please login.");
                navigate("/login");
           });
           
           
        } catch (error) {
            toast.error("Failed to change password. Please try again.");
        }
    }
    return (
        <div className="w-full h-screen flex flex-col md:flex-row bg-[url('/bg.jpg')] bg-cover bg-center justify-center items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-secondary)/90] via-[var(--color-secondary)/60] to-[var(--color-accent)/50] backdrop-blur-sm"></div>
                <div className="relative z-10 flex w-full md:w-1/2 justify-center items-center px-6 sm:px-10 py-6 sm:py-16">
                    {step=="email" && <div className="w-full max-w-md bg-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-[0_0_50px_rgba(255,255,255,0.1)] p-6 sm:p-10 md:p-12 flex flex-col items-center animate-fadeIn space-y-2">
                        <h2 className="text-3xl font-bold text-[var(--color-primary)]  drop-shadow-sm text-center mb-6">
                            Change Password
                        </h2>
                        <input
                            type="email"
                            value={email}
                            placeholder="Enter your email"
                            className="w-full mb-4 px-4 py-2 rounded-lg border border-white/30 bg-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <button
                            className="w-full bg-[var(--color-accent)] text-white py-2 rounded-lg hover:bg-accent/80 transition-colors"
                            onClick={sendOtp}
                        >
                            Send OTP
                        </button>
                    </div>}
                    {step=="otp" && <div className="w-full max-w-md bg-white/20 backdrop-blur-2xl border border-white/30 rounded-3xl shadow-[0_0_50px_rgba(255,255,255,0.1)] p-6 sm:p-10 md:p-12 flex flex-col items-center animate-fadeIn space-y-2">
                        <h2 className="text-3xl font-bold text-[var(--color-primary)]  drop-shadow-sm text-center mb-6">
                            Change Password
                        </h2>
                        <input
                            type="text"
                            value={otp}
                            placeholder="Enter OTP"
                            className="w-full mb-4 px-4 py-2 rounded-lg border border-white/30 bg-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                            onChange={(e) => setOtp(e.target.value)}
                        />
                        <input
                            type="password"
                            value={newPassword}
                            placeholder="Enter your new password"
                            className="w-full mb-4 px-4 py-2 rounded-lg border border-white/30 bg-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                            onChange={(e) => setNewPassword(e.target.value)}
                        />
                        <input
                            type="password"
                            value={confirmPassword}
                            placeholder="Confirm your new password"
                            className="w-full mb-4 px-4 py-2 rounded-lg border border-white/30 bg-white/50 focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)]"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <button
                            className="w-full bg-[var(--color-accent)] text-white py-2 rounded-lg hover:bg-accent/80 transition-colors"
                            onClick={changePassword}
                        >
                             Change Password
                        </button>
                    </div>}

                </div>
        </div>
    )
}
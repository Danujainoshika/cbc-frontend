import axios from "axios";
import { useState, useMemo, useEffect } from "react";
import mediaUpload from "../utils/mediaUpload";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { FiUpload, FiUser, FiLock } from "react-icons/fi";

export default function UserSettings() {
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [image, setImage] = useState(null);
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [user, setUser] = useState(null);
	const navigate = useNavigate();

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (!token) {
			navigate("/login")
			return;
		}
		axios
			.get(import.meta.env.VITE_API_URL + "/api/users/me", {
				headers: { Authorization: `Bearer ${token}` },
			})
			.then((res) => {
				setFirstName(res.data.firstname);
				setLastName(res.data.lastname);
				setUser(res.data);
                
			})
			.catch(() => {
				localStorage.removeItem("token");
				navigate("/login");
			});
	}, []);

	async function updateUserData() {
		const data = {
			firstname: firstName,
			lastname : lastName,
			image: user.image,
		};
		if (image != null) {
			const link = await mediaUpload(image);
			image.profilePicture = link;
		}

		await axios
			.put(import.meta.env.VITE_API_URL + "/api/users/me", data, {
				headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
			})
			.then(() => {
				toast.success("Profile updated successfully!");
			})
			.catch((err) => {
				console.error("Error updating profile:", err);
				toast.error("Failed to update profile");
			});
		navigate("/");
	}

	async function updatePassword() {
		if (password !== confirmPassword) {
			toast.error("Passwords do not match");
			return;
		}
		await axios
			.put(
				import.meta.env.VITE_API_URL + "/api/users/me/password",
				{
					password : password
				},
				{
					headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
				}
			)
			.then(() => {
				toast.success("Password updated successfully!");
				setPassword("");
				setConfirmPassword("");
			})
			.catch((err) => {
				console.error("Error updating password:", err);
				toast.error("Failed to update password");
			});
		navigate("/");
	}

	const imagePreview = useMemo(() => (image ? URL.createObjectURL(image) : ""), [image]);
	const pwdMismatch = password && confirmPassword && password !== confirmPassword;

	return (
		<div className="w-full h-full min-h-screen bg-[url('/bg.jpg')] bg-cover bg-center flex flex-col lg:flex-row justify-center items-center py-10">
			{/* Left Panel */}
			<div className="w-full lg:w-[40%] backdrop-blur-3xl rounded-3xl m-6 p-8 flex flex-col bg-gradient-to-br from-primary/70 to-primary/50 shadow-2xl ring-1 ring-secondary/20">
				<h1 className="text-3xl font-extrabold mb-6 text-center text-secondary tracking-wide">
					User Settings
				</h1>

				{/* Avatar + Upload */}
				<div className="flex flex-col items-center gap-4 mb-6">
					<div className="w-28 h-28 rounded-full overflow-hidden ring-4 ring-accent/60 shrink-0 shadow-lg">
						{imagePreview ? (
							<img
								src={imagePreview}
								alt="Profile preview"
								className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
							/>
						) : (
							<div className="w-full h-full grid place-items-center bg-secondary/20 text-secondary/50 text-sm">
								<FiUser size={28} />
							</div>
						)}
					</div>

					<label className="inline-flex items-center gap-2 px-5 py-2 rounded-2xl cursor-pointer bg-white/80 hover:bg-white transition shadow border border-secondary/20">
						<FiUpload className="text-accent" />
						<span className="text-sm font-medium text-secondary">Upload Photo</span>
						<input
							type="file"
							accept="image/*"
							className="hidden"
							onChange={(e) => {
								const f = e.target.files && e.target.files[0] ? e.target.files[0] : null;
								setImage(f);
							}}
						/>
					</label>
				</div>

				{/* Names */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					<div className="flex flex-col">
						<label className="text-sm text-secondary/70 mb-1">First Name</label>
						<input
							value={firstName}
							onChange={(e) => setFirstName(e.target.value)}
							placeholder="Jane"
							className="px-4 py-2 rounded-2xl bg-white/90 border border-secondary/20 outline-none focus:ring-2 focus:ring-accent/60 transition"
						/>
					</div>
					<div className="flex flex-col">
						<label className="text-sm text-secondary/70 mb-1">Last Name</label>
						<input
							value={lastName}
							onChange={(e) => setLastName(e.target.value)}
							placeholder="Doe"
							className="px-4 py-2 rounded-2xl bg-white/90 border border-secondary/20 outline-none focus:ring-2 focus:ring-accent/60 transition"
						/>
					</div>
				</div>

				{/* Save Button */}
				<div className="mt-6">
					<button
						onClick={updateUserData}
						className="w-full md:w-auto px-6 py-3 rounded-2xl bg-accent text-white font-semibold hover:opacity-95 active:opacity-90 transition shadow-lg flex justify-center items-center gap-2"
					>
						<FiUser />
						Save Profile
					</button>
				</div>
			</div>

			{/* Right Panel */}
			<div className="w-full lg:w-[40%] backdrop-blur-3xl rounded-3xl m-6 p-8 flex flex-col bg-gradient-to-br from-primary/70 to-primary/50 shadow-2xl ring-1 ring-secondary/20">
				<h2 className="text-3xl font-extrabold mb-6 text-center text-secondary tracking-wide">
					Change Password
				</h2>

				<div className="flex flex-col gap-4">
					<div className="flex flex-col">
						<label className="text-sm text-secondary/70 mb-1 flex items-center gap-2">
							<FiLock /> New Password
						</label>
						<input
							type="password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="••••••••"
							className="px-4 py-2 rounded-2xl bg-white/90 border border-secondary/20 outline-none focus:ring-2 focus:ring-accent/60 transition"
						/>
					</div>

					<div className="flex flex-col">
						<label className="text-sm text-secondary/70 mb-1 flex items-center gap-2">
							<FiLock /> Confirm Password
						</label>
						<input
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							placeholder="••••••••"
							className="px-4 py-2 rounded-2xl bg-white/90 border border-secondary/20 outline-none focus:ring-2 focus:ring-accent/60 transition"
						/>
					</div>

					{pwdMismatch && <p className="text-sm text-red-500">Passwords do not match.</p>}
				</div>

				<div className="mt-6">
					<button
						onClick={updatePassword}
						disabled={!password || !confirmPassword || pwdMismatch}
						className="w-full md:w-auto px-6 py-3 rounded-2xl bg-accent text-white font-semibold hover:opacity-95 active:opacity-90 transition shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
					>
						<FiLock />
						Update Password
					</button>
				</div>
			</div>
		</div>
	);
}

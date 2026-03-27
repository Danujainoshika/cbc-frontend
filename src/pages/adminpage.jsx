import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { FaChartLine } from "react-icons/fa6";
import { MdShoppingCartCheckout } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import AdminProductPage from "./admin/adminproductpage";
import AddProductPage from "./admin/adminaddnewproduct";
import UpdateProductPage from "./admin/adminupdateproduct";
import AdminOrdersPage from "./admin/orders";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import Loading from "../components/loader";
import AdminUserPage from "./admin/adminuserpage";
import AdminDashboad from "./admin/adminDashboad";


export default function AdminPage() {
    const [userLoaded, setUserLoaded] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token == null) {
            toast.error("Please Login to Access Admin Panel");
            navigate("/login");
            return;
        }

        axios.get(import.meta.env.VITE_API_URL + "/api/users/me", {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((res) => {
            if (res.data.role != "admin") {
                toast("You are not authorized to acces admin panel");
                navigate("/home");
                return;
            }
            setUserLoaded(true);
        }).catch(() => {
            toast.error("Session Expired Please Login Again");
            localStorage.removeItem("token");
            navigate("/login");
        });

    }, []);

    return (
        <div className="w-full h-full bg-primary flex p-[6px] gap-3">

            {/* 🔥 Modern Sidebar */}
            <div className="w-[280px] h-full bg-secondary text-white flex flex-col px-4 py-6 rounded-2xl shadow-lg">

                {/* Logo */}
                <div className="flex items-center gap-3 px-3 mb-8">
                    <img src="./logo.png" className="w-[50px] h-[50px] object-cover rounded-xl shadow-md" />
                    <div>
                        <h1 className="text-lg font-semibold">Admin Panel</h1>
                        <p className="text-xs text-gray-300">Management</p>
                    </div>
                </div>

                {/* Navigation */}
                <div className="flex flex-col gap-2">

                    <Link to="/admin" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent hover:text-black transition-all duration-200 group">
                        <FaChartLine className="text-lg group-hover:scale-110 transition" />
                        <span className="font-medium">Dashboard</span>
                    </Link>

                    <Link to="/admin/orders" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent hover:text-black transition-all duration-200 group">
                        <MdShoppingCartCheckout className="text-lg group-hover:scale-110 transition" />
                        <span className="font-medium">Orders</span>
                    </Link>

                    <Link to="/admin/products" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent hover:text-black transition-all duration-200 group">
                        <BsBoxSeam className="text-lg group-hover:scale-110 transition" />
                        <span className="font-medium">Products</span>
                    </Link>

                    <Link to="/admin/users" className="flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-accent hover:text-black transition-all duration-200 group">
                        <FiUsers className="text-lg group-hover:scale-110 transition" />
                        <span className="font-medium">Users</span>
                    </Link>

                </div>

                {/* Footer */}
                <div className="mt-auto pt-6 border-t border-gray-600">
                    <p className="text-xs text-gray-400 px-3">© 2026 Your System</p>
                </div>
            </div>

            {/* 🔥 Content Area */}
            <div className="w-[calc(100%-280px)] h-full border-[4px] border-accent rounded-[20px] overflow-hidden bg-white">

                <div className="h-full w-full overflow-y-auto p-4">

                    {userLoaded ? (
                        <Routes>
                            <Route path="/" element={<AdminDashboad/>} />
                            <Route path="/products" element={<AdminProductPage />} />
                            <Route path="/orders" element={<AdminOrdersPage />} />
                            <Route path="/add-product" element={<AddProductPage />} />
                            <Route path="/update-product" element={<UpdateProductPage />} />
                            <Route path="/users" element={<AdminUserPage />} />
                        </Routes>
                    ) : (
                        <Loading />
                    )}

                </div>

            </div>

        </div>
    );
}
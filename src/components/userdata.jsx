import axios from "axios";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { FiAlertTriangle, FiLogOut } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export default function UserData() {
  const [user, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogoutConfirm,setIsLogoutConfirm]=useState(false);
  const [menuAction, setMenuAction] = useState("");
  const navigate = useNavigate();

  function handleMenuChange(e) {
    const action = e.target.value;
    setMenuAction(action);

    if (action === "Logout") {
      setIsLogoutConfirm(true);
      setMenuAction("");
      return;
    }

    if (action === "Account Settings") {
      navigate("/settings");
    }

    if (action === "Orders") {
      navigate("/orders");
    }

    setMenuAction("");
  }

  function handleLogout() {
    localStorage.removeItem("token");
    setUserData(null);
    setIsLogoutConfirm(false);
    setMenuAction("");
    navigate("/login");
  }

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token != null) {
      console.log(token);
      axios
        .get(import.meta.env.VITE_API_URL + "/api/users/me", {
          headers: {
            Authorization: "Bearer " + token,
          },
        })
        .then((res) => {
          setUserData(res.data);
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUserData(null);
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, []);

  return (
    
    <div className="flex justify-center items-center relative">
      {
      isLogoutConfirm && (
        <div className="w-full h-screen bg-black/45 backdrop-blur-[2px] z-100 flex justify-center items-center fixed top-0 left-0 px-4">
          <div className="w-full max-w-md rounded-3xl border border-white/35 bg-gradient-to-b from-white/95 to-white/85 p-6 sm:p-7 shadow-[0_18px_45px_rgba(0,0,0,0.35)] animate-fadeIn">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
                <FiAlertTriangle className="text-2xl" />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-secondary leading-tight">Logout from your account?</h3>
                <p className="text-sm text-secondary/75 mt-2">
                  You will need to login again to access your account and orders.
                </p>
              </div>
            </div>

            <div className="flex w-full gap-3 justify-end items-center mt-6">
              <button
                className="px-5 py-2.5 rounded-xl border border-secondary/20 text-secondary font-medium hover:bg-secondary/5 transition-all duration-200"
                onClick={() => {
                  setIsLogoutConfirm(false);
                  setMenuAction("");
                }}
              >
                Stay Logged In
              </button>
              <button
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-500 to-rose-500 text-white font-semibold shadow-md hover:shadow-lg hover:brightness-105 transition-all duration-200 inline-flex items-center gap-2"
                onClick={handleLogout}
              >
                <FiLogOut />
                Logout
              </button>
            </div>
          </div>
        </div>
      )
      }
      {/* Loading Spinner */}
      {loading && (
        <div className="w-[30px] h-[30px] border-[3px] border-white border-b-transparent rounded-full animate-spin"></div>
      )}

      {/* Logged-in User Display */}
      {user && (
        <div className="h-full w-full flex justify-center items-center gap-3 bg-secondary/10 px-4 py-2 rounded-full shadow-sm hover:shadow-md transition-all duration-300">
          {user.image ? (
            <img
              src={user.image}
              alt="User"
              referrerPolicy="no-referrer"
              className="w-8 h-8 rounded-full border-2 border-accent object-cover"
            />
          ) : (
            <FaUserCircle className="text-accent text-3xl" />
          )}
          
            <span className="font-medium text-secondary   capitalize">
              {user.firstname}
            </span>
          

          <select
            className="bg-accent text-primary text-sm px-2 py-1 rounded-md outline-none cursor-pointer hover:bg-[#ffad33] transition-all duration-300"
            value={menuAction}
            onChange={handleMenuChange}
          >
            <option value="">Menu</option>
            <option value="Account Settings">Account Settings</option>
            <option value="Orders">Orders</option>
            <option value="Logout">Logout</option>
          </select>
        </div>
      )}

      {/* Login Button (if no user) */}
      {!loading && user == null && (
        <a
          href="/login"
          className="bg-accent text-primary font-medium px-5 py-2 rounded-full shadow-md hover:shadow-lg hover:bg-[#ffad33] transition-all duration-300"
        >
          Login
        </a>
      )}
    </div>
  );
}

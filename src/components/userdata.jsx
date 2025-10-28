import axios from "axios";
import { useEffect, useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export default function UserData() {
  const [user, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLogoutConfirm,setIsLogoutConfirm]=useState(false);
  const navigate = useNavigate();
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
        <div className="w-full h-screen bg-[#00000050] z-100 flex justify-center items-center fixed top-0 left-0">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col gap-4">
            <h3 className="text-xl font-semibold text-secondary">Are you sure you want to logout?</h3>
            <div className="flex  w-full gap-4 justify-center items-center">
              <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => {setIsLogoutConfirm(false)}}>
                Cancel
              </button>
              <button className="bg-green-500 text-white px-4 py-2 rounded-md" onClick={()=>{
                navigate("/login");
              }}>
                Confirm
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
              className="w-8 h-8 rounded-full border-2 border-accent object-cover"
            />
          ) : (
            <FaUserCircle className="text-accent text-3xl" />
          )}

          <span className="font-medium text-secondary capitalize">
            {user.firstname}
          </span>

          <select className="bg-accent text-primary text-sm px-2 py-1 rounded-md outline-none cursor-pointer hover:bg-[#ffad33] transition-all duration-300" onChange={
            (e)=>{
              if(e.target.value=="Logout"){
                setIsLogoutConfirm(true);
              }
            }}>
            <option value="">Menu</option>
            <option>Account Settings</option>
            <option>Orders</option>
            <option>Logout</option>
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

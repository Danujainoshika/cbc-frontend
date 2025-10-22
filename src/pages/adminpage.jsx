import { Link, Route, Routes } from "react-router-dom";
import { FaChartLine } from "react-icons/fa6";
import { MdShoppingCartCheckout } from "react-icons/md";
import { BsBoxSeam } from "react-icons/bs";
import { FiUsers } from "react-icons/fi";
import AdminProductPage from "./admin/adminproductpage";
import AddProductPage from "./admin/adminaddnewproduct";
import UpdateProductPage from "./admin/adminupdateproduct";
import AdminOrdersPage from "./admin/orders";

export default function AdminPage(){
    return(
        <div className="w-full h-full bg-primary flex p-[4px]">
            <div className="w-[300px] h-full bg-primary flex flex-col items-center gap-4">
                <div className="flex bg-accent items-center rounded-2xl text-lg text-white h-[70px] w-[90%] mb-[20px]">
                    <img src="./logo.png" className="w-[100px] h-[100px] object-cover "/>
                    <span>Admin panel</span>
                </div>
                <Link to="/admin" className="w-[90%] flex items-center gap-2 px-4">
                    <FaChartLine className="text-lg"/>
                    Dashboad
                </Link>
                <Link to="/admin/orders" className="w-[90%] flex items-center gap-2 px-4">
                    <MdShoppingCartCheckout className="text-lg"/>
                    Orders
                </Link>
                <Link to="/admin/products" className="w-[90%] flex items-center gap-2 px-4">
                    <BsBoxSeam className="text-lg"/>
                    Products
                </Link>
                <Link to="/admin/users" className="w-[90%] flex items-center gap-2 px-4">
                    <FiUsers className="text-lg"/>
                    Users
                </Link>
            </div>
            <div className="w-[calc(100%-300px)] h-full border-[4px] border-accent rounded-[20px] overflow-hidden">
                <div className="h-full w-full max-h-full max-w-full overflow-y-scroll">
                    <Routes>
                        <Route path="/" element={<h1>Dashboad</h1>}/>
                        <Route path="/products" element={<AdminProductPage/>}/>
                        <Route path="/orders" element={<AdminOrdersPage/>}/>
                        <Route path="/add-product" element={<AddProductPage/>}/>
                        <Route path="/update-product" element={<UpdateProductPage/>}/>
                    </Routes>
                </div>
                
            </div>
        </div>
    )

}
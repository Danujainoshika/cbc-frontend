import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";

export default function Header(){
    return(
        <header className="w-full h-[100px] bg-accent text-white px-[40px]">
            <div className="w-full h-full flex relative justify-center items-center">
                <img src="./logo.png" className="h-full w-[200px] object-cover absolute left-[0px]"  />
                <div className="h-full  flex justify-center items-center text-lg gap-[20px] " >
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">contact</Link>
                </div>
                <Link to="/cart" className="absolute right-[0px] text-2xl flex justify-center items-center w-[60px] h-full ">
                    <IoCartOutline />
                </Link>
            </div>
            
        </header>
    )
}
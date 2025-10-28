import { Link } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";
import { useState } from "react";
import { IoMenu } from "react-icons/io5";
import UserData from "./userdata";

export default function Header(){
    const [isSideBarOpen,setIsSideBarOpen] = useState(false)
    return(
        <header className="w-full h-[100px] bg-accent text-white px-[40px]">
            <div className="w-full h-full flex relative  ">
                <img src="./logo.png" className="hidden lg:flex h-full w-[200px] object-cover absolute left-[0px]"  />
                
                <div className="lg:hidden relative w-full flex justify-center items-center">
                    <IoMenu className="absolute left-0 text-3xl " onClick={()=>{setIsSideBarOpen(true)}}/>
                     <img src="./logo.png" className=" h-full w-[200px] object-cover "  />
                </div>
                {
                    isSideBarOpen && (
                        <div className="lg:hidden fixed left-0 top-0 w-full h-screen bg-[#00000050] z-100 text-secondary">
                            <div className="w-[300px] h-full bg-primary flex flex-col relative">
                                <img src="./logo.png" className="hidden lg:flex h-full w-[200px] object-cover absolute left-[0px]"  />
                
                                <div className="lg:hidden relative w-full h-[100px] bg-accent  flex justify-center items-center">
                                    <IoMenu className="absolute left-2 text-3xl text-white" onClick={()=>{setIsSideBarOpen(false)}}/>
                                    <img src="./logo.png" className=" h-full w-[200px] object-cover "  />
                                    
                                </div>
                                <a href="/" className="p-4 border-b-secondary/10">Home</a>
                                <a href="/products" className="p-4 border-b-secondary/10">Products</a>
                                <a href="/about" className="p-4 border-b-secondary/10">About</a>
                                <a href="/contact" className="p-4 border-b-secondary/10">Contact</a>
                                <a href="/cart" className="p-4 border-b-secondary/10">Cart</a>
                                <div className=" lg:hidden h-[100px] w-full absolute bottom-0 flex justify-center items-center ">
                                    <UserData/>
                                </div>
                            </div>
                        </div>
                    )
                }
                <div className="hidden h-full  lg:flex justify-center items-center w-full text-lg gap-[20px] " >
                    <Link to="/">Home</Link>
                    <Link to="/products">Products</Link>
                    <Link to="/about">About</Link>
                    <Link to="/contact">contact</Link>
                    
                </div>
                <div className="hidden h-full w-[200px] absolute right-[100px] lg:flex justify-center items-center">
                    <UserData/>
                </div>
                <Link to="/cart" className="hidden lg:absolute right-[0px] text-2xl lg:flex justify-center items-center w-[60px] h-full ">
                    <IoCartOutline />
                </Link>
            </div>
            
        </header>
    )
}
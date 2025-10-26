import { useState } from "react";
import { addToCart, getTotal, LoadCart } from "../utils/cart"
import { CiCircleChevUp } from "react-icons/ci";
import { CiCircleChevDown } from "react-icons/ci";
import { BsTrash } from "react-icons/bs";
import { Link } from "react-router-dom";

export default function CartPage(){
    const [cart,setCart] = useState(LoadCart())
    
    return(
        <div className="w-full lg:h-[calc(100vh-100px)] bg-primary pt-[25px] flex flex-col items-center ">
            <div className=" w-[400px] lg:w-[600px] flex flex-col gap-4">
                {
                    cart.map((item,index)=>{
                        return(
                            <div key={index} className="w-full h-[300px] lg:h-[120px] bg-white flex flex-col lg:flex-row  relative items-center p-3 lg:p-0">
                                <button className="absolute text-rose-500 right-[-40px] text-2xl rounded-full aspect-square hover:bg-red-500 hover:text-white p-[5px] font bold " onClick={
                                    ()=>{
                                    addToCart(item,-item.quantity)
                                    setCart(LoadCart())
                                }}><BsTrash/></button>
                                <img src={item.image} className="h-[100px] lg:h-full aspect-square object-cover"/>
                                <div className="w-full lg:w-[250px] text-center lg:h-full h-[100px] flex flex-col pl-[5px] pt-[10px]">
                                    <h1 className="font-semibold text-lg ">{item.name}</h1>
                                    <span className="text-sm text-secondary">ID: {item.productID}</span>
                                </div>
                                <div className="w-[100px]  h-[100px] lg:h-full flex lg:flex-col flex-row justify-center items-center  ">
                                    <CiCircleChevUp className="text-2xl font-semibold" onClick={
                                        ()=>{
                                            addToCart(item,1)
                                            setCart(LoadCart())
                                    
                                        
                                    }}/>
                                    <span className="font-semibold text-2xl ">{item.quantity}</span>
                                    <CiCircleChevDown className="text-2xl font-semibold" onClick={
                                        ()=>{
                                            addToCart(item,-1)
                                            setCart(LoadCart())
                                    }}/>
                                </div>
                                <div className="w-full lg:w-[130px] h-[100px] lg:h-full flex lg:flex-col flex-row justify-center lg:items-end items-center">
                                    {
                                        item.labelledPrice > item.price&&
                                            <span className="text-secondary font-semibold pr-[10px] lg:mt-[20px] line-through">LKR {item.labelledPrice}</span>
                                    }
                                    <span className="text-accent font-semibold text-2xl pr-[10px] lg:mt-[5px]">LKR {item.price}</span>
                                </div>
                            </div>
                        )
                    })
                }
                <div className="w-full h-[120px] bg-white flex flex-col-reverse lg:flex-row lg:justify-end justify-center items-center relative">
                    <Link to="/checkout" className="lg:absolute left-0 bg-accent text-white font-semibold  hover:bg-accent/90 active:scale-95 transition-all duration-300 px-[20px] py-[10px] lg:ml-[20px]" state={cart} >Proceed to Checkout</Link>
                    <div className="h-[50px]">
                        <span className="font-semibold text-accent w-full text-2xl text-right pr-[10px] lg:mt-[5px]">Total: LKR {getTotal()}</span>
                    </div>
                </div>    
            </div>
        </div>
    )
}
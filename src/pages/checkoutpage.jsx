import { useState } from "react";

import { CiCircleChevUp } from "react-icons/ci";
import { CiCircleChevDown } from "react-icons/ci";
import { BsTrash } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function CheckoutPage(){
    const location = useLocation()
    const navigate = useNavigate()
    const [cart,setCart] = useState(location.state)
    function getTotal(){
        let total = 0
        cart.forEach(
            (item)=>{
                total += item.price * item.quantity
            }
        )
        return total
    }

    async function purchaseCart(){
        const token = localStorage.getItem("token")
        try {
            if(token == null){
            toast.error("please login to place an order")
            navigate("/login")
            return
        }
        const items = []
        for(let i=0;i<cart.length;i++){
            items.push({
                productID : cart[i].productID,
                quantity : cart[i].quantity
            })
        }
         await axios.post(import.meta.env.VITE_API_URL + "/api/orders",{
            address : "not set",
            items :items
        },{
            headers :{
                Authorization : "Bearer " + token
            }
        })
        console.log("order placed")
        toast.success("order placed successfully")
        } catch (error) {
            toast.error("failed to place order")
            console.log(error)
            
            if(error.response && error.response.status === 400){
                toast.error(error.response.data.message)
            }
        }

    }
    
    return(
        <div className="w-full h-[calc(100vh-100px)] bg-primary pt-[25px] flex flex-col items-center ">
            <div className="w-[600px] flex flex-col gap-4">
                {
                    cart.map((item,index)=>{
                        return(
                            <div key={index} className="w-full h-[120px] bg-white flex relative items-center">
                                <button className="absolute text-rose-500 right-[-40px] text-2xl rounded-full aspect-square hover:bg-red-500 hover:text-white p-[5px] font bold " onClick={
                                    ()=>{
                                        
                                    }
                                }><BsTrash/></button>
                                <img src={item.image} className="h-full aspect-square object-cover"/>
                                <div className="w-[250px] h-full flex flex-col pl-[5px] pt-[10px]">
                                    <h1 className="font-semibold text-lg ">{item.name}</h1>
                                    <span className="text-sm text-secondary">ID: {item.productID}</span>
                                </div>
                                <div className="w-[100px] h-full flex flex-col justify-center items-center">
                                    <CiCircleChevUp className="text-2xl font-semibold" onClick={
                                        ()=>{
                                           const newCart = [...cart] 
                                           newCart[index].quantity +=1
                                           setCart(newCart)
                                    
                                        }
                                    }/>
                                    <span className="font-semibold text-2xl ">{item.quantity}</span>
                                    <CiCircleChevDown className="text-2xl font-semibold" onClick={
                                        ()=>{
                                           const newCart = [...cart]
                                           if(newCart[index].quantity > 1){
                                               newCart[index].quantity -=1
                                           }

                                           
                                            setCart(newCart)
                                        }
                                    }/>
                                </div>
                                <div className="w-[130px] h-full flex flex-col justify-center items-end ">
                                    {
                                        item.labelledPrice > item.price&&
                                            <span className="text-secondary font-semibold pr-[10px] mt-[20px] line-through">LKR {item.labelledPrice}</span>
                                    }
                                    <span className="text-accent font-semibold text-2xl pr-[10px] mt-[5px]">LKR {item.price}</span>
                                </div>
                            </div>
                        )
                    })
                }
                <div className="w-full h-[120px] bg-white flex justify-end items-center relative">
                    <Link to="/checkout" className="absolute left-0 bg-accent text-white font-semibold  hover:bg-accent/90 active:scale-95 transition-all duration-300 px-[20px] py-[10px] ml-[20px]" onClick={purchaseCart}>Order</Link>
                    <div className="h-[50px]">
                        <span className="font-semibold text-accent w-full text-2xl text-right pr-[10px] mt-[5px]">Total: LKR {getTotal()}</span>
                    </div>
                </div>    
            </div>
        </div>
    )
}
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
    const [address,setAddress] = useState("")
    const [name,setName] = useState("")
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
            address : address,
            customerName : name,
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
        <div className="w-full lg:min-h-[calc(100vh-100px)] overflow-y-scroll bg-primary pt-[25px] flex flex-col items-center ">
            <div className="w-[400px] lg:w-[600px] flex flex-col gap-4">
                {
                    cart.map((item,index)=>{
                        return(
                            <div key={index} className="w-full h-[300px] lg:h-[120px] bg-white flex flex-col lg:flex-row relative items-center p-3 lg:p-0">
                                <button className="absolute text-rose-500 right-[-40px] text-2xl rounded-full aspect-square hover:bg-red-500 hover:text-white p-[5px] font bold " onClick={
                                    ()=>{
                                        
                                    }
                                }><BsTrash/></button>
                                <img src={item.image} className="h-[100px] lg:h-full aspect-square object-cover"/>
                                <div className="w-full lg:w-[250px] text-center lg:h-full h-[100px] flex flex-col pl-[5px] pt-[10px]">
                                    <h1 className="font-semibold tex t-lg ">{item.name}</h1>
                                    <span className="text-sm text-secondary">ID: {item.productID}</span>
                                </div>
                                <div className="w-[100px] h-[100px] lg:h-full flex lg:flex-col flex-row justify-center items-center">
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
                                <div className="w-full lg:w-[130px] h-[100px] lg:h-full flex lg:flex-col flex-row justify-center  lg:items-end items-center ">
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
                <div className="w-full   bg-white flex flex-col  lg:justify-end justify-center items-center relative p- gap-3">

					<div className="w-full  h-full flex  justify-between items-center p-4">
						<label
							htmlFor="name"							
							className="text-sm text-secondary mr-2"
						>
							Name
						</label>
						<input
							type="text"
							id="name"
							value={name}
							onChange={(e) => setName(e.target.value)}
							className="w-[400px] h-[50px] border border-secondary rounded-md px-3 text-center"
						/>
					</div>
					<div className="w-full  h-full flex  justify-between items-center p-4">
						<label
							htmlFor="address"							
							className="text-sm text-secondary mr-2"
						>
							Shipping Address
						</label>
						<textarea
							type="text"
							id="address"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							className="w-[400px] h-[150px] border border-secondary rounded-md px-3 text-center"
						/>
					</div>
                    
                </div>    
                <div className="w-full  h-[120px] bg-white flex flex-col-reverse lg:flex-row lg:justify-end justify-center items-center relative  ">
                    <Link to="/checkout" className="lg:absolute left-0 bg-accent text-white font-semibold  hover:bg-accent/90 active:scale-95 transition-all duration-300 px-[20px] py-[10px] lg:ml-[20px]" onClick={purchaseCart}>Order</Link>
                    <div className="h-[50px]">
                        <span className="font-semibold text-accent w-full text-2xl text-right pr-[10px] lg:mt-[5px]">Total: LKR {getTotal()}</span>
                    </div>
                </div>    
            </div>
        </div>
    )
}
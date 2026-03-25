import { useState } from "react";
import { addToCart, LoadCart } from "../utils/cart";

import { CiCircleChevUp } from "react-icons/ci";
import { CiCircleChevDown } from "react-icons/ci";
import { BsTrash } from "react-icons/bs";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";

export default function CheckoutPage(){
    const location = useLocation()
    const navigate = useNavigate()
    const initialCart = Array.isArray(location.state) && location.state.length > 0 ? location.state : LoadCart()
    const [cart,setCart] = useState(initialCart)
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
                toast.error("Please login to place an order")
                navigate("/login")
                return
            }

            if (!name.trim()) {
                toast.error("Please enter your name")
                return
            }

            if (!address.trim()) {
                toast.error("Please enter your shipping address")
                return
            }

            if (cart.length === 0) {
                toast.error("Your cart is empty")
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
                address : address.trim(),
                customerName : name.trim(),
                items :items
            },{
                headers :{
                    Authorization : "Bearer " + token
                }
            })

            localStorage.setItem("cart", "[]")
            setCart([])
            toast.success("Order placed successfully")
            navigate("/")
        } catch (error) {
            toast.error("Failed to place order")
            console.log(error)
            
            if(error.response && error.response.status === 400){
                toast.error(error.response.data.message)
            }
        }

    }
    
    return(
        <div className="w-full min-h-[calc(100vh-100px)] bg-gradient-to-b from-primary via-primary to-[#f7f3de] px-4 sm:px-6 lg:px-10 py-8">
            <div className="max-w-6xl mx-auto">
                <div className="mb-6">
                    <h1 className="text-3xl sm:text-4xl font-semibold text-secondary tracking-tight">Checkout</h1>
                    <p className="text-secondary/70 mt-2">Confirm your items and shipping details to place your order.</p>
                </div>

                {cart.length === 0 && (
                    <div className="w-full bg-white/80 backdrop-blur-md border border-white/60 rounded-3xl p-10 text-center shadow-[0_12px_35px_rgba(20,20,20,0.08)]">
                        <h2 className="text-2xl font-semibold text-secondary mb-2">No items to checkout</h2>
                        <p className="text-secondary/70 mb-6">Your cart is empty. Add products before placing an order.</p>
                        <Link
                            to="/products"
                            className="inline-flex px-6 py-3 rounded-xl bg-accent text-white font-medium hover:bg-accent/90 active:scale-95 transition-all duration-300"
                        >
                            Browse Products
                        </Link>
                    </div>
                )}

                {cart.length > 0 && (
                    <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 items-start">
                        <div className="space-y-4">
                            {cart.map((item,index)=>{
                                return(
                                    <div key={index} className="w-full bg-white/85 backdrop-blur-md border border-white/60 rounded-2xl shadow-[0_10px_30px_rgba(20,20,20,0.08)] p-4 sm:p-5 relative">
                                        <button
                                            className="absolute top-3 right-3 text-rose-500 text-xl rounded-full aspect-square hover:bg-rose-500 hover:text-white p-2 transition-all duration-300"
                                            onClick={()=>{
                                                addToCart(item,-item.quantity)
                                                setCart(LoadCart())
                                            }}
                                        >
                                            <BsTrash/>
                                        </button>

                                        <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                                            <img src={item.image} className="w-24 h-24 sm:w-28 sm:h-28 rounded-xl object-cover ring-2 ring-primary/70"/>

                                            <div className="flex-1">
                                                <h2 className="font-semibold text-secondary text-lg leading-snug pr-8">{item.name}</h2>
                                                <span className="text-sm text-secondary/70">ID: {item.productID}</span>
                                            </div>

                                            <div className="flex items-center gap-4 bg-primary/80 rounded-xl px-3 py-2">
                                                <CiCircleChevDown
                                                    className="text-3xl text-secondary/80 hover:text-secondary cursor-pointer transition-colors"
                                                    onClick={()=>{
                                                        addToCart(item,-1)
                                                        setCart(LoadCart())
                                                    }}
                                                />
                                                <span className="font-semibold text-xl text-secondary min-w-[24px] text-center">{item.quantity}</span>
                                                <CiCircleChevUp
                                                    className="text-3xl text-secondary/80 hover:text-secondary cursor-pointer transition-colors"
                                                    onClick={()=>{
                                                        addToCart(item,1)
                                                        setCart(LoadCart())
                                                    }}
                                                />
                                            </div>

                                            <div className="sm:text-right">
                                                {item.labelledPrice > item.price && (
                                                    <span className="block text-secondary/60 text-sm line-through">LKR {item.labelledPrice}</span>
                                                )}
                                                <span className="text-accent font-semibold text-2xl">LKR {item.price}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>

                        <div className="bg-white/90 backdrop-blur-md border border-white/70 rounded-2xl shadow-[0_14px_40px_rgba(20,20,20,0.1)] p-5 lg:sticky lg:top-[120px]">
                            <h3 className="text-xl font-semibold text-secondary mb-4">Shipping Details</h3>

                            <div className="mb-4">
                                <label htmlFor="name" className="text-sm text-secondary/80 mb-1 block">Full Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full h-11 rounded-xl border border-secondary/20 bg-primary/60 px-3 text-secondary focus:outline-none focus:ring-2 focus:ring-accent/40"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className="mb-5">
                                <label htmlFor="address" className="text-sm text-secondary/80 mb-1 block">Shipping Address</label>
                                <textarea
                                    id="address"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    className="w-full h-28 rounded-xl border border-secondary/20 bg-primary/60 px-3 py-2 text-secondary focus:outline-none focus:ring-2 focus:ring-accent/40 resize-none"
                                    placeholder="House number, street, city, postal code"
                                />
                            </div>

                            <div className="flex items-center justify-between pb-4 border-b border-secondary/10">
                                <span className="text-secondary/75">Items ({cart.length})</span>
                                <span className="font-medium text-secondary">LKR {getTotal()}</span>
                            </div>

                            <div className="flex items-center justify-between pt-4 mb-5">
                                <span className="text-lg font-semibold text-secondary">Total</span>
                                <span className="text-2xl font-semibold text-accent">LKR {getTotal()}</span>
                            </div>

                            <button
                                className="w-full bg-accent text-white font-semibold hover:bg-accent/90 active:scale-[0.99] transition-all duration-300 px-5 py-3 rounded-xl"
                                onClick={purchaseCart}
                            >
                                Place Order
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
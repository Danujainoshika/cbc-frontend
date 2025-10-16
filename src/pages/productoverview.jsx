import axios from "axios"
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Loading from "../components/loader"
import toast from "react-hot-toast"
import ImageSlider from "../components/imageslider"

export default function ProductOverview() {
    const params = useParams()
    const [status,setStatus] = useState("loading")
    const [product,setProduct] = useState(null)
    
    useEffect(
        ()=>{
            axios.get(import.meta.env.VITE_API_URL+"/api/products/"+params.id).then(
                (res)=>{
                    setProduct(res.data)
                    setStatus("Success")
                }
            ).catch(
                ()=>{
                    toast.error("Failed to load product details")
                    setStatus("Error")
                }
            )
        },[])

        
    return(
        <div>
            {
                status == "loading" && <Loading/>
            }
            {
                status == "Success" && (
                    <div className="flex text-secondary w-full h-[calc(100vh-100px)] ">
                       
                        <div className="w-[50%] h-full flex justify-center items-center">
                            <ImageSlider images={product.images}/>
                        </div>
                        <div className="w-[50%] h-full  flex flex-col gap-4 p-10 items-center">
                            <p>{product.productID}</p>
                            <h1 className="font-bold text-lg ">{product.name}
                            
                                {
                                    product.altNames.map((name,index)=>{
                                        return(
                                            <span key={index} className="text-lg font-normal">{"| "+name}</span>
                                        )
                                    })
                                }
                            </h1>
                            <p className="mt-[30px] text-justify">{product.description}</p>
                            <span className="">category:{product.category}</span>
                            {
                             product.labelledPrice > product.price ? (
                                    <div className="flex gap-4">
                                        <p className="text-base font-bold text-secondary line-through">LKR{product.labelledPrice}</p>
                                        <p className="text-base font-bold text-accent">LKR{product.price}</p>
                                    </div>)
                                    :(
                                        <p className="text-base font-bold text-accent">LKR{product.price}</p>
                                    )
                                
                            }
                            <div className="w-full h-[40px] flex gap-4 mt-[60px]">
                                <button className="w-[50%] h-full bg-accent text-white font-semibold rounded-lg hover:bg-accent/90 active:scale-95 transition-all duration-300">Add to Cart</button>
                                <button className="w-[50%] h-full border border-accent text-accent font-semibold rounded-lg hover:bg-accent hover:text-white hover:shadow-md active:scale-95 transition-all duration-300 ml-4">Buy Now</button>
                            </div>
                        </div>
                    </div>
                )
            }
            {
                status == "Error" && <h1>Failed to load product details</h1>
            }
        </div>
    )
}
import axios from "axios"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import Loading from "../components/loader"
import ProductCard from "../components/productCard"


export default function ProductPage(){
    const [products,setProducts] = useState([])
    const [isLoading,setIsLoading] = useState(true)

    useEffect(()=>{
        if(isLoading){
            axios.get(import.meta.env.VITE_API_URL+"/api/products").then(
                (response)=>{
                    setProducts(response.data)
                    setIsLoading(false)
                }
            ).catch(
                (error)=>{
                    console.log("Error Fletching Product"+error)
                    setIsLoading(false)
                    toast.error("Failed to load products")
                }
            )
        }
    },[isLoading])
    return( 
        
        <div className="w-full min-h-[calc(100%-100px)] bg-primary  ">
           
            {
               isLoading?<Loading/>
               :
                <div className="w-full h-full flex p-[10px] gap-[20px] flex-wrap justify-center items-center">
                    {
                        products.map((item)=>{
                            return(
                                <ProductCard key={item.productID} product={item}/>
                                
                            )
                        })
                            
                    }
                    
                    
                </div>
                
                
            }
        </div>
    )
}
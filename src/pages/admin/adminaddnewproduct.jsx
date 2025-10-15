import { useState } from "react";
import { FaTag, FaBox, FaMoneyBillWave, FaCamera, FaList, FaBoxes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import mediaUpload from "../../utils/mediaupload";
import axios from "axios";
import toast from "react-hot-toast";

export default function AddProductPage() {
  const [productID, setproductID] = useState("");
  const [name, setname] = useState("");
  const [altNames, setaltname] = useState("");
  const [description, setdescription] = useState("");
  const [images, setimage] = useState([]);
  const [price, setprice] = useState(0);
  const [labelledPrice, setlabelledprice] = useState(0);
  const [category, setcategory] = useState("cream");
  const [stock, setstock] = useState(0);
  const navigate = useNavigate();
    
  async function addproduct() {
    const token = localStorage.getItem("token")
    if(token == null){
        navigate("/login")
        return
    }
        const promises = []
        for(let i=0;i<images.length;i++){
            promises[i] = mediaUpload(images[i]);
        }
        try {
            const urls = await Promise.all(promises)
            const alternativenames = altNames.split(",")

            const product = {
                productID : productID,
                name : name,
                altNames : alternativenames,
                description : description,
                images : urls,
                price : price,
                labelledPrice:labelledPrice,
                category : category,
                stock : stock
            }
            await axios.post(import.meta.env.VITE_API_URL+"/api/products",product,{
                headers:{
                    Authorization : "Bearer " + token
                }
            })
            toast.success("Product added succesfully")
            navigate("/admin/products")
        } catch (error) {
            toast.error("An error occured")
            
        }
        
    
  }
  return (
    <div className="min-h-screen w-full flex justify-center items-center bg-gradient-to-br from-primary via-white to-primary p-6">
      <div className="w-full max-w-2xl bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl border border-accent/40 p-8 md:p-10 flex flex-col gap-5 transition-all duration-300 hover:shadow-accent/30">
        
        {/* Header */}
        <h2 className="text-3xl font-semibold text-secondary text-center mb-2">
          ✨ Add New Product
        </h2>
        <p className="text-sm text-secondary/70 text-center mb-4">
          Fill in product details carefully before publishing.
        </p>

        {/* Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Product ID */}
          <div className="flex flex-col">
            <label className="flex items-center gap-2 text-secondary font-semibold mb-1">
              <FaTag className="text-accent" /> Product ID
            </label>
            <input
              value={productID}
              onChange={(e) => setproductID(e.target.value)}
              placeholder="e.g. CBC001"
              className="border border-accent/40 rounded-xl px-4 py-2 bg-white/60 focus:outline-none focus:ring-2 focus:ring-accent/70 shadow-sm"
            />
          </div>

          {/* Name */}
          <div className="flex flex-col">
            <label className="flex items-center gap-2 text-secondary font-semibold mb-1">
              <FaBox className="text-accent" /> Product Name
            </label>
            <input
              value={name}
              onChange={(e) => setname(e.target.value)}
              placeholder="e.g. Crystal Glow Cream"
              className="border border-accent/40 rounded-xl px-4 py-2 bg-white/60 focus:outline-none focus:ring-2 focus:ring-accent/70 shadow-sm"
            />
          </div>

          {/* Alt Names */}
          <div className="flex flex-col md:col-span-2">
            <label className="flex items-center gap-2 text-secondary font-semibold mb-1">
              <FaList className="text-accent" /> Alternative Names
            </label>
            <input
              value={altNames}
              onChange={(e) => setaltname(e.target.value)}
              placeholder="e.g. HydraGlow, Moisture Boost"
              className="border border-accent/40 rounded-xl px-4 py-2 bg-white/60 focus:outline-none focus:ring-2 focus:ring-accent/70 shadow-sm"
            />
          </div>

          {/* Category */}
          <div className="flex flex-col">
            <label className="flex items-center gap-2 text-secondary font-semibold mb-1">
              <FaBoxes className="text-accent" /> Category
            </label>
            <select
              value={category}
              onChange={(e) => setcategory(e.target.value)}
              className="border border-accent/40 rounded-xl px-4 py-2 bg-white/60 focus:outline-none focus:ring-2 focus:ring-accent/70 shadow-sm"
            >
              <option value="cream">Cream</option>
              <option value="lotion">Lotion</option>
              <option value="serum">Serum</option>
            </select>
          </div>

          {/* Stock */}
          <div className="flex flex-col">
            <label className="flex items-center gap-2 text-secondary font-semibold mb-1">
              <FaBoxes className="text-accent" /> Stock
            </label>
            <input
              type="number"
              value={stock}
              onChange={(e) => setstock(e.target.value)}
              placeholder="0"
              className="border border-accent/40 rounded-xl px-4 py-2 bg-white/60 focus:outline-none focus:ring-2 focus:ring-accent/70 shadow-sm"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col md:col-span-2">
            <label className="flex items-center gap-2 text-secondary font-semibold mb-1">
              <FaList className="text-accent" /> Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setdescription(e.target.value)}
              placeholder="Describe your product in detail..."
              className="border border-accent/40 rounded-xl px-4 py-2 min-h-[100px] bg-white/60 focus:outline-none focus:ring-2 focus:ring-accent/70 shadow-sm resize-none"
            />
          </div>

          {/* Price */}
          <div className="flex flex-col">
            <label className="flex items-center gap-2 text-secondary font-semibold mb-1">
              <FaMoneyBillWave className="text-accent" /> Price
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setprice(e.target.value)}
              placeholder="e.g. 2500"
              className="border border-accent/40 rounded-xl px-4 py-2 bg-white/60 focus:outline-none focus:ring-2 focus:ring-accent/70 shadow-sm"
            />
          </div>

          {/* Labelled Price */}
          <div className="flex flex-col">
            <label className="flex items-center gap-2 text-secondary font-semibold mb-1">
              <FaMoneyBillWave className="text-accent" /> Labelled Price
            </label>
            <input
              type="number"
              value={labelledPrice}
              onChange={(e) => setlabelledprice(e.target.value)}
              placeholder="e.g. 3000"
              className="border border-accent/40 rounded-xl px-4 py-2 bg-white/60 focus:outline-none focus:ring-2 focus:ring-accent/70 shadow-sm"
            />
          </div>

          {/* Images */}
          <div className="flex flex-col md:col-span-2">
            <label className="flex items-center gap-2 text-secondary font-semibold mb-1">
              <FaCamera className="text-accent" /> Product Images
            </label>
            <input
              type="file"
              onChange={(e) => setimage(e.target.files)}
              multiple
              className="block w-full text-sm text-secondary border border-accent/40 rounded-xl cursor-pointer bg-white/60 file:mr-3 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-accent file:text-white hover:file:bg-accent/90 focus:outline-none"
            />
          </div>
        </div>

        {/* Submit Button */}
        <button onClick={addproduct} className="mt-6 bg-accent text-white font-semibold py-3 rounded-xl shadow-md hover:bg-accent/90 hover:shadow-accent/30 transition-all duration-300 text-lg">
          + Add Product
        </button>
        <button  onClick={()=>{navigate("/admin/products")}} className=" bg-red-500 text-white font-semibold py-3 rounded-xl shadow-md hover:bg-red-600 hover:shadow-accent/30 transition-all duration-300 text-lg">
          Cancle
        </button>
      </div>
    </div>
  );
}

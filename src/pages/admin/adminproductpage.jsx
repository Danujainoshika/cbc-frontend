import axios from "axios";
import { useEffect, useState } from "react";
import { FaRegTrashCan } from "react-icons/fa6";
import { FaRegEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { CiCirclePlus } from "react-icons/ci";
import toast from "react-hot-toast";
import Loading from "../../components/loader";
function ProductDeleteConfirm(props){

  const productID = props.productID
  const close = props.close
  const refresh = props.refresh

  function deleteProduct(){
    const token = localStorage.getItem("token");
    axios.delete(import.meta.env.VITE_API_URL+"/api/products/"+productID,{
      headers:{
        Authorization : "Bearer " + token
      }
    }).then(
      (response)=>{
        console.log(response.data)
        close();
        toast.success("Product delete succesfully")
        refresh();
      }
    ).catch(()=>{
        toast.error("Failed to delete product")
    })
  }

  return (<div className=" fixed left-0 top-0 w-full h-screen bg-[#00000050] z-[100] flex justify-center items-center">
            <div className="w-[400px] h-[200px] bg-primary relative flex flex-col justify-center items-center gap-[20px] ">
              <button className="absolute right-[-40px] top-[-40px] w-[40px] h-[40px] bg-red-600 text-white rounded-full font-bold border-red-600 hover:bg-white hover:text-red-600 " onClick={close}>X</button>
              <p className="font-semibold">Are you srue you want to delete this product with product ID:{productID}?</p>
              <div className="flex gap-[20px]">
                <button onClick={deleteProduct} className="w-[70px] h-[30px] bg-blue-600 text-white hover:bg-accent">Yes</button>
                <button className="w-[70px] h-[30px] bg-red-600 text-white  hover:bg-accent" onClick={close}>Cancle</button>
              </div>
            </div>
              
              
          </div>)
}
export default function AdminProductPage() {
  const [products, setproducts] = useState([]);
  const navigate = useNavigate()
  const [isDeleteConfirmVisible,setIsDeleteConfirmVisble] = useState(false)
  const [productToDelete,setProductToDelete] = useState(null)
  const [isLoading,setIsLoading] = useState(true)
  useEffect(() => {
    if(isLoading){
      axios
      .get(import.meta.env.VITE_API_URL + "/api/products")
      .then((response) => {
        setproducts(response.data);
        setIsLoading(false)
      });
    }
    
  }, [isLoading]);

  return (
    <div className="w-full min-h-screen p-8 bg-[var(--color-primary)] text-[var(--color-secondary)]">
        {
          isDeleteConfirmVisible && <ProductDeleteConfirm refresh={()=>{setIsLoading(true)}} productID={productToDelete} close={()=>{setIsDeleteConfirmVisble(false)}}/>
        }
        <Link to="/admin/add-product" className="fixed right-[50px] bottom-[50px] text-5xl hover:text-accent">
            <CiCirclePlus/>
        </Link>
      {/* Main Container */}
      <div className="overflow-x-auto rounded-xl shadow-xl bg-[var(--color-primary)]/70 backdrop-blur-lg border border-[var(--color-secondary)]/10 p-6">
        
        {/* Page Title */}
        <h1 className="text-3xl font-semibold mb-6 text-[var(--color-secondary)] border-l-4 border-[var(--color-accent)] pl-3">
          Products
        </h1>

        {/* Table */}
        {isLoading?<Loading/>:
        <table className="min-w-full border border-[var(--color-secondary)]/20 text-center rounded-lg overflow-hidden">
          <thead className="bg-[var(--color-secondary)] text-[var(--color-primary)] uppercase text-sm">
            <tr>
              <th className="py-3 px-4 font-medium">Image</th>
              <th className="py-3 px-4 font-medium">Product ID</th>
              <th className="py-3 px-4 font-medium">Product Name</th>
              <th className="py-3 px-4 font-medium">Product Price</th>
              <th className="py-3 px-4 font-medium">Labelled Price</th>
              <th className="py-3 px-4 font-medium">Category</th>
              <th className="py-3 px-4 font-medium">Stock</th>
              <th className="py-3 px-4 font-medium">Action</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--color-secondary)]/15">
            {products.map((items) => (
              <tr
                key={items.productID}
                className="hover:bg-[var(--color-accent)]/15 transition-all duration-300"
              >
                <td className="py-3 px-4 flex justify-center">
                  <img
                    src={items.images[0]}
                    alt={items.name}
                    className="w-16 h-16 object-cover rounded-lg border border-[var(--color-secondary)]/20 shadow-sm"
                  />
                </td>
                <td className="py-3 px-4 font-medium">{items.productID}</td>
                <td className="py-3 px-4">{items.name}</td>
                <td className="py-3 px-4 text-[var(--color-accent)] font-semibold">
                  Rs:{items.price}
                </td>
                <td className="py-3 px-4 text-[var(--color-secondary)]/60 line-through">
                  Rs:{items.labelledPrice}
                </td>
                <td className="py-3 px-4">{items.category}</td>
                <td className="py-3 px-4  ">{items.stock}</td>
                <td className="py-3 px-4">
                  <div className="flex flex-row gap-[16px] justify-center items-center">
                    <FaRegTrashCan className="text-[var(--color-secondary)] hover:text-red-600 transition-all duration-200 cursor-pointer" onClick={
                      ()=>{
                        setIsDeleteConfirmVisble(true)
                        setProductToDelete(items.productID)
                      }} />
                    <FaRegEdit className="text-[var(--color-secondary)] hover:text-[var(--color-accent)] transition-all duration-200 cursor-pointer" onClick={()=>{
                      navigate("/admin/update-product",{
                        state : items
                      })
                    }}/>
                  </div>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>}
      </div>

      {/* Footer */}
      <p className="text-sm text-center mt-6 text-[var(--color-secondary)]/70 italic">
        CBC Admin Panel — managing beauty with clarity ✨
      </p>
    </div>
  );
}

import axios from "axios";
import { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import Loading from "../../components/loader";
import OrderDetailsModal from "../../components/ordermodalinfo";

export default function AdminOrderPage() {
  const [orders, setorders] = useState([]);
  const navigate = useNavigate()
  const [isLoading,setIsLoading] = useState(true)
  const [isModalOpen,setIsModalOpen] = useState(false)
  const[selectedOrder,setSelectedOrder] = useState(null)
  
  useEffect(() => {
    if(isLoading){
        const token = localStorage.getItem("token");
        if(token == null){
            navigate("/login")
            return
        }
      axios
      .get(import.meta.env.VITE_API_URL + "/api/orders",{
        headers:{
          Authorization : "Bearer " + token
        }
      })
      .then((response) => {
        setorders(response.data);
        setIsLoading(false)
      });
    }
    
  }, [isLoading]);

  return (
    <div className="w-full min-h-screen p-8 bg-[var(--color-primary)] text-[var(--color-secondary)]">
        <OrderDetailsModal isModalOpen={isModalOpen} closeModal={() => setIsModalOpen(false)} selectedOrder={selectedOrder} refresh={() => setIsLoading(true)}/>
        
        
        
      {/* Main Container */}
      <div className="overflow-x-auto rounded-xl shadow-xl bg-[var(--color-primary)]/70 backdrop-blur-lg border border-[var(--color-secondary)]/10 p-6">
        
        {/* Page Title */}
        <h1 className="text-3xl font-semibold mb-6 text-[var(--color-secondary)] border-l-4 border-[var(--color-accent)] pl-3">
          Orders
        </h1>

        {/* Table */}
        {isLoading?<Loading/>:
        <table className="min-w-full border border-[var(--color-secondary)]/20 text-center rounded-lg overflow-hidden">
          <thead className="bg-[var(--color-secondary)] text-[var(--color-primary)] uppercase text-sm">
            <tr>
              <th className="py-3 px-4 font-medium">Order Id</th>
              <th className="py-3 px-4 font-medium">Number of Items</th>
              <th className="py-3 px-4 font-medium">Customer Name</th>
              <th className="py-3 px-4 font-medium">Email</th>
              <th className="py-3 px-4 font-medium">Phone</th>
              <th className="py-3 px-4 font-medium">Address</th>
              <th className="py-3 px-4 font-medium">Total</th>
              <th className="py-3 px-4 font-medium">Status</th>
              <th className="py-3 px-4 font-medium">Date</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-[var(--color-secondary)]/15">
            {orders.map((item) => (
              <tr
                key={item.orderID}
                className="hover:bg-[var(--color-accent)]/15 transition-all duration-300"
                onClick={
                    ()=>{
                        setSelectedOrder(item)
                        setIsModalOpen(true)
                    }
                }
              >
                
                <td className="py-3 px-4 font-medium">{item.orderID}</td>
                <td className="py-3 px-4">{item.items.length} items</td>
                <td className="py-3 px-4">{item.customerName}</td>
                <td className="py-3 px-4">{item.email}</td>
                <td className="py-3 px-4">{item.phone}</td>
                <td className="py-3 px-4  ">{item.address}</td>
                <td className="py-3 px-4">{item.total.toFixed(2)}</td>
                <td className="py-3 px-4">{item.status}</td>
                <td className="py-3 px-4">{new Date(item.date).toLocaleDateString()}</td>
                
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

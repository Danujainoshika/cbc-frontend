
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaTimes } from "react-icons/fa";

export default function OrderDetailsModal({ isModalOpen, closeModal, selectedOrder, refresh }) {
  const [status, setStatus] = useState(selectedOrder?.status);
 
  if (!isModalOpen || !selectedOrder) return null;

  return ( 
    <div className="fixed left-0 top-0 w-full h-screen bg-[#00000080] z-[100] flex justify-center items-center p-4">
      <div className="w-full max-w-2xl bg-[var(--color-primary)] rounded-2xl shadow-2xl relative overflow-hidden">
        
        {/* Header */}
        <div className="flex justify-between items-center px-6 py-4 border-b border-[var(--color-secondary)]/20 bg-[var(--color-accent)]/10">
          <h2 className="text-xl font-semibold text-[var(--color-secondary)]">
            Order Details — <span className="text-[var(--color-accent)]">{selectedOrder.orderID}</span>
          </h2>
          <button 
            onClick={closeModal} 
            className="text-[var(--color-secondary)] hover:text-[var(--color-accent)] transition"
          >
            <FaTimes size={20} />
          </button>
        </div>

        {/* Customer Info */}
        <div className="px-6 py-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-[var(--color-secondary)] text-sm">
          <p><span className="font-semibold">Customer:</span> {selectedOrder.customerName}</p>
          <p><span className="font-semibold">Email:</span> {selectedOrder.email}</p>
          <p><span className="font-semibold">Phone:</span> {selectedOrder.phone}</p>
          <p><span className="font-semibold">Address:</span> {selectedOrder.address}</p>
          <p><span className="font-semibold">Status:</span> {selectedOrder.status}</p>
          <p><span className="font-semibold">Date:</span> {new Date(selectedOrder.date).toLocaleString()}</p>
        </div>

        {/* Items Table */}
        <div className="max-h-[250px] overflow-y-auto border-t border-[var(--color-secondary)]/20">
          <table className="w-full text-sm text-left text-[var(--color-secondary)]">
            <thead className="bg-[var(--color-secondary)] text-[var(--color-primary)] sticky top-0">
              <tr>
                <th className="py-2 px-4">Image</th>
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Qty</th>
                <th className="py-2 px-4">Price</th>
                <th className="py-2 px-4">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {selectedOrder.items.map((item, i) => (
                <tr key={i} className="border-b border-[var(--color-secondary)]/10 hover:bg-[var(--color-accent)]/10 transition">
                  <td className="py-2 px-4">
                    <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md" />
                  </td>
                  <td className="py-2 px-4">{item.name}</td>
                  <td className="py-2 px-4">{item.quantity}</td>
                  <td className="py-2 px-4">LKR {item.price.toFixed(2)}</td>
                  <td className="py-2 px-4">LKR {(item.price * item.quantity).toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center px-6 py-4 border-t border-[var(--color-secondary)]/20 bg-[var(--color-accent)]/10">
          <p className="text-[var(--color-secondary)] font-medium">
            Total: <span className="text-[var(--color-accent)] font-semibold">${selectedOrder.total.toFixed(2)}</span>
          </p>
          {/* Styled Select Dropdown */}
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <label className="text-sm text-[var(--color-secondary)] font-medium">Update Status:</label>
            <select
              defaultValue={selectedOrder.status}
              className="w-[180px] px-4 py-2 rounded-lg border border-[var(--color-secondary)]/30 
                        bg-[var(--color-primary)] text-[var(--color-secondary)] font-medium 
                        focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] 
                        hover:border-[var(--color-accent)] transition-all duration-300 cursor-pointer shadow-sm"
              onChange={(e) => setStatus(e.target.value)}
            >
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
              <option value="refunded">Refunded</option>
              <option value="pending">Pending</option>
            </select>
          </div>
          <button
            disabled={status == selectedOrder.status}
            onClick={() => {
              const token = localStorage.getItem("token");
              axios.put(import.meta.env.VITE_API_URL + "/api/orders/status/" + selectedOrder.orderID,
                { status: status },
                {
                  headers: {
                    Authorization: "Bearer " + token
                  }
                }
              ).then(() => {
                toast.success("Order status updated successfully");
                refresh();
                closeModal();
              }).catch((error) => {
                console.error("Error updating order status:", error);
              });
            }}
            
            className="bg-[var(--color-accent)] text-[var(--color-primary)] px-4 py-2 rounded-lg hover:opacity-90 transition"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
}

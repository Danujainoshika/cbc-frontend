import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Loading from "../../components/loader";
import { ShoppingCart, Package, Users, TrendingUp, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";

const StatCard = ({ icon: Icon, label, value, trend, color }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4 }}
    className={`rounded-2xl border border-white/10 bg-gradient-to-br ${color} p-5 shadow-lg backdrop-blur-sm hover:shadow-xl transition-shadow duration-300`}
  >
    <div className="flex items-start justify-between">
      <div className="space-y-2">
        <p className="text-sm font-medium text-white/70 uppercase tracking-wide">{label}</p>
        <p className="text-3xl font-bold text-white">{value}</p>
        {trend && (
          <p className={`text-xs font-semibold ${trend > 0 ? 'text-green-400' : 'text-red-400'}`}>
            {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}% this month
          </p>
        )}
      </div>
      <div className="rounded-xl bg-white/20 p-3 text-white/80">
        <Icon className="text-2xl" />
      </div>
    </div>
  </motion.div>
);

export default function AdminDashboad() {
  const [stats, setStats] = useState({ totalOrders: 0, totalProducts: 0, totalUsers: 0, totalRevenue: 0 });
  const [categoryBreakdown, setCategoryBreakdown] = useState([]);
  const [orderStatusBreakdown, setOrderStatusBreakdown] = useState({});
  const [userStats, setUserStats] = useState({ verified: 0, blocked: 0, total: 0 });
  const [lowStockProducts, setLowStockProducts] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [recentActivities, setRecentActivities] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          navigate("/login");
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };
        const apiUrl = import.meta.env.VITE_API_URL;

        const [ordersRes, productsRes, usersRes] = await Promise.all([
          axios.get(`${apiUrl}/api/orders`, { headers }),
          axios.get(`${apiUrl}/api/products`, { headers }).catch(() => ({ data: [] })),
          axios.get(`${apiUrl}/api/users/all-users`, { headers }).catch(() => ({ data: [] }))
        ]);

        const orders = ordersRes.data || [];
        const products = productsRes.data || [];
        const users = usersRes.data || [];

        const totalRevenue = orders.reduce((sum, order) => sum + (order.total || 0), 0);
        setStats({
          totalOrders: orders.length,
          totalProducts: products.length,
          totalUsers: users.length,
          totalRevenue: totalRevenue
        });

        const categoryMap = {};
        products.forEach((product) => {
          const category = product.category || "Uncategorized";
          categoryMap[category] = (categoryMap[category] || 0) + 1;
        });
        const categoryData = Object.entries(categoryMap).map(([name, count]) => ({
          name: name.charAt(0).toUpperCase() + name.slice(1),
          value: count,
          percentage: ((count / products.length) * 100).toFixed(1)
        }));
        setCategoryBreakdown(categoryData);

        const statusMap = {};
        orders.forEach((order) => {
          const status = order.status || "Pending";
          statusMap[status] = (statusMap[status] || 0) + 1;
        });
        setOrderStatusBreakdown(statusMap);

        const verifiedCount = users.filter(u => u.isEmailVerified).length;
        const blockedCount = users.filter(u => u.isBlock).length;
        setUserStats({ verified: verifiedCount, blocked: blockedCount, total: users.length });

        const lowStock = products.filter(p => p.stock < 10).sort((a, b) => a.stock - b.stock).slice(0, 5);
        setLowStockProducts(lowStock);

        const recentOrdersList = orders.sort((a, b) => new Date(b.date || 0) - new Date(a.date || 0)).slice(0, 8);
        setRecentOrders(recentOrdersList);

        const productRevenue = {};
        orders.forEach((order) => {
          order.items?.forEach((item) => {
            if (!productRevenue[item.productID]) {
              productRevenue[item.productID] = { quantity: 0, revenue: 0, product: products.find(p => p.productID === item.productID) };
            }
            productRevenue[item.productID].quantity += item.quantity || 0;
            const product = products.find(p => p.productID === item.productID);
            if (product) {
              productRevenue[item.productID].revenue += product.price * (item.quantity || 0);
            }
          });
        });

        const topProductsList = Object.values(productRevenue)
          .sort((a, b) => b.revenue - a.revenue)
          .slice(0, 5)
          .map(item => ({ ...item.product, salesQuantity: item.quantity, totalRevenue: item.revenue }));
        setTopProducts(topProductsList);

        const activities = [];
        orders.slice(0, 3).forEach((order) => {
          activities.push({
            type: "order",
            message: `New order ${order.orderID?.slice(-6) || 'N/A'} - RS${order.total?.toFixed(2) || '0.00'}`,
            timestamp: order.date,
            color: "bg-blue-100 text-blue-600"
          });
        });

        lowStock.slice(0, 2).forEach((product) => {
          activities.push({
            type: "alert",
            message: `Low stock: ${product.name} (${product.stock} left)`,
            timestamp: new Date(),
            color: "bg-red-100 text-red-600"
          });
        });

        setRecentActivities(activities.slice(0, 6));
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching dashboard data:", error);
        toast.error("Failed to load dashboard data");
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, [navigate]);

  if (isLoading) return <Loading />;

  return (
    <div className="space-y-6 p-1">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-8">
        <h1 className="text-4xl font-bold text-secondary">Dashboard</h1>
        <p className="mt-2 text-sm text-secondary/60">Welcome back! Here's your business overview.</p>
      </motion.div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard icon={ShoppingCart} label="Total Orders" value={stats.totalOrders} trend={12} color="from-blue-500/20 to-blue-600/20 border-blue-500/30" />
        <StatCard icon={Package} label="Total Products" value={stats.totalProducts} trend={8} color="from-purple-500/20 to-purple-600/20 border-purple-500/30" />
        <StatCard icon={Users} label="Total Users" value={stats.totalUsers} trend={5} color="from-emerald-500/20 to-emerald-600/20 border-emerald-500/30" />
        <StatCard icon={TrendingUp} label="Total Revenue" value={`RS${stats.totalRevenue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`} trend={15} color="from-amber-500/20 to-amber-600/20 border-amber-500/30" />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.1 }} className="lg:col-span-2 rounded-2xl border border-secondary/10 bg-white/85 backdrop-blur-sm shadow-lg p-5">
          <h2 className="mb-4 text-xl font-bold text-secondary">Recent Orders</h2>
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {recentOrders.length > 0 ? (
              recentOrders.map((order, idx) => (
                <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: idx * 0.05 }} className="flex items-center justify-between rounded-xl border border-secondary/10 bg-secondary/5 px-4 py-3 hover:bg-secondary/10 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-secondary text-sm">Order #{order._id?.slice(-6) || order.orderID?.slice(-6) || 'N/A'}</p>
                    <p className="text-xs text-secondary/60 mt-1">{order.items?.length || 0} items • {order.customerName || 'Unknown'}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="font-bold text-secondary">RS{(order.total || 0).toFixed(2)}</p>
                    <span className="text-xs font-medium text-green-600 bg-green-100 px-2 py-1 rounded-full inline-block mt-1">{order.status || 'Pending'}</span>
                  </div>
                </motion.div>
              ))
            ) : (
              <p className="text-center text-secondary/60 py-8">No orders yet</p>
            )}
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.2 }} className="rounded-2xl border border-secondary/10 bg-gradient-to-br from-secondary/10 to-accent/20 backdrop-blur-sm shadow-lg p-5">
          <h2 className="mb-4 text-lg font-bold text-secondary">Order Status</h2>
          <div className="space-y-3 mb-6">
            {Object.entries(orderStatusBreakdown).map(([status, count], idx) => (
              <div key={idx} className="flex justify-between items-center pb-3 border-b border-secondary/10 last:border-b-0">
                <span className="text-sm text-secondary/70">{status}</span>
                <span className="font-bold text-secondary bg-white/50 px-3 py-1 rounded-lg">{count}</span>
              </div>
            ))}
          </div>
          <h3 className="mb-3 text-lg font-bold text-secondary border-t border-secondary/10 pt-4">User Stats</h3>
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary/70">Total Users</span>
              <span className="font-bold text-secondary">{userStats.total}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary/70">Verified</span>
              <span className="font-bold text-green-600">{userStats.verified}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-secondary/70">Blocked</span>
              <span className="font-bold text-red-600">{userStats.blocked}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {categoryBreakdown.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.25 }} className="rounded-2xl border border-secondary/10 bg-white/85 backdrop-blur-sm shadow-lg p-5">
          <h2 className="mb-4 text-xl font-bold text-secondary">Products by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categoryBreakdown.map((category, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: idx * 0.05 }} className="rounded-xl border border-secondary/10 bg-secondary/5 p-4 text-center hover:bg-secondary/10 transition-colors">
                <p className="text-2xl font-bold text-secondary">{category.value}</p>
                <p className="text-sm text-secondary/60 mt-1">{category.name}</p>
                <p className="text-xs text-accent font-semibold mt-2">{category.percentage}%</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {lowStockProducts.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} className="rounded-2xl border border-red-500/30 bg-gradient-to-r from-red-50 to-red-50/50 backdrop-blur-sm shadow-lg p-5">
          <div className="flex items-center gap-2 mb-4">
            <AlertCircle className="text-red-600 w-6 h-6" />
            <h2 className="text-xl font-bold text-red-700">Low Stock Alerts</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {lowStockProducts.map((product, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: idx * 0.05 }} className="rounded-xl border border-red-200 bg-white p-3 hover:shadow-md transition-shadow">
                <img src={product.images?.[0] || "https://via.placeholder.com/150"} alt={product.name} className="w-full h-20 object-cover rounded-lg mb-2" />
                <p className="font-semibold text-secondary text-xs truncate">{product.name}</p>
                <p className="text-sm font-bold text-red-600 mt-2">Stock: {product.stock}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {topProducts.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.35 }} className="rounded-2xl border border-secondary/10 bg-white/85 backdrop-blur-sm shadow-lg p-5">
          <h2 className="mb-4 text-xl font-bold text-secondary">Top Products by Revenue</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {topProducts.map((product, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.3, delay: idx * 0.05 }} className="rounded-xl border border-secondary/10 bg-secondary/5 p-3 hover:bg-secondary/10 transition-colors">
                <img src={product.images?.[0] || "https://via.placeholder.com/150"} alt={product.name} className="w-full h-32 object-cover rounded-lg mb-3" />
                <p className="font-semibold text-secondary text-sm truncate">{product.name}</p>
                <p className="text-xs text-secondary/60 mt-1">Qty: {product.salesQuantity}</p>
                <p className="text-sm font-bold text-emerald-600 mt-2">RS{product.totalRevenue?.toFixed(2) || '0.00'}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}

      {recentActivities.length > 0 && (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.4 }} className="rounded-2xl border border-secondary/10 bg-white/85 backdrop-blur-sm shadow-lg p-5">
          <h2 className="mb-4 text-xl font-bold text-secondary">Recent Activities</h2>
          <div className="space-y-3">
            {recentActivities.map((activity, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.3, delay: idx * 0.05 }} className="flex items-start gap-3 rounded-xl border border-secondary/10 bg-secondary/5 p-3 hover:bg-secondary/10 transition-colors">
                <div className={`rounded-lg p-2 flex-shrink-0 ${activity.color}`}>
                  <AlertCircle className="w-4 h-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-secondary break-words">{activity.message}</p>
                  <p className="text-xs text-secondary/50 mt-1">{new Date(activity.timestamp).toLocaleDateString()} {new Date(activity.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </div>
  );
}


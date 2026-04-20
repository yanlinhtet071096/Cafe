import { motion, AnimatePresence } from "motion/react";
import { X, TrendingUp, ShoppingBag, DollarSign, Calendar, Loader2, BarChart3, ClipboardList } from "lucide-react";
import { orderService } from "../services/orderService";
import { useEffect, useState } from "react";
import { Order } from "../types";
import { SupplyChecklist } from "./SupplyChecklist";

interface SalesDashboardProps {
  onClose: () => void;
}

interface Stats {
  orderCount: number;
  totalSales: number;
  orders: Order[];
}

export function SalesDashboard({ onClose }: SalesDashboardProps) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"analytics" | "supplies">("analytics");

  useEffect(() => {
    orderService.getDailyStats().then(data => {
      setStats(data);
      setLoading(false);
    });
  }, []);

  if (loading || !stats) {
    return (
      <div className="fixed inset-0 z-[100] bg-bakery-cream flex items-center justify-center">
        <Loader2 className="animate-spin text-bakery-gold" size={40} />
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-bakery-cream overflow-y-auto"
    >
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-serif font-bold text-bakery-brown">Bakery Management</h2>
            <div className="flex items-center gap-6 mt-4">
              <button 
                onClick={() => setActiveTab("analytics")}
                className={`flex items-center gap-2 text-xs uppercase font-bold tracking-widest transition-all ${
                  activeTab === "analytics" ? "text-bakery-gold" : "text-bakery-dark/30 hover:text-bakery-dark"
                }`}
              >
                <BarChart3 size={16} /> Analytics
              </button>
              <button 
                onClick={() => setActiveTab("supplies")}
                className={`flex items-center gap-2 text-xs uppercase font-bold tracking-widest transition-all ${
                  activeTab === "supplies" ? "text-bakery-gold" : "text-bakery-dark/30 hover:text-bakery-dark"
                }`}
              >
                <ClipboardList size={16} /> Supply List
              </button>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="w-12 h-12 bg-bakery-brown text-bakery-cream rounded-full flex items-center justify-center hover:bg-bakery-dark transition-all shadow-lg"
          >
            <X size={24} />
          </button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === "analytics" ? (
            <motion.div 
              key="analytics"
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 10 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-bakery-brown/5">
                  <div className="w-10 h-10 bg-bakery-gold/10 rounded-xl flex items-center justify-center text-bakery-gold mb-4">
                    <TrendingUp size={20} />
                  </div>
                  <p className="text-xs font-bold text-bakery-dark/30 uppercase tracking-widest mb-1">Total Revenue</p>
                  <p className="text-3xl font-display italic text-bakery-brown font-bold">${stats.totalSales.toFixed(2)}</p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-bakery-brown/5">
                  <div className="w-10 h-10 bg-bakery-gold/10 rounded-xl flex items-center justify-center text-bakery-gold mb-4">
                    <ShoppingBag size={20} />
                  </div>
                  <p className="text-xs font-bold text-bakery-dark/30 uppercase tracking-widest mb-1">Orders Today</p>
                  <p className="text-3xl font-display italic text-bakery-brown font-bold">{stats.orderCount}</p>
                </div>

                <div className="bg-white p-8 rounded-3xl shadow-sm border border-bakery-brown/5">
                  <div className="w-10 h-10 bg-bakery-gold/10 rounded-xl flex items-center justify-center text-bakery-gold mb-4">
                    <DollarSign size={20} />
                  </div>
                  <p className="text-xs font-bold text-bakery-dark/30 uppercase tracking-widest mb-1">Avg. Ticket</p>
                  <p className="text-3xl font-display italic text-bakery-brown font-bold">
                    ${stats.orderCount > 0 ? (stats.totalSales / stats.orderCount).toFixed(2) : "0.00"}
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-xl font-serif font-bold text-bakery-brown border-b border-bakery-brown/10 pb-4">Recent Transactions</h3>
                {stats.orders.length === 0 ? (
                  <div className="text-center py-20 bg-bakery-warm/30 rounded-3xl border border-dashed border-bakery-brown/10">
                    <p className="text-bakery-dark/30">No transactions recorded yet today.</p>
                  </div>
                ) : (
                  stats.orders.map((order) => (
                    <div key={order.id} className="bg-white p-6 rounded-3xl shadow-sm border border-bakery-brown/5 flex flex-col md:flex-row md:items-center justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-bakery-warm rounded-2xl flex items-center justify-center text-bakery-brown font-serif font-bold italic">
                          {order.items.reduce((sum, i) => sum + i.quantity, 0)}
                        </div>
                        <div>
                          <p className="font-bold text-bakery-brown">Order #{order.id}</p>
                          <p className="text-xs text-bakery-dark/40 font-medium">
                            {new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • {order.paymentMethod.toUpperCase()}
                          </p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-8">
                        <div className="hidden lg:block text-right">
                          <p className="text-[10px] uppercase font-bold text-bakery-dark/30 tracking-widest">Items</p>
                          <p className="text-xs text-bakery-dark/60 max-w-[200px] truncate">
                            {order.items.map(i => i.code ? `${i.code}: ${i.name}` : i.name).join(", ")}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-2xl font-display italic text-bakery-gold font-bold">${order.total.toFixed(2)}</p>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="supplies"
              initial={{ opacity: 0, x: 10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <SupplyChecklist />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

import { Order } from "../types";
import { supabase } from "../lib/supabase";

const STORAGE_KEY = "lumiere_orders";

export const orderService = {
  getOrders: async (): Promise<Order[]> => {
    try {
      // Try to get from Supabase first
      const { data, error } = await supabase
        .from('orders')
        .select('*')
        .order('timestamp', { ascending: false });

      if (error) throw error;
      
      if (data) {
        return data.map(o => ({
          ...o,
          paymentMethod: o.payment_method, // mapping snake_case to camelCase
        }));
      }
    } catch (err) {
      console.warn("Supabase fetch failed, falling back to local storage:", err);
    }

    // Fallback to localStorage
    const localData = localStorage.getItem(STORAGE_KEY);
    return localData ? JSON.parse(localData) : [];
  },

  saveOrder: async (order: Order) => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        console.warn("No authenticated user found. Saving to cloud skipped (will save locally).");
        // We still proceed to save locally below
      } else {
        const { error } = await supabase
          .from('orders')
          .insert([{
            id: order.id,
            items: order.items,
            total: order.total,
            payment_method: order.paymentMethod,
            timestamp: order.timestamp,
            date: order.date,
            user_id: user.id
          }]);

        if (error) {
          console.error("Supabase RLS Error Details:", error);
          throw error;
        }
      }
    } catch (err) {
      console.warn("Supabase save failed, saving to local storage:", err);
    }

    // Always save to local for offline-first feel
    const orders = await orderService.getOrdersLocalOnly();
    orders.push(order);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  },

  getOrdersLocalOnly: (): Order[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  },

  getDailyStats: async () => {
    const orders = await orderService.getOrders();
    const today = new Date().toLocaleDateString();
    
    const dailyOrders = orders.filter(o => o.date === today);
    const totalSales = dailyOrders.reduce((sum, o) => sum + o.total, 0);
    
    return {
      orderCount: dailyOrders.length,
      totalSales,
      orders: dailyOrders.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    };
  }
};

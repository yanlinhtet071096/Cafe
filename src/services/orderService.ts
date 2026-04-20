import { Order } from "../types";
import { supabase } from "../lib/supabase";

const getStorageKey = (userId?: string) => `lumiere_orders_${userId || 'guest'}`;

export const orderService = {
  getOrders: async (): Promise<Order[]> => {
    try {
      // Try to get from Supabase first
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return [];

      let query = supabase.from('orders').select('*');

      // Filter based on role
      const { data: profile } = await supabase.from('profiles').select('branch_id, role').eq('id', user.id).single();
      
      if (profile) {
        if (profile.role === 'staff') {
          query = query.eq('user_id', user.id);
        } else if (profile.role === 'manager') {
          query = query.eq('branch_id', profile.branch_id);
        }
      }

      const { data, error } = await query.order('timestamp', { ascending: false });

      if (error) throw error;
      
      if (data) {
        return data.map(o => ({
          ...o,
          paymentMethod: o.payment_method, // mapping snake_case to camelCase
          branchId: o.branch_id
        }));
      }
    } catch (err) {
      console.warn("Supabase fetch failed, falling back to local storage:", err);
    }

    // Fallback to user-specific localStorage
    const { data: { user } } = await supabase.auth.getUser();
    const localData = localStorage.getItem(getStorageKey(user?.id));
    return localData ? JSON.parse(localData) : [];
  },

  saveOrder: async (order: Order) => {
    const { data: { user } } = await supabase.auth.getUser();
    
    try {
      if (user) {
        const { data: profile } = await supabase.from('profiles').select('branch_id').eq('id', user.id).single();

        const { error } = await supabase
          .from('orders')
          .insert([{
            id: order.id,
            items: order.items,
            total: order.total,
            payment_method: order.paymentMethod,
            timestamp: order.timestamp,
            date: order.date,
            user_id: user.id,
            branch_id: profile?.branch_id
          }]);

        if (error) throw error;
      }
    } catch (err) {
      console.warn("Supabase save failed, saving to local storage:", err);
    }

    // Save to user-specific local storage
    const storageKey = getStorageKey(user?.id);
    const localData = localStorage.getItem(storageKey);
    const orders = localData ? JSON.parse(localData) : [];
    orders.push(order);
    localStorage.setItem(storageKey, JSON.stringify(orders));
  },

  getOrdersLocalOnly: async (): Promise<Order[]> => {
    const { data: { user } } = await supabase.auth.getUser();
    const data = localStorage.getItem(getStorageKey(user?.id));
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

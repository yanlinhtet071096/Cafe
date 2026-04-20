import { Order } from "../types";
import { supabase } from "../lib/supabase";

const getStorageKey = (userId?: string) => `lumiere_orders_${userId || 'guest'}`;

export const orderService = {
  getOrders: async (userId?: string): Promise<Order[]> => {
    try {
      const activeUserId = userId || (await supabase.auth.getUser()).data.user?.id;
      if (!activeUserId) return [];

      // Check for demo flag
      if (localStorage.getItem('portfolio_demo_active') === 'true') {
        const localData = localStorage.getItem(getStorageKey(activeUserId));
        if (localData) return JSON.parse(localData);
      }

      let query = supabase.from('orders').select('*');
      const { data: profile } = await supabase.from('profiles').select('branch_id, role').eq('id', activeUserId).single();
      
      if (profile) {
        if (profile.role === 'staff') {
          query = query.eq('user_id', activeUserId);
        } else if (profile.role === 'manager') {
          query = query.eq('branch_id', profile.branch_id);
        }
      }

      const { data, error } = await query.order('timestamp', { ascending: false });

      if (error) throw error;
      
      if (data) {
        return data.map(o => ({
          ...o,
          paymentMethod: o.payment_method,
          branchId: o.branch_id
        }));
      }
    } catch (err) {
      console.warn("Using local fallback:", err);
    }

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

  generateDemoData: async (uid: string) => {
    const branches = [
      '4bfdabf8-7ceb-4369-ae1b-fb6502fb6147', // Heritage
      'fbec8159-4866-449f-967d-dbf1cabb933d'  // Riverside
    ];

    const demoOrders: Order[] = Array.from({ length: 15 }).map((_, i) => ({
      id: `LUM-${1000 + i}`,
      branchId: branches[i % 2],
      user_id: uid,
      items: [{ id: '1', name: 'Artisan Sourdough', price: 12, quantity: 2 }],
      total: 24 + (Math.random() * 50),
      paymentMethod: i % 2 === 0 ? 'card' : 'cash',
      timestamp: new Date(Date.now() - (i * 3600000)).toISOString(),
      date: new Date().toLocaleDateString()
    }));

    localStorage.setItem(getStorageKey(uid), JSON.stringify(demoOrders));
    localStorage.setItem('portfolio_demo_active', 'true');
    window.location.reload(); 
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

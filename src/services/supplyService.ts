import { supabase } from "../lib/supabase";
import { SupplyItem } from "../types";

export const supplyService = {
  async getItems() {
    const { data, error } = await supabase
      .from('items')
      .select('*')
      .order('createdAt', { ascending: false });
    
    if (error) throw error;
    return data as SupplyItem[];
  },

  async addItem(name: string, quantity: string = "", note: string = "") {
    const { data: { user } } = await supabase.auth.getUser();
    
    const { data, error } = await supabase
      .from('items')
      .insert([{ 
        name, 
        quantity, 
        note,
        user_id: user?.id 
      }])
      .select();
    
    if (error) throw error;
    return data[0] as SupplyItem;
  },

  async updateItem(id: string, updates: Partial<SupplyItem>) {
    const { error } = await supabase
      .from('items')
      .update({
        ...updates,
        updatedAt: new Date().toISOString()
      })
      .eq('id', id);
    
    if (error) throw error;
  },

  async deleteItem(id: string) {
    const { error } = await supabase
      .from('items')
      .delete()
      .eq('id', id);
    
    if (error) throw error;
  },

  subscribeToItems(onUpdate: () => void) {
    return supabase
      .channel('items_realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'items' },
        () => onUpdate()
      )
      .subscribe();
  }
};

import { supabase } from "../lib/supabase";
import { SupplyItem } from "../types";

export const supplyService = {
  async getItems() {
    const { data: { user } } = await supabase.auth.getUser();
    let query = supabase.from('items').select('*');

    const { data: profile } = await supabase.from('profiles').select('branch_id, role').eq('id', user?.id).single();
    
    if (profile && profile.role !== 'admin') {
      query = query.eq('branch_id', profile.branch_id);
    }

    const { data, error } = await query.order('createdAt', { ascending: false });
    if (error) throw error;
    return data as SupplyItem[];
  },

  async addItem(name: string, quantity: string = "", note: string = "") {
    const { data: { user } } = await supabase.auth.getUser();
    const { data: profile } = await supabase.from('profiles').select('branch_id').eq('id', user?.id).single();
    
    const { data, error } = await supabase
      .from('items')
      .insert([{ 
        name, 
        quantity, 
        note,
        user_id: user?.id,
        branch_id: profile?.branch_id
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

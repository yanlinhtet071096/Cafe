import { supabase } from "../lib/supabase";
import { UserProfile, Branch } from "../types";

export const profileService = {
  getCurrentProfile: async (): Promise<UserProfile | null> => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return null;

    const { data, error } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();

    if (error) return null;
    return data as UserProfile;
  },

  getBranches: async (): Promise<Branch[]> => {
    const { data, error } = await supabase
      .from('branches')
      .select('*');
    
    if (error) return [];
    return data as Branch[];
  },

  getBranchById: async (id: string): Promise<Branch | null> => {
    const { data, error } = await supabase
      .from('branches')
      .select('*')
      .eq('id', id)
      .single();

    if (error) return null;
    return data as Branch;
  }
};

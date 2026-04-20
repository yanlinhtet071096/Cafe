import { createClient } from '@supabase/supabase-js';

// @ts-ignore
const supabaseUrl = import.meta.env.NEXT_PUBLIC_SUPABASE_URL || 'https://xzvurgmuvkfbiozwwbzy.supabase.co';
// @ts-ignore
const supabaseAnonKey = import.meta.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 'sb_publishable_zLiWU8uKDPDSITTXt0GwyQ_fiACZ_G8';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

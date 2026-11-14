	mport { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://ortbwshrhrmofcfkllzc.supabase.co';
const supabaseAnonKey = 'sb_publishable_uktSUzTn0LaAwb5e0tZPWg_t3tXuxKrI';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

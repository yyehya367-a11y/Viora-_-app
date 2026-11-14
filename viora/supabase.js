import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vgqbzblvcjobdznzqyqh.supabase.co';
const supabaseAnonKey = 'sb_publishable_D3DJnR-APmez6BI-sYVhfQ_DR8ig67P';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

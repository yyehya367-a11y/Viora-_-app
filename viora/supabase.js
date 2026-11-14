import { createClient } from '@supabase/supabase-js';

// 🔗 الرابط تاع المشروع (Project URL)
const supabaseUrl = 'https://ortbwsghrhmocfckllzc.supabase.co/rest/v1/ا'; 

// 🔑 المفتاح (Publishable Key)
const supabaseAnonKey = 'sb_publishable_uktSUzTn0LaAWb5eOtZPWg_t3tXuXkRا';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

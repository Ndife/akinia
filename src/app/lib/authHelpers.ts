import { supabase } from '@/app/lib/supabaseClient';

export const logout = async () => {
  await supabase.auth.signOut();
  window.location.href = '/auth/login';
};

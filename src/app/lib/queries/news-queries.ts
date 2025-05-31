import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/app/lib/supabaseClient';

interface Filters {
  sector?: string;
  country?: string;
}

export const useNews = (filters: Filters) => {
  return useQuery({
    queryKey: ['news', filters],
    queryFn: async () => {
      let query = supabase.from('news').select('*');
      if (filters?.sector) query = query.eq('sector', filters.sector);
      if (filters?.country) query = query.eq('country', filters.country);
      return (await query).data;
    }
  });
}
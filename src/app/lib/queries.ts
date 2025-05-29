import { useQuery } from '@tanstack/react-query';
import { supabase } from './supabaseClient';


interface Filters {
  sector?: string;
  country?: string;
}

export const useCompanies = (filters: Filters) => {
  return useQuery({
    queryKey: ['companies', filters],
    queryFn: async () => {
      let query = supabase.from('companies').select('*');
      if (filters?.sector) query = query.eq('sector', filters.sector);
      if (filters?.country) query = query.eq('country', filters.country);
      return (await query).data;
    }
  });
};
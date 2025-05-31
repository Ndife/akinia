import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/app/lib/supabaseClient';
import { Database } from '@/app/types/database.types';


interface Filters {
  sector?: string;
  stage?: string;
  hq_location?: string;
}
export type CompanyWithCEO = Database["public"]["Tables"]["companies"]["Row"] & {
  ceo_contact?: {
    name: string | null;
    email: string | null;
  };
};


export const useCompanies = (filters: Filters) => {
  return useQuery<CompanyWithCEO[]>({
    queryKey: ['companies', filters],
    queryFn: async () => {
      let query = supabase
        .from('companies')
        .select(`
          *,
          ceo_contact:ceo_contact_id (
            email
          )
        `);

      if (filters?.sector) query = query.eq('sector', filters.sector);
      if (filters?.stage) query = query.eq('stage', filters.stage);
      if (filters?.hq_location) query = query.eq('hq_location', filters.hq_location);

      const { data, error } = await query;
      if (error) throw error;

      return data;
    },
  });
};

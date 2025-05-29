"use client";
import { useAuth } from '@/app/lib/AuthProvider';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useCompanies } from '@/app/lib/queries';
import { Card, CardContent } from '@/components/ui/card';
import { Database } from '@/app/types/database.types';

type Company = Database['public']['Tables']['companies']['Row'];

export default function DashboardPage() {
  const { session, loading } = useAuth();
  const { data, isLoading } = useCompanies({});
  const router = useRouter();

  useEffect(() => {
    if (!loading && !session) {
      router.push('/auth/login');
    }
  }, [loading, session, router]);
  
  if (loading) return <div>Loading...</div>;
  if (!session) return null;

  return (
    <>
    <div className="flex justify-between items-center mb-4">
    <h1 className="text-xl font-bold">Dashboard</h1>
  </div>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {!isLoading && data?.map((company: Company) => (
        <Card key={company.id}>
          <CardContent>
            <h2 className="text-lg font-semibold">{company.name}</h2>
            <p>{company.sector} — {company.hq_location}</p>
            <p>Valuation: ${company.valuation_m}</p>
          </CardContent>
        </Card>
      ))}
    </div>
    </>
  );
}

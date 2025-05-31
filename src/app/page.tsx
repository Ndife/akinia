"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/lib/AuthProvider";
import SideNavLayout from "@/components/layout/sidenav-layout";
import { getGreeting } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { getInitials } from "@/helper";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useNews } from "./lib/queries/news-queries";
import { Database } from "./types/database.types";

type News = Database["public"]["Tables"]["news"]["Row"];

export default function App() {
    const { session, loading } = useAuth();
    const { data, isLoading } = useNews({});
    
    const router = useRouter();

    useEffect(() => {
      if (!loading && !session) {
        router.push("/auth/login");
      }
    }, [loading, session, router]);
  
    if (loading) return <div className="p-6">Loading session...</div>;
    if (!session) return null;

  return (
    <SideNavLayout>
      <div className="space-y-6">
        <div className="lg:grid grid-cols-6 gap-4">
          <div className="col-span-4 col-start-2">
            <div className="grid md:grid-cols-3 gap-4 gap-x-10">
              <div className="col-span-2">
                <h1 className="text-2xl font-bold">
                  {getGreeting()}, {session?.user.user_metadata?.full_name}
                  </h1>
                <p className="text-sm text-muted-foreground mb-2">
                  News limited to Europe and Software, Technology 
                  <Button
                    variant="link"
                    className="text-blue-600 hover:bg-transparent hover:cursor-pointer"
                    onClick={() => {}}
                  >
                    Filters
                  </Button>
                </p>

                <h3 className="text-sm font-semibold">Last week</h3>
                {data && (
                  data.map((news: News) => (
                  <div key={news.id}>
                    <Separator className="my-4" />
                    <div className="flex items-start space-x-4">
                      <div className="rounded-sm w-10 h-10 p-0 items-center justify-center flex text-blue-600 bg-[#dfe8ff]">
                        { getInitials(news.sector || "Unknown Sector") }
                      </div>
                      <div key={news.id} className="text-sm text-semibold">
                        <p className="mb-1">{news.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {news.sector} — {news.source || "Unknown Source"}
                        </p>
                      </div>
                    </div>
                  </div>
                  ))
                )}
              </div>
            <div className="lg:grid hidden gap-3 mt-18 max-h-dvh overflow-y-auto">
            {isLoading
            ? Array.from({ length: 6 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="space-y-2 py-6">
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-4 w-1/3" />
                  </CardContent>
                </Card>
              ))
            : data?.map((news: News) => (
                <Card key={news.id}>
                  <CardContent className="py-6 space-y-2">
                    <h2 className="font-semibold">{news.title}</h2>
                    <p className="text-sm text-muted-foreground">
                      {news.sector} — {news.source || "Unknown Source"}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            </div>
          </div>
        </div>
      </div>
    </SideNavLayout>
  );
}

"use client";

import { Download, Columns2 } from "lucide-react";
import { useCompanies } from "../lib/queries/company-queries";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import CompanyTable from "@/components/company/company-table";
import { Database } from "../types/database.types";
import { Dropdown } from "@/components/dropdown";

export type CompanyWithCEO = Database["public"]["Tables"]["companies"]["Row"] & {
  ceo_contact?: {
    name: string | null;
    email: string | null;
  };
};


export default function CompanyPage() {
    const [selectedHQ, setSelectedHQ] = useState("");
    const [selectedSector, setSelectedSector] = useState("");
    const [selectedStage, setSelectedStage] = useState("");
    const [selectedCompany, setSelectedCompany] = useState<CompanyWithCEO[]>()

   const { data, isLoading } = useCompanies({ 
    hq_location: selectedHQ, 
    sector: selectedSector,
    stage: selectedStage,
   });
   const { data:initialCompanyData } = useCompanies({})

   useEffect(() => {
    setSelectedCompany(data as CompanyWithCEO[])
   },[data]);

  return (
    <div className="flex flex-col gap-4 p-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Companies</h1>
        <div className="flex gap-4">
          <span className="flex gap-x-1">
            <Columns2 className="w-5 h-5" />
            <p className="text-sm text-muted-foreground">Columns</p>
          </span>
          <span className="flex gap-x-1">
            <Download className="w-5 h-5" />
            <p className="text-sm text-muted-foreground">Export</p>
          </span>
        </div>
      </div>

      <div className="flex justify-between items-center p-y-0">
        <div className="flex gap-4">
          {/* Comapny HQ */}
          <Dropdown
            items={initialCompanyData ?? []}
            selected={selectedHQ}
            placeholder="Select HQ"
            onSelect={(company) =>
              setSelectedHQ(company.hq_location || "Unknown Location")
            }
            getLabel={(company) => company.hq_location || "Unknown Location"}
            />

          {/* Comapny Sector */}
          <Dropdown
            items={initialCompanyData ?? []}
            selected={selectedSector}
            placeholder="Select Sector"
            onSelect={(company) =>
              setSelectedSector(company.sector || "Unknown Sector")
            }
            getLabel={(company) => company.sector}
          />

          {/* Company Stage */}
          <Dropdown
            items={initialCompanyData ?? []}
            selected={selectedStage}
            placeholder="Select Stage"
            onSelect={(company) =>
              setSelectedStage(company.stage || "Unknown Stage")
            }
            getLabel={(company) => company.stage}
          />
        </div>
        <Button variant="link" className="hover:cursor-pointer p-0 hover:-underline text-muted-foreground" 
          onClick={() => {}}
        >
          Clear
        </Button>
      </div>

      <CompanyTable selectedCompany={selectedCompany} isLoading={isLoading} />
    </div>
  );
}
import { DataTable, Column } from "@/components/table";
import TableLoader from "../loaders/table";
import { CompanyWithCEO } from "@/app/companies/page";

interface ICompanyTable {
  selectedCompany?: CompanyWithCEO[];
  isLoading: boolean;
}

export default function CompanyTable({ selectedCompany = [], isLoading }: ICompanyTable) {
  const columns: Column<CompanyWithCEO>[] = [
    { key: "name", label: "Name" },
    { key: "sector", label: "Sector" },
    { key: "hq_location", label: "HQ Location" },
    { key: "founded", label: "Founded" },
    { key: "stage", label: "Stage" },
    { key: "employees", label: "Employees" },
    { key: "valuation_m", label: "Valuation_M" },
    {
      key: "ceo_contact",
      label: "CEO Contact",
      render: (company) => company.ceo_contact?.email ?? "-",
    },
  ];

  return (
    <DataTable
      data={selectedCompany}
      columns={columns}
      isLoading={isLoading}
      loader={<TableLoader />}
    />
  );
}

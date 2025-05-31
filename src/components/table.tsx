import { useState } from "react";

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  isLoading?: boolean;
  showCheckbox?: boolean;
  loader?: React.ReactNode;
}

export function DataTable<T extends { id: string }>({
  data,
  columns,
  isLoading = false,
  showCheckbox = true,
  loader,
}: DataTableProps<T>) {
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  const isAllSelected = data.length > 0 && selectedIds.length === data.length;

  const toggleSelectAll = () => {
    setSelectedIds(isAllSelected ? [] : data.map((item) => item.id));
  };

  const toggleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full divide-y divide-gray-200 border">
        <thead className="bg-gray-50">
          <tr>
            {showCheckbox && (
              <th className="px-4 py-3">
                <input type="checkbox" checked={isAllSelected} onChange={toggleSelectAll} />
              </th>
            )}
            {columns.map((col) => (
              <th
                key={col.key.toString()}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {isLoading ? (
            <tr>
              <td colSpan={columns.length + (showCheckbox ? 1 : 0)} className="text-center py-4">
                {loader || "Loading..."}
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id} className="border border-gray-200">
                {showCheckbox && (
                  <td className="px-4 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      checked={selectedIds.includes(row.id)}
                      onChange={() => toggleSelectOne(row.id)}
                    />
                  </td>            
                )}
                {columns.map((col) => (
                  <td key={col.key.toString()} className="px-6 py-4 whitespace-nowrap">
                    {col.render ? col.render(row) : String(row[col.key as keyof T] ?? "-")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

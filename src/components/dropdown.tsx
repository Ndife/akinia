"use client";

import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

interface DropdownProps<T> {
  items: T[];
  selected?: string;
  onSelect: (item: T) => void;
  getLabel?: (item: T) => ReactNode;
  placeholder?: string;
  className?: string;
}

export function Dropdown<T>({
  items,
  selected,
  onSelect,
  getLabel = (item) => String(item),
  placeholder = "Select",
  className = "",
}: DropdownProps<T>) {
  const uniqueItems: T[] = [];
  const seen = new Set<string>();

  for (const item of items) {
    const label = String(getLabel(item));
    if (!seen.has(label)) {
      seen.add(label);
      uniqueItems.push(item);
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          className={cn(
            "flex items-center gap-1 text-xs bg-gray-100 px-3 py-2 rounded-lg hover:bg-gray-200 focus:outline-none",
            className
          )}
        >
          <span>{selected || placeholder}</span>
          <ChevronDown className="w-4 h-4" />
        </button>
      </DropdownMenuTrigger>

      <DropdownMenuContent className="bg-white shadow rounded-md py-1 max-h-40 overflow-y-auto z-50">
        <DropdownMenuSeparator className="h-px my-1 bg-gray-200" />
        {uniqueItems.map((item, idx) => (
          <DropdownMenuItem
            key={idx}
            onSelect={() => onSelect(item)}
            className="px-3 py-1.5 text-sm text-muted-foreground cursor-pointer hover:bg-gray-100"
          >
            {getLabel(item)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

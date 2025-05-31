"use client";

import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { ChevronDown, Search } from "lucide-react";

interface SearchInputProps {
  options: string[];
  selected: string;
  onSelect: (value: string) => void;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

export default function SearchInput({
  options,
  selected,
  onSelect,
  value,
  onChange,
  placeholder,
}: SearchInputProps) {
  return (
    <div className="flex items-center px-3 py-2 border rounded-md bg-white w-full max-w-md space-x-3">
      {/* Dropdown */}
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className="flex items-center gap-1 text-sm text-muted-foreground focus:outline-none">
            <span>{selected}</span>
            <ChevronDown className="w-4 h-4" />
          </button>
        </DropdownMenu.Trigger>

        <DropdownMenu.Content className="bg-white shadow rounded-md py-1">
          {options.map((option) => (
            <DropdownMenu.Item
              key={option}
              onSelect={() => onSelect(option)}
              className="px-3 py-1.5 text-sm text-muted-foreground cursor-pointer hover:bg-gray-100"
            >
              {option}
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>

      {/* Separator */}
      <div className="h-5 w-px bg-gray-300" />

      {/* Search */}
      <div className="flex items-center gap-2 flex-1">
        <Search className="w-4 h-4 text-muted-foreground" />
        <input
          type="text"
          value={value}
          onChange={onChange}
          placeholder={placeholder || "Search..."}
          className="w-full outline-none border-none bg-transparent text-sm placeholder:text-muted-foreground"
        />
      </div>
    </div>
  );
}

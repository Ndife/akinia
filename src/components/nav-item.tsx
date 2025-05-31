"use client";

import { iconMap } from "@/components/icon-map";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavItemProps {
  label: string;
  href: string;
  iconName: keyof typeof iconMap;
}

export default function NavItem({ label, href, iconName }: NavItemProps) {
  const pathname = usePathname();
  const Icon = iconMap[iconName];

  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`flex items-center gap-2 px-4 py-2 rounded ${
        isActive ? "bg-[#dfe8ff] text-blue-600" : "text-black hover:bg-[#dfe8ff] hover:text-blue-600"
      }`}
    >
      <Icon className="w-4 h-4" />
      {label}
    </Link>
  );
}

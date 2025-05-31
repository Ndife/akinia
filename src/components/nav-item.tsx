"use client";

import { iconMap } from "@/components/icon-map";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavItemProps {
  label: string;
  href?: string;
  iconName?: keyof typeof iconMap;
  onClick?: () => void;
}

export default function NavItem({ label, href, iconName, onClick }: NavItemProps) {
  const pathname = usePathname();
  const Icon = iconName ? iconMap[iconName] : null;

  const isActive = href && pathname === href;
  const baseClass = `flex items-center gap-2 px-4 py-2 rounded transition-colors ${
    isActive ? "bg-[#dfe8ff] text-blue-600" : "text-black hover:bg-[#dfe8ff] hover:text-blue-600"
  }`;

  const content = (
    <>
      {Icon && <Icon className="w-4 h-4" />}
      {label}
    </>
  );

  if (onClick) {
    return (
      <button onClick={onClick} className={baseClass}>
        {content}
      </button>
    );
  }

  return (
    <Link href={href ?? "#"} className={baseClass}>
      {content}
    </Link>
  );
}

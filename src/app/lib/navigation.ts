import type { NavItemProps } from "@/components/nav-item";;

export const dashboardNav: NavItemProps[] = [
  {
    label: "Home",
    href: "/",
    iconName: "home",
  },
  {
    label: "Companies",
    href: "/companies",
    iconName: "building",
  },
  {
    label: "Investors",
    href: "/investors",
    iconName: "briefcaseBusiness",
  },
];

export const dashboardUnAuthenticated: NavItemProps[] = [
  {
    label: "Features",
    href: "/",
  },
  {
    label: "Pricing",
    href: "/",
  },
  {
    label: "About Us",
    href: "/",
  },
];
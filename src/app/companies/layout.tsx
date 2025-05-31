import SideNavLayout from "@/components/layout/sidenav-layout";

export default function Layout({ children }: { children: React.ReactNode }) {
  return <SideNavLayout>{children}</SideNavLayout>;
}

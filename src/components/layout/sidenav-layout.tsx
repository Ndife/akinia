import { dashboardNav } from "@/app/lib/navigation";
import NavItem from "@/components/nav-item";

export default function SideNavLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="md:flex min-h-screen bg-background text-foreground">
      <aside className="w-64 shrink-0 border-r bg-white p-4 md:block hidden">
        <div className="mb-4 px-2 text-gray-400">Explore</div>
        <nav className="flex flex-col gap-1">
          {dashboardNav.map((item) => (
            <NavItem key={item.href} {...item} />
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}

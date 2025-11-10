import { LayoutDashboard, TrendingUp, Briefcase, Users, Receipt, Settings } from "lucide-react";
import { NavLink } from "@/components/NavLink";

// Navigation items with icons and labels
const navItems = [
  { label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { label: "Managed Portfolios", icon: Briefcase, path: "/portfolios" },
  { label: "Managers", icon: Users, path: "/managers" },
  { label: "Transactions", icon: Receipt, path: "/transactions" },
  { label: "Settings", icon: Settings, path: "/settings" },
];

export const Sidebar = () => {
  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col">
      {/* Logo section */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sidebar-primary rounded-md flex items-center justify-center">
            <TrendingUp className="w-5 h-5 text-sidebar-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-sidebar-foreground">BlueWave Invest</span>
        </div>
      </div>

      {/* Navigation menu */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 px-4 py-3 rounded-lg text-sidebar-foreground/80 hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-smooth"
              activeClassName="bg-sidebar-accent text-sidebar-accent-foreground font-medium"
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </NavLink>
          );
        })}
      </nav>

      {/* Bottom section - could be used for user info or app version */}
      <div className="p-4 border-t border-sidebar-border">
        <div className="text-xs text-sidebar-foreground/60 text-center">
          © 2025 BlueWave Invest
        </div>
      </div>
    </aside>
  );
};

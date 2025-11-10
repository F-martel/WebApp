import { Bell, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

interface TopbarProps {
  pageTitle?: string;
}

export const Topbar = ({ pageTitle = "Dashboard" }: TopbarProps) => {
  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6 shadow-sm">
      {/* Page title */}
      <div>
        <h1 className="text-2xl font-semibold text-foreground">{pageTitle}</h1>
      </div>

      {/* Right section user menu */}
      <div className="flex items-center gap-4">
        {/* User menu */}
        <button className="flex items-center gap-3 hover:bg-muted px-3 py-2 rounded-lg transition-smooth">
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://api.dicebear.com/7.x/avataaars/svg?seed=BlueWave" alt="User" />
            <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
          </Avatar>
          <div className="text-left hidden sm:block">
            <div className="text-sm font-medium text-foreground">John Doe</div>
            <div className="text-xs text-muted-foreground">john@example.com</div>
          </div>
        </button>
      </div>
    </header>
  );
};

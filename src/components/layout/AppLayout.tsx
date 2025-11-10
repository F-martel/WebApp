import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

interface AppLayoutProps {
  children: ReactNode;
  pageTitle?: string;
}

/**
 * Main app layout component
 * Provides the shell structure with sidebar, topbar, and main content area
 */
export const AppLayout = ({ children, pageTitle }: AppLayoutProps) => {
  return (
    <div className="flex min-h-screen w-full bg-background">
      {/* Left sidebar */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <Topbar pageTitle={pageTitle} />

        {/* Main scrollable content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

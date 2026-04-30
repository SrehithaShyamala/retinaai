import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useRouterState } from "@tanstack/react-router";
import { Eye, History, Loader2, LogOut, PlusCircle, User } from "lucide-react";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useMyProfile } from "../hooks/usePatients";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

const navItems = [
  {
    to: "/",
    label: "My Scans",
    icon: History,
    exact: true,
    ocid: "nav.home_link",
  },
  {
    to: "/scan/new",
    label: "New Scan",
    icon: PlusCircle,
    exact: true,
    ocid: "nav.new_scan_link",
  },
  {
    to: "/profile",
    label: "My Profile",
    icon: User,
    exact: true,
    ocid: "nav.profile_link",
  },
];

function NavItem({
  to,
  label,
  icon: Icon,
  exact,
  ocid,
  currentPath,
  mobile,
}: {
  to: string;
  label: string;
  icon: React.ElementType;
  exact: boolean;
  ocid: string;
  currentPath: string;
  mobile?: boolean;
}) {
  const isActive = exact ? currentPath === to : currentPath.startsWith(to);

  if (mobile) {
    return (
      <Link
        to={to}
        data-ocid={ocid}
        className={cn(
          "flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium transition-smooth min-w-[60px]",
          isActive
            ? "text-primary"
            : "text-muted-foreground hover:text-foreground",
        )}
      >
        <Icon
          className={cn(
            "w-5 h-5 flex-shrink-0",
            isActive ? "text-primary" : "",
          )}
        />
        <span>{label}</span>
      </Link>
    );
  }

  return (
    <Link
      to={to}
      data-ocid={ocid}
      className={cn(
        "flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-smooth",
        isActive
          ? "bg-primary/10 text-primary border border-primary/20"
          : "text-muted-foreground hover:text-foreground hover:bg-muted/50",
      )}
    >
      <Icon className="w-4 h-4" />
      {label}
    </Link>
  );
}

export function Layout({ children, title, subtitle, actions }: LayoutProps) {
  const { logout } = useAuth();
  const { data: profile } = useMyProfile();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const [isSigningOut, setIsSigningOut] = useState(false);

  const displayName = profile?.name?.trim() || "My Account";

  const handleLogout = () => {
    setIsSigningOut(true);
    logout();
  };

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Top header */}
      <header
        className="sticky top-0 z-30 flex items-center gap-4 px-4 md:px-6 h-14 bg-card border-b border-border shadow-xs flex-shrink-0"
        data-ocid="layout.header"
      >
        {/* Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 flex-shrink-0 mr-2"
          data-ocid="layout.logo_link"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
            <Eye className="w-4 h-4 text-primary" />
          </div>
          <span className="text-sm font-bold text-foreground hidden sm:block">
            RetinaAI
          </span>
        </Link>

        {/* Page title */}
        <div className="flex-1 min-w-0">
          {title && (
            <h1 className="text-sm font-semibold text-foreground truncate leading-tight">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-xs text-muted-foreground truncate leading-tight">
              {subtitle}
            </p>
          )}
        </div>

        {/* Desktop nav */}
        <nav
          className="hidden md:flex items-center gap-1"
          data-ocid="layout.desktop_nav"
        >
          {navItems.map((item) => (
            <NavItem key={item.to} {...item} currentPath={currentPath} />
          ))}
        </nav>

        {/* Patient name + logout */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {actions}
          <Link
            to="/profile"
            data-ocid="layout.patient_name_link"
            className="hidden lg:flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-smooth bg-muted/40 border border-border px-2.5 py-1.5 rounded-md"
          >
            <User className="w-3 h-3" />
            <span className="max-w-[120px] truncate">{displayName}</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="w-8 h-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10 hidden md:flex"
            onClick={handleLogout}
            disabled={isSigningOut}
            aria-label="Sign out"
            data-ocid="layout.logout_button"
          >
            {isSigningOut ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LogOut className="w-4 h-4" />
            )}
          </Button>
        </div>
      </header>

      {/* Page content — bottom padding on mobile for the bottom nav */}
      <main className="flex-1 bg-background pb-20 md:pb-0">{children}</main>

      {/* Footer */}
      <footer className="px-6 py-3 bg-muted/40 border-t border-border flex-shrink-0 mb-16 md:mb-0">
        <p className="text-xs text-muted-foreground text-center">
          © {new Date().getFullYear()}. Built with love using{" "}
          <a
            href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : "",
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary/70 hover:text-primary transition-smooth underline underline-offset-2"
          >
            caffeine.ai
          </a>
        </p>
      </footer>

      {/* Mobile bottom nav */}
      <nav
        className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-card border-t border-border flex items-center justify-around px-2 py-2"
        data-ocid="layout.mobile_nav"
      >
        {navItems.map((item) => (
          <NavItem key={item.to} {...item} currentPath={currentPath} mobile />
        ))}
        <button
          type="button"
          onClick={handleLogout}
          disabled={isSigningOut}
          data-ocid="layout.mobile_logout_button"
          className="flex flex-col items-center gap-1 px-3 py-2 rounded-lg text-xs font-medium text-muted-foreground hover:text-destructive transition-smooth min-w-[60px] disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Sign out"
        >
          {isSigningOut ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : (
            <LogOut className="w-5 h-5" />
          )}
          <span>{isSigningOut ? "Signing out…" : "Sign Out"}</span>
        </button>
      </nav>
    </div>
  );
}

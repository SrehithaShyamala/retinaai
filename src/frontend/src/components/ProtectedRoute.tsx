import { Navigate, useRouterState } from "@tanstack/react-router";
import { Eye, Loader2 } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { ErrorBoundary } from "./ErrorBoundary";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

function ProtectedRouteInner({ children }: ProtectedRouteProps) {
  const { isAuthenticated, isLoading } = useAuth();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;

  if (isLoading) {
    return (
      <div
        className="flex min-h-screen items-center justify-center bg-background"
        data-ocid="auth.loading_state"
      >
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center">
            <Eye className="w-6 h-6 text-primary animate-pulse" />
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Initializing secure session…</span>
          </div>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Logged-in users visiting /login should be sent to home
  if (currentPath === "/login") {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  return (
    <ErrorBoundary>
      <ProtectedRouteInner>{children}</ProtectedRouteInner>
    </ErrorBoundary>
  );
}

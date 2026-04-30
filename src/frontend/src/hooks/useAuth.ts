import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import { useCallback } from "react";
import { toast } from "sonner";

export function useAuth() {
  const {
    login,
    clear,
    loginStatus,
    identity,
    isAuthenticated,
    isLoggingIn,
    isInitializing,
  } = useInternetIdentity();

  const queryClient = useQueryClient();

  const isLoading = isInitializing || isLoggingIn;

  /**
   * Detect if a backend error is an auth/session-expiry error and handle it.
   * Returns true if the error was an auth error (caller should abort further logic).
   */
  const handleAuthError = useCallback(
    (err: unknown): boolean => {
      if (!err) return false;
      const msg =
        err instanceof Error
          ? err.message.toLowerCase()
          : String(err).toLowerCase();

      const isAuthError =
        msg.includes("access denied") ||
        msg.includes("unauthorized") ||
        msg.includes("not authenticated") ||
        msg.includes("anonymous caller") ||
        msg.includes("session expired") ||
        msg.includes("certificate") ||
        msg.includes("delegation");

      if (isAuthError) {
        toast.error("Session expired", {
          description:
            "Your session has ended. Please log in again to continue.",
          duration: 6000,
          action: {
            label: "Log in",
            onClick: () => {
              queryClient.clear();
              clear();
              window.location.replace("/login");
            },
          },
        });
        return true;
      }
      return false;
    },
    [clear, queryClient],
  );

  /**
   * Logout: wipe all React Query cache first, then clear the Internet Identity
   * session, then hard-redirect to /login.
   *
   * queryClient.clear() removes all cached profile/scan data so stale data
   * never appears after another user logs in on the same device.
   * window.location.replace() is used instead of assign() so the /login page
   * cannot be navigated back to the authenticated view via the browser back button.
   */
  const logout = useCallback(() => {
    toast.info("Signing out…", { duration: 1500 });
    // Small delay so the toast is briefly visible before the page reloads
    setTimeout(() => {
      queryClient.clear();
      clear();
      window.location.replace("/login");
    }, 300);
  }, [clear, queryClient]);

  return {
    identity,
    isAuthenticated,
    isLoading,
    loginStatus,
    login,
    logout,
    principal: identity?.getPrincipal(),
    handleAuthError,
  };
}

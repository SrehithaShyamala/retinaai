import {
  Navigate,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";
import { Suspense, lazy, useEffect } from "react";
import { toast } from "sonner";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { Layout } from "./components/Layout";
import { LoadingSpinner } from "./components/LoadingSpinner";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { SkeletonCard } from "./components/ui/SkeletonCard";
import Login from "./pages/Login";

// Lazy-loaded pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const HealthProfile = lazy(() => import("./pages/HealthProfile"));
const Upload = lazy(() => import("./pages/Upload"));
const ScanDetail = lazy(() => import("./pages/ScanDetail"));
const ScanResultPublic = lazy(() => import("./pages/ScanResultPublic"));
const SharedResult = lazy(() => import("./pages/SharedResult"));

function PageLoader() {
  return (
    <div className="p-6 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
      <SkeletonCard />
      <SkeletonCard />
      <SkeletonCard />
    </div>
  );
}

// Global unhandled promise rejection handler (set up once outside the component)
if (typeof window !== "undefined") {
  window.addEventListener("unhandledrejection", (event) => {
    console.error("[App] Unhandled promise rejection:", event.reason);
    // Prevent the default browser error for known benign cases
    const msg =
      event.reason instanceof Error
        ? event.reason.message
        : String(event.reason ?? "");

    // Don't surface navigation abortions or cancelled fetches
    const isBenign =
      msg.includes("AbortError") ||
      msg.includes("NavigationAborted") ||
      msg === "" ||
      msg === "undefined";

    if (!isBenign) {
      toast.error("An unexpected error occurred", {
        description: "Please refresh the page if things look broken.",
        duration: 6000,
      });
    }
  });
}

// Root route
const rootRoute = createRootRoute({
  component: () => <Outlet />,
});

// Login route (public)
const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: Login,
});

// Public shared scan result — accessible without login
const sharedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/shared/$token",
  component: () => (
    <ErrorBoundary>
      <Suspense
        fallback={
          <LoadingSpinner
            branded
            size="lg"
            label="Loading shared result…"
            className="min-h-screen"
          />
        }
      >
        <SharedResult />
      </Suspense>
    </ErrorBoundary>
  ),
});

const shareRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/share/$scanId",
  component: () => (
    <ErrorBoundary>
      <Suspense
        fallback={
          <LoadingSpinner
            branded
            size="lg"
            label="Loading result…"
            className="min-h-screen"
          />
        }
      >
        <ScanResultPublic />
      </Suspense>
    </ErrorBoundary>
  ),
});

// Protected layout wrapper
function ProtectedLayout() {
  return (
    <ProtectedRoute>
      <Outlet />
    </ProtectedRoute>
  );
}

const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: "protected",
  component: ProtectedLayout,
});

// Dashboard / My Scans (home)
const dashboardRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/",
  component: () => (
    <Layout title="My Scans" subtitle="Your retinal screening history">
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Dashboard />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  ),
});

// New scan upload + immediate AI results
const newScanRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/upload",
  component: () => (
    <Layout
      title="New Screening"
      subtitle="Upload your fundus image for AI analysis"
    >
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Upload />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  ),
});

// New scan — legacy path
const newScanLegacyRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/scan/new",
  component: () => (
    <Layout
      title="New Screening"
      subtitle="Upload your fundus image for AI analysis"
    >
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <Upload />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  ),
});

// Scan detail / result
const scanRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/scan/$scanId",
  component: () => (
    <Layout
      title="Screening Result"
      subtitle="Your AI-powered diabetic retinopathy analysis"
    >
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <ScanDetail />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  ),
});

// Health profile
const profileRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: "/profile",
  component: () => (
    <Layout title="My Profile" subtitle="Manage your health details">
      <ErrorBoundary>
        <Suspense fallback={<PageLoader />}>
          <HealthProfile />
        </Suspense>
      </ErrorBoundary>
    </Layout>
  ),
});

// Catch-all redirect
const catchAllRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: () => <Navigate to="/login" />,
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  sharedRoute,
  shareRoute,
  protectedRoute.addChildren([
    dashboardRoute,
    newScanRoute,
    newScanLegacyRoute,
    scanRoute,
    profileRoute,
  ]),
  catchAllRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

// Root wrapper with global error boundary
function AppRoot() {
  // Clear stale toast/state on mount
  useEffect(() => {
    // Any global initialization can go here
  }, []);

  return <RouterProvider router={router} />;
}

export default function App() {
  return (
    <ErrorBoundary>
      <AppRoot />
    </ErrorBoundary>
  );
}

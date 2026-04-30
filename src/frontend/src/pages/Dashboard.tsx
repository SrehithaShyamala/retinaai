import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  Activity,
  AlertCircle,
  ArrowRight,
  CalendarDays,
  Eye,
  PlusCircle,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import { motion } from "motion/react";
import { useEffect } from "react";
import type { ScanRecord } from "../backend";
import { DRStage, RiskLevel } from "../backend";
import { ProfileSummary } from "../components/ProfileSummary";
import { useAuth } from "../hooks/useAuth";
import { useMyProfile, useMyScans } from "../hooks/usePatients";

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatDate(nanoseconds: bigint): string {
  return new Date(Number(nanoseconds) / 1_000_000).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function getRiskStyle(risk: RiskLevel): string {
  if (risk === RiskLevel.High)
    return "text-red-400 bg-red-500/10 border-red-500/30";
  if (risk === RiskLevel.Moderate)
    return "text-orange-400 bg-orange-500/10 border-orange-500/30";
  return "text-green-400 bg-green-500/10 border-green-500/30";
}

function getRiskIcon(risk: RiskLevel | null) {
  if (risk === RiskLevel.High) return <AlertCircle className="w-4 h-4" />;
  if (risk === RiskLevel.Moderate) return <TrendingUp className="w-4 h-4" />;
  return <ShieldCheck className="w-4 h-4" />;
}

function getRiskMessage(risk: RiskLevel | null): string {
  if (risk === RiskLevel.High) return "Please see an eye specialist soon.";
  if (risk === RiskLevel.Moderate)
    return "Continue monitoring — book a check-up.";
  return "Keep it up! Your eyes are looking healthy.";
}

const DR_STAGE_SHORT: Record<DRStage, string> = {
  [DRStage.NoRetinopathy]: "No DR",
  [DRStage.Mild]: "Mild DR",
  [DRStage.Moderate]: "Moderate DR",
  [DRStage.Severe]: "Severe DR",
  [DRStage.Proliferative]: "Proliferative DR",
};

const DR_STAGE_COLORS: Record<DRStage, string> = {
  [DRStage.NoRetinopathy]: "text-green-400 bg-green-500/15 border-green-500/30",
  [DRStage.Mild]: "text-yellow-400 bg-yellow-500/15 border-yellow-500/30",
  [DRStage.Moderate]: "text-orange-400 bg-orange-500/15 border-orange-500/30",
  [DRStage.Severe]: "text-red-400 bg-red-500/15 border-red-500/30",
  [DRStage.Proliferative]: "text-red-300 bg-red-700/20 border-red-600/40",
};

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyScansState() {
  return (
    <motion.div
      data-ocid="dashboard.empty_state"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="flex flex-col items-center justify-center py-20 px-6 text-center"
    >
      <div className="w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6">
        <Eye size={36} className="text-primary" />
      </div>
      <h3 className="text-xl font-display font-bold text-foreground mb-2">
        No scans yet — let's get started!
      </h3>
      <p className="text-muted-foreground text-base max-w-sm mb-8 leading-relaxed">
        Upload a photo of your eye and our AI will check it for signs of
        diabetic retinopathy in seconds.
      </p>
      <Button
        asChild
        size="lg"
        className="gap-2 text-base px-8"
        data-ocid="dashboard.empty_state.upload_button"
      >
        <Link to="/upload">
          <PlusCircle className="w-5 h-5" />
          Upload Your First Scan
        </Link>
      </Button>
    </motion.div>
  );
}

// ─── Scan Stats Strip ─────────────────────────────────────────────────────────

function ScanStats({
  scans,
  latestStage,
  overallRisk,
}: {
  scans: ScanRecord[];
  latestStage: DRStage | null;
  overallRisk: RiskLevel | null;
}) {
  return (
    <motion.div
      data-ocid="dashboard.stats"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      className="grid grid-cols-3 gap-3"
    >
      <div
        data-ocid="dashboard.total_scans_card"
        className="rounded-2xl border bg-card p-5 flex flex-col gap-2"
      >
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground font-medium">
            Total Scans
          </p>
          <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
            <Activity className="w-4 h-4 text-primary" />
          </div>
        </div>
        <p className="text-3xl font-bold font-mono text-foreground leading-none">
          {scans.length}
        </p>
      </div>

      <div
        data-ocid="dashboard.latest_stage_card"
        className="rounded-2xl border bg-card p-5 flex flex-col gap-2"
      >
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground font-medium">
            Latest Result
          </p>
          <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center">
            <Eye className="w-4 h-4 text-primary" />
          </div>
        </div>
        {latestStage !== null ? (
          <span
            className={cn(
              "inline-flex items-center rounded-full text-xs font-semibold border px-2 py-0.5 w-fit",
              DR_STAGE_COLORS[latestStage],
            )}
          >
            {DR_STAGE_SHORT[latestStage]}
          </span>
        ) : (
          <span className="text-xs text-muted-foreground">Pending</span>
        )}
      </div>

      <div
        data-ocid="dashboard.risk_level_card"
        className={cn(
          "rounded-2xl border p-5 flex flex-col gap-2",
          overallRisk === RiskLevel.High
            ? "border-red-500/30 bg-red-500/5"
            : overallRisk === RiskLevel.Moderate
              ? "border-orange-500/30 bg-orange-500/5"
              : "border-green-500/20 bg-green-500/5",
        )}
      >
        <div className="flex items-center justify-between">
          <p className="text-xs text-muted-foreground font-medium">
            Risk Level
          </p>
          <div className="w-8 h-8 rounded-xl bg-card flex items-center justify-center">
            {getRiskIcon(overallRisk)}
          </div>
        </div>
        <div className="space-y-1">
          <p
            className={cn(
              "text-xl font-bold font-display",
              overallRisk === RiskLevel.High
                ? "text-red-400"
                : overallRisk === RiskLevel.Moderate
                  ? "text-orange-400"
                  : "text-green-400",
            )}
          >
            {overallRisk ?? "—"}
          </p>
          <p className="text-xs text-muted-foreground leading-snug">
            {getRiskMessage(overallRisk)}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

// ─── Scan Row ─────────────────────────────────────────────────────────────────

function ScanRow({ scan, index }: { scan: ScanRecord; index: number }) {
  const navigate = useNavigate();
  const risk = scan.result?.riskLevel ?? null;
  const stage = scan.result?.stage ?? null;

  return (
    <motion.div
      data-ocid={`dashboard.scan_item.${index + 1}`}
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.06 }}
      onClick={() =>
        void navigate({
          to: "/scan/$scanId",
          params: { scanId: String(scan.id) },
        })
      }
      className="group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-5 py-4 border-b border-border/60 last:border-b-0 hover:bg-muted/20 cursor-pointer transition-smooth"
    >
      <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono w-28 flex-shrink-0">
        <CalendarDays size={13} />
        {formatDate(scan.uploadedAt)}
      </div>

      <div className="flex items-center gap-3 flex-1 min-w-0">
        {stage !== null ? (
          <span
            className={cn(
              "inline-flex items-center rounded-full text-xs font-semibold border px-2.5 py-0.5",
              DR_STAGE_COLORS[stage],
            )}
          >
            {DR_STAGE_SHORT[stage]}
          </span>
        ) : (
          <Badge variant="outline" className="text-xs text-muted-foreground">
            Pending analysis
          </Badge>
        )}
      </div>

      <div className="flex items-center gap-3 flex-shrink-0">
        {risk && (
          <span
            className={cn(
              "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border",
              getRiskStyle(risk),
            )}
          >
            {getRiskIcon(risk)}
            {risk} Risk
          </span>
        )}
        <Button
          asChild
          variant="ghost"
          size="sm"
          data-ocid={`dashboard.scan_view_button.${index + 1}`}
          className="h-7 px-2 text-xs text-primary hover:text-primary hover:bg-primary/10 gap-1"
          onClick={(e) => e.stopPropagation()}
        >
          <Link to="/scan/$scanId" params={{ scanId: String(scan.id) }}>
            View <ArrowRight size={11} />
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}

// ─── Loading Skeleton ─────────────────────────────────────────────────────────

function DashboardSkeleton() {
  return (
    <div
      className="p-4 sm:p-6 space-y-6 max-w-3xl mx-auto"
      data-ocid="dashboard.loading_state"
    >
      <Skeleton className="h-28 rounded-2xl" />
      <Skeleton className="h-20 rounded-2xl" />
      <div className="grid grid-cols-3 gap-3">
        <Skeleton className="h-24 rounded-2xl" />
        <Skeleton className="h-24 rounded-2xl" />
        <Skeleton className="h-24 rounded-2xl" />
      </div>
      <div className="rounded-2xl border border-border bg-card overflow-hidden">
        {[1, 2, 3].map((i) => (
          <div key={i} className="px-5 py-4 border-b border-border/60">
            <Skeleton className="h-8 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main Dashboard ───────────────────────────────────────────────────────────

export default function Dashboard() {
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { data: profile, isLoading: profileLoading } = useMyProfile();
  const { data: myScans, isLoading: scansLoading } = useMyScans();

  const isLoading = authLoading || profileLoading || scansLoading;
  // Validate scans is a real array before using it
  const scans: ScanRecord[] = Array.isArray(myScans)
    ? (myScans as ScanRecord[])
    : [];

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      void navigate({ to: "/login" });
    }
  }, [authLoading, isAuthenticated, navigate]);

  useEffect(() => {
    if (
      !profileLoading &&
      !authLoading &&
      isAuthenticated &&
      profile === null
    ) {
      void navigate({ to: "/profile" });
    }
  }, [profileLoading, authLoading, isAuthenticated, profile, navigate]);

  if (isLoading) return <DashboardSkeleton />;
  if (!isAuthenticated) return null;

  const latestScan = scans[0];
  const latestStage = latestScan?.result?.stage ?? null;
  const overallRisk = latestScan?.result?.riskLevel ?? null;

  return (
    <div
      className="p-4 sm:p-6 space-y-6 max-w-3xl mx-auto"
      data-ocid="dashboard.page"
    >
      {/* Welcome + Upload CTA banner */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 p-6"
        data-ocid="dashboard.welcome_banner"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-display font-bold text-foreground">
              {profile?.name
                ? `Welcome back, ${profile.name} 👋`
                : "Welcome back 👋"}
            </h1>
            <p className="text-muted-foreground mt-1 text-base leading-relaxed">
              {scans.length > 0
                ? `You have ${scans.length} eye scan${scans.length !== 1 ? "s" : ""} on record.`
                : "Ready for your first eye scan? It only takes a minute."}
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="gap-2 flex-shrink-0 text-base"
            data-ocid="dashboard.upload_scan_button"
          >
            <Link to="/upload">
              <PlusCircle className="w-5 h-5" />
              Upload New Scan
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Patient health profile summary card */}
      {profile && <ProfileSummary profile={profile} />}

      <Separator className="bg-border/50" />

      {/* Stats — only shown when scans exist */}
      {scans.length > 0 && (
        <ScanStats
          scans={scans}
          latestStage={latestStage}
          overallRisk={overallRisk}
        />
      )}

      {/* Scan history list */}
      <motion.section
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="rounded-2xl border border-border bg-card overflow-hidden"
        data-ocid="dashboard.history_section"
        aria-label="Your scan history"
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-muted/20">
          <div className="flex items-center gap-2">
            <CalendarDays size={15} className="text-primary" />
            <h2 className="text-sm font-semibold text-foreground">
              Your Scan History
            </h2>
            {scans.length > 0 && (
              <span className="ml-1 px-2 py-0.5 rounded-full bg-primary/15 text-primary text-xs font-mono">
                {scans.length}
              </span>
            )}
          </div>
          <Button
            asChild
            variant="outline"
            size="sm"
            className="text-xs gap-1.5"
            data-ocid="dashboard.history_new_scan_button"
          >
            <Link to="/upload">
              <PlusCircle className="w-3.5 h-3.5" /> New Scan
            </Link>
          </Button>
        </div>

        {scans.length === 0 ? (
          <EmptyScansState />
        ) : (
          <div data-ocid="dashboard.scan_list">
            {scans.map((scan, idx) => (
              <ScanRow
                key={`scan-${String(scan.id)}`}
                scan={scan}
                index={idx}
              />
            ))}
          </div>
        )}
      </motion.section>

      {/* FAB for mobile */}
      {scans.length > 0 && (
        <div className="fixed bottom-6 right-6 z-50 sm:hidden">
          <Button
            asChild
            size="lg"
            className="rounded-full w-14 h-14 p-0 shadow-lg"
            data-ocid="dashboard.fab_upload_button"
            aria-label="Upload a new scan"
          >
            <Link to="/upload">
              <PlusCircle className="w-6 h-6" />
            </Link>
          </Button>
        </div>
      )}
    </div>
  );
}

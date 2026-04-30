import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "@tanstack/react-router";
import {
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  ShieldAlert,
} from "lucide-react";
import type { ClassificationResult, SharedScanView } from "../backend.d";
import { useBackend } from "../hooks/useBackend";

// ─── DR stage helpers ─────────────────────────────────────────────────────────

const STAGE_LABELS: Record<string, string> = {
  NoRetinopathy: "No Diabetic Retinopathy",
  Mild: "Mild Diabetic Retinopathy",
  Moderate: "Moderate Diabetic Retinopathy",
  Severe: "Severe Diabetic Retinopathy",
  Proliferative: "Proliferative Diabetic Retinopathy",
};

const STAGE_DESCRIPTIONS: Record<string, string> = {
  NoRetinopathy:
    "Great news — no signs of diabetic retinopathy were found in your eye scan. Keep up with regular screenings to stay on top of your eye health.",
  Mild: "Early, small changes are present in the blood vessels of your eye. Continue monitoring and maintain good blood sugar control. Speak with your doctor at your next visit.",
  Moderate:
    "Noticeable changes in your eye's blood vessels are present. We recommend scheduling an eye specialist appointment for a full evaluation.",
  Severe:
    "Significant changes have been detected in your retina. Please see an eye specialist as soon as possible to prevent further vision loss.",
  Proliferative:
    "Advanced retinal changes are detected. Urgent eye care is strongly recommended — please see an eye specialist as soon as possible.",
};

const STAGE_ORDER = [
  "NoRetinopathy",
  "Mild",
  "Moderate",
  "Severe",
  "Proliferative",
];

function getStageIndex(stage: string): number {
  return STAGE_ORDER.indexOf(stage);
}

// ─── Risk level helpers ───────────────────────────────────────────────────────

const RISK_CONFIG: Record<
  string,
  {
    label: string;
    headline: string;
    badgeClass: string;
    bannerBg: string;
    bannerBorder: string;
    textClass: string;
    icon: React.ElementType;
  }
> = {
  Low: {
    label: "Low Risk",
    headline: "No significant signs detected",
    badgeClass: "border-green-500/40 bg-green-500/10 text-green-400",
    bannerBg: "bg-green-500/10",
    bannerBorder: "border-green-500/25",
    textClass: "text-green-400",
    icon: CheckCircle,
  },
  Moderate: {
    label: "Moderate Risk",
    headline: "Some early signs detected",
    badgeClass: "border-yellow-500/40 bg-yellow-500/10 text-yellow-400",
    bannerBg: "bg-yellow-500/10",
    bannerBorder: "border-yellow-500/25",
    textClass: "text-yellow-400",
    icon: Clock,
  },
  High: {
    label: "High Risk",
    headline: "Significant signs detected",
    badgeClass: "border-red-500/40 bg-red-500/10 text-red-400",
    bannerBg: "bg-red-500/10",
    bannerBorder: "border-red-500/25",
    textClass: "text-red-400",
    icon: AlertTriangle,
  },
};

// ─── Safe field extractors ─────────────────────────────────────────────────────

/**
 * Safely extracts a string stage key from a ClassificationResult.
 * The backend might return an enum string ("NoRetinopathy") or a Motoko variant object.
 */
function extractStage(
  result: ClassificationResult | null | undefined,
): string | null {
  if (!result) return null;
  const raw: unknown = result.stage;
  if (!raw) return null;
  if (typeof raw === "string") return raw;
  if (typeof raw === "object") {
    // Motoko variant shape: { NoRetinopathy: null } etc.
    const keys = Object.keys(raw as object);
    if (keys.length > 0 && keys[0]) return keys[0];
  }
  return null;
}

/**
 * Safely extracts a string risk level key from a ClassificationResult.
 */
function extractRiskLevel(
  result: ClassificationResult | null | undefined,
): string | null {
  if (!result) return null;
  const raw: unknown = result.riskLevel;
  if (!raw) return null;
  if (typeof raw === "string") return raw;
  if (typeof raw === "object") {
    const keys = Object.keys(raw as object);
    if (keys.length > 0 && keys[0]) return keys[0];
  }
  return null;
}

/**
 * Safely extracts confidence as a number between 0 and 1.
 */
function extractConfidence(
  result: ClassificationResult | null | undefined,
): number {
  if (!result) return 0;
  const raw = result.confidence;
  if (typeof raw === "number") return Math.max(0, Math.min(1, raw));
  return 0;
}

/**
 * Safely extracts the heatmap URL from the scan or its result.
 */
function extractHeatmapUrl(scan: SharedScanView | null): string | null {
  if (!scan) return null;
  // Try from typed result first
  const heatmap = scan.result?.heatmapImageUrl;
  if (typeof heatmap === "string" && heatmap) return heatmap;
  // Try top-level as fallback (some backend versions put it there)
  const scanAny = scan as unknown as Record<string, unknown>;
  if (typeof scanAny.heatmapImageUrl === "string")
    return scanAny.heatmapImageUrl as string;
  return null;
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function SharedResultSkeleton() {
  return (
    <div
      className="flex flex-col gap-5 max-w-2xl mx-auto p-4 sm:p-6"
      data-ocid="share.loading_state"
    >
      <Skeleton className="h-12 rounded-xl" />
      <Skeleton className="h-20 rounded-xl" />
      <Skeleton className="aspect-square rounded-xl" />
      <Skeleton className="h-28 rounded-xl" />
    </div>
  );
}

// ─── Hook: fetch shared scan by token ────────────────────────────────────────

function useSharedScan(token: string) {
  const { backend, isReady } = useBackend();

  return useQuery<SharedScanView | null>({
    queryKey: ["sharedScan", token],
    queryFn: async () => {
      if (!backend || !token) return null;
      try {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const result = await (backend as any).getSharedScan(token);
        if (result === undefined || result === null) return null;
        if (typeof result === "object" && "__kind__" in result) {
          return result.__kind__ === "Some"
            ? (result.value as SharedScanView)
            : null;
        }
        return result as SharedScanView;
      } catch (err) {
        console.error("[SharedResult] getSharedScan error:", err);
        return null;
      }
    },
    enabled: isReady && !!token,
    staleTime: 120_000,
    retry: 1,
  });
}

// ─── Main public page ─────────────────────────────────────────────────────────

export default function SharedResult() {
  const params = useParams({ strict: false }) as { token?: string };
  const token = params.token ?? "";

  const { data: sharedScan, isLoading } = useSharedScan(token);

  if (isLoading) {
    return <SharedResultSkeleton />;
  }

  // Invalid / expired token
  if (!sharedScan) {
    return (
      <div
        className="min-h-screen bg-background flex items-center justify-center p-6"
        data-ocid="share.error_state"
      >
        <div className="flex flex-col items-center gap-5 max-w-sm text-center">
          <div className="w-16 h-16 rounded-2xl bg-destructive/10 border border-destructive/25 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          <div>
            <p className="font-bold text-foreground text-lg mb-2">
              This link is no longer available
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              This result link is no longer available or has expired. The
              patient may have removed access to this scan.
            </p>
          </div>
          <Button asChild variant="outline" data-ocid="share.home_link">
            <Link to="/login">Screen yourself at RetinaAI</Link>
          </Button>
        </div>
      </div>
    );
  }

  // Safe extraction of all fields — using typed ClassificationResult
  const resultRaw: ClassificationResult | null = sharedScan.result ?? null;

  const stage = extractStage(resultRaw);
  const riskLevel = extractRiskLevel(resultRaw);
  const confidence = extractConfidence(resultRaw);
  const heatmapImageUrl = extractHeatmapUrl(sharedScan);

  const riskCfg = riskLevel ? (RISK_CONFIG[riskLevel] ?? null) : null;
  const RiskIcon = riskCfg?.icon ?? Clock;

  const scanDate =
    sharedScan.uploadedAt !== undefined && sharedScan.uploadedAt !== null
      ? new Date(Number(sharedScan.uploadedAt) / 1_000_000).toLocaleDateString(
          "en-US",
          {
            year: "numeric",
            month: "long",
            day: "numeric",
          },
        )
      : "—";

  return (
    <div className="min-h-screen bg-background">
      {/* Public header */}
      <header className="bg-card border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center">
            <Eye className="w-4 h-4 text-primary" />
          </div>
          <span className="font-bold text-foreground text-sm">RetinaAI</span>
          <span className="text-xs text-muted-foreground hidden sm:block">
            — Shared Screening Result
          </span>
        </div>
        <Link
          to="/login"
          className="text-xs text-primary hover:text-primary/80 font-medium underline underline-offset-2 transition-smooth"
          data-ocid="share.login_link"
        >
          Screen yourself free
        </Link>
      </header>

      <main
        className="max-w-2xl mx-auto p-4 sm:p-6 flex flex-col gap-5 pb-10"
        data-ocid="share.page"
      >
        {/* Scan metadata */}
        <div
          className="rounded-2xl border border-border bg-card px-5 py-4"
          data-ocid="share.meta_card"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="font-bold text-foreground text-xl font-display leading-tight">
                Retinal Screening Result
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-1.5 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                  <span data-ocid="share.scan_date">{scanDate}</span>
                </span>
              </div>
            </div>
            {riskLevel && riskCfg && (
              <Badge
                variant="outline"
                className={cn(
                  "text-sm px-3 py-1 font-semibold border",
                  riskCfg.badgeClass,
                )}
                data-ocid="share.risk_badge"
              >
                {riskCfg.label}
              </Badge>
            )}
          </div>
        </div>

        {/* Risk summary banner */}
        {riskLevel && riskCfg && (
          <div
            className={cn(
              "rounded-2xl border px-5 py-4 flex items-start gap-4",
              riskCfg.bannerBorder,
              riskCfg.bannerBg,
            )}
            data-ocid="share.risk_banner"
          >
            <div
              className={cn(
                "flex-shrink-0 w-10 h-10 rounded-lg border flex items-center justify-center",
                riskCfg.bannerBorder,
                riskCfg.bannerBg,
              )}
            >
              <RiskIcon className={cn("w-5 h-5", riskCfg.textClass)} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className={cn("font-bold text-base mb-1", riskCfg.textClass)}>
                {riskCfg.headline}
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                This is an AI-assisted screening result. It is not a medical
                diagnosis. Always consult a licensed eye specialist for a full
                evaluation.
              </p>
            </div>
          </div>
        )}

        {/* Scan image with result */}
        {stage && resultRaw && heatmapImageUrl && (
          <div className="rounded-2xl border border-border bg-card overflow-hidden">
            <div className="relative aspect-square bg-black overflow-hidden">
              <img
                src={heatmapImageUrl}
                alt="Retinal scan heatmap"
                className="w-full h-full object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none";
                }}
              />
            </div>
            <div className="px-4 py-2 border-b border-border bg-muted/30">
              <p className="text-xs text-muted-foreground font-medium">
                Retinal scan heatmap — AI-highlighted regions of interest
              </p>
            </div>
            <div className="p-4 space-y-3">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs text-muted-foreground mb-0.5">
                    Finding
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    {STAGE_LABELS[stage] ?? stage}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-muted-foreground mb-0.5">
                    AI Confidence
                  </p>
                  <p className="text-base font-mono font-bold text-foreground tabular-nums">
                    {(confidence * 100).toFixed(1)}%
                  </p>
                </div>
              </div>
              <div>
                <div className="flex gap-1" role="presentation">
                  {STAGE_ORDER.map((s, i) => {
                    const stageIndex = getStageIndex(stage);
                    return (
                      <div
                        key={s}
                        className={cn(
                          "h-1.5 flex-1 rounded-full transition-smooth",
                          i === 0 && "bg-green-500",
                          i === 1 && "bg-yellow-500",
                          i === 2 && "bg-orange-500",
                          i === 3 && "bg-red-500",
                          i === 4 && "bg-red-700",
                          i < stageIndex && "opacity-35",
                          i === stageIndex && "opacity-100",
                          i > stageIndex && "opacity-15",
                        )}
                        title={STAGE_LABELS[s] ?? s}
                      />
                    );
                  })}
                </div>
                <div className="flex justify-between text-xs text-muted-foreground mt-1">
                  <span>No DR</span>
                  <span>Proliferative</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed border-t border-border pt-3">
                {STAGE_DESCRIPTIONS[stage] ??
                  "Please consult an eye specialist for a full evaluation."}
              </p>
            </div>
          </div>
        )}

        {/* No image fallback — show result without heatmap */}
        {stage && resultRaw && !heatmapImageUrl && (
          <div className="rounded-2xl border border-border bg-card p-6 space-y-3">
            <div className="flex items-center gap-3">
              <Eye className="w-5 h-5 text-primary" />
              <p className="text-sm font-semibold text-foreground">
                {STAGE_LABELS[stage] ?? stage}
              </p>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {STAGE_DESCRIPTIONS[stage] ??
                "Please consult an eye specialist for a full evaluation."}
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <span>AI Confidence:</span>
              <span className="font-mono font-bold text-foreground">
                {(confidence * 100).toFixed(1)}%
              </span>
            </div>
          </div>
        )}

        {/* No result yet */}
        {!resultRaw && (
          <div
            className="rounded-2xl border border-border bg-card p-6 text-center"
            data-ocid="share.pending_state"
          >
            <Clock className="w-8 h-8 text-muted-foreground mx-auto mb-3" />
            <p className="text-sm font-semibold text-foreground mb-1">
              Analysis Pending
            </p>
            <p className="text-xs text-muted-foreground">
              The AI classification for this scan is still being processed.
            </p>
          </div>
        )}

        {/* Disclaimer */}
        <div
          className="rounded-2xl border border-yellow-500/25 bg-yellow-500/10 px-5 py-4 flex gap-3"
          data-ocid="share.disclaimer"
        >
          <ShieldAlert
            className="w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div className="text-sm text-foreground/80 leading-relaxed">
            <strong className="font-semibold block mb-0.5 text-foreground">
              Important disclaimer
            </strong>
            This is a shared result — not a substitute for professional medical
            advice. This AI-based screening tool helps identify potential signs
            of diabetic retinopathy. Always follow up with a licensed eye
            specialist for a full evaluation and treatment plan.
          </div>
        </div>

        {/* CTA to sign up */}
        <div
          className="rounded-2xl border border-primary/25 bg-primary/10 px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
          data-ocid="share.cta_panel"
        >
          <div>
            <p className="font-semibold text-foreground text-sm mb-0.5">
              Want to screen your own eyes?
            </p>
            <p className="text-xs text-muted-foreground">
              RetinaAI lets you upload your own fundus images and get instant
              AI-powered results — for free.
            </p>
          </div>
          <Button
            asChild
            className="flex-shrink-0"
            data-ocid="share.cta_button"
          >
            <Link to="/login">Screen yourself at RetinaAI</Link>
          </Button>
        </div>

        {/* Footer */}
        <footer className="text-center pt-2">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} RetinaAI. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
                typeof window !== "undefined" ? window.location.hostname : "",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary/70 hover:text-primary underline underline-offset-2 transition-smooth"
            >
              caffeine.ai
            </a>
          </p>
        </footer>
      </main>
    </div>
  );
}

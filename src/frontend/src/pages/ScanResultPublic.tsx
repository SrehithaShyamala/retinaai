import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Link, useParams } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  EyeOff,
  FileText,
  ShieldAlert,
} from "lucide-react";
import { useState } from "react";
import type { ScanRecord } from "../backend";
import { DRStage, RiskLevel } from "../backend";
import { useScanPublic } from "../hooks/usePatients";

// ─── DR labels ─────────────────────────────────────────────────────────────────

const DR_LABEL: Record<DRStage, string> = {
  [DRStage.NoRetinopathy]: "No Diabetic Retinopathy",
  [DRStage.Mild]: "Mild Diabetic Retinopathy",
  [DRStage.Moderate]: "Moderate Diabetic Retinopathy",
  [DRStage.Severe]: "Severe Diabetic Retinopathy",
  [DRStage.Proliferative]: "Proliferative Diabetic Retinopathy",
};

const DR_DESCRIPTION: Record<DRStage, string> = {
  [DRStage.NoRetinopathy]:
    "No signs of diabetic retinopathy were found. Keep up regular check-ups.",
  [DRStage.Mild]:
    "Early changes are present. Maintain good blood sugar control.",
  [DRStage.Moderate]:
    "Changes in blood vessels detected. Further medical attention is recommended.",
  [DRStage.Severe]:
    "Significant changes detected. Please see an eye specialist soon.",
  [DRStage.Proliferative]:
    "Advanced retinal changes. Urgent eye care is strongly recommended.",
};

// ─── Risk config ──────────────────────────────────────────────────────────────

const RISK_CONFIG: Record<
  RiskLevel,
  {
    headline: string;
    textClass: string;
    borderClass: string;
    bgClass: string;
    badgeClass: string;
    icon: React.ElementType;
  }
> = {
  [RiskLevel.Low]: {
    headline: "No significant signs detected",
    textClass: "text-green-400",
    borderClass: "border-green-500/30",
    bgClass: "bg-green-500/10",
    badgeClass: "border-green-500/40 text-green-400 bg-green-500/10",
    icon: CheckCircle,
  },
  [RiskLevel.Moderate]: {
    headline: "Some early signs detected",
    textClass: "text-yellow-400",
    borderClass: "border-yellow-500/30",
    bgClass: "bg-yellow-500/10",
    badgeClass: "border-yellow-500/40 text-yellow-400 bg-yellow-500/10",
    icon: Clock,
  },
  [RiskLevel.High]: {
    headline: "Significant signs detected",
    textClass: "text-red-400",
    borderClass: "border-red-500/40",
    bgClass: "bg-red-500/10",
    badgeClass: "border-red-500/40 text-red-400 bg-red-500/10",
    icon: AlertTriangle,
  },
};

// ─── Image card ───────────────────────────────────────────────────────────────

function PublicImageCard({
  imageUrl,
  heatmapUrl,
  stage,
  confidence,
}: {
  imageUrl?: string;
  heatmapUrl?: string;
  stage?: DRStage;
  confidence?: number;
}) {
  const [showHeatmap, setShowHeatmap] = useState(false);
  const confidencePct =
    confidence !== undefined ? (confidence * 100).toFixed(1) : null;

  return (
    <div
      className="rounded-2xl border border-border bg-card overflow-hidden"
      data-ocid="share.image_card"
    >
      <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-b border-border">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-primary" aria-hidden="true" />
          <span className="font-semibold text-foreground text-sm">
            Retinal Scan
          </span>
        </div>
        {stage !== undefined && (
          <span className="text-xs text-muted-foreground font-medium bg-muted/50 border border-border rounded-full px-2 py-0.5">
            {DR_LABEL[stage]}
          </span>
        )}
      </div>

      <div className="relative aspect-square bg-black/60 overflow-hidden">
        {imageUrl ? (
          <>
            <img
              src={imageUrl}
              alt="Retinal scan"
              className="w-full h-full object-contain"
            />
            {showHeatmap && heatmapUrl && (
              <img
                src={heatmapUrl}
                alt="AI analysis overlay showing affected areas"
                className="heatmap-overlay absolute inset-0 w-full h-full object-contain pointer-events-none"
              />
            )}
          </>
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-muted-foreground p-8">
            <Eye className="w-12 h-12 opacity-20" aria-hidden="true" />
            <span className="text-sm text-center">
              No scan image available.
            </span>
          </div>
        )}
      </div>

      {heatmapUrl && (
        <div className="flex justify-end px-4 py-2 border-b border-border bg-muted/20">
          <button
            type="button"
            onClick={() => setShowHeatmap((v) => !v)}
            className="flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 font-medium transition-smooth"
            data-ocid="share.heatmap_toggle"
          >
            {showHeatmap ? (
              <>
                <EyeOff className="w-3 h-3" /> Hide AI Highlight
              </>
            ) : (
              <>
                <Eye className="w-3 h-3" /> Show AI Highlight
              </>
            )}
          </button>
        </div>
      )}

      {stage !== undefined && (
        <div className="px-4 py-3 bg-card">
          <div className="flex items-center justify-between gap-2 mb-2">
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">Diagnosis</p>
              <p className="font-bold text-foreground text-sm">
                {DR_LABEL[stage]}
              </p>
            </div>
            {confidencePct && (
              <div className="text-right">
                <p className="text-xs text-muted-foreground mb-0.5">
                  AI Confidence
                </p>
                <p className="font-mono font-bold text-foreground text-base tabular-nums">
                  {confidencePct}%
                </p>
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground leading-relaxed border-t border-border pt-2">
            {DR_DESCRIPTION[stage]}
          </p>
          {heatmapUrl && (
            <p className="text-xs text-muted-foreground/60 mt-2">
              <strong className="text-muted-foreground">Legend:</strong>{" "}
              Red/orange = high-risk · Blue/green = low-risk
            </p>
          )}
        </div>
      )}
    </div>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function PublicScanSkeleton() {
  return (
    <div
      className="flex flex-col gap-5 max-w-3xl mx-auto p-4 sm:p-6"
      data-ocid="share.loading_state"
    >
      <Skeleton className="h-14 rounded-xl" />
      <Skeleton className="h-24 rounded-xl" />
      <Skeleton className="aspect-square rounded-xl max-w-sm mx-auto w-full" />
      <Skeleton className="h-32 rounded-xl" />
    </div>
  );
}

// ─── Main public page ─────────────────────────────────────────────────────────

export default function ScanResultPublic() {
  const params = useParams({ strict: false }) as {
    scanId?: string;
    token?: string;
  };
  const scanId = params.scanId ?? params.token ?? "";

  const { data: scan, isLoading } = useScanPublic(scanId);
  const typedScan = scan as ScanRecord | null | undefined;

  if (isLoading) {
    return <PublicScanSkeleton />;
  }

  if (!typedScan) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-6">
        <div
          className="flex flex-col items-center gap-4 max-w-sm text-center"
          data-ocid="share.error_state"
        >
          <div className="w-16 h-16 rounded-2xl bg-destructive/10 border border-destructive/25 flex items-center justify-center">
            <AlertTriangle className="w-8 h-8 text-destructive" />
          </div>
          <div>
            <p className="font-bold text-foreground text-lg mb-1">
              Result not found
            </p>
            <p className="text-muted-foreground text-sm">
              This screening result doesn't exist or the link may have expired.
            </p>
          </div>
          <Link
            to="/login"
            className="text-sm text-primary hover:text-primary/80 underline underline-offset-2 transition-smooth"
            data-ocid="share.back_link"
          >
            Sign in to view your own results
          </Link>
        </div>
      </div>
    );
  }

  const result = typedScan.result;
  const imageUrl = typedScan.imageId?.getDirectURL();
  const heatmapUrl = result?.heatmapImageUrl;
  const riskLevel = result?.riskLevel ?? null;
  const riskCfg = riskLevel ? RISK_CONFIG[riskLevel] : null;
  const RiskIcon = riskCfg?.icon ?? Activity;

  const scanDate =
    typedScan.uploadedAt !== undefined
      ? new Date(Number(typedScan.uploadedAt) / 1_000_000).toLocaleDateString(
          "en-US",
          { year: "numeric", month: "long", day: "numeric" },
        )
      : "—";

  return (
    <div className="min-h-screen bg-background">
      {/* Public page header */}
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
          Screen your own eyes
        </Link>
      </header>

      <main className="max-w-2xl mx-auto p-4 sm:p-6 flex flex-col gap-5 pb-10">
        {/* Scan metadata */}
        <div
          className="rounded-2xl border border-border bg-card px-5 py-4"
          data-ocid="share.meta_card"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="font-bold text-foreground text-xl leading-tight">
                Retinal Screening Result
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                  <span data-ocid="share.scan_date">{scanDate}</span>
                </span>
                <span className="flex items-center gap-1.5 font-mono text-xs">
                  <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Scan #{scanId}</span>
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
                {riskLevel} Risk
              </Badge>
            )}
          </div>
        </div>

        {/* Risk summary banner */}
        {riskLevel && riskCfg && (
          <div
            className={cn(
              "rounded-2xl border px-5 py-4 flex items-start gap-4",
              riskCfg.borderClass,
              riskCfg.bgClass,
            )}
            data-ocid="share.risk_banner"
          >
            <div
              className={cn(
                "flex-shrink-0 w-10 h-10 rounded-lg border flex items-center justify-center",
                riskCfg.borderClass,
                riskCfg.bgClass,
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
                diagnosis. Please consult an eye doctor to confirm this result.
              </p>
            </div>
          </div>
        )}

        {/* Retinal image + heatmap */}
        <PublicImageCard
          imageUrl={imageUrl}
          heatmapUrl={heatmapUrl}
          stage={result?.stage}
          confidence={result?.confidence}
        />

        {/* Disclaimer */}
        <div
          className="rounded-2xl border border-yellow-500/25 bg-yellow-500/10 px-5 py-4 flex gap-3"
          data-ocid="share.disclaimer"
        >
          <ShieldAlert
            className="w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5"
            aria-hidden="true"
          />
          <div className="text-sm text-foreground/80 leading-relaxed">
            <strong className="font-semibold block mb-0.5 text-foreground">
              Important disclaimer
            </strong>
            This result is from an AI-based screening tool and is{" "}
            <strong>not a substitute for professional medical diagnosis</strong>
            . Always follow up with a licensed eye specialist for a full
            evaluation and treatment plan.
          </div>
        </div>

        {/* CTA */}
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
              AI-powered results — free.
            </p>
          </div>
          <Button
            asChild
            className="flex-shrink-0"
            data-ocid="share.get_started_button"
          >
            <Link to="/login">Get Started Free</Link>
          </Button>
        </div>

        {/* Footer */}
        <footer className="text-center pt-2 pb-4">
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

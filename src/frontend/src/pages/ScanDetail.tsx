import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { useNavigate, useParams } from "@tanstack/react-router";
import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  Calendar,
  CheckCircle,
  Clock,
  Copy,
  Download,
  Eye,
  EyeOff,
  FileText,
  Share2,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import type { Patient, ScanRecord } from "../backend";
import { DRStage, RiskLevel } from "../backend";
import { useAuth } from "../hooks/useAuth";
import { useBackend } from "../hooks/useBackend";
import { useMyProfile } from "../hooks/usePatients";

// ─── Constants ─────────────────────────────────────────────────────────────────

const SIMULATED_HEATMAP = "heatmap:simulated";

// ─── DR stage plain-language labels ───────────────────────────────────────────

const DR_LABEL: Record<DRStage, string> = {
  [DRStage.NoRetinopathy]: "No Diabetic Retinopathy Detected",
  [DRStage.Mild]: "Mild Diabetic Retinopathy",
  [DRStage.Moderate]: "Moderate Diabetic Retinopathy",
  [DRStage.Severe]: "Severe Diabetic Retinopathy",
  [DRStage.Proliferative]: "Proliferative Diabetic Retinopathy",
};

const DR_DESCRIPTION: Record<DRStage, string> = {
  [DRStage.NoRetinopathy]:
    "Great news — no signs of diabetic retinopathy were found in your eye scan. Keep up regular check-ups.",
  [DRStage.Mild]:
    "Early changes are present in your eye. Continue monitoring and maintaining good blood sugar control.",
  [DRStage.Moderate]:
    "Changes in your eye's blood vessels are present. Further medical attention is recommended.",
  [DRStage.Severe]:
    "Significant changes detected. Please see an eye specialist as soon as possible.",
  [DRStage.Proliferative]:
    "Advanced retinal changes detected. Urgent eye care is strongly recommended — please see a specialist now.",
};

// ─── Risk level display config ────────────────────────────────────────────────

const RISK_CONFIG: Record<
  RiskLevel,
  {
    headline: string;
    guidance: string;
    textClass: string;
    borderClass: string;
    bgClass: string;
    badgeClass: string;
    icon: React.ElementType;
  }
> = {
  [RiskLevel.Low]: {
    headline: "Your eyes appear healthy.",
    guidance:
      "No significant signs of diabetic retinopathy were found. Keep up the great work — continue regular check-ups with your doctor.",
    textClass: "text-green-400",
    borderClass: "border-green-500/30",
    bgClass: "bg-green-500/8",
    badgeClass: "border-green-500/40 text-green-400",
    icon: CheckCircle,
  },
  [RiskLevel.Moderate]: {
    headline: "Some signs detected.",
    guidance:
      "Early changes were found in your eye scan. Please consult an eye doctor soon — catching this early makes a big difference.",
    textClass: "text-yellow-400",
    borderClass: "border-yellow-500/30",
    bgClass: "bg-yellow-500/8",
    badgeClass: "border-yellow-500/40 text-yellow-400",
    icon: Clock,
  },
  [RiskLevel.High]: {
    headline: "Significant signs detected.",
    guidance:
      "Your scan shows signs that need attention. Please see an eye specialist urgently — do not delay. Early treatment can protect your vision.",
    textClass: "text-red-400",
    borderClass: "border-red-500/40",
    bgClass: "bg-red-500/10",
    badgeClass: "border-red-500/40 text-red-400",
    icon: AlertTriangle,
  },
};

// ─── Simulated heatmap canvas ─────────────────────────────────────────────────

function SimulatedHeatmapCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);

    const blobs: Array<{ cx: number; cy: number; r: number; alpha: number }> = [
      { cx: 0.5, cy: 0.48, r: 0.22, alpha: 0.55 },
      { cx: 0.35, cy: 0.38, r: 0.14, alpha: 0.45 },
      { cx: 0.65, cy: 0.6, r: 0.12, alpha: 0.4 },
      { cx: 0.42, cy: 0.58, r: 0.1, alpha: 0.35 },
      { cx: 0.58, cy: 0.36, r: 0.09, alpha: 0.3 },
    ];

    for (const blob of blobs) {
      const grd = ctx.createRadialGradient(
        blob.cx * w,
        blob.cy * h,
        0,
        blob.cx * w,
        blob.cy * h,
        blob.r * w,
      );
      grd.addColorStop(0, `rgba(255,40,0,${blob.alpha})`);
      grd.addColorStop(0.4, `rgba(255,120,0,${blob.alpha * 0.55})`);
      grd.addColorStop(0.75, `rgba(255,220,0,${blob.alpha * 0.2})`);
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      width={512}
      height={512}
      className={cn(
        "absolute inset-0 w-full h-full object-contain pointer-events-none",
        className,
      )}
      aria-label="AI analysis overlay showing simulated regions of interest"
    />
  );
}

// ─── Confidence bar ───────────────────────────────────────────────────────────

function ConfidenceBar({ confidence }: { confidence: number }) {
  const safePct = Math.round(Math.max(0, Math.min(1, confidence ?? 0)) * 100);
  const color =
    safePct >= 80
      ? "bg-green-400"
      : safePct >= 60
        ? "bg-yellow-400"
        : "bg-orange-400";

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">AI Confidence</span>
        <span
          className="font-mono font-bold text-foreground tabular-nums"
          data-ocid="scan_detail.confidence_value"
        >
          {safePct}%
        </span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full rounded-full transition-all duration-700",
            color,
          )}
          style={{ width: `${safePct}%` }}
        />
      </div>
    </div>
  );
}

// ─── Risk banner ──────────────────────────────────────────────────────────────

function RiskBanner({ riskLevel }: { riskLevel: RiskLevel }) {
  const cfg = RISK_CONFIG[riskLevel] ?? RISK_CONFIG[RiskLevel.Low];
  const IconComp = cfg.icon;

  return (
    <div
      className={cn(
        "rounded-2xl border p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4",
        cfg.borderClass,
        cfg.bgClass,
      )}
      data-ocid="scan_detail.risk_banner"
      aria-live="polite"
    >
      <div
        className={cn(
          "flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center border",
          cfg.bgClass,
          cfg.borderClass,
        )}
        aria-hidden="true"
      >
        <IconComp className={cn("w-5 h-5", cfg.textClass)} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <h2 className={cn("text-base sm:text-lg font-bold", cfg.textClass)}>
            {cfg.headline}
          </h2>
          <Badge
            variant="outline"
            className={cn("text-xs font-semibold border", cfg.badgeClass)}
            data-ocid="scan_detail.risk_badge"
          >
            {riskLevel} Risk
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {cfg.guidance}
        </p>
      </div>
    </div>
  );
}

// ─── Heatmap overlay panel ────────────────────────────────────────────────────

function ImagePanel({
  imageUrl,
  heatmapUrl,
  scanId,
}: {
  imageUrl: string;
  heatmapUrl?: string;
  scanId: string;
}) {
  const [showHeatmap, setShowHeatmap] = useState(false);
  const isSimulated = heatmapUrl === SIMULATED_HEATMAP;
  const hasHeatmap = !!heatmapUrl;

  return (
    <div
      className="rounded-2xl border border-border bg-card overflow-hidden flex flex-col"
      data-ocid="scan_detail.image_panel"
    >
      <div className="flex items-center justify-between px-4 py-3 bg-muted/30 border-b border-border">
        <div className="flex items-center gap-2">
          <Eye className="w-4 h-4 text-primary" aria-hidden="true" />
          <span className="text-sm font-semibold text-foreground">
            Retinal Scan
          </span>
          <span className="text-xs text-muted-foreground">#{scanId}</span>
        </div>
        {hasHeatmap && (
          <Button
            variant={showHeatmap ? "default" : "outline"}
            size="sm"
            onClick={() => setShowHeatmap((v) => !v)}
            className={cn(
              "gap-1.5 text-xs h-7",
              showHeatmap &&
                "bg-accent text-accent-foreground border-accent/50",
            )}
            data-ocid="scan_detail.heatmap_toggle"
          >
            {showHeatmap ? (
              <EyeOff className="w-3 h-3" />
            ) : (
              <Eye className="w-3 h-3" />
            )}
            {showHeatmap ? "Hide AI Highlight" : "Show AI Highlight"}
          </Button>
        )}
      </div>

      <div className="relative aspect-square overflow-hidden bg-black/60 select-none">
        <img
          src={imageUrl}
          alt="Retinal scan"
          className="w-full h-full object-contain"
          data-ocid="scan_detail.fundus_image"
          onError={(e) => {
            // Hide broken image, don't crash
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {showHeatmap &&
          heatmapUrl &&
          (isSimulated ? (
            <SimulatedHeatmapCanvas />
          ) : (
            <img
              src={heatmapUrl}
              alt="AI analysis overlay showing regions of interest"
              className="heatmap-overlay absolute inset-0 w-full h-full object-contain pointer-events-none"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          ))}
      </div>

      {hasHeatmap && (
        <div className="px-4 py-3 border-t border-border bg-muted/20 flex items-center gap-3 flex-wrap">
          <p className="text-xs text-muted-foreground">
            <strong className="text-foreground">
              AI Highlight Legend:
            </strong>{" "}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-red-500/70" />
              <span className="text-xs text-muted-foreground">
                Red/orange = high-risk regions
              </span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-sm bg-blue-500/70" />
              <span className="text-xs text-muted-foreground">
                Blue/green = low-risk regions
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── DR Stage severity bar ────────────────────────────────────────────────────

const DR_STAGE_ORDER: DRStage[] = [
  DRStage.NoRetinopathy,
  DRStage.Mild,
  DRStage.Moderate,
  DRStage.Severe,
  DRStage.Proliferative,
];

const DR_STAGE_COLORS = [
  "bg-green-400",
  "bg-yellow-400",
  "bg-orange-400",
  "bg-red-400",
  "bg-red-600",
];

function SeverityBar({ stage }: { stage: DRStage }) {
  const stageIdx = DR_STAGE_ORDER.indexOf(stage);

  return (
    <div className="flex flex-col gap-1.5">
      <div className="flex gap-1" role="presentation">
        {DR_STAGE_ORDER.map((s, idx) => (
          <div
            key={s}
            className={cn(
              "h-2 flex-1 rounded-full transition-smooth",
              DR_STAGE_COLORS[idx],
              idx < stageIdx && "opacity-30",
              idx === stageIdx && "opacity-100 scale-y-150 origin-center",
              idx > stageIdx && "opacity-15",
            )}
            title={DR_LABEL[s]}
          />
        ))}
      </div>
      <div className="flex justify-between text-xs text-muted-foreground px-0.5">
        <span>No DR</span>
        <span>Proliferative</span>
      </div>
    </div>
  );
}

// ─── Loading skeleton ─────────────────────────────────────────────────────────

function ScanDetailSkeleton() {
  return (
    <div
      className="flex flex-col gap-5 p-4 sm:p-6 max-w-4xl mx-auto"
      data-ocid="scan_detail.loading_state"
    >
      <Skeleton className="h-10 w-40 rounded-xl" />
      <Skeleton className="h-24 rounded-2xl" />
      <Skeleton className="h-20 rounded-2xl" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Skeleton className="aspect-square rounded-2xl" />
        <Skeleton className="h-60 rounded-2xl" />
      </div>
    </div>
  );
}

// ─── PDF generation ────────────────────────────────────────────────────────────

async function generatePDF(
  element: HTMLElement,
  patientName: string,
): Promise<void> {
  const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: "#0f0f13",
    logging: false,
  });

  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const margin = 10;
  const maxW = pageW - margin * 2;
  const imgH = (canvas.height * maxW) / canvas.width;

  let posY = margin;
  let remaining = imgH;
  let srcOffsetFraction = 0;

  while (remaining > 0) {
    const sliceH = Math.min(remaining, pageH - margin * 2);
    const sliceFraction = sliceH / imgH;

    const srcY = srcOffsetFraction * canvas.height;
    const srcH = sliceFraction * canvas.height;

    const sliceCanvas = document.createElement("canvas");
    sliceCanvas.width = canvas.width;
    sliceCanvas.height = Math.max(1, Math.ceil(srcH));
    const sliceCtx = sliceCanvas.getContext("2d");
    if (sliceCtx) {
      sliceCtx.drawImage(
        canvas,
        0,
        srcY,
        canvas.width,
        srcH,
        0,
        0,
        canvas.width,
        srcH,
      );
    }
    const sliceData = sliceCanvas.toDataURL("image/png");
    pdf.addImage(sliceData, "PNG", margin, posY, maxW, sliceH);

    remaining -= sliceH;
    srcOffsetFraction += sliceFraction;

    if (remaining > 0) {
      pdf.addPage();
      posY = margin;
    }
  }

  const safeName = patientName.replace(/[^a-z0-9]/gi, "-").toLowerCase();
  pdf.save(`retina-scan-${safeName || "result"}.pdf`);
}

// ─── Main component ────────────────────────────────────────────────────────────

export default function ScanDetail() {
  const params = useParams({ strict: false }) as { scanId?: string };
  const navigate = useNavigate();
  const scanId = params.scanId ?? "";

  const { data: profileRaw } = useMyProfile();
  const profile = profileRaw as Patient | null | undefined;
  const { backend, isReady } = useBackend();
  const { handleAuthError } = useAuth();
  const [isGeneratingToken, setIsGeneratingToken] = useState(false);
  const [isDownloadingPDF, setIsDownloadingPDF] = useState(false);
  const printAreaRef = useRef<HTMLDivElement>(null);

  const [scan, setScan] = useState<ScanRecord | null | "loading">("loading");
  const [scanError, setScanError] = useState(false);

  const fetchScan = useCallback(async () => {
    if (!backend || !isReady || !scanId) return;
    setScanError(false);
    try {
      const result = await backend.getScan(BigInt(scanId));
      setScan(result ?? null);
    } catch (err) {
      if (handleAuthError(err)) {
        setScan(null);
        return;
      }
      console.error("[ScanDetail] fetchScan error:", err);
      setScanError(true);
      setScan(null);
    }
  }, [backend, isReady, scanId, handleAuthError]);

  useEffect(() => {
    if (isReady && backend && scanId) void fetchScan();
  }, [isReady, backend, scanId, fetchScan]);

  const handleGenerateShareLink = useCallback(async () => {
    if (!backend || !scanId) return;
    setIsGeneratingToken(true);
    try {
      const result = await backend.generateShareToken(BigInt(scanId));
      if (
        result &&
        typeof result === "object" &&
        "__kind__" in result &&
        result.__kind__ === "err"
      ) {
        throw new Error(
          (result as { __kind__: "err"; err: string }).err ||
            "Could not generate share link",
        );
      }
      const token =
        result && typeof result === "object" && "__kind__" in result
          ? (result as { __kind__: "ok"; ok: string }).ok
          : (result as unknown as string);
      const shareUrl = `${window.location.origin}/shared/${token}`;
      await navigator.clipboard.writeText(shareUrl);
      toast.success("Shareable link copied!", {
        description:
          "Anyone with this link can view your screening result — no login needed.",
        duration: 5000,
      });
    } catch (err) {
      if (handleAuthError(err)) return;
      toast.error(
        err instanceof Error ? err.message : "Could not generate share link.",
      );
    } finally {
      setIsGeneratingToken(false);
    }
  }, [backend, scanId, handleAuthError]);

  const handleDownloadPDF = useCallback(async () => {
    if (!printAreaRef.current) {
      toast.error("PDF not ready. Please wait for the page to fully load.");
      return;
    }
    setIsDownloadingPDF(true);
    try {
      await generatePDF(printAreaRef.current, profile?.name ?? "patient");
      toast.success("PDF downloaded!", {
        description: "Your screening report has been saved.",
        duration: 4000,
      });
    } catch (err) {
      console.error("[ScanDetail] PDF generation error:", err);
      toast.error("PDF generation failed. Please try again.", {
        description:
          "If this keeps happening, try a different browser or use the share link instead.",
      });
    } finally {
      setIsDownloadingPDF(false);
    }
  }, [profile?.name]);

  // ── Loading ────────────────────────────────────────────────────────────────
  if (scan === "loading") {
    return <ScanDetailSkeleton />;
  }

  if (!scan || scanError) {
    return (
      <div
        className="p-6 flex flex-col items-center justify-center gap-4 min-h-60 max-w-md mx-auto text-center"
        data-ocid="scan_detail.error_state"
      >
        <div className="w-16 h-16 rounded-2xl bg-destructive/10 border border-destructive/30 flex items-center justify-center">
          <AlertTriangle
            className="w-8 h-8 text-destructive"
            aria-hidden="true"
          />
        </div>
        <div>
          <p className="font-bold text-foreground text-lg mb-1">
            Scan not found
          </p>
          <p className="text-muted-foreground text-sm">
            We couldn't find this scan result. The link may be incorrect or the
            scan may have been removed.
          </p>
        </div>
        <Button
          variant="outline"
          onClick={() => void navigate({ to: "/" })}
          className="gap-2"
          data-ocid="scan_detail.back_to_home_button"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to My Scans
        </Button>
      </div>
    );
  }

  const typedScan = scan as ScanRecord;
  const result = typedScan.result ?? null;

  // Safe null-checked image URL
  const imageUrl = typedScan.imageId ? typedScan.imageId.getDirectURL() : null;
  const heatmapUrl = result?.heatmapImageUrl ?? undefined;

  const scanDate =
    typedScan.uploadedAt !== undefined
      ? new Date(Number(typedScan.uploadedAt) / 1_000_000).toLocaleDateString(
          "en-US",
          { year: "numeric", month: "long", day: "numeric" },
        )
      : "—";

  const scanTime =
    typedScan.uploadedAt !== undefined
      ? new Date(Number(typedScan.uploadedAt) / 1_000_000).toLocaleTimeString(
          "en-US",
          { hour: "2-digit", minute: "2-digit" },
        )
      : "";

  return (
    <div className="p-4 sm:p-6 flex flex-col gap-5 max-w-4xl mx-auto">
      {/* Toolbar — not captured in PDF */}
      <div
        className="flex flex-wrap items-center justify-between gap-3"
        data-ocid="scan_detail.toolbar"
      >
        <Button
          variant="ghost"
          size="sm"
          onClick={() => void navigate({ to: "/" })}
          className="gap-1.5 -ml-1"
          data-ocid="scan_detail.back_button"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to My Scans
        </Button>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => void handleGenerateShareLink()}
            disabled={isGeneratingToken}
            className="gap-1.5"
            data-ocid="scan_detail.copy_link_button"
          >
            {isGeneratingToken ? (
              <Activity className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Share2 className="w-3.5 h-3.5" />
            )}
            <span className="hidden xs:inline">Copy Shareable Link</span>
            <span className="xs:hidden">Share</span>
          </Button>
          <Button
            size="sm"
            onClick={() => void handleDownloadPDF()}
            disabled={isDownloadingPDF}
            className="gap-1.5"
            data-ocid="scan_detail.download_pdf_button"
          >
            {isDownloadingPDF ? (
              <Activity className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <Download className="w-3.5 h-3.5" />
            )}
            {isDownloadingPDF ? "Generating…" : "Download PDF"}
          </Button>
        </div>
      </div>

      {/* ── PDF-captured area ── */}
      <div ref={printAreaRef} className="flex flex-col gap-5">
        {/* PDF branding header */}
        <div className="flex items-center gap-3 pb-4 border-b border-border mb-1">
          <div className="w-8 h-8 rounded-lg border border-border flex items-center justify-center bg-primary/10">
            <Eye className="w-4 h-4 text-primary" aria-hidden="true" />
          </div>
          <div>
            <span className="text-base font-bold text-foreground">
              RetinaAI
            </span>
            <p className="text-xs text-muted-foreground">
              Diabetic Retinopathy Screening Report
            </p>
          </div>
        </div>

        {/* Patient + scan metadata */}
        <div
          className="rounded-2xl border border-border bg-card px-5 py-4"
          data-ocid="scan_detail.meta_card"
        >
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h1 className="font-bold text-xl text-foreground leading-tight">
                {profile?.name
                  ? `${profile.name}'s Screening Result`
                  : "Your Screening Result"}
              </h1>
              <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground">
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
                  <span data-ocid="scan_detail.scan_date">
                    {scanDate}
                    {scanTime && `, ${scanTime}`}
                  </span>
                </span>
                <span className="flex items-center gap-1.5 font-mono text-xs">
                  <FileText className="w-3.5 h-3.5" aria-hidden="true" />
                  <span data-ocid="scan_detail.scan_id">Scan #{scanId}</span>
                </span>
              </div>
            </div>
            {profile && (
              <div className="text-right flex-shrink-0 flex flex-col gap-0.5">
                {profile.hbA1c ? (
                  <>
                    <p className="text-xs text-muted-foreground">HbA1c</p>
                    <p className="font-mono font-bold text-foreground text-lg">
                      {profile.hbA1c}%
                    </p>
                  </>
                ) : null}
                {profile.diabetesType ? (
                  <span className="text-xs bg-muted/50 border border-border rounded-full px-2 py-0.5 self-end">
                    {String(profile.diabetesType)}
                  </span>
                ) : null}
              </div>
            )}
          </div>
        </div>

        {/* Risk banner — only if result exists */}
        {result?.riskLevel && <RiskBanner riskLevel={result.riskLevel} />}

        {/* Main content grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 items-start">
          {/* Image + heatmap — only if we have a valid image URL */}
          {imageUrl && (
            <ImagePanel
              imageUrl={imageUrl}
              heatmapUrl={heatmapUrl}
              scanId={scanId}
            />
          )}

          {/* Results panel */}
          <div className="flex flex-col gap-4">
            {result ? (
              <>
                {/* DR Stage */}
                <div
                  className="rounded-2xl border border-border bg-card px-5 py-5 flex flex-col gap-4"
                  data-ocid="scan_detail.result_card"
                >
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1 uppercase tracking-wide font-medium">
                        Diagnosis
                      </p>
                      <p
                        className="font-bold text-foreground text-base leading-snug"
                        data-ocid="scan_detail.dr_stage_label"
                      >
                        {result.stage
                          ? (DR_LABEL[result.stage] ?? "Unknown")
                          : "Result pending"}
                      </p>
                    </div>
                    {result.riskLevel && (
                      <Badge
                        variant="outline"
                        className={cn(
                          "text-xs font-semibold border",
                          (
                            RISK_CONFIG[result.riskLevel] ??
                            RISK_CONFIG[RiskLevel.Low]
                          ).badgeClass,
                        )}
                      >
                        {result.riskLevel} Risk
                      </Badge>
                    )}
                  </div>

                  <ConfidenceBar confidence={result.confidence ?? 0} />
                  {result.stage && <SeverityBar stage={result.stage} />}

                  <p
                    className="text-sm text-muted-foreground leading-relaxed border-t border-border pt-4"
                    data-ocid="scan_detail.dr_description"
                  >
                    {result.stage
                      ? (DR_DESCRIPTION[result.stage] ??
                        "Please consult an eye specialist for a full evaluation.")
                      : "Analysis complete — please see your doctor for next steps."}
                  </p>
                </div>

                {/* What to do next */}
                <div
                  className="rounded-2xl border border-border bg-muted/20 px-5 py-5 flex flex-col gap-3"
                  data-ocid="scan_detail.guidance_panel"
                >
                  <h3 className="font-semibold text-foreground text-sm">
                    What Should I Do Next?
                  </h3>
                  <ul className="flex flex-col gap-2 text-sm text-muted-foreground">
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-0.5">1.</span>
                      <span>
                        <strong className="text-foreground">
                          Keep your blood sugar in check.
                        </strong>{" "}
                        Good HbA1c control slows or prevents retinopathy from
                        getting worse.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-0.5">2.</span>
                      <span>
                        <strong className="text-foreground">
                          Share this report with your doctor.
                        </strong>{" "}
                        Use the Copy Link or Download PDF button above.
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-primary font-bold mt-0.5">3.</span>
                      <span>
                        <strong className="text-foreground">
                          Schedule a follow-up.
                        </strong>{" "}
                        Regular eye check-ups every 6–12 months are recommended
                        for people with diabetes.
                      </span>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              // Scan has no result yet
              <div
                className="rounded-2xl border border-border bg-card px-5 py-8 flex flex-col items-center gap-4 text-center"
                data-ocid="scan_detail.no_result_state"
              >
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center">
                  <Activity className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="font-bold text-foreground mb-1">
                    Analysis not yet run
                  </p>
                  <p className="text-sm text-muted-foreground">
                    This scan hasn't been analysed yet. Go back and run the AI
                    analysis.
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => void navigate({ to: "/upload" })}
                  className="gap-2"
                  data-ocid="scan_detail.run_analysis_button"
                >
                  Run New Scan
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom actions */}
      <div
        className="flex flex-wrap items-center gap-3 pb-2"
        data-ocid="scan_detail.bottom_nav"
      >
        <Button
          variant="outline"
          onClick={() => void navigate({ to: "/" })}
          className="gap-2"
          data-ocid="scan_detail.back_home_bottom_button"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to My Scans
        </Button>
        <Button
          onClick={() => void navigate({ to: "/upload" })}
          className="gap-2"
          data-ocid="scan_detail.new_scan_button"
        >
          New Screening
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => void handleGenerateShareLink()}
          disabled={isGeneratingToken}
          className="gap-1.5 ml-auto"
          data-ocid="scan_detail.copy_link_bottom_button"
        >
          <Copy className="w-3.5 h-3.5" />
          Copy Shareable Link
        </Button>
      </div>
    </div>
  );
}

const __vite__mapDeps=(i,m=__vite__mapDeps,d=(m.f||(m.f=["assets/jspdf.es.min-CCaEYEzY.js","assets/index-DvlEB_35.js","assets/index-D4YX39Is.css"])))=>i.map(i=>d[i]);
import { c as createLucideIcon, t as useParams, u as useNavigate, d as useMyProfile, g as useBackend, b as useAuth, r as reactExports, h as ue, j as jsxRuntimeExports, T as TriangleAlert, B as Button, E as Eye, a as cn, R as RiskLevel, _ as __vitePreload, S as Skeleton, D as DRStage } from "./index-DvlEB_35.js";
import { B as Badge } from "./badge-DAa9bGcG.js";
import { A as Activity } from "./activity-B8QHEl9v.js";
import { C as Calendar, a as Clock, b as CircleCheckBig } from "./clock-EyHYImyW.js";
import { F as FileText, E as EyeOff } from "./file-text-DRT_pGE2.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "m12 19-7-7 7-7", key: "1l729n" }],
  ["path", { d: "M19 12H5", key: "x3x0zl" }]
];
const ArrowLeft = createLucideIcon("arrow-left", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["rect", { width: "14", height: "14", x: "8", y: "8", rx: "2", ry: "2", key: "17jyea" }],
  ["path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2", key: "zix9uf" }]
];
const Copy = createLucideIcon("copy", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 15V3", key: "m9g1x1" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }],
  ["path", { d: "m7 10 5 5 5-5", key: "brsn70" }]
];
const Download = createLucideIcon("download", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["circle", { cx: "18", cy: "5", r: "3", key: "gq8acd" }],
  ["circle", { cx: "6", cy: "12", r: "3", key: "w7nqdw" }],
  ["circle", { cx: "18", cy: "19", r: "3", key: "1xt0gg" }],
  ["line", { x1: "8.59", x2: "15.42", y1: "13.51", y2: "17.49", key: "47mynk" }],
  ["line", { x1: "15.41", x2: "8.59", y1: "6.51", y2: "10.49", key: "1n3mei" }]
];
const Share2 = createLucideIcon("share-2", __iconNode);
const SIMULATED_HEATMAP = "heatmap:simulated";
const DR_LABEL = {
  [DRStage.NoRetinopathy]: "No Diabetic Retinopathy Detected",
  [DRStage.Mild]: "Mild Diabetic Retinopathy",
  [DRStage.Moderate]: "Moderate Diabetic Retinopathy",
  [DRStage.Severe]: "Severe Diabetic Retinopathy",
  [DRStage.Proliferative]: "Proliferative Diabetic Retinopathy"
};
const DR_DESCRIPTION = {
  [DRStage.NoRetinopathy]: "Great news — no signs of diabetic retinopathy were found in your eye scan. Keep up regular check-ups.",
  [DRStage.Mild]: "Early changes are present in your eye. Continue monitoring and maintaining good blood sugar control.",
  [DRStage.Moderate]: "Changes in your eye's blood vessels are present. Further medical attention is recommended.",
  [DRStage.Severe]: "Significant changes detected. Please see an eye specialist as soon as possible.",
  [DRStage.Proliferative]: "Advanced retinal changes detected. Urgent eye care is strongly recommended — please see a specialist now."
};
const RISK_CONFIG = {
  [RiskLevel.Low]: {
    headline: "Your eyes appear healthy.",
    guidance: "No significant signs of diabetic retinopathy were found. Keep up the great work — continue regular check-ups with your doctor.",
    textClass: "text-green-400",
    borderClass: "border-green-500/30",
    bgClass: "bg-green-500/8",
    badgeClass: "border-green-500/40 text-green-400",
    icon: CircleCheckBig
  },
  [RiskLevel.Moderate]: {
    headline: "Some signs detected.",
    guidance: "Early changes were found in your eye scan. Please consult an eye doctor soon — catching this early makes a big difference.",
    textClass: "text-yellow-400",
    borderClass: "border-yellow-500/30",
    bgClass: "bg-yellow-500/8",
    badgeClass: "border-yellow-500/40 text-yellow-400",
    icon: Clock
  },
  [RiskLevel.High]: {
    headline: "Significant signs detected.",
    guidance: "Your scan shows signs that need attention. Please see an eye specialist urgently — do not delay. Early treatment can protect your vision.",
    textClass: "text-red-400",
    borderClass: "border-red-500/40",
    bgClass: "bg-red-500/10",
    badgeClass: "border-red-500/40 text-red-400",
    icon: TriangleAlert
  }
};
function SimulatedHeatmapCanvas({ className }) {
  const canvasRef = reactExports.useRef(null);
  reactExports.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const w = canvas.width;
    const h = canvas.height;
    ctx.clearRect(0, 0, w, h);
    const blobs = [
      { cx: 0.5, cy: 0.48, r: 0.22, alpha: 0.55 },
      { cx: 0.35, cy: 0.38, r: 0.14, alpha: 0.45 },
      { cx: 0.65, cy: 0.6, r: 0.12, alpha: 0.4 },
      { cx: 0.42, cy: 0.58, r: 0.1, alpha: 0.35 },
      { cx: 0.58, cy: 0.36, r: 0.09, alpha: 0.3 }
    ];
    for (const blob of blobs) {
      const grd = ctx.createRadialGradient(
        blob.cx * w,
        blob.cy * h,
        0,
        blob.cx * w,
        blob.cy * h,
        blob.r * w
      );
      grd.addColorStop(0, `rgba(255,40,0,${blob.alpha})`);
      grd.addColorStop(0.4, `rgba(255,120,0,${blob.alpha * 0.55})`);
      grd.addColorStop(0.75, `rgba(255,220,0,${blob.alpha * 0.2})`);
      grd.addColorStop(1, "rgba(0,0,0,0)");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 0, w, h);
    }
  }, []);
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "canvas",
    {
      ref: canvasRef,
      width: 512,
      height: 512,
      className: cn(
        "absolute inset-0 w-full h-full object-contain pointer-events-none",
        className
      ),
      "aria-label": "AI analysis overlay showing simulated regions of interest"
    }
  );
}
function ConfidenceBar({ confidence }) {
  const safePct = Math.round(Math.max(0, Math.min(1, confidence ?? 0)) * 100);
  const color = safePct >= 80 ? "bg-green-400" : safePct >= 60 ? "bg-yellow-400" : "bg-orange-400";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between text-xs", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-muted-foreground", children: "AI Confidence" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "span",
        {
          className: "font-mono font-bold text-foreground tabular-nums",
          "data-ocid": "scan_detail.confidence_value",
          children: [
            safePct,
            "%"
          ]
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn(
          "h-full rounded-full transition-all duration-700",
          color
        ),
        style: { width: `${safePct}%` }
      }
    ) })
  ] });
}
function RiskBanner({ riskLevel }) {
  const cfg = RISK_CONFIG[riskLevel] ?? RISK_CONFIG[RiskLevel.Low];
  const IconComp = cfg.icon;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: cn(
        "rounded-2xl border p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4",
        cfg.borderClass,
        cfg.bgClass
      ),
      "data-ocid": "scan_detail.risk_banner",
      "aria-live": "polite",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "div",
          {
            className: cn(
              "flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-center border",
              cfg.bgClass,
              cfg.borderClass
            ),
            "aria-hidden": "true",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconComp, { className: cn("w-5 h-5", cfg.textClass) })
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-2 mb-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: cn("text-base sm:text-lg font-bold", cfg.textClass), children: cfg.headline }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: cn("text-xs font-semibold border", cfg.badgeClass),
                "data-ocid": "scan_detail.risk_badge",
                children: [
                  riskLevel,
                  " Risk"
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: cfg.guidance })
        ] })
      ]
    }
  );
}
function ImagePanel({
  imageUrl,
  heatmapUrl,
  scanId
}) {
  const [showHeatmap, setShowHeatmap] = reactExports.useState(false);
  const isSimulated = heatmapUrl === SIMULATED_HEATMAP;
  const hasHeatmap = !!heatmapUrl;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl border border-border bg-card overflow-hidden flex flex-col",
      "data-ocid": "scan_detail.image_panel",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 bg-muted/30 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4 text-primary", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm font-semibold text-foreground", children: "Retinal Scan" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs text-muted-foreground", children: [
              "#",
              scanId
            ] })
          ] }),
          hasHeatmap && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: showHeatmap ? "default" : "outline",
              size: "sm",
              onClick: () => setShowHeatmap((v) => !v),
              className: cn(
                "gap-1.5 text-xs h-7",
                showHeatmap && "bg-accent text-accent-foreground border-accent/50"
              ),
              "data-ocid": "scan_detail.heatmap_toggle",
              children: [
                showHeatmap ? /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-3 h-3" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }),
                showHeatmap ? "Hide AI Highlight" : "Show AI Highlight"
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative aspect-square overflow-hidden bg-black/60 select-none", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: imageUrl,
              alt: "Retinal scan",
              className: "w-full h-full object-contain",
              "data-ocid": "scan_detail.fundus_image",
              onError: (e) => {
                e.target.style.display = "none";
              }
            }
          ),
          showHeatmap && heatmapUrl && (isSimulated ? /* @__PURE__ */ jsxRuntimeExports.jsx(SimulatedHeatmapCanvas, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: heatmapUrl,
              alt: "AI analysis overlay showing regions of interest",
              className: "heatmap-overlay absolute inset-0 w-full h-full object-contain pointer-events-none",
              onError: (e) => {
                e.target.style.display = "none";
              }
            }
          ))
        ] }),
        hasHeatmap && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 border-t border-border bg-muted/20 flex items-center gap-3 flex-wrap", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "AI Highlight Legend:" }),
            " "
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 flex-wrap", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-sm bg-red-500/70" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Red/orange = high-risk regions" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-3 h-3 rounded-sm bg-blue-500/70" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Blue/green = low-risk regions" })
            ] })
          ] })
        ] })
      ]
    }
  );
}
const DR_STAGE_ORDER = [
  DRStage.NoRetinopathy,
  DRStage.Mild,
  DRStage.Moderate,
  DRStage.Severe,
  DRStage.Proliferative
];
const DR_STAGE_COLORS = [
  "bg-green-400",
  "bg-yellow-400",
  "bg-orange-400",
  "bg-red-400",
  "bg-red-600"
];
function SeverityBar({ stage }) {
  const stageIdx = DR_STAGE_ORDER.indexOf(stage);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", role: "presentation", children: DR_STAGE_ORDER.map((s, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: cn(
          "h-2 flex-1 rounded-full transition-smooth",
          DR_STAGE_COLORS[idx],
          idx < stageIdx && "opacity-30",
          idx === stageIdx && "opacity-100 scale-y-150 origin-center",
          idx > stageIdx && "opacity-15"
        ),
        title: DR_LABEL[s]
      },
      s
    )) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground px-0.5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "No DR" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Proliferative" })
    ] })
  ] });
}
function ScanDetailSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col gap-5 p-4 sm:p-6 max-w-4xl mx-auto",
      "data-ocid": "scan_detail.loading_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-10 w-40 rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-2xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-2xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-2xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-60 rounded-2xl" })
        ] })
      ]
    }
  );
}
async function generatePDF(element, patientName) {
  const [{ default: html2canvas }, { default: jsPDF }] = await Promise.all([
    __vitePreload(() => import("./html2canvas.esm-Dtsxr8dG.js"), true ? [] : void 0),
    __vitePreload(() => import("./jspdf.es.min-CCaEYEzY.js").then((n) => n.j), true ? __vite__mapDeps([0,1,2]) : void 0)
  ]);
  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: "#0f0f13",
    logging: false
  });
  const pdf = new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });
  const pageW = pdf.internal.pageSize.getWidth();
  const pageH = pdf.internal.pageSize.getHeight();
  const margin = 10;
  const maxW = pageW - margin * 2;
  const imgH = canvas.height * maxW / canvas.width;
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
        srcH
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
function ScanDetail() {
  const params = useParams({ strict: false });
  const navigate = useNavigate();
  const scanId = params.scanId ?? "";
  const { data: profileRaw } = useMyProfile();
  const profile = profileRaw;
  const { backend, isReady } = useBackend();
  const { handleAuthError } = useAuth();
  const [isGeneratingToken, setIsGeneratingToken] = reactExports.useState(false);
  const [isDownloadingPDF, setIsDownloadingPDF] = reactExports.useState(false);
  const printAreaRef = reactExports.useRef(null);
  const [scan, setScan] = reactExports.useState("loading");
  const [scanError, setScanError] = reactExports.useState(false);
  const fetchScan = reactExports.useCallback(async () => {
    if (!backend || !isReady || !scanId) return;
    setScanError(false);
    try {
      const result2 = await backend.getScan(BigInt(scanId));
      setScan(result2 ?? null);
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
  reactExports.useEffect(() => {
    if (isReady && backend && scanId) void fetchScan();
  }, [isReady, backend, scanId, fetchScan]);
  const handleGenerateShareLink = reactExports.useCallback(async () => {
    if (!backend || !scanId) return;
    setIsGeneratingToken(true);
    try {
      const result2 = await backend.generateShareToken(BigInt(scanId));
      if (result2 && typeof result2 === "object" && "__kind__" in result2 && result2.__kind__ === "err") {
        throw new Error(
          result2.err || "Could not generate share link"
        );
      }
      const token = result2 && typeof result2 === "object" && "__kind__" in result2 ? result2.ok : result2;
      const shareUrl = `${window.location.origin}/shared/${token}`;
      await navigator.clipboard.writeText(shareUrl);
      ue.success("Shareable link copied!", {
        description: "Anyone with this link can view your screening result — no login needed.",
        duration: 5e3
      });
    } catch (err) {
      if (handleAuthError(err)) return;
      ue.error(
        err instanceof Error ? err.message : "Could not generate share link."
      );
    } finally {
      setIsGeneratingToken(false);
    }
  }, [backend, scanId, handleAuthError]);
  const handleDownloadPDF = reactExports.useCallback(async () => {
    if (!printAreaRef.current) {
      ue.error("PDF not ready. Please wait for the page to fully load.");
      return;
    }
    setIsDownloadingPDF(true);
    try {
      await generatePDF(printAreaRef.current, (profile == null ? void 0 : profile.name) ?? "patient");
      ue.success("PDF downloaded!", {
        description: "Your screening report has been saved.",
        duration: 4e3
      });
    } catch (err) {
      console.error("[ScanDetail] PDF generation error:", err);
      ue.error("PDF generation failed. Please try again.", {
        description: "If this keeps happening, try a different browser or use the share link instead."
      });
    } finally {
      setIsDownloadingPDF(false);
    }
  }, [profile == null ? void 0 : profile.name]);
  if (scan === "loading") {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ScanDetailSkeleton, {});
  }
  if (!scan || scanError) {
    return /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "p-6 flex flex-col items-center justify-center gap-4 min-h-60 max-w-md mx-auto text-center",
        "data-ocid": "scan_detail.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-destructive/10 border border-destructive/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            TriangleAlert,
            {
              className: "w-8 h-8 text-destructive",
              "aria-hidden": "true"
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-lg mb-1", children: "Scan not found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "We couldn't find this scan result. The link may be incorrect or the scan may have been removed." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => void navigate({ to: "/" }),
              className: "gap-2",
              "data-ocid": "scan_detail.back_to_home_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                "Back to My Scans"
              ]
            }
          )
        ]
      }
    );
  }
  const typedScan = scan;
  const result = typedScan.result ?? null;
  const imageUrl = typedScan.imageId ? typedScan.imageId.getDirectURL() : null;
  const heatmapUrl = (result == null ? void 0 : result.heatmapImageUrl) ?? void 0;
  const scanDate = typedScan.uploadedAt !== void 0 ? new Date(Number(typedScan.uploadedAt) / 1e6).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  ) : "—";
  const scanTime = typedScan.uploadedAt !== void 0 ? new Date(Number(typedScan.uploadedAt) / 1e6).toLocaleTimeString(
    "en-US",
    { hour: "2-digit", minute: "2-digit" }
  ) : "";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 sm:p-6 flex flex-col gap-5 max-w-4xl mx-auto", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-wrap items-center justify-between gap-3",
        "data-ocid": "scan_detail.toolbar",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => void navigate({ to: "/" }),
              className: "gap-1.5 -ml-1",
              "data-ocid": "scan_detail.back_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                "Back to My Scans"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                variant: "outline",
                size: "sm",
                onClick: () => void handleGenerateShareLink(),
                disabled: isGeneratingToken,
                className: "gap-1.5",
                "data-ocid": "scan_detail.copy_link_button",
                children: [
                  isGeneratingToken ? /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Share2, { className: "w-3.5 h-3.5" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "hidden xs:inline", children: "Copy Shareable Link" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "xs:hidden", children: "Share" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Button,
              {
                size: "sm",
                onClick: () => void handleDownloadPDF(),
                disabled: isDownloadingPDF,
                className: "gap-1.5",
                "data-ocid": "scan_detail.download_pdf_button",
                children: [
                  isDownloadingPDF ? /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-3.5 h-3.5 animate-spin" }) : /* @__PURE__ */ jsxRuntimeExports.jsx(Download, { className: "w-3.5 h-3.5" }),
                  isDownloadingPDF ? "Generating…" : "Download PDF"
                ]
              }
            )
          ] })
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { ref: printAreaRef, className: "flex flex-col gap-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 pb-4 border-b border-border mb-1", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg border border-border flex items-center justify-center bg-primary/10", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4 text-primary", "aria-hidden": "true" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-base font-bold text-foreground", children: "RetinaAI" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "Diabetic Retinopathy Screening Report" })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "rounded-2xl border border-border bg-card px-5 py-4",
          "data-ocid": "scan_detail.meta_card",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-bold text-xl text-foreground leading-tight", children: (profile == null ? void 0 : profile.name) ? `${profile.name}'s Screening Result` : "Your Screening Result" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5", "aria-hidden": "true" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { "data-ocid": "scan_detail.scan_date", children: [
                    scanDate,
                    scanTime && `, ${scanTime}`
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 font-mono text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5", "aria-hidden": "true" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { "data-ocid": "scan_detail.scan_id", children: [
                    "Scan #",
                    scanId
                  ] })
                ] })
              ] })
            ] }),
            profile && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right flex-shrink-0 flex flex-col gap-0.5", children: [
              profile.hbA1c ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "HbA1c" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono font-bold text-foreground text-lg", children: [
                  profile.hbA1c,
                  "%"
                ] })
              ] }) : null,
              profile.diabetesType ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs bg-muted/50 border border-border rounded-full px-2 py-0.5 self-end", children: String(profile.diabetesType) }) : null
            ] })
          ] })
        }
      ),
      (result == null ? void 0 : result.riskLevel) && /* @__PURE__ */ jsxRuntimeExports.jsx(RiskBanner, { riskLevel: result.riskLevel }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-2 gap-5 items-start", children: [
        imageUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ImagePanel,
          {
            imageUrl,
            heatmapUrl,
            scanId
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-col gap-4", children: result ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl border border-border bg-card px-5 py-5 flex flex-col gap-4",
              "data-ocid": "scan_detail.result_card",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-1 uppercase tracking-wide font-medium", children: "Diagnosis" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx(
                      "p",
                      {
                        className: "font-bold text-foreground text-base leading-snug",
                        "data-ocid": "scan_detail.dr_stage_label",
                        children: result.stage ? DR_LABEL[result.stage] ?? "Unknown" : "Result pending"
                      }
                    )
                  ] }),
                  result.riskLevel && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                    Badge,
                    {
                      variant: "outline",
                      className: cn(
                        "text-xs font-semibold border",
                        (RISK_CONFIG[result.riskLevel] ?? RISK_CONFIG[RiskLevel.Low]).badgeClass
                      ),
                      children: [
                        result.riskLevel,
                        " Risk"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(ConfidenceBar, { confidence: result.confidence ?? 0 }),
                result.stage && /* @__PURE__ */ jsxRuntimeExports.jsx(SeverityBar, { stage: result.stage }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: "text-sm text-muted-foreground leading-relaxed border-t border-border pt-4",
                    "data-ocid": "scan_detail.dr_description",
                    children: result.stage ? DR_DESCRIPTION[result.stage] ?? "Please consult an eye specialist for a full evaluation." : "Analysis complete — please see your doctor for next steps."
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl border border-border bg-muted/20 px-5 py-5 flex flex-col gap-3",
              "data-ocid": "scan_detail.guidance_panel",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-semibold text-foreground text-sm", children: "What Should I Do Next?" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "flex flex-col gap-2 text-sm text-muted-foreground", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold mt-0.5", children: "1." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Keep your blood sugar in check." }),
                      " ",
                      "Good HbA1c control slows or prevents retinopathy from getting worse."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold mt-0.5", children: "2." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Share this report with your doctor." }),
                      " ",
                      "Use the Copy Link or Download PDF button above."
                    ] })
                  ] }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary font-bold mt-0.5", children: "3." }),
                    /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-foreground", children: "Schedule a follow-up." }),
                      " ",
                      "Regular eye check-ups every 6–12 months are recommended for people with diabetes."
                    ] })
                  ] })
                ] })
              ]
            }
          )
        ] }) : (
          // Scan has no result yet
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl border border-border bg-card px-5 py-8 flex flex-col items-center gap-4 text-center",
              "data-ocid": "scan_detail.no_result_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-7 h-7 text-primary" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground mb-1", children: "Analysis not yet run" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground", children: "This scan hasn't been analysed yet. Go back and run the AI analysis." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    variant: "outline",
                    onClick: () => void navigate({ to: "/upload" }),
                    className: "gap-2",
                    "data-ocid": "scan_detail.run_analysis_button",
                    children: "Run New Scan"
                  }
                )
              ]
            }
          )
        ) })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-wrap items-center gap-3 pb-2",
        "data-ocid": "scan_detail.bottom_nav",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "outline",
              onClick: () => void navigate({ to: "/" }),
              className: "gap-2",
              "data-ocid": "scan_detail.back_home_bottom_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowLeft, { className: "w-4 h-4" }),
                "Back to My Scans"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              onClick: () => void navigate({ to: "/upload" }),
              className: "gap-2",
              "data-ocid": "scan_detail.new_scan_button",
              children: "New Screening"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            Button,
            {
              variant: "ghost",
              size: "sm",
              onClick: () => void handleGenerateShareLink(),
              disabled: isGeneratingToken,
              className: "gap-1.5 ml-auto",
              "data-ocid": "scan_detail.copy_link_bottom_button",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Copy, { className: "w-3.5 h-3.5" }),
                "Copy Shareable Link"
              ]
            }
          )
        ]
      }
    )
  ] });
}
export {
  ScanDetail as default
};

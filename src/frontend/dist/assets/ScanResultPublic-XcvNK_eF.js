import { t as useParams, v as useScanPublic, j as jsxRuntimeExports, T as TriangleAlert, L as Link, E as Eye, a as cn, B as Button, S as Skeleton, R as RiskLevel, r as reactExports, D as DRStage } from "./index-DvlEB_35.js";
import { B as Badge } from "./badge-DAa9bGcG.js";
import { a as Clock, b as CircleCheckBig, C as Calendar } from "./clock-EyHYImyW.js";
import { A as Activity } from "./activity-B8QHEl9v.js";
import { F as FileText, E as EyeOff } from "./file-text-DRT_pGE2.js";
import { S as ShieldAlert } from "./shield-alert-C_LRqQfQ.js";
const DR_LABEL = {
  [DRStage.NoRetinopathy]: "No Diabetic Retinopathy",
  [DRStage.Mild]: "Mild Diabetic Retinopathy",
  [DRStage.Moderate]: "Moderate Diabetic Retinopathy",
  [DRStage.Severe]: "Severe Diabetic Retinopathy",
  [DRStage.Proliferative]: "Proliferative Diabetic Retinopathy"
};
const DR_DESCRIPTION = {
  [DRStage.NoRetinopathy]: "No signs of diabetic retinopathy were found. Keep up regular check-ups.",
  [DRStage.Mild]: "Early changes are present. Maintain good blood sugar control.",
  [DRStage.Moderate]: "Changes in blood vessels detected. Further medical attention is recommended.",
  [DRStage.Severe]: "Significant changes detected. Please see an eye specialist soon.",
  [DRStage.Proliferative]: "Advanced retinal changes. Urgent eye care is strongly recommended."
};
const RISK_CONFIG = {
  [RiskLevel.Low]: {
    headline: "No significant signs detected",
    textClass: "text-green-400",
    borderClass: "border-green-500/30",
    bgClass: "bg-green-500/10",
    badgeClass: "border-green-500/40 text-green-400 bg-green-500/10",
    icon: CircleCheckBig
  },
  [RiskLevel.Moderate]: {
    headline: "Some early signs detected",
    textClass: "text-yellow-400",
    borderClass: "border-yellow-500/30",
    bgClass: "bg-yellow-500/10",
    badgeClass: "border-yellow-500/40 text-yellow-400 bg-yellow-500/10",
    icon: Clock
  },
  [RiskLevel.High]: {
    headline: "Significant signs detected",
    textClass: "text-red-400",
    borderClass: "border-red-500/40",
    bgClass: "bg-red-500/10",
    badgeClass: "border-red-500/40 text-red-400 bg-red-500/10",
    icon: TriangleAlert
  }
};
function PublicImageCard({
  imageUrl,
  heatmapUrl,
  stage,
  confidence
}) {
  const [showHeatmap, setShowHeatmap] = reactExports.useState(false);
  const confidencePct = confidence !== void 0 ? (confidence * 100).toFixed(1) : null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "rounded-2xl border border-border bg-card overflow-hidden",
      "data-ocid": "share.image_card",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-4 py-3 bg-muted/30 border-b border-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4 text-primary", "aria-hidden": "true" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-foreground text-sm", children: "Retinal Scan" })
          ] }),
          stage !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground font-medium bg-muted/50 border border-border rounded-full px-2 py-0.5", children: DR_LABEL[stage] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-square bg-black/60 overflow-hidden", children: imageUrl ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: imageUrl,
              alt: "Retinal scan",
              className: "w-full h-full object-contain"
            }
          ),
          showHeatmap && heatmapUrl && /* @__PURE__ */ jsxRuntimeExports.jsx(
            "img",
            {
              src: heatmapUrl,
              alt: "AI analysis overlay showing affected areas",
              className: "heatmap-overlay absolute inset-0 w-full h-full object-contain pointer-events-none"
            }
          )
        ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "w-full h-full flex flex-col items-center justify-center gap-3 text-muted-foreground p-8", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-12 h-12 opacity-20", "aria-hidden": "true" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-center", children: "No scan image available." })
        ] }) }),
        heatmapUrl && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-end px-4 py-2 border-b border-border bg-muted/20", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          "button",
          {
            type: "button",
            onClick: () => setShowHeatmap((v) => !v),
            className: "flex items-center gap-1.5 text-xs text-primary hover:text-primary/80 font-medium transition-smooth",
            "data-ocid": "share.heatmap_toggle",
            children: showHeatmap ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(EyeOff, { className: "w-3 h-3" }),
              " Hide AI Highlight"
            ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-3 h-3" }),
              " Show AI Highlight"
            ] })
          }
        ) }),
        stage !== void 0 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "px-4 py-3 bg-card", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2 mb-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Diagnosis" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-sm", children: DR_LABEL[stage] })
            ] }),
            confidencePct && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "AI Confidence" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "font-mono font-bold text-foreground text-base tabular-nums", children: [
                confidencePct,
                "%"
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed border-t border-border pt-2", children: DR_DESCRIPTION[stage] }),
          heatmapUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/60 mt-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "text-muted-foreground", children: "Legend:" }),
            " ",
            "Red/orange = high-risk · Blue/green = low-risk"
          ] })
        ] })
      ]
    }
  );
}
function PublicScanSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col gap-5 max-w-3xl mx-auto p-4 sm:p-6",
      "data-ocid": "share.loading_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-14 rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-xl max-w-sm mx-auto w-full" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-32 rounded-xl" })
      ]
    }
  );
}
function ScanResultPublic() {
  var _a;
  const params = useParams({ strict: false });
  const scanId = params.scanId ?? params.token ?? "";
  const { data: scan, isLoading } = useScanPublic(scanId);
  const typedScan = scan;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PublicScanSkeleton, {});
  }
  if (!typedScan) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "min-h-screen bg-background flex items-center justify-center p-6", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        className: "flex flex-col items-center gap-4 max-w-sm text-center",
        "data-ocid": "share.error_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-destructive/10 border border-destructive/25 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-8 h-8 text-destructive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-lg mb-1", children: "Result not found" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm", children: "This screening result doesn't exist or the link may have expired." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/login",
              className: "text-sm text-primary hover:text-primary/80 underline underline-offset-2 transition-smooth",
              "data-ocid": "share.back_link",
              children: "Sign in to view your own results"
            }
          )
        ]
      }
    ) });
  }
  const result = typedScan.result;
  const imageUrl = (_a = typedScan.imageId) == null ? void 0 : _a.getDirectURL();
  const heatmapUrl = result == null ? void 0 : result.heatmapImageUrl;
  const riskLevel = (result == null ? void 0 : result.riskLevel) ?? null;
  const riskCfg = riskLevel ? RISK_CONFIG[riskLevel] : null;
  const RiskIcon = (riskCfg == null ? void 0 : riskCfg.icon) ?? Activity;
  const scanDate = typedScan.uploadedAt !== void 0 ? new Date(Number(typedScan.uploadedAt) / 1e6).toLocaleDateString(
    "en-US",
    { year: "numeric", month: "long", day: "numeric" }
  ) : "—";
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "min-h-screen bg-background", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "bg-card border-b border-border px-4 py-3 flex items-center justify-between sticky top-0 z-30", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2.5", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-lg bg-primary/20 border border-primary/30 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-foreground text-sm", children: "RetinaAI" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground hidden sm:block", children: "— Shared Screening Result" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Link,
        {
          to: "/login",
          className: "text-xs text-primary hover:text-primary/80 font-medium underline underline-offset-2 transition-smooth",
          "data-ocid": "share.login_link",
          children: "Screen your own eyes"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("main", { className: "max-w-2xl mx-auto p-4 sm:p-6 flex flex-col gap-5 pb-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "div",
        {
          className: "rounded-2xl border border-border bg-card px-5 py-4",
          "data-ocid": "share.meta_card",
          children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-bold text-foreground text-xl leading-tight", children: "Retinal Screening Result" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5", "aria-hidden": "true" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "data-ocid": "share.scan_date", children: scanDate })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5 font-mono text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(FileText, { className: "w-3.5 h-3.5", "aria-hidden": "true" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                    "Scan #",
                    scanId
                  ] })
                ] })
              ] })
            ] }),
            riskLevel && riskCfg && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Badge,
              {
                variant: "outline",
                className: cn(
                  "text-sm px-3 py-1 font-semibold border",
                  riskCfg.badgeClass
                ),
                "data-ocid": "share.risk_badge",
                children: [
                  riskLevel,
                  " Risk"
                ]
              }
            )
          ] })
        }
      ),
      riskLevel && riskCfg && /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: cn(
            "rounded-2xl border px-5 py-4 flex items-start gap-4",
            riskCfg.borderClass,
            riskCfg.bgClass
          ),
          "data-ocid": "share.risk_banner",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              "div",
              {
                className: cn(
                  "flex-shrink-0 w-10 h-10 rounded-lg border flex items-center justify-center",
                  riskCfg.borderClass,
                  riskCfg.bgClass
                ),
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(RiskIcon, { className: cn("w-5 h-5", riskCfg.textClass) })
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: cn("font-bold text-base mb-1", riskCfg.textClass), children: riskCfg.headline }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "This is an AI-assisted screening result. It is not a medical diagnosis. Please consult an eye doctor to confirm this result." })
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        PublicImageCard,
        {
          imageUrl,
          heatmapUrl,
          stage: result == null ? void 0 : result.stage,
          confidence: result == null ? void 0 : result.confidence
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-2xl border border-yellow-500/25 bg-yellow-500/10 px-5 py-4 flex gap-3",
          "data-ocid": "share.disclaimer",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              ShieldAlert,
              {
                className: "w-5 h-5 text-yellow-400 flex-shrink-0 mt-0.5",
                "aria-hidden": "true"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-foreground/80 leading-relaxed", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-semibold block mb-0.5 text-foreground", children: "Important disclaimer" }),
              "This result is from an AI-based screening tool and is",
              " ",
              /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "not a substitute for professional medical diagnosis" }),
              ". Always follow up with a licensed eye specialist for a full evaluation and treatment plan."
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsxs(
        "div",
        {
          className: "rounded-2xl border border-primary/25 bg-primary/10 px-5 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4",
          "data-ocid": "share.cta_panel",
          children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-semibold text-foreground text-sm mb-0.5", children: "Want to screen your own eyes?" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "RetinaAI lets you upload your own fundus images and get instant AI-powered results — free." })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Button,
              {
                asChild: true,
                className: "flex-shrink-0",
                "data-ocid": "share.get_started_button",
                children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: "Get Started Free" })
              }
            )
          ]
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "text-center pt-2 pb-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
        "© ",
        (/* @__PURE__ */ new Date()).getFullYear(),
        " RetinaAI. Built with love using",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          "a",
          {
            href: `https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(
              typeof window !== "undefined" ? window.location.hostname : ""
            )}`,
            target: "_blank",
            rel: "noopener noreferrer",
            className: "text-primary/70 hover:text-primary underline underline-offset-2 transition-smooth",
            children: "caffeine.ai"
          }
        )
      ] }) })
    ] })
  ] });
}
export {
  ScanResultPublic as default
};

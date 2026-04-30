import { t as useParams, j as jsxRuntimeExports, T as TriangleAlert, B as Button, L as Link, E as Eye, a as cn, g as useBackend, w as useQuery, S as Skeleton } from "./index-DvlEB_35.js";
import { B as Badge } from "./badge-DAa9bGcG.js";
import { a as Clock, b as CircleCheckBig, C as Calendar } from "./clock-EyHYImyW.js";
import { S as ShieldAlert } from "./shield-alert-C_LRqQfQ.js";
const STAGE_LABELS = {
  NoRetinopathy: "No Diabetic Retinopathy",
  Mild: "Mild Diabetic Retinopathy",
  Moderate: "Moderate Diabetic Retinopathy",
  Severe: "Severe Diabetic Retinopathy",
  Proliferative: "Proliferative Diabetic Retinopathy"
};
const STAGE_DESCRIPTIONS = {
  NoRetinopathy: "Great news — no signs of diabetic retinopathy were found in your eye scan. Keep up with regular screenings to stay on top of your eye health.",
  Mild: "Early, small changes are present in the blood vessels of your eye. Continue monitoring and maintain good blood sugar control. Speak with your doctor at your next visit.",
  Moderate: "Noticeable changes in your eye's blood vessels are present. We recommend scheduling an eye specialist appointment for a full evaluation.",
  Severe: "Significant changes have been detected in your retina. Please see an eye specialist as soon as possible to prevent further vision loss.",
  Proliferative: "Advanced retinal changes are detected. Urgent eye care is strongly recommended — please see an eye specialist as soon as possible."
};
const STAGE_ORDER = [
  "NoRetinopathy",
  "Mild",
  "Moderate",
  "Severe",
  "Proliferative"
];
function getStageIndex(stage) {
  return STAGE_ORDER.indexOf(stage);
}
const RISK_CONFIG = {
  Low: {
    label: "Low Risk",
    headline: "No significant signs detected",
    badgeClass: "border-green-500/40 bg-green-500/10 text-green-400",
    bannerBg: "bg-green-500/10",
    bannerBorder: "border-green-500/25",
    textClass: "text-green-400",
    icon: CircleCheckBig
  },
  Moderate: {
    label: "Moderate Risk",
    headline: "Some early signs detected",
    badgeClass: "border-yellow-500/40 bg-yellow-500/10 text-yellow-400",
    bannerBg: "bg-yellow-500/10",
    bannerBorder: "border-yellow-500/25",
    textClass: "text-yellow-400",
    icon: Clock
  },
  High: {
    label: "High Risk",
    headline: "Significant signs detected",
    badgeClass: "border-red-500/40 bg-red-500/10 text-red-400",
    bannerBg: "bg-red-500/10",
    bannerBorder: "border-red-500/25",
    textClass: "text-red-400",
    icon: TriangleAlert
  }
};
function extractStage(result) {
  if (!result) return null;
  const raw = result.stage;
  if (!raw) return null;
  if (typeof raw === "string") return raw;
  if (typeof raw === "object") {
    const keys = Object.keys(raw);
    if (keys.length > 0 && keys[0]) return keys[0];
  }
  return null;
}
function extractRiskLevel(result) {
  if (!result) return null;
  const raw = result.riskLevel;
  if (!raw) return null;
  if (typeof raw === "string") return raw;
  if (typeof raw === "object") {
    const keys = Object.keys(raw);
    if (keys.length > 0 && keys[0]) return keys[0];
  }
  return null;
}
function extractConfidence(result) {
  if (!result) return 0;
  const raw = result.confidence;
  if (typeof raw === "number") return Math.max(0, Math.min(1, raw));
  return 0;
}
function extractHeatmapUrl(scan) {
  var _a;
  if (!scan) return null;
  const heatmap = (_a = scan.result) == null ? void 0 : _a.heatmapImageUrl;
  if (typeof heatmap === "string" && heatmap) return heatmap;
  const scanAny = scan;
  if (typeof scanAny.heatmapImageUrl === "string")
    return scanAny.heatmapImageUrl;
  return null;
}
function SharedResultSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "flex flex-col gap-5 max-w-2xl mx-auto p-4 sm:p-6",
      "data-ocid": "share.loading_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-12 rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "aspect-square rounded-xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-xl" })
      ]
    }
  );
}
function useSharedScan(token) {
  const { backend, isReady } = useBackend();
  return useQuery({
    queryKey: ["sharedScan", token],
    queryFn: async () => {
      if (!backend || !token) return null;
      try {
        const result = await backend.getSharedScan(token);
        if (result === void 0 || result === null) return null;
        if (typeof result === "object" && "__kind__" in result) {
          return result.__kind__ === "Some" ? result.value : null;
        }
        return result;
      } catch (err) {
        console.error("[SharedResult] getSharedScan error:", err);
        return null;
      }
    },
    enabled: isReady && !!token,
    staleTime: 12e4,
    retry: 1
  });
}
function SharedResult() {
  const params = useParams({ strict: false });
  const token = params.token ?? "";
  const { data: sharedScan, isLoading } = useSharedScan(token);
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(SharedResultSkeleton, {});
  }
  if (!sharedScan) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      "div",
      {
        className: "min-h-screen bg-background flex items-center justify-center p-6",
        "data-ocid": "share.error_state",
        children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col items-center gap-5 max-w-sm text-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-destructive/10 border border-destructive/25 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(TriangleAlert, { className: "w-8 h-8 text-destructive" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "font-bold text-foreground text-lg mb-2", children: "This link is no longer available" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-sm leading-relaxed", children: "This result link is no longer available or has expired. The patient may have removed access to this scan." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { asChild: true, variant: "outline", "data-ocid": "share.home_link", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: "Screen yourself at RetinaAI" }) })
        ] })
      }
    );
  }
  const resultRaw = sharedScan.result ?? null;
  const stage = extractStage(resultRaw);
  const riskLevel = extractRiskLevel(resultRaw);
  const confidence = extractConfidence(resultRaw);
  const heatmapImageUrl = extractHeatmapUrl(sharedScan);
  const riskCfg = riskLevel ? RISK_CONFIG[riskLevel] ?? null : null;
  const RiskIcon = (riskCfg == null ? void 0 : riskCfg.icon) ?? Clock;
  const scanDate = sharedScan.uploadedAt !== void 0 && sharedScan.uploadedAt !== null ? new Date(Number(sharedScan.uploadedAt) / 1e6).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "long",
      day: "numeric"
    }
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
          children: "Screen yourself free"
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "main",
      {
        className: "max-w-2xl mx-auto p-4 sm:p-6 flex flex-col gap-5 pb-10",
        "data-ocid": "share.page",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "div",
            {
              className: "rounded-2xl border border-border bg-card px-5 py-4",
              "data-ocid": "share.meta_card",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-wrap items-start justify-between gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "font-bold text-foreground text-xl font-display leading-tight", children: "Retinal Screening Result" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex flex-wrap items-center gap-3 mt-1.5 text-sm text-muted-foreground", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "flex items-center gap-1.5", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Calendar, { className: "w-3.5 h-3.5", "aria-hidden": "true" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("span", { "data-ocid": "share.scan_date", children: scanDate })
                  ] }) })
                ] }),
                riskLevel && riskCfg && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Badge,
                  {
                    variant: "outline",
                    className: cn(
                      "text-sm px-3 py-1 font-semibold border",
                      riskCfg.badgeClass
                    ),
                    "data-ocid": "share.risk_badge",
                    children: riskCfg.label
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
                riskCfg.bannerBorder,
                riskCfg.bannerBg
              ),
              "data-ocid": "share.risk_banner",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "div",
                  {
                    className: cn(
                      "flex-shrink-0 w-10 h-10 rounded-lg border flex items-center justify-center",
                      riskCfg.bannerBorder,
                      riskCfg.bannerBg
                    ),
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(RiskIcon, { className: cn("w-5 h-5", riskCfg.textClass) })
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: cn("font-bold text-base mb-1", riskCfg.textClass), children: riskCfg.headline }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "This is an AI-assisted screening result. It is not a medical diagnosis. Always consult a licensed eye specialist for a full evaluation." })
                ] })
              ]
            }
          ),
          stage && resultRaw && heatmapImageUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card overflow-hidden", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "relative aspect-square bg-black overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
              "img",
              {
                src: heatmapImageUrl,
                alt: "Retinal scan heatmap",
                className: "w-full h-full object-contain",
                onError: (e) => {
                  e.target.style.display = "none";
                }
              }
            ) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-4 py-2 border-b border-border bg-muted/30", children: /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: "Retinal scan heatmap — AI-highlighted regions of interest" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "p-4 space-y-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "Finding" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-bold text-foreground", children: STAGE_LABELS[stage] ?? stage })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-right", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mb-0.5", children: "AI Confidence" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-base font-mono font-bold text-foreground tabular-nums", children: [
                    (confidence * 100).toFixed(1),
                    "%"
                  ] })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex gap-1", role: "presentation", children: STAGE_ORDER.map((s, i) => {
                  const stageIndex = getStageIndex(stage);
                  return /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: cn(
                        "h-1.5 flex-1 rounded-full transition-smooth",
                        i === 0 && "bg-green-500",
                        i === 1 && "bg-yellow-500",
                        i === 2 && "bg-orange-500",
                        i === 3 && "bg-red-500",
                        i === 4 && "bg-red-700",
                        i < stageIndex && "opacity-35",
                        i === stageIndex && "opacity-100",
                        i > stageIndex && "opacity-15"
                      ),
                      title: STAGE_LABELS[s] ?? s
                    },
                    s
                  );
                }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-muted-foreground mt-1", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "No DR" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Proliferative" })
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-relaxed border-t border-border pt-3", children: STAGE_DESCRIPTIONS[stage] ?? "Please consult an eye specialist for a full evaluation." })
            ] })
          ] }),
          stage && resultRaw && !heatmapImageUrl && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-border bg-card p-6 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-5 h-5 text-primary" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground", children: STAGE_LABELS[stage] ?? stage })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: STAGE_DESCRIPTIONS[stage] ?? "Please consult an eye specialist for a full evaluation." }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "AI Confidence:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "font-mono font-bold text-foreground", children: [
                (confidence * 100).toFixed(1),
                "%"
              ] })
            ] })
          ] }),
          !resultRaw && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "rounded-2xl border border-border bg-card p-6 text-center",
              "data-ocid": "share.pending_state",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Clock, { className: "w-8 h-8 text-muted-foreground mx-auto mb-3" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground mb-1", children: "Analysis Pending" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "The AI classification for this scan is still being processed." })
              ]
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
                    className: "w-5 h-5 text-yellow-500 flex-shrink-0 mt-0.5",
                    "aria-hidden": "true"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-sm text-foreground/80 leading-relaxed", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { className: "font-semibold block mb-0.5 text-foreground", children: "Important disclaimer" }),
                  "This is a shared result — not a substitute for professional medical advice. This AI-based screening tool helps identify potential signs of diabetic retinopathy. Always follow up with a licensed eye specialist for a full evaluation and treatment plan."
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
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: "RetinaAI lets you upload your own fundus images and get instant AI-powered results — for free." })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    asChild: true,
                    className: "flex-shrink-0",
                    "data-ocid": "share.cta_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/login", children: "Screen yourself at RetinaAI" })
                  }
                )
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "text-center pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground", children: [
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
        ]
      }
    )
  ] });
}
export {
  SharedResult as default
};

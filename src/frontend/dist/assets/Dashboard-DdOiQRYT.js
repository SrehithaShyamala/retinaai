import { c as createLucideIcon, r as reactExports, j as jsxRuntimeExports, a as cn, m as motion, U as User, B as Button, L as Link, u as useNavigate, b as useAuth, d as useMyProfile, e as useMyScans, C as CirclePlus, S as Skeleton, E as Eye, R as RiskLevel, A as ArrowRight, D as DRStage, f as ShieldCheck } from "./index-DvlEB_35.js";
import { B as Badge } from "./badge-DAa9bGcG.js";
import { P as Primitive } from "./index-BnxY5ynD.js";
import { A as Activity } from "./activity-B8QHEl9v.js";
import { C as CircleAlert } from "./circle-alert-D0vYpsCu.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [
  ["path", { d: "M8 2v4", key: "1cmpym" }],
  ["path", { d: "M16 2v4", key: "4m81vk" }],
  ["rect", { width: "18", height: "18", x: "3", y: "4", rx: "2", key: "1hopcy" }],
  ["path", { d: "M3 10h18", key: "8toen8" }],
  ["path", { d: "M8 14h.01", key: "6423bh" }],
  ["path", { d: "M12 14h.01", key: "1etili" }],
  ["path", { d: "M16 14h.01", key: "1gbofw" }],
  ["path", { d: "M8 18h.01", key: "lrp35t" }],
  ["path", { d: "M12 18h.01", key: "mhygvu" }],
  ["path", { d: "M16 18h.01", key: "kzsmim" }]
];
const CalendarDays = createLucideIcon("calendar-days", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  [
    "path",
    {
      d: "M7 16.3c2.2 0 4-1.83 4-4.05 0-1.16-.57-2.26-1.71-3.19S7.29 6.75 7 5.3c-.29 1.45-1.14 2.84-2.29 3.76S3 11.1 3 12.25c0 2.22 1.8 4.05 4 4.05z",
      key: "1ptgy4"
    }
  ],
  [
    "path",
    {
      d: "M12.56 6.6A10.97 10.97 0 0 0 14 3.02c.5 2.5 2 4.9 4 6.5s3 3.5 3 5.5a6.98 6.98 0 0 1-11.91 4.97",
      key: "1sl1rz"
    }
  ]
];
const Droplets = createLucideIcon("droplets", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  [
    "path",
    {
      d: "M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z",
      key: "1a8usu"
    }
  ],
  ["path", { d: "m15 5 4 4", key: "1mk7zo" }]
];
const Pencil = createLucideIcon("pencil", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M16 7h6v6", key: "box55l" }],
  ["path", { d: "m22 7-8.5 8.5-5-5L2 17", key: "1t1m79" }]
];
const TrendingUp = createLucideIcon("trending-up", __iconNode);
var NAME = "Separator";
var DEFAULT_ORIENTATION = "horizontal";
var ORIENTATIONS = ["horizontal", "vertical"];
var Separator$1 = reactExports.forwardRef((props, forwardedRef) => {
  const { decorative, orientation: orientationProp = DEFAULT_ORIENTATION, ...domProps } = props;
  const orientation = isValidOrientation(orientationProp) ? orientationProp : DEFAULT_ORIENTATION;
  const ariaOrientation = orientation === "vertical" ? orientation : void 0;
  const semanticProps = decorative ? { role: "none" } : { "aria-orientation": ariaOrientation, role: "separator" };
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.div,
    {
      "data-orientation": orientation,
      ...semanticProps,
      ...domProps,
      ref: forwardedRef
    }
  );
});
Separator$1.displayName = NAME;
function isValidOrientation(orientation) {
  return ORIENTATIONS.includes(orientation);
}
var Root = Separator$1;
function Separator({
  className,
  orientation = "horizontal",
  decorative = true,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "separator",
      decorative,
      orientation,
      className: cn(
        "bg-border shrink-0 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-px",
        className
      ),
      ...props
    }
  );
}
function ProfileStat({
  label,
  value,
  icon,
  highlight
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-1 px-5 py-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-1.5 text-xs text-muted-foreground", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-primary", children: icon }),
      label
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: cn(
          "text-base font-semibold text-foreground leading-tight truncate",
          highlight === "high" && "text-red-400",
          highlight === "moderate" && "text-orange-400"
        ),
        children: value
      }
    )
  ] });
}
function ProfileSummary({ profile }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": "dashboard.profile_card",
      initial: { opacity: 0, y: -12 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4 },
      className: "rounded-2xl border border-border bg-card overflow-hidden",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border bg-muted/20", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 15, className: "text-primary" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: "My Health Profile" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "outline",
              size: "sm",
              className: "text-xs gap-1.5",
              "data-ocid": "dashboard.profile_edit_button",
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/profile", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(Pencil, { className: "w-3.5 h-3.5" }),
                "Edit"
              ] })
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-border", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProfileStat,
            {
              label: "Name",
              value: profile.name,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { size: 14 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProfileStat,
            {
              label: "Age",
              value: `${String(profile.age)} years`,
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { size: 14 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProfileStat,
            {
              label: "Diabetes Type",
              value: String(profile.diabetesType),
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(Droplets, { size: 14 })
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            ProfileStat,
            {
              label: "HbA1c",
              value: profile.hbA1c !== void 0 ? `${profile.hbA1c.toFixed(1)}%` : "N/A",
              icon: /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { size: 14 }),
              highlight: profile.hbA1c === void 0 ? "normal" : profile.hbA1c >= 8 ? "high" : profile.hbA1c >= 6.5 ? "moderate" : "normal"
            }
          )
        ] })
      ]
    }
  );
}
function formatDate(nanoseconds) {
  return new Date(Number(nanoseconds) / 1e6).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric"
  });
}
function getRiskStyle(risk) {
  if (risk === RiskLevel.High)
    return "text-red-400 bg-red-500/10 border-red-500/30";
  if (risk === RiskLevel.Moderate)
    return "text-orange-400 bg-orange-500/10 border-orange-500/30";
  return "text-green-400 bg-green-500/10 border-green-500/30";
}
function getRiskIcon(risk) {
  if (risk === RiskLevel.High) return /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "w-4 h-4" });
  if (risk === RiskLevel.Moderate) return /* @__PURE__ */ jsxRuntimeExports.jsx(TrendingUp, { className: "w-4 h-4" });
  return /* @__PURE__ */ jsxRuntimeExports.jsx(ShieldCheck, { className: "w-4 h-4" });
}
function getRiskMessage(risk) {
  if (risk === RiskLevel.High) return "Please see an eye specialist soon.";
  if (risk === RiskLevel.Moderate)
    return "Continue monitoring — book a check-up.";
  return "Keep it up! Your eyes are looking healthy.";
}
const DR_STAGE_SHORT = {
  [DRStage.NoRetinopathy]: "No DR",
  [DRStage.Mild]: "Mild DR",
  [DRStage.Moderate]: "Moderate DR",
  [DRStage.Severe]: "Severe DR",
  [DRStage.Proliferative]: "Proliferative DR"
};
const DR_STAGE_COLORS = {
  [DRStage.NoRetinopathy]: "text-green-400 bg-green-500/15 border-green-500/30",
  [DRStage.Mild]: "text-yellow-400 bg-yellow-500/15 border-yellow-500/30",
  [DRStage.Moderate]: "text-orange-400 bg-orange-500/15 border-orange-500/30",
  [DRStage.Severe]: "text-red-400 bg-red-500/15 border-red-500/30",
  [DRStage.Proliferative]: "text-red-300 bg-red-700/20 border-red-600/40"
};
function EmptyScansState() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": "dashboard.empty_state",
      initial: { opacity: 0, y: 16 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5, delay: 0.2 },
      className: "flex flex-col items-center justify-center py-20 px-6 text-center",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-20 h-20 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center mb-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { size: 36, className: "text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-display font-bold text-foreground mb-2", children: "No scans yet — let's get started!" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground text-base max-w-sm mb-8 leading-relaxed", children: "Upload a photo of your eye and our AI will check it for signs of diabetic retinopathy in seconds." }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            size: "lg",
            className: "gap-2 text-base px-8",
            "data-ocid": "dashboard.empty_state.upload_button",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/upload", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-5 h-5" }),
              "Upload Your First Scan"
            ] })
          }
        )
      ]
    }
  );
}
function ScanStats({
  scans,
  latestStage,
  overallRisk
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": "dashboard.stats",
      initial: { opacity: 0, y: 10 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.4, delay: 0.1 },
      className: "grid grid-cols-3 gap-3",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "dashboard.total_scans_card",
            className: "rounded-2xl border bg-card p-5 flex flex-col gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: "Total Scans" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Activity, { className: "w-4 h-4 text-primary" }) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-3xl font-bold font-mono text-foreground leading-none", children: scans.length })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "dashboard.latest_stage_card",
            className: "rounded-2xl border bg-card p-5 flex flex-col gap-2",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: "Latest Result" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4 text-primary" }) })
              ] }),
              latestStage !== null ? /* @__PURE__ */ jsxRuntimeExports.jsx(
                "span",
                {
                  className: cn(
                    "inline-flex items-center rounded-full text-xs font-semibold border px-2 py-0.5 w-fit",
                    DR_STAGE_COLORS[latestStage]
                  ),
                  children: DR_STAGE_SHORT[latestStage]
                }
              ) : /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs text-muted-foreground", children: "Pending" })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "div",
          {
            "data-ocid": "dashboard.risk_level_card",
            className: cn(
              "rounded-2xl border p-5 flex flex-col gap-2",
              overallRisk === RiskLevel.High ? "border-red-500/30 bg-red-500/5" : overallRisk === RiskLevel.Moderate ? "border-orange-500/30 bg-orange-500/5" : "border-green-500/20 bg-green-500/5"
            ),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground font-medium", children: "Risk Level" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-8 h-8 rounded-xl bg-card flex items-center justify-center", children: getRiskIcon(overallRisk) })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "p",
                  {
                    className: cn(
                      "text-xl font-bold font-display",
                      overallRisk === RiskLevel.High ? "text-red-400" : overallRisk === RiskLevel.Moderate ? "text-orange-400" : "text-green-400"
                    ),
                    children: overallRisk ?? "—"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground leading-snug", children: getRiskMessage(overallRisk) })
              ] })
            ]
          }
        )
      ]
    }
  );
}
function ScanRow({ scan, index }) {
  var _a, _b;
  const navigate = useNavigate();
  const risk = ((_a = scan.result) == null ? void 0 : _a.riskLevel) ?? null;
  const stage = ((_b = scan.result) == null ? void 0 : _b.stage) ?? null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      "data-ocid": `dashboard.scan_item.${index + 1}`,
      initial: { opacity: 0, x: -10 },
      animate: { opacity: 1, x: 0 },
      transition: { duration: 0.3, delay: index * 0.06 },
      onClick: () => void navigate({
        to: "/scan/$scanId",
        params: { scanId: String(scan.id) }
      }),
      className: "group flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 px-5 py-4 border-b border-border/60 last:border-b-0 hover:bg-muted/20 cursor-pointer transition-smooth",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs text-muted-foreground font-mono w-28 flex-shrink-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { size: 13 }),
          formatDate(scan.uploadedAt)
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-3 flex-1 min-w-0", children: stage !== null ? /* @__PURE__ */ jsxRuntimeExports.jsx(
          "span",
          {
            className: cn(
              "inline-flex items-center rounded-full text-xs font-semibold border px-2.5 py-0.5",
              DR_STAGE_COLORS[stage]
            ),
            children: DR_STAGE_SHORT[stage]
          }
        ) : /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "outline", className: "text-xs text-muted-foreground", children: "Pending analysis" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 flex-shrink-0", children: [
          risk && /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "span",
            {
              className: cn(
                "inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold border",
                getRiskStyle(risk)
              ),
              children: [
                getRiskIcon(risk),
                risk,
                " Risk"
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Button,
            {
              asChild: true,
              variant: "ghost",
              size: "sm",
              "data-ocid": `dashboard.scan_view_button.${index + 1}`,
              className: "h-7 px-2 text-xs text-primary hover:text-primary hover:bg-primary/10 gap-1",
              onClick: (e) => e.stopPropagation(),
              children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/scan/$scanId", params: { scanId: String(scan.id) }, children: [
                "View ",
                /* @__PURE__ */ jsxRuntimeExports.jsx(ArrowRight, { size: 11 })
              ] })
            }
          )
        ] })
      ]
    }
  );
}
function DashboardSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-4 sm:p-6 space-y-6 max-w-3xl mx-auto",
      "data-ocid": "dashboard.loading_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-28 rounded-2xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-20 rounded-2xl" }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-3 gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-2xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-2xl" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-24 rounded-2xl" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl border border-border bg-card overflow-hidden", children: [1, 2, 3].map((i) => /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "px-5 py-4 border-b border-border/60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-8 w-full" }) }, i)) })
      ]
    }
  );
}
function Dashboard() {
  var _a, _b;
  const navigate = useNavigate();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const { data: profile, isLoading: profileLoading } = useMyProfile();
  const { data: myScans, isLoading: scansLoading } = useMyScans();
  const isLoading = authLoading || profileLoading || scansLoading;
  const scans = Array.isArray(myScans) ? myScans : [];
  reactExports.useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      void navigate({ to: "/login" });
    }
  }, [authLoading, isAuthenticated, navigate]);
  reactExports.useEffect(() => {
    if (!profileLoading && !authLoading && isAuthenticated && profile === null) {
      void navigate({ to: "/profile" });
    }
  }, [profileLoading, authLoading, isAuthenticated, profile, navigate]);
  if (isLoading) return /* @__PURE__ */ jsxRuntimeExports.jsx(DashboardSkeleton, {});
  if (!isAuthenticated) return null;
  const latestScan = scans[0];
  const latestStage = ((_a = latestScan == null ? void 0 : latestScan.result) == null ? void 0 : _a.stage) ?? null;
  const overallRisk = ((_b = latestScan == null ? void 0 : latestScan.result) == null ? void 0 : _b.riskLevel) ?? null;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "p-4 sm:p-6 space-y-6 max-w-3xl mx-auto",
      "data-ocid": "dashboard.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          motion.div,
          {
            initial: { opacity: 0, y: -10 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4 },
            className: "rounded-2xl bg-gradient-to-br from-primary/20 via-primary/10 to-transparent border border-primary/20 p-6",
            "data-ocid": "dashboard.welcome_banner",
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center justify-between gap-4", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-2xl font-display font-bold text-foreground", children: (profile == null ? void 0 : profile.name) ? `Welcome back, ${profile.name} 👋` : "Welcome back 👋" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-muted-foreground mt-1 text-base leading-relaxed", children: scans.length > 0 ? `You have ${scans.length} eye scan${scans.length !== 1 ? "s" : ""} on record.` : "Ready for your first eye scan? It only takes a minute." })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  asChild: true,
                  size: "lg",
                  className: "gap-2 flex-shrink-0 text-base",
                  "data-ocid": "dashboard.upload_scan_button",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/upload", children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-5 h-5" }),
                    "Upload New Scan"
                  ] })
                }
              )
            ] })
          }
        ),
        profile && /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileSummary, { profile }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Separator, { className: "bg-border/50" }),
        scans.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx(
          ScanStats,
          {
            scans,
            latestStage,
            overallRisk
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.section,
          {
            initial: { opacity: 0, y: 16 },
            animate: { opacity: 1, y: 0 },
            transition: { duration: 0.4, delay: 0.2 },
            className: "rounded-2xl border border-border bg-card overflow-hidden",
            "data-ocid": "dashboard.history_section",
            "aria-label": "Your scan history",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between px-5 py-4 border-b border-border bg-muted/20", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CalendarDays, { size: 15, className: "text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-sm font-semibold text-foreground", children: "Your Scan History" }),
                  scans.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "ml-1 px-2 py-0.5 rounded-full bg-primary/15 text-primary text-xs font-mono", children: scans.length })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Button,
                  {
                    asChild: true,
                    variant: "outline",
                    size: "sm",
                    className: "text-xs gap-1.5",
                    "data-ocid": "dashboard.history_new_scan_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/upload", children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-3.5 h-3.5" }),
                      " New Scan"
                    ] })
                  }
                )
              ] }),
              scans.length === 0 ? /* @__PURE__ */ jsxRuntimeExports.jsx(EmptyScansState, {}) : /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-ocid": "dashboard.scan_list", children: scans.map((scan, idx) => /* @__PURE__ */ jsxRuntimeExports.jsx(
                ScanRow,
                {
                  scan,
                  index: idx
                },
                `scan-${String(scan.id)}`
              )) })
            ]
          }
        ),
        scans.length > 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "fixed bottom-6 right-6 z-50 sm:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
          Button,
          {
            asChild: true,
            size: "lg",
            className: "rounded-full w-14 h-14 p-0 shadow-lg",
            "data-ocid": "dashboard.fab_upload_button",
            "aria-label": "Upload a new scan",
            children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/upload", children: /* @__PURE__ */ jsxRuntimeExports.jsx(CirclePlus, { className: "w-6 h-6" }) })
          }
        ) })
      ]
    }
  );
}
export {
  Dashboard as default
};

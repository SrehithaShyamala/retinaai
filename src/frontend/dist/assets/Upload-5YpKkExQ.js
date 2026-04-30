import { c as createLucideIcon, r as reactExports, M as MotionConfigContext, j as jsxRuntimeExports, k as isHTMLElement, l as useConstant, P as PresenceContext, n as usePresence, o as useIsomorphicLayoutEffect, p as LayoutGroupContext, u as useNavigate, d as useMyProfile, g as useBackend, q as ExternalBlob, m as motion, E as Eye, L as Link, B as Button, h as ue, s as LoaderCircle, a as cn } from "./index-DvlEB_35.js";
import { B as Badge } from "./badge-DAa9bGcG.js";
import { C as CircleCheck } from "./circle-check-bfJbAE2u.js";
import { C as CircleAlert } from "./circle-alert-D0vYpsCu.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$3 = [["path", { d: "m9 18 6-6-6-6", key: "mthhwq" }]];
const ChevronRight = createLucideIcon("chevron-right", __iconNode$3);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$2 = [
  ["path", { d: "M3 7V5a2 2 0 0 1 2-2h2", key: "aa7l1z" }],
  ["path", { d: "M17 3h2a2 2 0 0 1 2 2v2", key: "4qcy5o" }],
  ["path", { d: "M21 17v2a2 2 0 0 1-2 2h-2", key: "6vwrx8" }],
  ["path", { d: "M7 21H5a2 2 0 0 1-2-2v-2", key: "ioqczr" }]
];
const Scan = createLucideIcon("scan", __iconNode$2);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode$1 = [
  ["path", { d: "M12 3v12", key: "1x0j5s" }],
  ["path", { d: "m17 8-5-5-5 5", key: "7q97r8" }],
  ["path", { d: "M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4", key: "ih7n3h" }]
];
const Upload$1 = createLucideIcon("upload", __iconNode$1);
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  ["path", { d: "M18 6 6 18", key: "1bl5f8" }],
  ["path", { d: "m6 6 12 12", key: "d8bk6v" }]
];
const X = createLucideIcon("x", __iconNode);
function setRef(ref, value) {
  if (typeof ref === "function") {
    return ref(value);
  } else if (ref !== null && ref !== void 0) {
    ref.current = value;
  }
}
function composeRefs(...refs) {
  return (node) => {
    let hasCleanup = false;
    const cleanups = refs.map((ref) => {
      const cleanup = setRef(ref, node);
      if (!hasCleanup && typeof cleanup === "function") {
        hasCleanup = true;
      }
      return cleanup;
    });
    if (hasCleanup) {
      return () => {
        for (let i = 0; i < cleanups.length; i++) {
          const cleanup = cleanups[i];
          if (typeof cleanup === "function") {
            cleanup();
          } else {
            setRef(refs[i], null);
          }
        }
      };
    }
  };
}
function useComposedRefs(...refs) {
  return reactExports.useCallback(composeRefs(...refs), refs);
}
class PopChildMeasure extends reactExports.Component {
  getSnapshotBeforeUpdate(prevProps) {
    const element = this.props.childRef.current;
    if (isHTMLElement(element) && prevProps.isPresent && !this.props.isPresent && this.props.pop !== false) {
      const parent = element.offsetParent;
      const parentWidth = isHTMLElement(parent) ? parent.offsetWidth || 0 : 0;
      const parentHeight = isHTMLElement(parent) ? parent.offsetHeight || 0 : 0;
      const computedStyle = getComputedStyle(element);
      const size = this.props.sizeRef.current;
      size.height = parseFloat(computedStyle.height);
      size.width = parseFloat(computedStyle.width);
      size.top = element.offsetTop;
      size.left = element.offsetLeft;
      size.right = parentWidth - size.width - size.left;
      size.bottom = parentHeight - size.height - size.top;
    }
    return null;
  }
  /**
   * Required with getSnapshotBeforeUpdate to stop React complaining.
   */
  componentDidUpdate() {
  }
  render() {
    return this.props.children;
  }
}
function PopChild({ children, isPresent, anchorX, anchorY, root, pop }) {
  var _a;
  const id = reactExports.useId();
  const ref = reactExports.useRef(null);
  const size = reactExports.useRef({
    width: 0,
    height: 0,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  });
  const { nonce } = reactExports.useContext(MotionConfigContext);
  const childRef = ((_a = children.props) == null ? void 0 : _a.ref) ?? (children == null ? void 0 : children.ref);
  const composedRef = useComposedRefs(ref, childRef);
  reactExports.useInsertionEffect(() => {
    const { width, height, top, left, right, bottom } = size.current;
    if (isPresent || pop === false || !ref.current || !width || !height)
      return;
    const x = anchorX === "left" ? `left: ${left}` : `right: ${right}`;
    const y = anchorY === "bottom" ? `bottom: ${bottom}` : `top: ${top}`;
    ref.current.dataset.motionPopId = id;
    const style = document.createElement("style");
    if (nonce)
      style.nonce = nonce;
    const parent = root ?? document.head;
    parent.appendChild(style);
    if (style.sheet) {
      style.sheet.insertRule(`
          [data-motion-pop-id="${id}"] {
            position: absolute !important;
            width: ${width}px !important;
            height: ${height}px !important;
            ${x}px !important;
            ${y}px !important;
          }
        `);
    }
    return () => {
      var _a2;
      (_a2 = ref.current) == null ? void 0 : _a2.removeAttribute("data-motion-pop-id");
      if (parent.contains(style)) {
        parent.removeChild(style);
      }
    };
  }, [isPresent]);
  return jsxRuntimeExports.jsx(PopChildMeasure, { isPresent, childRef: ref, sizeRef: size, pop, children: pop === false ? children : reactExports.cloneElement(children, { ref: composedRef }) });
}
const PresenceChild = ({ children, initial, isPresent, onExitComplete, custom, presenceAffectsLayout, mode, anchorX, anchorY, root }) => {
  const presenceChildren = useConstant(newChildrenMap);
  const id = reactExports.useId();
  let isReusedContext = true;
  let context = reactExports.useMemo(() => {
    isReusedContext = false;
    return {
      id,
      initial,
      isPresent,
      custom,
      onExitComplete: (childId) => {
        presenceChildren.set(childId, true);
        for (const isComplete of presenceChildren.values()) {
          if (!isComplete)
            return;
        }
        onExitComplete && onExitComplete();
      },
      register: (childId) => {
        presenceChildren.set(childId, false);
        return () => presenceChildren.delete(childId);
      }
    };
  }, [isPresent, presenceChildren, onExitComplete]);
  if (presenceAffectsLayout && isReusedContext) {
    context = { ...context };
  }
  reactExports.useMemo(() => {
    presenceChildren.forEach((_, key) => presenceChildren.set(key, false));
  }, [isPresent]);
  reactExports.useEffect(() => {
    !isPresent && !presenceChildren.size && onExitComplete && onExitComplete();
  }, [isPresent]);
  children = jsxRuntimeExports.jsx(PopChild, { pop: mode === "popLayout", isPresent, anchorX, anchorY, root, children });
  return jsxRuntimeExports.jsx(PresenceContext.Provider, { value: context, children });
};
function newChildrenMap() {
  return /* @__PURE__ */ new Map();
}
const getChildKey = (child) => child.key || "";
function onlyElements(children) {
  const filtered = [];
  reactExports.Children.forEach(children, (child) => {
    if (reactExports.isValidElement(child))
      filtered.push(child);
  });
  return filtered;
}
const AnimatePresence = ({ children, custom, initial = true, onExitComplete, presenceAffectsLayout = true, mode = "sync", propagate = false, anchorX = "left", anchorY = "top", root }) => {
  const [isParentPresent, safeToRemove] = usePresence(propagate);
  const presentChildren = reactExports.useMemo(() => onlyElements(children), [children]);
  const presentKeys = propagate && !isParentPresent ? [] : presentChildren.map(getChildKey);
  const isInitialRender = reactExports.useRef(true);
  const pendingPresentChildren = reactExports.useRef(presentChildren);
  const exitComplete = useConstant(() => /* @__PURE__ */ new Map());
  const exitingComponents = reactExports.useRef(/* @__PURE__ */ new Set());
  const [diffedChildren, setDiffedChildren] = reactExports.useState(presentChildren);
  const [renderedChildren, setRenderedChildren] = reactExports.useState(presentChildren);
  useIsomorphicLayoutEffect(() => {
    isInitialRender.current = false;
    pendingPresentChildren.current = presentChildren;
    for (let i = 0; i < renderedChildren.length; i++) {
      const key = getChildKey(renderedChildren[i]);
      if (!presentKeys.includes(key)) {
        if (exitComplete.get(key) !== true) {
          exitComplete.set(key, false);
        }
      } else {
        exitComplete.delete(key);
        exitingComponents.current.delete(key);
      }
    }
  }, [renderedChildren, presentKeys.length, presentKeys.join("-")]);
  const exitingChildren = [];
  if (presentChildren !== diffedChildren) {
    let nextChildren = [...presentChildren];
    for (let i = 0; i < renderedChildren.length; i++) {
      const child = renderedChildren[i];
      const key = getChildKey(child);
      if (!presentKeys.includes(key)) {
        nextChildren.splice(i, 0, child);
        exitingChildren.push(child);
      }
    }
    if (mode === "wait" && exitingChildren.length) {
      nextChildren = exitingChildren;
    }
    setRenderedChildren(onlyElements(nextChildren));
    setDiffedChildren(presentChildren);
    return null;
  }
  const { forceRender } = reactExports.useContext(LayoutGroupContext);
  return jsxRuntimeExports.jsx(jsxRuntimeExports.Fragment, { children: renderedChildren.map((child) => {
    const key = getChildKey(child);
    const isPresent = propagate && !isParentPresent ? false : presentChildren === renderedChildren || presentKeys.includes(key);
    const onExit = () => {
      if (exitingComponents.current.has(key)) {
        return;
      }
      if (exitComplete.has(key)) {
        exitingComponents.current.add(key);
        exitComplete.set(key, true);
      } else {
        return;
      }
      let isEveryExitComplete = true;
      exitComplete.forEach((isExitComplete) => {
        if (!isExitComplete)
          isEveryExitComplete = false;
      });
      if (isEveryExitComplete) {
        forceRender == null ? void 0 : forceRender();
        setRenderedChildren(pendingPresentChildren.current);
        propagate && (safeToRemove == null ? void 0 : safeToRemove());
        onExitComplete && onExitComplete();
      }
    };
    return jsxRuntimeExports.jsx(PresenceChild, { isPresent, initial: !isInitialRender.current || initial ? void 0 : false, custom, presenceAffectsLayout, mode, root, onExitComplete: isPresent ? void 0 : onExit, anchorX, anchorY, children: child }, key);
  }) });
};
const MAX_MB = 10;
const MAX_BYTES = MAX_MB * 1024 * 1024;
const ACCEPTED = ["image/jpeg", "image/png"];
function validateFile(file) {
  if (!ACCEPTED.includes(file.type))
    return "Only JPEG and PNG images are accepted.";
  if (file.size > MAX_BYTES)
    return `File is too large. Please use an image under ${MAX_MB}MB.`;
  return null;
}
function HealthSummary({ patient }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, y: -8 },
      animate: { opacity: 1, y: 0 },
      className: "rounded-2xl bg-card border border-border p-4 flex items-center gap-4",
      "data-ocid": "upload.health_summary",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl bg-primary/10 border border-primary/20 p-2.5 flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-5 w-5 text-primary" }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 min-w-0", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-foreground truncate", children: patient.name }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground mt-0.5", children: [
            "Age ",
            String(patient.age),
            patient.diabetesType ? ` · ${String(patient.diabetesType)}` : "",
            patient.hbA1c ? ` · HbA1c ${patient.hbA1c}%` : ""
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { variant: "secondary", className: "flex-shrink-0 text-xs", children: "Profile Active" })
      ]
    }
  );
}
function UploadZone({
  uploadedFile,
  onFileSelect,
  onClear,
  disabled
}) {
  const [isDragging, setIsDragging] = reactExports.useState(false);
  const inputRef = reactExports.useRef(null);
  const handleDrop = reactExports.useCallback(
    (e) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      const file = e.dataTransfer.files[0];
      if (file) onFileSelect(file);
    },
    [onFileSelect, disabled]
  );
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-3", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      "div",
      {
        "data-ocid": "upload.dropzone",
        tabIndex: disabled ? -1 : 0,
        "aria-label": "Upload fundus scan — drag and drop or click to browse",
        className: cn(
          "relative rounded-2xl border-2 border-dashed transition-smooth overflow-hidden",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isDragging ? "border-primary bg-primary/5 scale-[1.01]" : "border-border hover:border-primary/60 hover:bg-muted/20",
          disabled && "opacity-60 cursor-not-allowed",
          (uploadedFile == null ? void 0 : uploadedFile.error) && "border-destructive/50 bg-destructive/5",
          !uploadedFile && !disabled && "cursor-pointer"
        ),
        style: { minHeight: 280 },
        onDrop: handleDrop,
        onDragOver: (e) => {
          e.preventDefault();
          if (!disabled) setIsDragging(true);
        },
        onDragLeave: () => setIsDragging(false),
        onClick: () => {
          var _a;
          return !disabled && !uploadedFile && ((_a = inputRef.current) == null ? void 0 : _a.click());
        },
        onKeyDown: (e) => {
          var _a;
          if ((e.key === "Enter" || e.key === " ") && !disabled && !uploadedFile) {
            e.preventDefault();
            (_a = inputRef.current) == null ? void 0 : _a.click();
          }
        },
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            "input",
            {
              ref: inputRef,
              type: "file",
              accept: "image/jpeg,image/png",
              className: "sr-only",
              onChange: (e) => {
                var _a;
                const file = (_a = e.target.files) == null ? void 0 : _a[0];
                if (file) onFileSelect(file);
                e.target.value = "";
              },
              disabled,
              "data-ocid": "upload.file_input"
            }
          ),
          uploadedFile ? /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "relative flex items-center justify-center p-4",
              style: { minHeight: 280 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl overflow-hidden max-h-60", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "img",
                  {
                    src: uploadedFile.previewUrl,
                    alt: "Fundus scan preview",
                    className: "object-contain max-h-60 max-w-full rounded-xl"
                  }
                ) }),
                uploadedFile.progress > 0 && uploadedFile.progress < 100 && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl gap-3", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(LoaderCircle, { className: "h-8 w-8 animate-spin text-primary" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-48 h-2 bg-muted rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "div",
                    {
                      className: "h-full bg-primary rounded-full transition-all duration-300",
                      style: { width: `${uploadedFile.progress}%` },
                      "data-ocid": "upload.progress_bar"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-sm text-muted-foreground", children: [
                    "Uploading… ",
                    uploadedFile.progress,
                    "%"
                  ] })
                ] }),
                uploadedFile.progress === 100 && !uploadedFile.error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute top-3 left-3", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Badge, { className: "bg-green-500/20 text-green-400 border-green-500/30 gap-1.5 text-xs", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-3 h-3" }),
                  "Ready to Analyse"
                ] }) }),
                !disabled && /* @__PURE__ */ jsxRuntimeExports.jsx(
                  "button",
                  {
                    type: "button",
                    "aria-label": "Remove image",
                    className: "absolute top-3 right-3 rounded-full bg-background/90 border border-border p-1.5 hover:bg-destructive/10 hover:border-destructive/40 transition-smooth",
                    onClick: (e) => {
                      e.stopPropagation();
                      onClear();
                    },
                    "data-ocid": "upload.clear_button",
                    children: /* @__PURE__ */ jsxRuntimeExports.jsx(X, { className: "h-4 w-4 text-muted-foreground" })
                  }
                )
              ]
            }
          ) : /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "div",
            {
              className: "flex flex-col items-center justify-center gap-5 p-10 text-center",
              style: { minHeight: 280 },
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-2xl bg-muted/60 p-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Upload$1, { className: "h-10 w-10 text-muted-foreground" }) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base font-semibold text-foreground", children: "Drop your fundus photo here" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "or tap to browse your files" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-muted-foreground/70 mt-0.5", children: [
                    "JPEG or PNG · max ",
                    MAX_MB,
                    "MB"
                  ] })
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs(
                  Button,
                  {
                    variant: "outline",
                    size: "default",
                    className: "gap-2",
                    onClick: (e) => {
                      var _a;
                      e.stopPropagation();
                      (_a = inputRef.current) == null ? void 0 : _a.click();
                    },
                    disabled,
                    "data-ocid": "upload.upload_button",
                    children: [
                      /* @__PURE__ */ jsxRuntimeExports.jsx(Upload$1, { className: "h-4 w-4" }),
                      "Choose Photo"
                    ]
                  }
                )
              ]
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: (uploadedFile == null ? void 0 : uploadedFile.error) && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: -4 },
        animate: { opacity: 1, y: 0 },
        exit: { opacity: 0, y: -4 },
        className: "flex items-start gap-2 rounded-xl bg-destructive/10 border border-destructive/30 px-4 py-3",
        "data-ocid": "upload.field_error",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(CircleAlert, { className: "h-4 w-4 text-destructive flex-shrink-0 mt-0.5" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-sm text-destructive", children: uploadedFile.error })
        ]
      }
    ) })
  ] });
}
function AnalysisLoader() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    motion.div,
    {
      initial: { opacity: 0, scale: 0.97 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0 },
      className: "rounded-2xl bg-primary/5 border border-primary/20 p-8 flex flex-col items-center gap-4 text-center",
      "data-ocid": "upload.analysis_loading_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative w-16 h-16", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "h-6 w-6 text-primary" }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm font-semibold text-primary", children: "Analysing your scan…" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground mt-1", children: "The AI is examining your fundus image. This may take a moment." })
        ] })
      ]
    }
  );
}
function Upload() {
  const navigate = useNavigate();
  const { data: profile, isLoading: profileLoading } = useMyProfile();
  const { backend, isReady } = useBackend();
  const patient = profile;
  const [uploadedFile, setUploadedFile] = reactExports.useState(null);
  const [isCreating, setIsCreating] = reactExports.useState(false);
  const [isClassifying, setIsClassifying] = reactExports.useState(false);
  const isAnalyzing = isCreating || isClassifying;
  const handleFileSelect = reactExports.useCallback(async (file) => {
    const error = validateFile(file);
    const previewUrl = URL.createObjectURL(file);
    const initial = {
      file,
      previewUrl,
      progress: 0,
      error,
      blob: null
    };
    setUploadedFile(initial);
    if (error) return;
    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setUploadedFile((p) => p ? { ...p, progress: pct } : null);
      });
      setUploadedFile({ file, previewUrl, progress: 100, error: null, blob });
    } catch {
      setUploadedFile(
        (p) => p ? {
          ...p,
          error: "Could not process this image. Please try another file."
        } : null
      );
    }
  }, []);
  const handleClear = reactExports.useCallback(() => {
    if (uploadedFile == null ? void 0 : uploadedFile.previewUrl) URL.revokeObjectURL(uploadedFile.previewUrl);
    setUploadedFile(null);
  }, [uploadedFile]);
  const handleAnalyse = async () => {
    if (!(uploadedFile == null ? void 0 : uploadedFile.blob) || !backend || !isReady) return;
    try {
      setIsCreating(true);
      const createResult = await backend.createScan({
        imageId: uploadedFile.blob
      });
      if (createResult.__kind__ === "err") throw new Error(createResult.err);
      const scan = createResult.ok;
      setIsCreating(false);
      setIsClassifying(true);
      const classifyResult = await backend.classifyScan(scan.id);
      if (classifyResult.__kind__ === "err") {
        throw new Error(classifyResult.err);
      }
      ue.success("Analysis complete!", {
        description: "Your retinal scan has been analysed."
      });
      void navigate({
        to: "/scan/$scanId",
        params: { scanId: String(scan.id) }
      });
    } catch (err) {
      ue.error("Analysis failed", {
        description: err instanceof Error ? err.message : "Something went wrong. Please try again."
      });
    } finally {
      setIsCreating(false);
      setIsClassifying(false);
    }
  };
  if (!profileLoading && !patient) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "max-w-lg mx-auto px-4 sm:px-6 pt-10 pb-16", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 16 },
        animate: { opacity: 1, y: 0 },
        className: "rounded-2xl bg-card border border-border p-8 text-center flex flex-col items-center gap-5",
        "data-ocid": "upload.no_profile_state",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-8 h-8 text-primary" }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-bold text-foreground mb-2", children: "Complete your profile first" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground leading-relaxed", children: "We need a few health details — like your age and diabetes type — before running your first scan." })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/profile", "data-ocid": "upload.go_to_profile_link", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Button, { size: "lg", className: "gap-2", children: [
            "Set Up My Profile",
            /* @__PURE__ */ jsxRuntimeExports.jsx(ChevronRight, { className: "w-4 h-4" })
          ] }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", "data-ocid": "upload.back_home_link", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", children: "Back to Home" }) })
        ]
      }
    ) });
  }
  const canAnalyse = !!uploadedFile && uploadedFile.progress === 100 && !uploadedFile.error && !!uploadedFile.blob && !isAnalyzing;
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "max-w-xl mx-auto px-4 sm:px-6 pb-16 pt-4", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(
      motion.div,
      {
        initial: { opacity: 0, y: 8 },
        animate: { opacity: 1, y: 0 },
        className: "mb-6 text-center",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl font-bold text-foreground", children: "Upload Your Fundus Image" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-1", children: "Upload a clear photo of your retina taken with a fundus camera. The AI will check for signs of diabetic retinopathy." })
        ]
      }
    ),
    patient && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(HealthSummary, { patient }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-xl bg-primary/5 border border-primary/20 px-4 py-3 flex items-start gap-3 mb-5", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4 text-primary mt-0.5 flex-shrink-0" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-foreground/80 leading-relaxed", children: [
        "For best results, ensure the image is",
        " ",
        /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "clear and well-lit" }),
        ", taken with a fundus camera or ophthalmoscope."
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
      UploadZone,
      {
        uploadedFile,
        onFileSelect: (file) => void handleFileSelect(file),
        onClear: handleClear,
        disabled: isAnalyzing
      }
    ) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(AnimatePresence, { children: isAnalyzing && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mb-5", children: /* @__PURE__ */ jsxRuntimeExports.jsx(AnalysisLoader, {}) }) }),
    !isAnalyzing && /* @__PURE__ */ jsxRuntimeExports.jsxs(
      Button,
      {
        size: "lg",
        className: "w-full gap-2 text-base py-6",
        disabled: !canAnalyse,
        onClick: () => void handleAnalyse(),
        "data-ocid": "upload.analyse_button",
        children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Scan, { className: "h-5 w-5" }),
          "Analyse My Scan"
        ]
      }
    ),
    !uploadedFile && !isAnalyzing && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-center text-xs text-muted-foreground mt-3", children: "Upload your fundus photo above to enable analysis" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-6 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/", "data-ocid": "upload.back_link", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "ghost", size: "sm", className: "text-muted-foreground", children: "Back to My Scans" }) }) })
  ] });
}
export {
  Upload as default
};

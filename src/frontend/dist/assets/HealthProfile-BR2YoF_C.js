import { c as createLucideIcon, j as jsxRuntimeExports, a as cn, r as reactExports, u as useNavigate, d as useMyProfile, g as useBackend, b as useAuth, m as motion, U as User, E as Eye, B as Button, h as ue, S as Skeleton } from "./index-DvlEB_35.js";
import { P as Primitive } from "./index-BnxY5ynD.js";
import { C as CircleCheck } from "./circle-check-bfJbAE2u.js";
/**
 * @license lucide-react v0.511.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */
const __iconNode = [
  [
    "path",
    {
      d: "M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z",
      key: "1c8476"
    }
  ],
  ["path", { d: "M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7", key: "1ydtos" }],
  ["path", { d: "M7 3v4a1 1 0 0 0 1 1h7", key: "t51u73" }]
];
const Save = createLucideIcon("save", __iconNode);
function Input({ className, type, ...props }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    "input",
    {
      type,
      "data-slot": "input",
      className: cn(
        "file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      ),
      ...props
    }
  );
}
var NAME = "Label";
var Label$1 = reactExports.forwardRef((props, forwardedRef) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Primitive.label,
    {
      ...props,
      ref: forwardedRef,
      onMouseDown: (event) => {
        var _a;
        const target = event.target;
        if (target.closest("button, input, select, textarea")) return;
        (_a = props.onMouseDown) == null ? void 0 : _a.call(props, event);
        if (!event.defaultPrevented && event.detail > 1) event.preventDefault();
      }
    }
  );
});
Label$1.displayName = NAME;
var Root = Label$1;
function Label({
  className,
  ...props
}) {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(
    Root,
    {
      "data-slot": "label",
      className: cn(
        "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-[disabled=true]:pointer-events-none group-data-[disabled=true]:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50",
        className
      ),
      ...props
    }
  );
}
const DIABETES_OPTIONS = [
  { label: "None (No Diabetes)", value: "None" },
  { label: "Type 1", value: "Type1" },
  { label: "Type 2", value: "Type2" },
  { label: "Gestational", value: "Gestational" }
];
function isNone(diabetesType) {
  return diabetesType === "None";
}
function validate(values) {
  const errors = {};
  if (!values.name.trim()) {
    errors.name = "Full name is required.";
  }
  if (!values.age.trim()) {
    errors.age = "Age is required.";
  } else {
    const n = Number(values.age);
    if (!Number.isInteger(n) || n < 1 || n > 120) {
      errors.age = "Please enter a valid age between 1 and 120.";
    }
  }
  if (!values.contactInfo.trim()) {
    errors.contactInfo = "Contact info (email or phone) is required.";
  }
  if (!values.diabetesType) {
    errors.diabetesType = "Please select your diabetes type.";
  }
  if (!isNone(values.diabetesType)) {
    if (!values.hbA1c.trim()) {
      errors.hbA1c = "HbA1c is required.";
    } else {
      const n = Number(values.hbA1c);
      if (Number.isNaN(n) || n < 3 || n > 20) {
        errors.hbA1c = "HbA1c must be between 3 and 20.";
      }
    }
  } else if (values.hbA1c.trim()) {
    const n = Number(values.hbA1c);
    if (Number.isNaN(n) || n < 3 || n > 20) {
      errors.hbA1c = "HbA1c must be between 3 and 20 if provided.";
    }
  }
  return errors;
}
function safeAgeBigInt(ageStr) {
  const parsed = Number(ageStr);
  const clamped = Math.max(0, Math.min(150, Math.round(parsed)));
  return BigInt(clamped);
}
function Field({ id, label, error, hint, children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Label, { htmlFor: id, className: "text-sm font-medium text-foreground", children: label }),
    hint && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-muted-foreground", children: hint }),
    children,
    error && /* @__PURE__ */ jsxRuntimeExports.jsx(
      "p",
      {
        className: "text-xs text-destructive mt-1",
        "data-ocid": `profile.${id}.field_error`,
        role: "alert",
        children: error
      }
    )
  ] });
}
function ProfileSkeleton() {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-xl mx-auto p-4 sm:p-6 space-y-6",
      "data-ocid": "health_profile.loading_state",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "w-12 h-12 rounded-full" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex-1 space-y-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-5 w-40" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-3 w-56" })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: [1, 2, 3, 4, 5].map((k) => /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-11 rounded-md" }, k)) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Skeleton, { className: "h-11 w-full rounded-md" })
      ]
    }
  );
}
function HealthProfile() {
  const navigate = useNavigate();
  const { data: profile, isLoading } = useMyProfile();
  const { backend, isReady } = useBackend();
  const { handleAuthError } = useAuth();
  const existingProfile = profile;
  const isNew = !existingProfile;
  const [form, setForm] = reactExports.useState({
    name: "",
    age: "",
    contactInfo: "",
    diabetesType: "",
    hbA1c: ""
  });
  const [errors, setErrors] = reactExports.useState({});
  const [isPending, setIsPending] = reactExports.useState(false);
  const [saved, setSaved] = reactExports.useState(false);
  const isNoneDiabetic = isNone(form.diabetesType);
  reactExports.useEffect(() => {
    if (existingProfile) {
      setForm({
        name: existingProfile.name ?? "",
        age: existingProfile.age ? String(existingProfile.age) : "",
        contactInfo: existingProfile.contactInfo ?? "",
        diabetesType: existingProfile.diabetesType ?? "",
        hbA1c: existingProfile.hbA1c ? String(existingProfile.hbA1c) : ""
      });
    }
  }, [existingProfile]);
  function setField(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) {
      setErrors((e) => ({ ...e, [field]: void 0 }));
    }
  }
  async function handleSubmit(e) {
    e.preventDefault();
    const errs = validate(form);
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    if (!backend || !isReady) return;
    setIsPending(true);
    try {
      const ageBigInt = safeAgeBigInt(form.age);
      const hbA1cNum = form.hbA1c.trim() ? Number(form.hbA1c) : 0;
      if (isNew) {
        const input = {
          name: form.name.trim(),
          age: ageBigInt,
          contactInfo: form.contactInfo.trim(),
          diabetesType: form.diabetesType,
          hbA1c: hbA1cNum
        };
        await backend.createProfile(input);
        setSaved(true);
        setTimeout(() => {
          void navigate({ to: "/upload" });
        }, 1400);
      } else {
        const input = {
          name: form.name.trim(),
          age: ageBigInt,
          contactInfo: form.contactInfo.trim(),
          diabetesType: form.diabetesType,
          hbA1c: hbA1cNum
        };
        await backend.updateProfile(input);
        setSaved(true);
        ue.success("Profile saved! Your health details have been updated.");
        setTimeout(() => setSaved(false), 3e3);
      }
    } catch (err) {
      if (handleAuthError(err)) return;
      const msg = err instanceof Error ? err.message.toLowerCase() : String(err);
      if (msg.includes("already exists")) {
        ue.error("Profile already exists", {
          description: "Your profile already exists. Please use the edit option."
        });
      } else {
        ue.error("Could not save profile. Please try again.");
      }
    } finally {
      setIsPending(false);
    }
  }
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(ProfileSkeleton, {});
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    "div",
    {
      className: "max-w-xl mx-auto p-4 sm:p-6 space-y-6",
      "data-ocid": "health_profile.page",
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: -8 },
            animate: { opacity: 1, y: 0 },
            className: "flex items-center gap-4",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0", children: /* @__PURE__ */ jsxRuntimeExports.jsx(User, { className: "w-6 h-6 text-primary" }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-xl font-display font-bold text-foreground", children: isNew ? "Set Up Your Health Profile" : "My Health Profile" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-muted-foreground mt-0.5", children: isNew ? "Enter your details to get personalised screening results." : "Keep your details up to date for accurate AI analysis." })
              ] })
            ]
          }
        ),
        isNew && /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.div,
          {
            initial: { opacity: 0, y: 6 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.08 },
            className: "rounded-xl bg-primary/10 border border-primary/25 px-4 py-3 flex items-start gap-3",
            "data-ocid": "health_profile.onboarding_hint",
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx(Eye, { className: "w-4 h-4 text-primary flex-shrink-0 mt-0.5" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground/80 leading-relaxed", children: "Your health details are stored securely and only visible to you. They help our AI give you more accurate diabetic retinopathy screening." })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          motion.form,
          {
            initial: { opacity: 0, y: 8 },
            animate: { opacity: 1, y: 0 },
            transition: { delay: 0.12 },
            onSubmit: (e) => void handleSubmit(e),
            className: "space-y-5",
            "data-ocid": "health_profile.form",
            noValidate: true,
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5 space-y-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest", children: "Personal Details" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { id: "name", label: "Full Name", error: errors.name, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Input,
                  {
                    id: "name",
                    value: form.name,
                    onChange: (e) => setField("name", e.target.value),
                    placeholder: "e.g. Priya Sharma",
                    className: "bg-background border-input h-11 text-base",
                    autoComplete: "name",
                    "data-ocid": "health_profile.name.input"
                  }
                ) }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(Field, { id: "age", label: "Age", error: errors.age, children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Input,
                    {
                      id: "age",
                      type: "number",
                      min: 1,
                      max: 120,
                      value: form.age,
                      onChange: (e) => setField("age", e.target.value),
                      placeholder: "e.g. 42",
                      className: "bg-background border-input h-11 text-base",
                      "data-ocid": "health_profile.age.input"
                    }
                  ) }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Field,
                    {
                      id: "contactInfo",
                      label: "Contact Info",
                      error: errors.contactInfo,
                      hint: "Email address or phone number",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        Input,
                        {
                          id: "contactInfo",
                          value: form.contactInfo,
                          onChange: (e) => setField("contactInfo", e.target.value),
                          placeholder: "e.g. priya@email.com",
                          className: "bg-background border-input h-11 text-base",
                          autoComplete: "email",
                          "data-ocid": "health_profile.contact.input"
                        }
                      )
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-card border border-border rounded-2xl p-5 space-y-5", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs font-semibold text-muted-foreground uppercase tracking-widest", children: "Diabetes Details" }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-5", children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Field,
                    {
                      id: "diabetesType",
                      label: "Diabetes Type",
                      error: errors.diabetesType,
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                        "select",
                        {
                          id: "diabetesType",
                          value: form.diabetesType,
                          onChange: (e) => setField("diabetesType", e.target.value),
                          className: "w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none transition-smooth h-11",
                          "data-ocid": "health_profile.diabetes_type.select",
                          children: [
                            /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", disabled: true, children: "Select type…" }),
                            DIABETES_OPTIONS.map((opt) => /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: opt.value, children: opt.label }, opt.value))
                          ]
                        }
                      )
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Field,
                    {
                      id: "hbA1c",
                      label: isNoneDiabetic ? "HbA1c (%) — Optional" : "HbA1c (%)",
                      error: errors.hbA1c,
                      hint: isNoneDiabetic ? "Leave blank if you don't have a reading" : "Your most recent HbA1c result",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
                        /* @__PURE__ */ jsxRuntimeExports.jsx(
                          Input,
                          {
                            id: "hbA1c",
                            type: "number",
                            step: "0.1",
                            min: 3,
                            max: 20,
                            value: form.hbA1c,
                            onChange: (e) => setField("hbA1c", e.target.value),
                            placeholder: isNoneDiabetic ? "Optional" : "e.g. 7.4",
                            className: "bg-background border-input h-11 text-base pr-8",
                            "data-ocid": "health_profile.hba1c.input"
                          }
                        ),
                        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none", children: "%" })
                      ] })
                    }
                  )
                ] })
              ] }),
              saved && isNew && /* @__PURE__ */ jsxRuntimeExports.jsxs(
                motion.div,
                {
                  initial: { opacity: 0, scale: 0.97 },
                  animate: { opacity: 1, scale: 1 },
                  className: "flex items-center gap-3 rounded-xl bg-primary/10 border border-primary/25 px-4 py-3",
                  "data-ocid": "health_profile.success_state",
                  "aria-live": "polite",
                  children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5 text-primary flex-shrink-0" }),
                    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-foreground font-medium", children: "Profile saved! You can now upload a fundus image." })
                  ]
                }
              ),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                Button,
                {
                  type: "submit",
                  disabled: isPending || saved && isNew,
                  className: "w-full h-11 gap-2 text-base font-semibold",
                  "data-ocid": "health_profile.submit_button",
                  children: saved && isNew ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(CircleCheck, { className: "w-5 h-5" }),
                    "Saved — taking you to upload…"
                  ] }) : isPending ? /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-5 h-5 animate-pulse" }),
                    "Saving…"
                  ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
                    /* @__PURE__ */ jsxRuntimeExports.jsx(Save, { className: "w-5 h-5" }),
                    isNew ? "Save My Profile" : "Save Changes"
                  ] })
                }
              )
            ]
          }
        )
      ]
    }
  );
}
export {
  HealthProfile as default
};

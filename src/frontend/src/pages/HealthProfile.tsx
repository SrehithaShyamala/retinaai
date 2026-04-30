import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate } from "@tanstack/react-router";
import { CheckCircle2, Eye, Save, User } from "lucide-react";
import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { DiabetesType } from "../backend";
import type {
  CreatePatientInput,
  Patient,
  UpdatePatientInput,
} from "../backend";
import { useAuth } from "../hooks/useAuth";
import { useBackend } from "../hooks/useBackend";
import { useMyProfile } from "../hooks/usePatients";

// ─── Types ────────────────────────────────────────────────────────────────────

// Extend DiabetesType to include None for non-diabetic users.
// Cast to string for comparisons since the generated binding may lag behind the backend.
type DiabetesTypeExtended = DiabetesType | "None";

interface FormValues {
  name: string;
  age: string;
  contactInfo: string;
  diabetesType: DiabetesTypeExtended | "";
  hbA1c: string;
}

interface FormErrors {
  name?: string;
  age?: string;
  contactInfo?: string;
  diabetesType?: string;
  hbA1c?: string;
}

// Map display labels to backend enum values
const DIABETES_OPTIONS: { label: string; value: DiabetesTypeExtended }[] = [
  { label: "None (No Diabetes)", value: "None" as DiabetesTypeExtended },
  { label: "Type 1", value: "Type1" as DiabetesType },
  { label: "Type 2", value: "Type2" as DiabetesType },
  { label: "Gestational", value: "Gestational" as DiabetesType },
];

// ─── Validation ───────────────────────────────────────────────────────────────

function isNone(diabetesType: DiabetesTypeExtended | ""): boolean {
  return (diabetesType as string) === "None";
}

function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};
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
  // hbA1c is optional when diabetes type is None
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
    // If they filled it in anyway, still validate the range
    const n = Number(values.hbA1c);
    if (Number.isNaN(n) || n < 3 || n > 20) {
      errors.hbA1c = "HbA1c must be between 3 and 20 if provided.";
    }
  }
  return errors;
}

// Safe BigInt conversion — clamps to valid age range to prevent overflow
function safeAgeBigInt(ageStr: string): bigint {
  const parsed = Number(ageStr);
  const clamped = Math.max(0, Math.min(150, Math.round(parsed)));
  return BigInt(clamped);
}

// ─── Sub-components ───────────────────────────────────────────────────────────

interface FieldProps {
  id: string;
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}

function Field({ id, label, error, hint, children }: FieldProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </Label>
      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
      {children}
      {error && (
        <p
          className="text-xs text-destructive mt-1"
          data-ocid={`profile.${id}.field_error`}
          role="alert"
        >
          {error}
        </p>
      )}
    </div>
  );
}

function ProfileSkeleton() {
  return (
    <div
      className="max-w-xl mx-auto p-4 sm:p-6 space-y-6"
      data-ocid="health_profile.loading_state"
    >
      <div className="flex items-center gap-3">
        <Skeleton className="w-12 h-12 rounded-full" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-5 w-40" />
          <Skeleton className="h-3 w-56" />
        </div>
      </div>
      <div className="space-y-4">
        {[1, 2, 3, 4, 5].map((k) => (
          <Skeleton key={k} className="h-11 rounded-md" />
        ))}
      </div>
      <Skeleton className="h-11 w-full rounded-md" />
    </div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function HealthProfile() {
  const navigate = useNavigate();
  const { data: profile, isLoading } = useMyProfile();
  const { backend, isReady } = useBackend();
  const { handleAuthError } = useAuth();

  const existingProfile = profile as Patient | null | undefined;
  const isNew = !existingProfile;

  const [form, setForm] = useState<FormValues>({
    name: "",
    age: "",
    contactInfo: "",
    diabetesType: "" as DiabetesTypeExtended | "",
    hbA1c: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isPending, setIsPending] = useState(false);
  const [saved, setSaved] = useState(false);

  const isNoneDiabetic = isNone(form.diabetesType);

  // Populate form when profile loads
  useEffect(() => {
    if (existingProfile) {
      setForm({
        name: existingProfile.name ?? "",
        age: existingProfile.age ? String(existingProfile.age) : "",
        contactInfo: existingProfile.contactInfo ?? "",
        diabetesType:
          (existingProfile.diabetesType as DiabetesTypeExtended) ?? "",
        hbA1c: existingProfile.hbA1c ? String(existingProfile.hbA1c) : "",
      });
    }
  }, [existingProfile]);

  function setField(field: keyof FormValues, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) {
      setErrors((e) => ({ ...e, [field]: undefined }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
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
      // When None is selected and hbA1c is blank, pass 0 as a safe sentinel value
      const hbA1cNum: number = form.hbA1c.trim() ? Number(form.hbA1c) : 0;

      if (isNew) {
        const input: CreatePatientInput = {
          name: form.name.trim(),
          age: ageBigInt,
          contactInfo: form.contactInfo.trim(),
          diabetesType: form.diabetesType as DiabetesType,
          hbA1c: hbA1cNum,
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (backend as any).createProfile(input);
        setSaved(true);
        setTimeout(() => {
          void navigate({ to: "/upload" });
        }, 1400);
      } else {
        const input: UpdatePatientInput = {
          name: form.name.trim(),
          age: ageBigInt,
          contactInfo: form.contactInfo.trim(),
          diabetesType: form.diabetesType as DiabetesType,
          hbA1c: hbA1cNum,
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await (backend as any).updateProfile(input);
        setSaved(true);
        toast.success("Profile saved! Your health details have been updated.");
        setTimeout(() => setSaved(false), 3000);
      }
    } catch (err) {
      // Check if it's a session expiry first
      if (handleAuthError(err)) return;

      // Show specific error messages for known cases
      const msg =
        err instanceof Error ? err.message.toLowerCase() : String(err);
      if (msg.includes("already exists")) {
        toast.error("Profile already exists", {
          description:
            "Your profile already exists. Please use the edit option.",
        });
      } else {
        toast.error("Could not save profile. Please try again.");
      }
    } finally {
      setIsPending(false);
    }
  }

  if (isLoading) {
    return <ProfileSkeleton />;
  }

  return (
    <div
      className="max-w-xl mx-auto p-4 sm:p-6 space-y-6"
      data-ocid="health_profile.page"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-4"
      >
        <div className="w-12 h-12 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
          <User className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-xl font-display font-bold text-foreground">
            {isNew ? "Set Up Your Health Profile" : "My Health Profile"}
          </h1>
          <p className="text-sm text-muted-foreground mt-0.5">
            {isNew
              ? "Enter your details to get personalised screening results."
              : "Keep your details up to date for accurate AI analysis."}
          </p>
        </div>
      </motion.div>

      {/* Onboarding hint for new users */}
      {isNew && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08 }}
          className="rounded-xl bg-primary/10 border border-primary/25 px-4 py-3 flex items-start gap-3"
          data-ocid="health_profile.onboarding_hint"
        >
          <Eye className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
          <p className="text-sm text-foreground/80 leading-relaxed">
            Your health details are stored securely and only visible to you.
            They help our AI give you more accurate diabetic retinopathy
            screening.
          </p>
        </motion.div>
      )}

      {/* Form */}
      <motion.form
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12 }}
        onSubmit={(e) => void handleSubmit(e)}
        className="space-y-5"
        data-ocid="health_profile.form"
        noValidate
      >
        {/* Personal details card */}
        <div className="bg-card border border-border rounded-2xl p-5 space-y-5">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            Personal Details
          </p>

          <Field id="name" label="Full Name" error={errors.name}>
            <Input
              id="name"
              value={form.name}
              onChange={(e) => setField("name", e.target.value)}
              placeholder="e.g. Priya Sharma"
              className="bg-background border-input h-11 text-base"
              autoComplete="name"
              data-ocid="health_profile.name.input"
            />
          </Field>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field id="age" label="Age" error={errors.age}>
              <Input
                id="age"
                type="number"
                min={1}
                max={120}
                value={form.age}
                onChange={(e) => setField("age", e.target.value)}
                placeholder="e.g. 42"
                className="bg-background border-input h-11 text-base"
                data-ocid="health_profile.age.input"
              />
            </Field>

            <Field
              id="contactInfo"
              label="Contact Info"
              error={errors.contactInfo}
              hint="Email address or phone number"
            >
              <Input
                id="contactInfo"
                value={form.contactInfo}
                onChange={(e) => setField("contactInfo", e.target.value)}
                placeholder="e.g. priya@email.com"
                className="bg-background border-input h-11 text-base"
                autoComplete="email"
                data-ocid="health_profile.contact.input"
              />
            </Field>
          </div>
        </div>

        {/* Diabetes details card */}
        <div className="bg-card border border-border rounded-2xl p-5 space-y-5">
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-widest">
            Diabetes Details
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Field
              id="diabetesType"
              label="Diabetes Type"
              error={errors.diabetesType}
            >
              <select
                id="diabetesType"
                value={form.diabetesType}
                onChange={(e) => setField("diabetesType", e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2.5 text-sm text-foreground focus:outline-none transition-smooth h-11"
                data-ocid="health_profile.diabetes_type.select"
              >
                <option value="" disabled>
                  Select type…
                </option>
                {DIABETES_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </Field>

            <Field
              id="hbA1c"
              label={isNoneDiabetic ? "HbA1c (%) — Optional" : "HbA1c (%)"}
              error={errors.hbA1c}
              hint={
                isNoneDiabetic
                  ? "Leave blank if you don't have a reading"
                  : "Your most recent HbA1c result"
              }
            >
              <div className="relative">
                <Input
                  id="hbA1c"
                  type="number"
                  step="0.1"
                  min={3}
                  max={20}
                  value={form.hbA1c}
                  onChange={(e) => setField("hbA1c", e.target.value)}
                  placeholder={isNoneDiabetic ? "Optional" : "e.g. 7.4"}
                  className="bg-background border-input h-11 text-base pr-8"
                  data-ocid="health_profile.hba1c.input"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground pointer-events-none">
                  %
                </span>
              </div>
            </Field>
          </div>
        </div>

        {/* Success message (new profile only) */}
        {saved && isNew && (
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-3 rounded-xl bg-primary/10 border border-primary/25 px-4 py-3"
            data-ocid="health_profile.success_state"
            aria-live="polite"
          >
            <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0" />
            <p className="text-sm text-foreground font-medium">
              Profile saved! You can now upload a fundus image.
            </p>
          </motion.div>
        )}

        {/* Submit */}
        <Button
          type="submit"
          disabled={isPending || (saved && isNew)}
          className="w-full h-11 gap-2 text-base font-semibold"
          data-ocid="health_profile.submit_button"
        >
          {saved && isNew ? (
            <>
              <CheckCircle2 className="w-5 h-5" />
              Saved — taking you to upload…
            </>
          ) : isPending ? (
            <>
              <Save className="w-5 h-5 animate-pulse" />
              Saving…
            </>
          ) : (
            <>
              <Save className="w-5 h-5" />
              {isNew ? "Save My Profile" : "Save Changes"}
            </>
          )}
        </Button>
      </motion.form>
    </div>
  );
}

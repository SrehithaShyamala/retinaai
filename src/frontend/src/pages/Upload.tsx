import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  AlertCircle,
  CheckCircle2,
  ChevronRight,
  Eye,
  Loader2,
  Scan,
  Upload as UploadIcon,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { toast } from "sonner";
import { ExternalBlob } from "../backend";
import type { Patient, ScanRecord } from "../backend";
import { useBackend } from "../hooks/useBackend";
import { useMyProfile } from "../hooks/usePatients";

// ─── Types ─────────────────────────────────────────────────────────────────────

const MAX_MB = 10;
const MAX_BYTES = MAX_MB * 1024 * 1024;
const ACCEPTED = ["image/jpeg", "image/png"];

interface UploadedFile {
  file: File;
  previewUrl: string;
  progress: number;
  error: string | null;
  blob: ExternalBlob | null;
}

function validateFile(file: File): string | null {
  if (!ACCEPTED.includes(file.type))
    return "Only JPEG and PNG images are accepted.";
  if (file.size > MAX_BYTES)
    return `File is too large. Please use an image under ${MAX_MB}MB.`;
  return null;
}

// ─── Health Summary Card ───────────────────────────────────────────────────────

function HealthSummary({ patient }: { patient: Patient }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-card border border-border p-4 flex items-center gap-4"
      data-ocid="upload.health_summary"
    >
      <div className="rounded-xl bg-primary/10 border border-primary/20 p-2.5 flex-shrink-0">
        <Eye className="h-5 w-5 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-foreground truncate">
          {patient.name}
        </p>
        <p className="text-xs text-muted-foreground mt-0.5">
          Age {String(patient.age)}
          {patient.diabetesType ? ` · ${String(patient.diabetesType)}` : ""}
          {patient.hbA1c ? ` · HbA1c ${patient.hbA1c}%` : ""}
        </p>
      </div>
      <Badge variant="secondary" className="flex-shrink-0 text-xs">
        Profile Active
      </Badge>
    </motion.div>
  );
}

// ─── Upload Zone ──────────────────────────────────────────────────────────────

function UploadZone({
  uploadedFile,
  onFileSelect,
  onClear,
  disabled,
}: {
  uploadedFile: UploadedFile | null;
  onFileSelect: (file: File) => void;
  onClear: () => void;
  disabled: boolean;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      if (disabled) return;
      const file = e.dataTransfer.files[0];
      if (file) onFileSelect(file);
    },
    [onFileSelect, disabled],
  );

  return (
    <div className="flex flex-col gap-3">
      <div
        data-ocid="upload.dropzone"
        tabIndex={disabled ? -1 : 0}
        aria-label="Upload fundus scan — drag and drop or click to browse"
        className={cn(
          "relative rounded-2xl border-2 border-dashed transition-smooth overflow-hidden",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          isDragging
            ? "border-primary bg-primary/5 scale-[1.01]"
            : "border-border hover:border-primary/60 hover:bg-muted/20",
          disabled && "opacity-60 cursor-not-allowed",
          uploadedFile?.error && "border-destructive/50 bg-destructive/5",
          !uploadedFile && !disabled && "cursor-pointer",
        )}
        style={{ minHeight: 280 }}
        onDrop={handleDrop}
        onDragOver={(e) => {
          e.preventDefault();
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onClick={() => !disabled && !uploadedFile && inputRef.current?.click()}
        onKeyDown={(e) => {
          if (
            (e.key === "Enter" || e.key === " ") &&
            !disabled &&
            !uploadedFile
          ) {
            e.preventDefault();
            inputRef.current?.click();
          }
        }}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png"
          className="sr-only"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) onFileSelect(file);
            e.target.value = "";
          }}
          disabled={disabled}
          data-ocid="upload.file_input"
        />

        {uploadedFile ? (
          <div
            className="relative flex items-center justify-center p-4"
            style={{ minHeight: 280 }}
          >
            <div className="rounded-xl overflow-hidden max-h-60">
              <img
                src={uploadedFile.previewUrl}
                alt="Fundus scan preview"
                className="object-contain max-h-60 max-w-full rounded-xl"
              />
            </div>

            {/* Progress overlay */}
            {uploadedFile.progress > 0 && uploadedFile.progress < 100 && (
              <div className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center rounded-2xl gap-3">
                <Loader2 className="h-8 w-8 animate-spin text-primary" />
                <div className="w-48 h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-300"
                    style={{ width: `${uploadedFile.progress}%` }}
                    data-ocid="upload.progress_bar"
                  />
                </div>
                <span className="text-sm text-muted-foreground">
                  Uploading… {uploadedFile.progress}%
                </span>
              </div>
            )}

            {/* Ready badge */}
            {uploadedFile.progress === 100 && !uploadedFile.error && (
              <div className="absolute top-3 left-3">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30 gap-1.5 text-xs">
                  <CheckCircle2 className="w-3 h-3" />
                  Ready to Analyse
                </Badge>
              </div>
            )}

            {/* Clear button */}
            {!disabled && (
              <button
                type="button"
                aria-label="Remove image"
                className="absolute top-3 right-3 rounded-full bg-background/90 border border-border p-1.5 hover:bg-destructive/10 hover:border-destructive/40 transition-smooth"
                onClick={(e) => {
                  e.stopPropagation();
                  onClear();
                }}
                data-ocid="upload.clear_button"
              >
                <X className="h-4 w-4 text-muted-foreground" />
              </button>
            )}
          </div>
        ) : (
          <div
            className="flex flex-col items-center justify-center gap-5 p-10 text-center"
            style={{ minHeight: 280 }}
          >
            <div className="rounded-2xl bg-muted/60 p-5">
              <UploadIcon className="h-10 w-10 text-muted-foreground" />
            </div>
            <div>
              <p className="text-base font-semibold text-foreground">
                Drop your fundus photo here
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                or tap to browse your files
              </p>
              <p className="text-xs text-muted-foreground/70 mt-0.5">
                JPEG or PNG · max {MAX_MB}MB
              </p>
            </div>
            <Button
              variant="outline"
              size="default"
              className="gap-2"
              onClick={(e) => {
                e.stopPropagation();
                inputRef.current?.click();
              }}
              disabled={disabled}
              data-ocid="upload.upload_button"
            >
              <UploadIcon className="h-4 w-4" />
              Choose Photo
            </Button>
          </div>
        )}
      </div>

      {/* Validation error */}
      <AnimatePresence>
        {uploadedFile?.error && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-start gap-2 rounded-xl bg-destructive/10 border border-destructive/30 px-4 py-3"
            data-ocid="upload.field_error"
          >
            <AlertCircle className="h-4 w-4 text-destructive flex-shrink-0 mt-0.5" />
            <span className="text-sm text-destructive">
              {uploadedFile.error}
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// ─── Analysis Loading State ───────────────────────────────────────────────────

function AnalysisLoader() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      className="rounded-2xl bg-primary/5 border border-primary/20 p-8 flex flex-col items-center gap-4 text-center"
      data-ocid="upload.analysis_loading_state"
    >
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 rounded-full border-2 border-primary/20 animate-ping" />
        <div className="w-16 h-16 rounded-full border-2 border-primary flex items-center justify-center">
          <Eye className="h-6 w-6 text-primary" />
        </div>
      </div>
      <div>
        <p className="text-sm font-semibold text-primary">
          Analysing your scan…
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          The AI is examining your fundus image. This may take a moment.
        </p>
      </div>
    </motion.div>
  );
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function Upload() {
  const navigate = useNavigate();
  const { data: profile, isLoading: profileLoading } = useMyProfile();
  const { backend, isReady } = useBackend();

  const patient = profile as Patient | null | undefined;

  const [uploadedFile, setUploadedFile] = useState<UploadedFile | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isClassifying, setIsClassifying] = useState(false);

  const isAnalyzing = isCreating || isClassifying;

  const handleFileSelect = useCallback(async (file: File) => {
    const error = validateFile(file);
    const previewUrl = URL.createObjectURL(file);
    const initial: UploadedFile = {
      file,
      previewUrl,
      progress: 0,
      error,
      blob: null,
    };
    setUploadedFile(initial);
    if (error) return;

    try {
      const bytes = new Uint8Array(await file.arrayBuffer());
      const blob = ExternalBlob.fromBytes(bytes).withUploadProgress((pct) => {
        setUploadedFile((p) => (p ? { ...p, progress: pct } : null));
      });
      setUploadedFile({ file, previewUrl, progress: 100, error: null, blob });
    } catch {
      setUploadedFile((p) =>
        p
          ? {
              ...p,
              error: "Could not process this image. Please try another file.",
            }
          : null,
      );
    }
  }, []);

  const handleClear = useCallback(() => {
    if (uploadedFile?.previewUrl) URL.revokeObjectURL(uploadedFile.previewUrl);
    setUploadedFile(null);
  }, [uploadedFile]);

  const handleAnalyse = async () => {
    if (!uploadedFile?.blob || !backend || !isReady) return;

    try {
      setIsCreating(true);
      // Step 1: Create the scan record
      const createResult = await backend.createScan({
        imageId: uploadedFile.blob,
      });
      if (createResult.__kind__ === "err") throw new Error(createResult.err);
      const scan: ScanRecord = createResult.ok;

      setIsCreating(false);
      setIsClassifying(true);

      // Step 2: Classify the uploaded scan
      const classifyResult = await backend.classifyScan(scan.id);
      if (classifyResult.__kind__ === "err") {
        throw new Error(classifyResult.err);
      }

      toast.success("Analysis complete!", {
        description: "Your retinal scan has been analysed.",
      });

      void navigate({
        to: "/scan/$scanId",
        params: { scanId: String(scan.id) },
      });
    } catch (err) {
      toast.error("Analysis failed", {
        description:
          err instanceof Error
            ? err.message
            : "Something went wrong. Please try again.",
      });
    } finally {
      setIsCreating(false);
      setIsClassifying(false);
    }
  };

  // ── No profile guard ───────────────────────────────────────────────────────
  if (!profileLoading && !patient) {
    return (
      <div className="max-w-lg mx-auto px-4 sm:px-6 pt-10 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-2xl bg-card border border-border p-8 text-center flex flex-col items-center gap-5"
          data-ocid="upload.no_profile_state"
        >
          <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center">
            <Eye className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground mb-2">
              Complete your profile first
            </h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We need a few health details — like your age and diabetes type —
              before running your first scan.
            </p>
          </div>
          <Link to="/profile" data-ocid="upload.go_to_profile_link">
            <Button size="lg" className="gap-2">
              Set Up My Profile
              <ChevronRight className="w-4 h-4" />
            </Button>
          </Link>
          <Link to="/" data-ocid="upload.back_home_link">
            <Button variant="ghost" size="sm">
              Back to Home
            </Button>
          </Link>
        </motion.div>
      </div>
    );
  }

  const canAnalyse =
    !!uploadedFile &&
    uploadedFile.progress === 100 &&
    !uploadedFile.error &&
    !!uploadedFile.blob &&
    !isAnalyzing;

  return (
    <div className="max-w-xl mx-auto px-4 sm:px-6 pb-16 pt-4">
      {/* Page intro */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 text-center"
      >
        <h2 className="text-2xl font-bold text-foreground">
          Upload Your Fundus Image
        </h2>
        <p className="text-sm text-muted-foreground mt-1">
          Upload a clear photo of your retina taken with a fundus camera. The AI
          will check for signs of diabetic retinopathy.
        </p>
      </motion.div>

      {/* Health summary */}
      {patient && (
        <div className="mb-5">
          <HealthSummary patient={patient} />
        </div>
      )}

      {/* Tip banner */}
      <div className="rounded-xl bg-primary/5 border border-primary/20 px-4 py-3 flex items-start gap-3 mb-5">
        <Eye className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
        <p className="text-xs text-foreground/80 leading-relaxed">
          For best results, ensure the image is{" "}
          <strong>clear and well-lit</strong>, taken with a fundus camera or
          ophthalmoscope.
        </p>
      </div>

      {/* Upload zone */}
      <div className="mb-5">
        <UploadZone
          uploadedFile={uploadedFile}
          onFileSelect={(file) => void handleFileSelect(file)}
          onClear={handleClear}
          disabled={isAnalyzing}
        />
      </div>

      {/* Analysis loader */}
      <AnimatePresence>
        {isAnalyzing && (
          <div className="mb-5">
            <AnalysisLoader />
          </div>
        )}
      </AnimatePresence>

      {/* Analyse button */}
      {!isAnalyzing && (
        <Button
          size="lg"
          className="w-full gap-2 text-base py-6"
          disabled={!canAnalyse}
          onClick={() => void handleAnalyse()}
          data-ocid="upload.analyse_button"
        >
          <Scan className="h-5 w-5" />
          Analyse My Scan
        </Button>
      )}

      {/* Hint when no file */}
      {!uploadedFile && !isAnalyzing && (
        <p className="text-center text-xs text-muted-foreground mt-3">
          Upload your fundus photo above to enable analysis
        </p>
      )}

      {/* Back link */}
      <div className="mt-6 text-center">
        <Link to="/" data-ocid="upload.back_link">
          <Button variant="ghost" size="sm" className="text-muted-foreground">
            Back to My Scans
          </Button>
        </Link>
      </div>
    </div>
  );
}

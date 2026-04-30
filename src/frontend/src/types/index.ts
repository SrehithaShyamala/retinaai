// Re-export backend types for convenience in pages/components
export type {
  PatientId,
  ScanId,
  Timestamp,
  Patient,
  CreatePatientInput,
  UpdatePatientInput,
  ScanRecord,
  CreateScanInput,
  ClassificationResult,
  SharedScanView,
} from "../backend";

export { DRStage, RiskLevel, DiabetesType } from "../backend";

// ─── DR stage plain-language labels ───────────────────────────────────────────
import { DRStage, RiskLevel } from "../backend";

export const DR_STAGE_LABELS: Record<DRStage, string> = {
  [DRStage.NoRetinopathy]: "No DR",
  [DRStage.Mild]: "Mild DR",
  [DRStage.Moderate]: "Moderate DR",
  [DRStage.Severe]: "Severe DR",
  [DRStage.Proliferative]: "Proliferative DR",
};

export const DR_STAGE_DESCRIPTIONS: Record<DRStage, string> = {
  [DRStage.NoRetinopathy]:
    "Great news — no signs of diabetic retinopathy were found in your eye scan.",
  [DRStage.Mild]:
    "Early changes are present in your eye. Continue monitoring and maintaining good blood sugar control.",
  [DRStage.Moderate]:
    "Changes in your eye's blood vessels are present. Further medical attention is recommended.",
  [DRStage.Severe]:
    "Significant changes detected. Please see an eye specialist as soon as possible.",
  [DRStage.Proliferative]:
    "Advanced retinal changes detected. Urgent eye care is strongly recommended — please see a specialist now.",
};

export const RISK_GUIDANCE: Record<RiskLevel, string> = {
  [RiskLevel.Low]:
    "No significant signs of diabetic retinopathy found. Keep up the great work — continue regular check-ups with your doctor.",
  [RiskLevel.Moderate]:
    "Early changes were found in your eye scan. Please consult an eye doctor soon — catching this early makes a big difference.",
  [RiskLevel.High]:
    "Your scan shows signs that need urgent attention. Please see an eye specialist as soon as possible — early treatment can protect your vision.",
};

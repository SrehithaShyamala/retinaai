import { cn } from "@/lib/utils";
import { DRStage } from "../../backend";

interface SeverityBadgeProps {
  stage: DRStage;
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const stageStyles: Record<DRStage, string> = {
  [DRStage.NoRetinopathy]:
    "bg-green-500/15 text-green-400 border border-green-500/30",
  [DRStage.Mild]:
    "bg-yellow-500/15 text-yellow-400 border border-yellow-500/30",
  [DRStage.Moderate]:
    "bg-orange-500/15 text-orange-400 border border-orange-500/30",
  [DRStage.Severe]: "bg-red-500/15 text-red-400 border border-red-500/30",
  [DRStage.Proliferative]:
    "bg-red-700/25 text-red-300 border border-red-600/50 animate-risk-glow",
};

const stageLabels: Record<DRStage, string> = {
  [DRStage.NoRetinopathy]: "No DR",
  [DRStage.Mild]: "Mild DR",
  [DRStage.Moderate]: "Moderate DR",
  [DRStage.Severe]: "Severe DR",
  [DRStage.Proliferative]: "Proliferative DR",
};

const dotColors: Record<DRStage, string> = {
  [DRStage.NoRetinopathy]: "bg-green-400",
  [DRStage.Mild]: "bg-yellow-400",
  [DRStage.Moderate]: "bg-orange-400",
  [DRStage.Severe]: "bg-red-400",
  [DRStage.Proliferative]: "bg-red-300",
};

const sizeStyles = {
  sm: "px-1.5 py-0.5 text-xs",
  md: "px-2.5 py-1 text-sm",
  lg: "px-3 py-1.5 text-base",
};

export function SeverityBadge({
  stage,
  showLabel = true,
  size = "md",
  className,
}: SeverityBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full font-mono font-semibold tracking-wide transition-smooth",
        stageStyles[stage],
        sizeStyles[size],
        className,
      )}
      title={`DR Stage: ${stageLabels[stage]}`}
    >
      <span
        className={cn(
          "rounded-full flex-shrink-0",
          size === "sm"
            ? "w-1.5 h-1.5"
            : size === "lg"
              ? "w-2.5 h-2.5"
              : "w-2 h-2",
          dotColors[stage],
        )}
        aria-hidden="true"
      />
      {showLabel && <span>{stageLabels[stage]}</span>}
      {!showLabel && <span>{stage}</span>}
    </span>
  );
}

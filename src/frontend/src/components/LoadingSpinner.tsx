import { cn } from "@/lib/utils";
import { Eye, Loader2 } from "lucide-react";

interface LoadingSpinnerProps {
  /** Show the branded eye icon with animated scan line instead of a simple spinner */
  branded?: boolean;
  /** Extra Tailwind classes on the wrapper */
  className?: string;
  /** Label shown below the spinner */
  label?: string;
  /** Visual size of the spinner */
  size?: "sm" | "md" | "lg";
}

const sizeMap = {
  sm: { container: "w-8 h-8", icon: "w-4 h-4", spinner: "w-4 h-4" },
  md: { container: "w-12 h-12", icon: "w-6 h-6", spinner: "w-5 h-5" },
  lg: { container: "w-16 h-16", icon: "w-8 h-8", spinner: "w-6 h-6" },
};

export function LoadingSpinner({
  branded = false,
  className,
  label,
  size = "md",
}: LoadingSpinnerProps) {
  const s = sizeMap[size];

  if (branded) {
    return (
      <div
        className={cn(
          "flex flex-col items-center justify-center gap-4",
          className,
        )}
        data-ocid="loading.loading_state"
        aria-busy="true"
        aria-label={label ?? "Loading…"}
      >
        <div
          className={cn(
            s.container,
            "rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center relative overflow-hidden",
          )}
        >
          <Eye className={cn(s.icon, "text-primary animate-scan-pulse")} />
          {/* Scan sweep line */}
          <span className="absolute inset-0 border-t border-primary/40 animate-[scanline_2s_ease-in-out_infinite]" />
        </div>
        {label && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span className="text-sm">{label}</span>
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className={cn("flex items-center justify-center", className)}
      data-ocid="loading.loading_state"
      aria-label={label ?? "Loading…"}
    >
      <Loader2
        className={cn(s.spinner, "animate-spin text-muted-foreground")}
      />
      {label && (
        <span className="ml-2 text-sm text-muted-foreground">{label}</span>
      )}
    </div>
  );
}

/** Full-page centered loading overlay — use for initial auth/data load */
export function PageLoader({
  label = "Loading…",
}: {
  label?: string;
}) {
  return (
    <div
      className="flex min-h-screen items-center justify-center bg-background"
      data-ocid="page.loading_state"
    >
      <LoadingSpinner branded size="lg" label={label} />
    </div>
  );
}

import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

interface SkeletonCardProps {
  className?: string;
  lines?: number;
  showAvatar?: boolean;
  showImage?: boolean;
}

const LINE_WIDTHS = ["w-full", "w-4/5", "w-full", "w-3/5", "w-4/5", "w-2/5"];

export function SkeletonCard({
  className,
  lines = 3,
  showAvatar = false,
  showImage = false,
}: SkeletonCardProps) {
  return (
    <div
      className={cn(
        "rounded-lg bg-card border border-border p-4 space-y-3 shadow-elevated",
        className,
      )}
      aria-hidden="true"
    >
      {showImage && <Skeleton className="w-full h-32 rounded-md" />}
      {showAvatar && (
        <div className="flex items-center gap-3">
          <Skeleton className="w-10 h-10 rounded-full flex-shrink-0" />
          <div className="flex-1 space-y-2">
            <Skeleton className="h-4 w-3/4" />
            <Skeleton className="h-3 w-1/2" />
          </div>
        </div>
      )}
      {!showAvatar && (
        <div className="space-y-2">
          <Skeleton className="h-4 w-2/3" />
        </div>
      )}
      <Skeleton className={cn("h-3", LINE_WIDTHS[0])} />
      {lines >= 2 && <Skeleton className={cn("h-3", LINE_WIDTHS[1])} />}
      {lines >= 3 && <Skeleton className={cn("h-3", LINE_WIDTHS[2])} />}
      {lines >= 4 && <Skeleton className={cn("h-3", LINE_WIDTHS[3])} />}
      {lines >= 5 && <Skeleton className={cn("h-3", LINE_WIDTHS[4])} />}
      {lines >= 6 && <Skeleton className={cn("h-3", LINE_WIDTHS[5])} />}
    </div>
  );
}

export function SkeletonStatCard() {
  return (
    <div
      className="rounded-lg bg-card border border-border p-5 shadow-elevated"
      aria-hidden="true"
    >
      <div className="flex items-start justify-between mb-4">
        <Skeleton className="w-10 h-10 rounded-lg" />
        <Skeleton className="w-16 h-5 rounded-full" />
      </div>
      <Skeleton className="h-8 w-1/3 mb-2" />
      <Skeleton className="h-3 w-3/4" />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  const rowKeys = [
    "row-a",
    "row-b",
    "row-c",
    "row-d",
    "row-e",
    "row-f",
    "row-g",
    "row-h",
  ].slice(0, rows);

  return (
    <div className="space-y-px" aria-hidden="true">
      <div className="flex gap-4 px-4 py-3 border-b border-border">
        <Skeleton className="h-3 w-3/12" />
        <Skeleton className="h-3 w-2/12" />
        <Skeleton className="h-3 w-2/12" />
        <Skeleton className="h-3 w-1/12" />
        <Skeleton className="h-3 w-1/12" />
      </div>
      {rowKeys.map((key) => (
        <div
          key={key}
          className="flex gap-4 px-4 py-4 border-b border-border/50"
        >
          <Skeleton className="h-4 w-3/12" />
          <Skeleton className="h-4 w-2/12" />
          <Skeleton className="h-4 w-2/12" />
          <Skeleton className="h-5 w-1/12 rounded-full" />
          <Skeleton className="h-4 w-1/12" />
        </div>
      ))}
    </div>
  );
}

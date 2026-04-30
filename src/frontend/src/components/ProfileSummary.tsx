import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "@tanstack/react-router";
import { Activity, Droplets, Pencil, TrendingUp, User } from "lucide-react";
import { motion } from "motion/react";
import type { Patient } from "../backend";

function ProfileStat({
  label,
  value,
  icon,
  highlight,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  highlight?: "high" | "moderate" | "normal";
}) {
  return (
    <div className="flex flex-col gap-1 px-5 py-4">
      <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
        <span className="text-primary">{icon}</span>
        {label}
      </div>
      <p
        className={cn(
          "text-base font-semibold text-foreground leading-tight truncate",
          highlight === "high" && "text-red-400",
          highlight === "moderate" && "text-orange-400",
        )}
      >
        {value}
      </p>
    </div>
  );
}

export function ProfileSummary({ profile }: { profile: Patient }) {
  return (
    <motion.div
      data-ocid="dashboard.profile_card"
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-border bg-card overflow-hidden"
    >
      {/* Header row */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-border bg-muted/20">
        <div className="flex items-center gap-2">
          <User size={15} className="text-primary" />
          <h2 className="text-sm font-semibold text-foreground">
            My Health Profile
          </h2>
        </div>
        <Button
          asChild
          variant="outline"
          size="sm"
          className="text-xs gap-1.5"
          data-ocid="dashboard.profile_edit_button"
        >
          <Link to="/profile">
            <Pencil className="w-3.5 h-3.5" />
            Edit
          </Link>
        </Button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-border">
        <ProfileStat
          label="Name"
          value={profile.name}
          icon={<User size={14} />}
        />
        <ProfileStat
          label="Age"
          value={`${String(profile.age)} years`}
          icon={<Activity size={14} />}
        />
        <ProfileStat
          label="Diabetes Type"
          value={String(profile.diabetesType)}
          icon={<Droplets size={14} />}
        />
        <ProfileStat
          label="HbA1c"
          value={
            profile.hbA1c !== undefined ? `${profile.hbA1c.toFixed(1)}%` : "N/A"
          }
          icon={<TrendingUp size={14} />}
          highlight={
            profile.hbA1c === undefined
              ? "normal"
              : profile.hbA1c >= 8
                ? "high"
                : profile.hbA1c >= 6.5
                  ? "moderate"
                  : "normal"
          }
        />
      </div>
    </motion.div>
  );
}

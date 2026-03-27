import { cn } from "@/lib/utils";
import React from "react";

export function GlassCard({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-xl border border-white/10 bg-card/60 backdrop-blur-xl shadow-lg p-6 relative overflow-hidden",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}

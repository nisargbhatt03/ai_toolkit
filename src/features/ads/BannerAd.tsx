"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Monitor } from "lucide-react";

interface BannerAdProps {
  slotId?: string;
  label?: string;
  className?: string;
}

export function BannerAd({ slotId = "banner-placeholder-001", label = "Advertisement", className }: BannerAdProps) {
  // In production, integrate google ad / AdMob banner SDK using slotId.
  return (
    <div
      className={cn(
        "w-full py-4 px-6 rounded-2xl border border-dashed border-primary/20 bg-primary/5 dark:bg-primary/10 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left my-6 transition-all hover:border-primary/40",
        className
      )}
      data-ad-slot={slotId}
    >
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-primary/10 text-primary">
          <Monitor className="w-5 h-5" />
        </div>
        <div>
          <span className="text-xs uppercase font-bold tracking-widest text-primary/80 block">
            {label}
          </span>
          <p className="text-xs text-muted-foreground">
            Support free AI tools for everyone • AdMob Unit ID: <code className="text-primary/70">{slotId}</code>
          </p>
        </div>
      </div>
      <div className="text-[10px] px-2.5 py-1 rounded-md bg-muted text-muted-foreground font-mono">
        BANNER AD (320x50 / 728x90)
      </div>
    </div>
  );
}

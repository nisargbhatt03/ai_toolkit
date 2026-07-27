"use client";

import { useCredits } from "@/hooks/useCredits";
import { Zap } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export function CreditBadge() {
  const { remainingCredits, maxDailyCredits } = useCredits();

  const isLow = remainingCredits <= 1;

  return (
    <div className="flex items-center gap-1.5" title={`${remainingCredits}/${maxDailyCredits} free generations left today`}>
      <Badge
        variant={isLow ? "warning" : "gradient"}
        className="px-3 py-1 text-xs font-semibold flex items-center gap-1.5 shadow-sm"
      >
        <Zap className="w-3.5 h-3.5 fill-current animate-pulse text-amber-300" />
        <span>
          {remainingCredits} / {maxDailyCredits} Credits Today
        </span>
      </Badge>
    </div>
  );
}

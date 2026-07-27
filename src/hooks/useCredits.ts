"use client";

import { useState, useEffect, useCallback } from "react";
import { creditsService } from "@/services/storage/CreditsService";
import { CreditsState } from "@/types/credits";

export function useCredits() {
  const [credits, setCredits] = useState<CreditsState>({
    remainingCredits: 50,
    maxDailyCredits: 50,
    lastResetDate: "",
  });

  const refreshCredits = useCallback(() => {
    const updated = creditsService.getCreditsState();
    setCredits(updated);
  }, []);

  useEffect(() => {
    refreshCredits();
  }, [refreshCredits]);

  const consumeCredit = useCallback(() => {
    const newState = creditsService.useCredit();
    setCredits(newState);
    return newState;
  }, []);

  return {
    credits,
    remainingCredits: credits.remainingCredits,
    maxDailyCredits: credits.maxDailyCredits,
    hasAvailableCredits: credits.remainingCredits > 0,
    consumeCredit,
    refreshCredits,
  };
}

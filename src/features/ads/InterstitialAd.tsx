"use client";

import React from "react";
import { X, Tv } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface InterstitialAdProps {
  slotId?: string;
  isOpen?: boolean;
  onClose?: () => void;
}

export function InterstitialAd({ slotId = "interstitial-placeholder-001", isOpen = false, onClose }: InterstitialAdProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-2xl flex flex-col items-center text-center space-y-4">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full hover:bg-muted text-muted-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-white shadow-lg">
          <Tv className="w-7 h-7" />
        </div>

        <div className="space-y-1">
          <span className="text-xs font-bold uppercase tracking-widest text-primary">Full Screen Ad</span>
          <h3 className="text-xl font-bold text-foreground">Featured Sponsor</h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            Interstitial AdMob Slot: <code className="text-primary font-mono">{slotId}</code>
          </p>
        </div>

        <div className="w-full h-40 rounded-2xl bg-muted/60 flex items-center justify-center border border-dashed border-border text-xs text-muted-foreground">
          INTERSTITIAL AD DISPLAY AREA
        </div>

        <Button onClick={onClose} variant="gradient" className="w-full">
          Skip Ad & Continue
        </Button>
      </div>
    </div>
  );
}

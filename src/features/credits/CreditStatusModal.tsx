"use client";

import React from "react";
import { Zap, Clock, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface CreditStatusModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CreditStatusModal({ isOpen, onClose }: CreditStatusModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-md rounded-3xl border border-amber-500/30 bg-card p-6 shadow-2xl flex flex-col items-center text-center space-y-4">
        <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20 shadow-inner">
          <Zap className="w-8 h-8 fill-amber-500/30 animate-pulse" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-amber-500 flex items-center justify-center gap-1">
            <ShieldAlert className="w-4 h-4" /> Daily Limit Reached
          </span>
          <h3 className="text-2xl font-extrabold text-foreground">Out of Free Credits Today</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            You have used all <strong>50 free AI generations</strong> for today. Your 50 free credits will automatically reset tomorrow at midnight!
          </p>
        </div>

        <div className="w-full p-4 rounded-2xl bg-muted/60 border border-border flex items-center gap-3 text-left">
          <Clock className="w-6 h-6 text-primary shrink-0" />
          <div className="text-xs">
            <span className="font-semibold text-foreground block">Automatic Daily Reset</span>
            <span className="text-muted-foreground">Come back tomorrow for 50 fresh generations. No payment required.</span>
          </div>
        </div>

        <Button onClick={onClose} variant="gradient" className="w-full">
          Got It, Thanks!
        </Button>
      </div>
    </div>
  );
}

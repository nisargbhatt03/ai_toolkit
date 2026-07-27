"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getToolBySlug } from "@/constants/tools";
import { useAIGenerate } from "@/hooks/useAIGenerate";
import { useCredits } from "@/hooks/useCredits";
import { analyticsService } from "@/services/analytics/AnalyticsService";

import { ArrowLeft, Sparkles, Trash2, Zap, Loader2, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Textarea } from "@/components/ui/Textarea";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";
import { Skeleton } from "@/components/ui/Skeleton";
import { ResultCard } from "./ResultCard";
import { BannerAd } from "@/features/ads/BannerAd";
import { CreditStatusModal } from "@/features/credits/CreditStatusModal";
import * as Icons from "lucide-react";

interface UniversalAIScreenProps {
  slug: string;
}

export function UniversalAIScreen({ slug }: UniversalAIScreenProps) {
  const tool = getToolBySlug(slug);

  const [inputPrompt, setInputPrompt] = useState("");
  const [resultText, setResultText] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [showCreditModal, setShowCreditModal] = useState(false);

  const { remainingCredits, consumeCredit, refreshCredits } = useCredits();
  const generateMutation = useAIGenerate();

  useEffect(() => {
    if (slug) {
      analyticsService.trackToolOpened(slug);
    }
  }, [slug]);

  if (!tool) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="text-2xl font-bold text-foreground">Tool Not Found</h2>
        <p className="text-muted-foreground text-sm">The requested tool slug &quot;{slug}&quot; does not exist.</p>
        <Link href="/">
          <Button variant="gradient">Return to Home</Button>
        </Link>
      </div>
    );
  }

  const IconComponent = (Icons as unknown as Record<string, React.ElementType>)[tool.iconName] || Icons.Bot;

  const handleGenerate = async () => {
    if (!inputPrompt.trim()) return;

    if (remainingCredits <= 0) {
      setShowCreditModal(true);
      return;
    }

    setErrorMessage("");
    setResultText("");

    try {
      const response = await generateMutation.mutateAsync({
        slug: tool.slug,
        prompt: inputPrompt,
      });

      if (response.success && response.result) {
        setResultText(response.result);
        consumeCredit();
      } else {
        setErrorMessage(response.error || "Failed to generate AI response. Please try again.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Error connecting to AI service.";
      setErrorMessage(msg);
    } finally {
      refreshCredits();
    }
  };

  const handleClear = () => {
    setInputPrompt("");
    setResultText("");
    setErrorMessage("");
  };

  const charCount = inputPrompt.length;
  const maxCharLimit = 4000;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 sm:py-12 space-y-8">
      {/* Back button */}
      <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors">
        <ArrowLeft className="w-4 h-4" />
        <span>Back to All Tools</span>
      </Link>

      {/* Tool Header Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 sm:p-8 shadow-sm">
        <div className={`absolute -top-20 -right-20 w-48 h-48 rounded-full bg-gradient-to-br ${tool.gradient} opacity-20 blur-3xl`} />

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-tr ${tool.gradient} flex items-center justify-center text-white shadow-lg shrink-0`}>
            <IconComponent className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <span className="text-xs uppercase font-bold tracking-wider text-primary">{tool.category}</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-foreground tracking-tight">{tool.title}</h1>
            <p className="text-sm text-muted-foreground leading-relaxed">{tool.description}</p>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <Card className="border border-border/80 shadow-md">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">{tool.inputLabel}</CardTitle>
          <CardDescription className="text-xs">Provide your request or context below to generate AI results.</CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Textarea
            value={inputPrompt}
            onChange={(e) => setInputPrompt(e.target.value)}
            placeholder={tool.placeholderText}
            maxLength={maxCharLimit}
            className="min-h-[180px] text-base"
          />

          <div className="flex items-center justify-between text-xs text-muted-foreground pt-1">
            <span className="flex items-center gap-1.5 font-medium">
              <Zap className="w-3.5 h-3.5 text-amber-500" />
              {remainingCredits} / 3 Daily Credits Left
            </span>

            <span className={charCount >= maxCharLimit ? "text-destructive font-semibold" : ""}>
              {charCount} / {maxCharLimit} chars
            </span>
          </div>

          {/* Error Banner */}
          {errorMessage && (
            <div className="p-4 rounded-xl bg-destructive/10 border border-destructive/20 text-destructive text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
            <Button
              variant="outline"
              onClick={handleClear}
              disabled={!inputPrompt && !resultText}
              className="w-full sm:w-auto text-xs flex items-center gap-1.5"
            >
              <Trash2 className="w-4 h-4 text-muted-foreground" />
              <span>Clear Input</span>
            </Button>

            <Button
              variant="gradient"
              onClick={handleGenerate}
              disabled={!inputPrompt.trim() || generateMutation.isPending}
              className="w-full sm:w-auto px-8 text-sm flex items-center justify-center gap-2"
            >
              {generateMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Generating Response...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 fill-current" />
                  <span>Generate Content</span>
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Loading Skeleton */}
      {generateMutation.isPending && (
        <div className="w-full my-6 space-y-3 p-6 rounded-3xl border border-border bg-card">
          <div className="flex items-center gap-3">
            <Skeleton className="w-8 h-8 rounded-full" />
            <Skeleton className="h-4 w-40" />
          </div>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-5/6" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      )}

      {/* Result Card */}
      {resultText && (
        <ResultCard
          result={resultText}
          onRegenerate={handleGenerate}
          isGenerating={generateMutation.isPending}
        />
      )}

      {/* Banner Ad Placeholder below result */}
      <BannerAd slotId={`tool-result-${slug}`} label="Sponsored Content" />

      {/* Out of Credits Modal */}
      <CreditStatusModal isOpen={showCreditModal} onClose={() => setShowCreditModal(false)} />
    </div>
  );
}

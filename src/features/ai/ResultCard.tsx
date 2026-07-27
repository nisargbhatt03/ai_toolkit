"use client";

import React, { useState } from "react";
import { Copy, Check, Share2, RefreshCw, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { motion } from "framer-motion";

interface ResultCardProps {
  result: string;
  onRegenerate: () => void;
  isGenerating?: boolean;
}

export function ResultCard({ result, onRegenerate, isGenerating = false }: ResultCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(result);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text", err);
    }
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "AI Toolkit Result",
          text: result,
        });
      } catch (err) {
        console.error("Share action canceled or failed", err);
      }
    } else {
      handleCopy();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full my-6"
    >
      <Card className="border border-purple-500/30 bg-card/90 shadow-xl overflow-hidden backdrop-blur-md">
        <CardHeader className="border-b border-border/50 bg-muted/40 pb-4 flex flex-row items-center justify-between">
          <CardTitle className="text-base font-semibold flex items-center gap-2 text-foreground">
            <Sparkles className="w-5 h-5 text-purple-500 fill-purple-500/20" />
            AI Generated Response
          </CardTitle>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleCopy}
              className="text-xs flex items-center gap-1.5 hover:bg-background"
              title="Copy to clipboard"
            >
              {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
              <span>{copied ? "Copied!" : "Copy"}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={handleShare}
              className="text-xs flex items-center gap-1.5 hover:bg-background"
              title="Share result"
            >
              <Share2 className="w-4 h-4" />
              <span className="hidden sm:inline">Share</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              onClick={onRegenerate}
              disabled={isGenerating}
              className="text-xs flex items-center gap-1.5 hover:border-primary"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isGenerating ? "animate-spin" : ""}`} />
              <span>Regenerate</span>
            </Button>
          </div>
        </CardHeader>

        <CardContent className="p-6">
          <div className="prose dark:prose-invert max-w-none text-sm leading-relaxed whitespace-pre-wrap font-sans text-foreground">
            {result}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

"use client";

import React from "react";
import { Search, Sparkles, Zap, ShieldCheck } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { motion } from "framer-motion";

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CATEGORIES = ["All", "Writing", "Productivity", "Social", "Education", "Creative"];

export function HeroSection({
  searchQuery,
  onSearchChange,
  selectedCategory,
  onCategoryChange,
}: HeroSectionProps) {
  return (
    <div className="hidden sm:block relative py-10 md:py-14 text-center overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-gradient-to-r from-purple-500/20 via-indigo-500/20 to-blue-500/20 rounded-full blur-3xl pointer-events-none -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="space-y-4 max-w-3xl mx-auto px-4"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs font-semibold shadow-xs">
          <Sparkles className="w-4 h-4 fill-current" />
          <span>12 Premium AI Utilities • 100% Free</span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-foreground leading-[1.15]">
          Supercharge Your Workflow With <span className="bg-gradient-to-r from-purple-600 via-indigo-500 to-cyan-500 bg-clip-text text-transparent">AI Toolkit</span>
        </h1>

        <p className="text-sm text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          No sign-up required. Instant AI answers, content generation, translations, summaries, and problem solving.
        </p>

        {/* Desktop Live Search Input */}
        <div className="relative max-w-xl mx-auto pt-2">
          <div className="relative flex items-center">
            <Search className="absolute left-4 w-5 h-5 text-muted-foreground pointer-events-none" />
            <Input
              type="text"
              placeholder="Search tools (e.g. Chat, Content Writer, Translator)..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 pr-4 h-13 rounded-2xl text-sm bg-card/80 border-border/80 shadow-md focus-visible:ring-purple-500"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => onCategoryChange(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                selectedCategory === cat
                  ? "bg-primary text-primary-foreground shadow-md shadow-primary/25 scale-105"
                  : "bg-card border border-border text-muted-foreground hover:bg-accent hover:text-foreground"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Value badges */}
        <div className="flex items-center justify-center gap-6 pt-1 text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-500" /> Free Daily Credits
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500" /> Zero Registration
          </span>
        </div>
      </motion.div>
    </div>
  );
}

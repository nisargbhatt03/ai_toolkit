"use client";

import React from "react";
import { HeroSection } from "@/features/home/HeroSection";
import { ToolGrid } from "@/features/home/ToolGrid";
import { BannerAd } from "@/features/ads/BannerAd";
import { useToolSearch } from "@/hooks/useToolSearch";

export default function HomePage() {
  const { searchQuery, setSearchQuery, selectedCategory, setSelectedCategory, filteredTools } =
    useToolSearch();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-6 space-y-4 sm:space-y-6">
      {/* Desktop Hero Section with Search & Categories */}
      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />

      {/* Banner Ad After Hero (Desktop Only) */}
      <div className="hidden sm:block">
        <BannerAd slotId="after-hero-banner" label="Featured Sponsor" />
      </div>

      {/* 2-Column Grid for Android Mobile (with 4 Ads) & Multi-Column Grid for Desktop */}
      <section className="py-1">
        <div className="hidden sm:flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-extrabold tracking-tight text-foreground">AI Power Tools</h2>
            <p className="text-xs text-muted-foreground">Select any tool below to start generating instantly.</p>
          </div>
          <span className="text-xs font-semibold text-muted-foreground px-3 py-1 rounded-full bg-muted">
            Showing {filteredTools.length} tools
          </span>
        </div>

        <ToolGrid tools={filteredTools} />
      </section>

      {/* Desktop Grid Footer Banner */}
      <div className="hidden sm:block">
        <BannerAd slotId="after-grid-banner" label="Partner Advertisement" />
      </div>
    </div>
  );
}

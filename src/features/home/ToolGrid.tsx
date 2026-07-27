"use client";

import React from "react";
import { Tool } from "@/types/tool";
import { ToolCard } from "./ToolCard";
import { BannerAd } from "@/features/ads/BannerAd";
import { motion } from "framer-motion";

interface ToolGridProps {
  tools: Tool[];
}

export function ToolGrid({ tools }: ToolGridProps) {
  if (tools.length === 0) {
    return (
      <div className="w-full py-16 text-center rounded-3xl border border-dashed border-border bg-card/40 my-6">
        <p className="text-muted-foreground text-sm font-medium">No tools found matching your search term.</p>
      </div>
    );
  }

  // First 4 tools (Items 1 to 4)
  const group1 = tools.slice(0, 4);
  // Next 4 tools (Items 5 to 8)
  const group2 = tools.slice(4, 8);
  // Remaining tools (Items 9 to 12)
  const group3 = tools.slice(8);

  return (
    <div className="w-full space-y-4">
      {/* Mobile Top Ad Banner (Ad 1 of 4) */}
      <div className="sm:hidden">
        <BannerAd slotId="1795474539" label="Top Mobile Banner" className="my-2 py-3" />
      </div>

      {/* Group 1: Tools 1-4 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {group1.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: index * 0.03 }}
          >
            <ToolCard tool={tool} />
          </motion.div>
        ))}
      </div>

      {/* Mobile In-Between Ad Banner 1 (Ad 2 of 4 - After 4th Tool) */}
      <div className="sm:hidden">
        <BannerAd slotId="1795474539" label="Sponsored Banner" className="my-2 py-3" />
      </div>

      {/* Group 2: Tools 5-8 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {group2.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: (index + 4) * 0.03 }}
          >
            <ToolCard tool={tool} />
          </motion.div>
        ))}
      </div>

      {/* Mobile In-Between Ad Banner 2 (Ad 3 of 4 - After 8th Tool) */}
      <div className="sm:hidden">
        <BannerAd slotId="1795474539" label="Sponsored Banner" className="my-2 py-3" />
      </div>

      {/* Group 3: Tools 9-12 */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-6">
        {group3.map((tool, index) => (
          <motion.div
            key={tool.id}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, delay: (index + 8) * 0.03 }}
          >
            <ToolCard tool={tool} />
          </motion.div>
        ))}
      </div>

      {/* Mobile Bottom Footer Ad Banner (Ad 4 of 4 - After 12th Tool) */}
      <div className="sm:hidden">
        <BannerAd slotId="1795474539" label="Footer Banner" className="my-2 py-3" />
      </div>
    </div>
  );
}

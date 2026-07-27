"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tool } from "@/types/tool";
import { Badge } from "@/components/ui/Badge";
import * as Icons from "lucide-react";
import { analyticsService } from "@/services/analytics/AnalyticsService";

interface ToolCardProps {
  tool: Tool;
}

export function ToolCard({ tool }: ToolCardProps) {
  // Dynamically resolve icon
  const IconComponent = (Icons as unknown as Record<string, React.ElementType>)[tool.iconName] || Icons.Sparkles;

  const handleClick = () => {
    analyticsService.trackToolOpened(tool.slug);
  };

  return (
    <Link href={`/tool/${tool.slug}`} onClick={handleClick} className="block h-full w-full">
      {/* Mobile / Android View Card (Exact reference image styling) */}
      <motion.div
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.15 }}
        className={`sm:hidden relative aspect-[4/3.2] w-full rounded-3xl bg-gradient-to-br ${tool.gradient} p-4 sm:p-5 flex flex-col justify-between shadow-lg shadow-black/20 overflow-hidden cursor-pointer select-none`}
      >
        <div className="flex items-start justify-between w-full">
          <div className="text-white drop-shadow-sm">
            <IconComponent className="w-8 h-8 stroke-[2]" />
          </div>

          {tool.badge === "NEW" && (
            <span className="text-[10px] font-black tracking-wider text-white uppercase bg-white/20 backdrop-blur-md px-2.5 py-0.5 rounded-full border border-white/30">
              NEW
            </span>
          )}
        </div>

        <div>
          <h3 className="text-base font-black text-white tracking-tight leading-snug drop-shadow-xs">
            {tool.title}
          </h3>
        </div>
      </motion.div>

      {/* Web / Desktop View Card */}
      <motion.div
        whileHover={{ scale: 1.03, y: -4 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.2, ease: "easeOut" }}
        className="hidden sm:flex group relative h-full flex-col justify-between overflow-hidden rounded-3xl border border-border/60 bg-card p-6 shadow-sm hover:shadow-xl hover:border-primary/40 transition-all duration-300"
      >
        <div
          className={`absolute -top-16 -right-16 w-32 h-32 rounded-full bg-gradient-to-br ${tool.gradient} opacity-10 group-hover:opacity-25 transition-opacity blur-2xl`}
        />

        <div>
          <div className="flex items-center justify-between gap-2 mb-4">
            <div
              className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${tool.gradient} flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform duration-300`}
            >
              <IconComponent className="w-6 h-6" />
            </div>
            {tool.badge ? (
              <Badge variant="gradient">{tool.badge}</Badge>
            ) : (
              <Badge variant="outline" className="text-[10px] uppercase tracking-wider font-semibold opacity-70">
                {tool.category}
              </Badge>
            )}
          </div>

          <h3 className="text-lg font-bold tracking-tight text-foreground group-hover:text-primary transition-colors mb-2">
            {tool.title}
          </h3>

          <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
            {tool.description}
          </p>
        </div>

        <div className="mt-6 flex items-center justify-between text-xs font-semibold text-primary pt-3 border-t border-border/40">
          <span>Open Tool</span>
          <Icons.ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </motion.div>
    </Link>
  );
}

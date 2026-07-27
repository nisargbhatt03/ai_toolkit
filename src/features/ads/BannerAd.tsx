"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

interface BannerAdProps {
  slotId?: string;
  label?: string;
  className?: string;
  adClient?: string;
}

export function BannerAd({
  slotId = "1795474539",
  label = "Sponsored Content",
  className,
  adClient = "ca-pub-3029140435146977",
}: BannerAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pushedRef = useRef(false);

  // Check if slotId is numeric (valid AdSense unit ID) or placeholder string
  const isNumericSlot = /^\d+$/.test(slotId);

  useEffect(() => {
    if (pushedRef.current || !containerRef.current || !isNumericSlot) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry && entry.isIntersecting && !pushedRef.current) {
          const el = containerRef.current;
          if (!el) return;

          requestAnimationFrame(() => {
            requestAnimationFrame(() => {
              if (pushedRef.current || !containerRef.current) return;
              const container = containerRef.current;
              const ad = container.querySelector(".adsbygoogle") as HTMLElement;

              // Ensure container and ad element are actually rendered with width > 100px
              if (
                container &&
                container.clientWidth > 100 &&
                ad &&
                ad.clientWidth > 100
              ) {
                try {
                  if (typeof window !== "undefined") {
                    window.adsbygoogle = window.adsbygoogle || [];
                    window.adsbygoogle.push({});
                    pushedRef.current = true;
                  }
                } catch {
                  // Ignore harmless push timing warnings
                }
              }
            });
          });
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [isNumericSlot]);

  return (
    <div
      ref={containerRef}
      className={cn("w-full my-4 flex flex-col items-center justify-center min-h-[90px] w-full overflow-hidden", className)}
      style={{ display: "block", width: "100%", overflow: "hidden" }}
    >
      <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/50 mb-1">
        {label}
      </span>

      {isNumericSlot ? (
        <ins
          className="adsbygoogle"
          style={{
            display: "block",
            width: "100%",
            minWidth: "250px",
            minHeight: "90px",
            backgroundColor: "transparent",
            borderRadius: "1rem",
          }}
          data-ad-client={adClient}
          data-ad-slot={slotId}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      ) : (
        /* Fallback placeholder when numerical AdSense Slot ID is pending */
        <div className="w-full py-4 px-6 rounded-2xl border border-dashed border-primary/20 bg-primary/5 dark:bg-primary/10 flex items-center justify-between gap-3 my-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>AdSense Connected ({adClient})</span>
          </div>
          <span className="text-[10px] px-2 py-0.5 rounded bg-muted text-muted-foreground font-mono">
            Slot: {slotId}
          </span>
        </div>
      )}
    </div>
  );
}

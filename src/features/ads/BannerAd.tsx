"use client";

import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface BannerAdProps {
  slotId?: string;
  label?: string;
  className?: string;
  adClient?: string;
}

export function BannerAd({
  slotId = "1234567890",
  label = "Advertisement",
  className,
  adClient = "ca-pub-3029140435146977",
}: BannerAdProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const pushedRef = useRef(false);

  useEffect(() => {
    const checkAndPushAd = () => {
      if (pushedRef.current || !containerRef.current) return;

      const container = containerRef.current;
      const rect = container.getBoundingClientRect();
      const style = window.getComputedStyle(container);

      // Only push AdSense if element is visible and has a width > 0 (prevents availableWidth=0)
      if (
        style.display !== "none" &&
        style.visibility !== "hidden" &&
        rect.width > 50 &&
        container.offsetWidth > 50
      ) {
        try {
          if (typeof window !== "undefined") {
            ((window as unknown as Record<string, unknown[]>).adsbygoogle =
              (window as unknown as Record<string, unknown[]>).adsbygoogle || []).push({});
            pushedRef.current = true;
          }
        } catch (e) {
          console.error("AdSense push error:", e);
        }
      }
    };

    // Delay check slightly to ensure layout & media queries have evaluated
    const timer = setTimeout(checkAndPushAd, 500);

    // Also listen for resize events if initially hidden
    const handleResize = () => {
      if (!pushedRef.current) {
        checkAndPushAd();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("w-full my-4 flex flex-col items-center justify-center min-h-[90px]", className)}
      style={{ width: "100%", overflow: "hidden" }}
    >
      <span className="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60 mb-1">
        {label}
      </span>
      <ins
        className="adsbygoogle"
        style={{
          display: "block",
          width: "100%",
          minWidth: "250px",
          minHeight: "90px",
        }}
        data-ad-client={adClient}
        data-ad-slot={slotId}
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}

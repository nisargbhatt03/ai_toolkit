"use client";

import Link from "next/link";
import { Sparkles, Bot } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";
import { CreditBadge } from "../common/CreditBadge";

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/30 bg-background/90 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Mobile Title (Android view matching reference image) */}
        <Link href="/" className="sm:hidden flex items-center gap-2">
          <h1 className="text-2xl font-black tracking-tight text-foreground">
            One stop toolkit
          </h1>
        </Link>

        {/* Desktop Web Brand Title */}
        <Link href="/" className="hidden sm:flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white shadow-md shadow-purple-500/20 group-hover:scale-105 transition-transform">
            <Bot className="w-6 h-6" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-foreground flex items-center gap-1">
              AI Toolkit <Sparkles className="w-4 h-4 text-purple-500 inline fill-purple-500/20" />
            </span>
            <span className="text-[10px] uppercase font-semibold text-muted-foreground tracking-wider">
              100% Free AI Suite
            </span>
          </div>
        </Link>

        {/* Right Action Items */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <CreditBadge />
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}

import Link from "next/link";
import { Bot, Shield, Zap, Heart } from "lucide-react";
import { BannerAd } from "@/features/ads/BannerAd";

export function Footer() {
  return (
    <footer className="hidden sm:block w-full border-t border-border/40 bg-card/50 backdrop-blur-xs mt-16">
      {/* Desktop Footer Banner Ad */}
      <div className="max-w-7xl mx-auto px-4 pt-6">
        <BannerAd slotId="1795474539" label="Footer Advertisement" />
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 flex flex-col space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center text-white">
                <Bot className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg text-foreground">AI Toolkit</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-sm leading-relaxed">
              Your free, all-in-one suite of 12 powerful AI utilities for writing, coding, translating, content creation, and problem-solving. No login or sign-up required.
            </p>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3 uppercase tracking-wider">Features</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-1.5"><Zap className="w-4 h-4 text-amber-500" /> Free Daily Credits</li>
              <li className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-emerald-500" /> No Registration Needed</li>
              <li className="flex items-center gap-1.5"><Bot className="w-4 h-4 text-purple-500" /> 12 Smart AI Models</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-sm text-foreground mb-3 uppercase tracking-wider">Architecture</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Built with Next.js 15, React 19, Tailwind CSS, Framer Motion, and Capacitor cross-platform engine.
            </p>
          </div>
        </div>

        <div className="border-t border-border/40 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} AI Toolkit. Free for everyone.</p>
          <p className="flex items-center gap-1">
            Engineered with <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500" /> for Web & Android
          </p>
        </div>
      </div>
    </footer>
  );
}

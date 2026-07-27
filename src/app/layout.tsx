import type { Metadata, Viewport } from "next";
import Script from "next/script";
import "@/app/globals.css";
import { ThemeProvider } from "@/providers/ThemeProvider";
import { QueryProvider } from "@/providers/QueryProvider";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "AI Toolkit - 12 Free Cross-Platform AI Power Tools",
  description:
    "Free AI Chat, Content Writer, Grammar Checker, Text Rewriter, Summarizer, Translator, Email Writer, and Homework Helper. No login required.",
  manifest: "/manifest.json",
  other: {
    "google-adsense-account": "ca-pub-3029140435146977",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://aitoolkit.app",
    title: "AI Toolkit - Free AI Power Tools",
    description: "12 Free AI Tools for writing, translation, summarization, and productivity.",
    siteName: "AI Toolkit",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Toolkit - Free AI Power Tools",
    description: "12 Free AI Tools for writing, translation, summarization, and productivity.",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0f172a" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="google-adsense-account" content="ca-pub-3029140435146977" />
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3029140435146977"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      </head>
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-purple-500 selection:text-white bg-grid-pattern">
        <QueryProvider>
          <ThemeProvider attribute="class" defaultTheme="dark" enableSystem={false}>
            <div className="relative flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}

import React from "react";
import { UniversalAIScreen } from "@/features/ai/UniversalAIScreen";
import { TOOLS } from "@/constants/tools";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateStaticParams() {
  return TOOLS.map((tool) => ({
    slug: tool.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  const tool = TOOLS.find((t) => t.slug === resolvedParams.slug);

  if (!tool) {
    return {
      title: "Tool Not Found - AI Toolkit",
    };
  }

  return {
    title: `${tool.title} | Free AI Toolkit`,
    description: tool.description,
    openGraph: {
      title: `${tool.title} - AI Toolkit`,
      description: tool.description,
      type: "website",
    },
  };
}

export default async function ToolPage({ params }: PageProps) {
  const resolvedParams = await params;
  return <UniversalAIScreen slug={resolvedParams.slug} />;
}

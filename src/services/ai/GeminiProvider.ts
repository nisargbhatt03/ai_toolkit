import { IAIProvider } from "./interfaces";
import { AIGenerateRequest, AIGenerateResponse } from "@/types/ai";
import { getPromptForTool } from "@/constants/prompts";

export const TOOL_MODELS: Record<string, string> = {
  // High-quality generation tools
  "ai-chat": "gemini-2.5-flash",
  chat: "gemini-2.5-flash",
  "ai-content-writer": "gemini-2.5-flash",
  writer: "gemini-2.5-flash",
  "explain-anything": "gemini-2.5-flash",
  explain: "gemini-2.5-flash",
  "ai-homework-helper": "gemini-2.5-flash",
  homework: "gemini-2.5-flash",
  "ai-email-writer": "gemini-2.5-flash",
  email: "gemini-2.5-flash",
  "ai-summarizer": "gemini-2.5-flash",
  summary: "gemini-2.5-flash",

  // Lightweight text processing tools
  "grammar-checker": "gemini-2.5-flash-lite",
  grammar: "gemini-2.5-flash-lite",
  "ai-translator": "gemini-2.5-flash-lite",
  translator: "gemini-2.5-flash-lite",
  "text-rewriter": "gemini-2.5-flash-lite",
  rewrite: "gemini-2.5-flash-lite",
  "ai-caption-generator": "gemini-2.5-flash-lite",
  caption: "gemini-2.5-flash-lite",
  "ai-bio-generator": "gemini-2.5-flash-lite",
  bio: "gemini-2.5-flash-lite",
  "ai-name-generator": "gemini-2.5-flash-lite",
  name: "gemini-2.5-flash-lite",
};

function normalizeModelSlugs(rawName: string): string[] {
  const formatted = rawName.trim().toLowerCase().replace(/\s+/g, "-");
  const slugs: string[] = [formatted];

  if (formatted.includes("lite")) {
    slugs.push("gemini-2.5-flash-lite", "gemini-1.5-flash");
  } else if (formatted.includes("gemma")) {
    slugs.push("gemma-2-27b-it", "gemma-2-9b-it", "gemini-1.5-flash");
  } else {
    slugs.push("gemini-2.5-flash", "gemini-2.0-flash", "gemini-1.5-flash");
  }

  return Array.from(new Set(slugs));
}

export class GeminiProvider implements IAIProvider {
  public name = "Gemini";

  public async generate(request: AIGenerateRequest): Promise<AIGenerateResponse> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey || apiKey === "YOUR_GEMINI_API_KEY_HERE") {
      return {
        success: false,
        error: "Please replace 'YOUR_GEMINI_API_KEY_HERE' in .env.local with your real Google Gemini API key.",
      };
    }

    try {
      const fullPrompt = getPromptForTool(request.slug, request.prompt);

      const preferredModel = TOOL_MODELS[request.slug] || "gemini-2.5-flash-lite";
      const secondaryModel = preferredModel.includes("lite") ? "gemini-2.5-flash" : "gemini-2.5-flash-lite";

      const userCandidates = [
        preferredModel,
        secondaryModel,
        "Gemini 3 Flash",
        "Gemini 3.5 Flash",
        "Gemini 3.6 Flash",
        "Gemma 4 26B",
        "gemini-2.5-flash",
        "gemini-2.5-flash-lite",
        "gemini-2.0-flash",
        "gemini-1.5-flash",
      ];

      const candidateModels = Array.from(
        new Set(userCandidates.flatMap((name) => normalizeModelSlugs(name)))
      );

      const apiVersions = ["v1beta", "v1"];
      let lastError = "";

      // Try candidate models across v1beta and v1 API versions
      for (const modelName of candidateModels) {
        for (const apiVersion of apiVersions) {
          try {
            const endpoint = `https://generativelanguage.googleapis.com/${apiVersion}/models/${encodeURIComponent(modelName)}:generateContent?key=${apiKey}`;

            const res = await fetch(endpoint, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                contents: [
                  {
                    parts: [{ text: fullPrompt }],
                  },
                ],
              }),
            });

            const data = await res.json();

            if (!res.ok) {
              const apiError = data?.error?.message || `Gemini API returned status ${res.status}`;
              if (
                apiError.toLowerCase().includes("api_key_invalid") ||
                apiError.toLowerCase().includes("invalid api key")
              ) {
                return {
                  success: false,
                  error: `Google Gemini API Error: ${apiError}. Please verify your GEMINI_API_KEY in .env.local.`,
                };
              }
              lastError = apiError;
              continue;
            }

            const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

            if (text) {
              return {
                success: true,
                result: text,
                toolSlug: request.slug,
              };
            }
          } catch (err: unknown) {
            lastError = err instanceof Error ? err.message : "Network error calling Gemini API.";
          }
        }
      }

      // Dynamic fallback: List available models authorized for this key
      try {
        const listRes = await fetch(`https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`);
        if (listRes.ok) {
          const listData = await listRes.json();
          const availableModels: string[] = (listData?.models || [])
            .filter((m: { supportedGenerationMethods?: string[] }) =>
              m.supportedGenerationMethods?.includes("generateContent")
            )
            .map((m: { name: string }) => m.name.replace("models/", ""));

          for (const modelName of availableModels) {
            const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(modelName)}:generateContent?key=${apiKey}`;
            const res = await fetch(endpoint, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ contents: [{ parts: [{ text: fullPrompt }] }] }),
            });
            const data = await res.json();
            if (res.ok) {
              const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;
              if (text) {
                return { success: true, result: text, toolSlug: request.slug };
              }
            }
          }
        }
      } catch (listErr) {
        console.error("Dynamic model discovery error:", listErr);
      }

      return {
        success: false,
        error: `Gemini API Error: ${lastError || "No supported model found for your API key."}`,
      };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to process AI request.";
      return {
        success: false,
        error: errorMessage,
      };
    }
  }
}

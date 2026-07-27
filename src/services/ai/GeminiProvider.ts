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

      // Determine model based on TOOL_MODELS map, with fallbacks for maximum resilience
      const preferredModel = TOOL_MODELS[request.slug] || "gemini-2.5-flash";
      const secondaryModel = preferredModel.includes("lite") ? "gemini-2.5-flash" : "gemini-2.5-flash-lite";
      
      const modelsToTry = [preferredModel, secondaryModel, "gemini-2.0-flash", "gemini-1.5-flash"];
      let lastError = "";

      for (const modelName of modelsToTry) {
        try {
          const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`;

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
            
            // If API key itself is invalid, return immediately
            if (apiError.toLowerCase().includes("api_key_invalid") || apiError.toLowerCase().includes("invalid api key")) {
              return {
                success: false,
                error: `Google Gemini API Error: ${apiError}`,
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
          lastError = err instanceof Error ? err.message : "Fetch network failure";
        }
      }

      return {
        success: false,
        error: lastError || "Failed to generate AI response from Gemini.",
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

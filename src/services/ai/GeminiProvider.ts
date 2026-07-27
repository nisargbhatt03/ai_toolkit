import { IAIProvider } from "./interfaces";
import { AIGenerateRequest, AIGenerateResponse } from "@/types/ai";
import { getPromptForTool } from "@/constants/prompts";

export class GeminiProvider implements IAIProvider {
  public name = "Gemini";

  public async generate(request: AIGenerateRequest): Promise<AIGenerateResponse> {
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return {
        success: false,
        error: "GEMINI_API_KEY is not configured in Vercel environment variables.",
      };
    }

    try {
      const fullPrompt = getPromptForTool(request.slug, request.prompt);

      // Call Google Gemini REST API directly for maximum compatibility across serverless environments
      const modelsToTry = ["gemini-1.5-flash", "gemini-2.0-flash", "gemini-1.5-pro"];
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
            lastError = data?.error?.message || `Gemini API returned status ${res.status}`;
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

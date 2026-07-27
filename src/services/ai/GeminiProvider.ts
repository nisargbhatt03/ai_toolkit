import { GoogleGenAI } from "@google/genai";
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
        error: "GEMINI_API_KEY is not configured in server environment.",
      };
    }

    try {
      const ai = new GoogleGenAI({ apiKey });
      const prompt = getPromptForTool(request.slug, request.prompt);

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
      });

      const text = response.text || "";

      if (!text) {
        return {
          success: false,
          error: "Empty response received from AI model.",
        };
      }

      return {
        success: true,
        result: text,
        toolSlug: request.slug,
      };
    } catch (err: unknown) {
      const errorMessage = err instanceof Error ? err.message : "Failed to generate AI response.";
      console.error("[GeminiProvider Error]:", errorMessage);
      return {
        success: false,
        error: errorMessage,
      };
    }
  }
}

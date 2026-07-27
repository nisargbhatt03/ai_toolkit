import { IAIProvider } from "./interfaces";
import { AIGenerateRequest, AIGenerateResponse } from "@/types/ai";

export class OpenAIProvider implements IAIProvider {
  public name = "OpenAI";

  public async generate(request: AIGenerateRequest): Promise<AIGenerateResponse> {
    return {
      success: false,
      error: "OpenAI provider is reserved for future expansion.",
    };
  }
}

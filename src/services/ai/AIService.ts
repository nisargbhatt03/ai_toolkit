import { IAIProvider, IAIService } from "./interfaces";
import { GeminiProvider } from "./GeminiProvider";
import { OpenAIProvider } from "./OpenAIProvider";
import { AIGenerateRequest, AIGenerateResponse } from "@/types/ai";

export class AIService implements IAIService {
  private providers: Map<string, IAIProvider> = new Map();
  private activeProviderName: string = "Gemini";

  constructor() {
    const gemini = new GeminiProvider();
    const openAI = new OpenAIProvider();

    this.providers.set(gemini.name.toLowerCase(), gemini);
    this.providers.set(openAI.name.toLowerCase(), openAI);
  }

  public setProvider(providerName: string): void {
    if (this.providers.has(providerName.toLowerCase())) {
      this.activeProviderName = providerName;
    }
  }

  public async generateContent(request: AIGenerateRequest): Promise<AIGenerateResponse> {
    const provider = this.providers.get(this.activeProviderName.toLowerCase());

    if (!provider) {
      return {
        success: false,
        error: `AI Provider '${this.activeProviderName}' is not registered.`,
      };
    }

    return provider.generate(request);
  }
}

export const aiService = new AIService();

import { AIGenerateRequest, AIGenerateResponse } from "@/types/ai";

export interface IAIProvider {
  name: string;
  generate(request: AIGenerateRequest): Promise<AIGenerateResponse>;
}

export interface IAIService {
  generateContent(request: AIGenerateRequest): Promise<AIGenerateResponse>;
  setProvider(providerName: string): void;
}

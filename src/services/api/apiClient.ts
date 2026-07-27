import axios from "axios";
import { AIGenerateRequest, AIGenerateResponse } from "@/types/ai";

export const apiClient = axios.create({
  headers: {
    "Content-Type": "application/json",
  },
});

export async function generateAIContent(request: AIGenerateRequest): Promise<AIGenerateResponse> {
  const response = await apiClient.post<AIGenerateResponse>("/api/ai/generate", request);
  return response.data;
}

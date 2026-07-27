"use client";

import { useMutation } from "@tanstack/react-query";
import { generateAIContent } from "@/services/api/apiClient";
import { AIGenerateRequest, AIGenerateResponse } from "@/types/ai";

export function useAIGenerate() {
  return useMutation<AIGenerateResponse, Error, AIGenerateRequest>({
    mutationFn: (request: AIGenerateRequest) => generateAIContent(request),
  });
}

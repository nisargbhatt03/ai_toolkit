export interface AIGenerateRequest {
  slug: string;
  prompt: string;
}

export interface AIGenerateResponse {
  success: boolean;
  result?: string;
  error?: string;
  toolSlug?: string;
  usage?: {
    totalTokens?: number;
  };
}

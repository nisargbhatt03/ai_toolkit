import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { aiService } from "@/services/ai/AIService";
import { checkRateLimit } from "@/utils/rateLimit";

const generateSchema = z.object({
  slug: z.string().min(1, "Tool slug is required"),
  prompt: z
    .string()
    .min(1, "Prompt cannot be empty")
    .max(4000, "Prompt exceeds maximum allowed length of 4000 characters"),
});

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "anonymous";

  const rateCheck = checkRateLimit(ip, 30, 60000);
  if (!rateCheck.allowed) {
    return NextResponse.json(
      { success: false, error: "Too many requests. Please wait a minute before trying again." },
      { status: 429, headers: { "Retry-After": "60" } }
    );
  }

  try {
    const body = await req.json();
    const validation = generateSchema.safeParse(body);

    if (!validation.success) {
      const errorMsg = validation.error.issues[0]?.message || "Invalid request body";
      return NextResponse.json({ success: false, error: errorMsg }, { status: 400 });
    }

    const { slug, prompt } = validation.data;

    const result = await aiService.generateContent({ slug, prompt });

    const response = NextResponse.json(result, { status: 200 });
    
    response.headers.set("X-Content-Type-Options", "nosniff");
    response.headers.set("X-Frame-Options", "DENY");
    response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

    return response;
  } catch (err: unknown) {
    console.error("[API Error /api/ai/generate]:", err);
    const msg = err instanceof Error ? err.message : "Internal server error processing AI generation request.";
    return NextResponse.json(
      { success: false, error: msg },
      { status: 500 }
    );
  }
}

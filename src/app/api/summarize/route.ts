import { NextResponse } from "next/server";
import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { title, content } = await req.json();

    if (!content) {
      return NextResponse.json({
        Short: "No content available.",
        Medium: "No content available.",
        Long: "No content available.",
      });
    }

    const prompt = `
You are a neutral, factual news summarizer.

Summarize the following article into three versions:

1. SHORT (1–3 minute read, ~250–400 words)
2. MEDIUM (5 minute read, ~700–1000 words)
3. LONG (7–10 minute read, ~1200–1800 words)

Rules:
- Keep tone neutral and factual
- Avoid sensational language
- Preserve key facts, names, and timeline
- Do NOT invent information
- Make each summary progressively more detailed

Return JSON in this exact format:
{
  "Short": "...",
  "Medium": "...",
  "Long": "..."
}

Article Title: ${title}

Article Content:
${content}
`;

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.3,
    });

    const text = response.choices[0].message.content;

    let parsed;

    try {
      parsed = JSON.parse(text || "");
    } catch {
      return NextResponse.json({
        Short: "Error parsing summary.",
        Medium: "Error parsing summary.",
        Long: "Error parsing summary.",
      });
    }

    return NextResponse.json(parsed);
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { error: "Failed to generate summaries" },
      { status: 500 }
    );
  }
}
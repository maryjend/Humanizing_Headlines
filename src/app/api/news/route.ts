import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      `https://newsapi.org/v2/top-headlines?country=us&pageSize=20&apiKey=${process.env.NEWS_API_KEY}`
    );

    const data = await res.json();

    const formatted = data.articles.map((a: any, index: number) => ({
      id: index.toString(),
      headline: a.title,
      source: a.source.name,
      date: a.publishedAt,
      topic: "General",
      imageUrl: a.urlToImage,
      imageAlt: "News image",
      fullUrl: a.url,
      content: a.description || "No content available",
    }));

    return NextResponse.json(formatted);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}
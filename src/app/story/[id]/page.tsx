"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { articles as fallbackArticles } from "@/data/articles";

import {
  saveArticle,
  removeArticle,
  isArticleSaved,
} from "@/lib/firestore";

import useAuth from "@/lib/useAuth";

type Article = {
  id: string;
  headline: string;
  source: string;
  date?: string;
  topic?: string;
  imageUrl?: string;
  imageAlt?: string;
  fullUrl?: string;
  content?: string;
};

export default function StoryPage() {
  const params = useParams();
  const id = params.id as string;

  const user = useAuth();

  const [article, setArticle] = useState<Article | null>(null);
  const [summaries, setSummaries] = useState<any>(null);
  const [summaryType, setSummaryType] = useState("Short");
  const [loadingSummary, setLoadingSummary] = useState(false);

  const [isSaved, setIsSaved] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function loadArticle() {
      try {
        const res = await fetch("/api/news");
        const data = await res.json();

        let found = data.find((a: any) => a.id === id);

        if (!found) {
          found = fallbackArticles.find((a) => a.id === id);
        }

        if (!found) {
          setArticle(null);
          return;
        }

        setArticle(found);

        // Check if already saved
        if (user) {
          const saved = await isArticleSaved(user.uid, found.id);
          setIsSaved(saved);
        }

        // Fetch summaries
        setLoadingSummary(true);

        const summaryRes = await fetch("/api/summarize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: found.headline,
            content: found.content,
          }),
        });

        const summaryData = await summaryRes.json();
        setSummaries(summaryData);

        setLoadingSummary(false);
      } catch (error) {
        const fallback = fallbackArticles.find((a) => a.id === id);
        setArticle(fallback || null);
      }
    }

    loadArticle();
  }, [id, user]);

  if (!article) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Article not found.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-3xl">

        {/* Headline */}
        <h1 className="text-3xl font-semibold text-slate-900">
          {article.headline}
        </h1>

        {/* Meta */}
        <p className="text-sm text-slate-500 mt-2">
          {article.source} {article.topic && `• ${article.topic}`}
        </p>

        {/* ⭐ SMART SAVE BUTTON */}
        <button
          onClick={async () => {
            if (!user) {
              alert("Please login to save articles");
              return;
            }

            setSaving(true);

            try {
              if (isSaved) {
                await removeArticle(user.uid, article.id);
                setIsSaved(false);
              } else {
                await saveArticle(user.uid, {
                  id: article.id,
                  headline: article.headline,
                  source: article.source,
                  topic: article.topic || "",
                  imageUrl: article.imageUrl || "",
                });
                setIsSaved(true);
              }
            } catch (err) {
              console.error(err);
            }

            setSaving(false);
          }}
          className={`mt-4 px-4 py-2 rounded-lg border text-sm transition
            ${
              isSaved
                ? "bg-green-100 border-green-300 text-green-700"
                : "bg-white border-slate-300 hover:bg-slate-100"
            }
          `}
        >
          {saving
            ? "Saving..."
            : isSaved
            ? "✓ Saved"
            : "⭐ Save Article"}
        </button>

        {/* Image */}
        {article.imageUrl && (
          <img
            src={article.imageUrl}
            alt={article.imageAlt || "Article image"}
            className="mt-4 rounded-xl"
          />
        )}

        {/* Summary Toggle */}
        <div className="mt-6 flex gap-3">
          {["Short", "Medium", "Long"].map((type) => (
            <button
              key={type}
              onClick={() => setSummaryType(type)}
              className={`px-4 py-2 rounded-full border ${
                summaryType === type
                  ? "bg-slate-900 text-white"
                  : "bg-white text-slate-700"
              }`}
            >
              {type}
            </button>
          ))}
        </div>

        {/* Summary Content */}
        <div className="mt-6 text-lg text-slate-800">
          {loadingSummary && <p>Generating summary...</p>}

          {summaries && summaries[summaryType] && (
            <p>{summaries[summaryType]}</p>
          )}
        </div>

        {/* Full Article Link */}
        {article.fullUrl && (
          <a
            href={article.fullUrl}
            target="_blank"
            className="block mt-6 text-blue-600 underline"
          >
            Read full article →
          </a>
        )}

      </div>
    </main>
  );
}
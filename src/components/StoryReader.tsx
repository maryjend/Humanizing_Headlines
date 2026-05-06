"use client";

import { useState, useEffect } from "react";
import { Article, SummaryLength } from "@/types/article";

import { saveArticle } from "@/lib/firestore";
import useAuth from "@/lib/useAuth";

type AISummaries = {
  Short: string;
  Medium: string;
  Long: string;
};

export default function StoryReader({ article }: { article: Article }) {
  const [selectedLength, setSelectedLength] = useState<SummaryLength>("Short");
  const [filterOn, setFilterOn] = useState(true);
  const [showImage, setShowImage] = useState(false);

  const [aiSummaries, setAiSummaries] = useState<AISummaries | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const user = useAuth();
  // 🔥 Load saved preferences
  useEffect(() => {
    const savedLength = localStorage.getItem("preferredLength");
    const savedFilter = localStorage.getItem("filterOn");

    if (savedLength) setSelectedLength(savedLength as SummaryLength);
    if (savedFilter) setFilterOn(savedFilter === "true");
  }, []);

  // 🔥 Fetch AI summaries
  useEffect(() => {
    let cancelled = false;

    async function fetchSummaries() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch("/api/summarize", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: article.headline,
            content: article.content,
          }),
        });

        if (!res.ok) {
          throw new Error(`API error: ${res.status}`);
        }

        const data = await res.json();

        let parsed: AISummaries | null = null;

        if (typeof data.result === "string") {
          const cleaned = data.result
            .replace(/```json/g, "")
            .replace(/```/g, "")
            .trim();
          parsed = JSON.parse(cleaned);
        } else if (typeof data.result === "object") {
          parsed = data.result;
        }

        if (!parsed || !parsed.Short || !parsed.Medium || !parsed.Long) {
          throw new Error("Invalid AI response");
        }

        if (!cancelled) setAiSummaries(parsed);
      } catch (err) {
        console.error(err);
        if (!cancelled) {
          setError("Failed to generate AI summary");
          setAiSummaries(null);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    fetchSummaries();

    return () => {
      cancelled = true;
    };
  }, [article.id]);

  // 🔥 Trigger word filtering
  const triggerWords = ["audit", "lawsuit", "deportation"];

  function filterText(text: string) {
    let filtered = text;

    triggerWords.forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      filtered = filtered.replace(regex, "•••");
    });

    return filtered;
  }

  // 🔥 Get display text
  const displayText =
    (aiSummaries ?? article.summaries)[selectedLength];

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-sm text-slate-500">
        {article.source} • {article.topic} • {article.date}
      </div>

      <h1 className="mt-2 text-3xl font-semibold text-slate-900">
        {article.headline}
      </h1>

      {/* Length Toggle */}
      <div className="mt-6">
        <p className="mb-3 text-sm font-medium text-slate-700">
          Choose how much to read:
        </p>

        <div className="flex gap-3">
          {(["Short", "Medium", "Long"] as SummaryLength[]).map((length) => (
            <button
              key={length}
              onClick={() => {
                setSelectedLength(length);
                localStorage.setItem("preferredLength", length);
              }}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${selectedLength === length
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
                }`}
            >
              {length}
            </button>
          ))}
        </div>
      </div>

      {/* Filter Toggle */}
      <div className="mt-4">
        <label className="flex items-center gap-3 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={filterOn}
            onChange={() => {
              setFilterOn((prev) => {
                const newVal = !prev;
                localStorage.setItem("filterOn", String(newVal));
                return newVal;
              });
            }}
          />
          Reduce sensitive content
        </label>
      </div>

      {/* Summary */}
      <div className="mt-6">
        <h2 className="text-sm font-medium text-slate-700">Summary</h2>

        {loading && (
          <p className="mt-2 text-slate-400 italic">
            Generating AI summary...
          </p>
        )}

        {!loading && error && (
          <p className="mt-2 text-red-500 text-sm">{error}</p>
        )}

        {!loading && !error && (
          <p className="mt-2 leading-7 text-slate-800">
            {filterOn ? filterText(displayText) : displayText}
          </p>
        )}
      </div>

      <h1 className="text-3xl font-semibold text-slate-900">
        {article.headline}
      </h1>

      {/* ⭐ SAVE BUTTON GOES HERE */}
      <button
        onClick={() => {
          if (!user) {
            alert("Please login to save articles");
            return;
          }

          saveArticle(user.uid, article);
        }}
        className="mt-4 px-4 py-2 rounded-lg border border-slate-300 hover:bg-slate-100 text-sm"
      >
        ⭐ Save Article
      </button>

      {/* Image Toggle */}
      <div className="mt-6 border-t border-slate-200 pt-6">
        <label className="flex items-center gap-3 text-sm text-slate-700">
          <input
            type="checkbox"
            checked={showImage}
            onChange={() => setShowImage((prev) => !prev)}
          />
          Show image
        </label>

        {showImage && article.imageUrl && (
          <div className="mt-4 rounded-2xl bg-slate-100 p-8 text-center text-slate-500">
            Image placeholder
          </div>
        )}
      </div>

      <a
        href={article.fullUrl}
        target="_blank"
        rel="noreferrer"
        className="mt-6 inline-block text-sm font-medium text-blue-600 hover:underline"
      >
        Read original source
      </a>
    </div>
  );
}
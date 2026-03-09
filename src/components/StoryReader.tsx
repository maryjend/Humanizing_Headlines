"use client";

import { useState } from "react";
import { Article, SummaryLength } from "@/types/article";

export default function StoryReader({ article }: { article: Article }) {
  const [selectedLength, setSelectedLength] = useState<SummaryLength>("10s");
  const [showImage, setShowImage] = useState(false);

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="text-sm text-slate-500">
        {article.source} • {article.topic} • {article.date}
      </div>

      <h1 className="mt-2 text-3xl font-semibold text-slate-900">
        {article.headline}
      </h1>

      <div className="mt-6">
        <p className="mb-3 text-sm font-medium text-slate-700">
          Choose how long you want to read:
        </p>

        <div className="flex gap-3">
          {(["10s", "30s", "60s"] as SummaryLength[]).map((length) => (
            <button
              key={length}
              onClick={() => setSelectedLength(length)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                selectedLength === length
                  ? "bg-blue-600 text-white"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              {length}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-6">
        <h2 className="text-sm font-medium text-slate-700">Summary</h2>
        <p className="mt-2 leading-7 text-slate-800">
          {article.summaries[selectedLength]}
        </p>
      </div>

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
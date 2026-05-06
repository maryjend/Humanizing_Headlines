"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { articles as fallbackArticles } from "@/data/articles";

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

export default function HomePage() {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  // FILTER STATE
  const [triggerWords, setTriggerWords] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [filterOn, setFilterOn] = useState(false);

  // IMAGE TOGGLE
  const [showImages, setShowImages] = useState(true);

  // LOAD ARTICLES
  useEffect(() => {
    async function loadArticles() {
      try {
        const res = await fetch("/api/news");

        const data = await res.json();

        if (!data || data.error) {
          throw new Error("API failed");
        }

        setArticles(data);

      } catch (error) {
        console.log("Using fallback articles");

        setArticles(fallbackArticles);

      } finally {
        setLoading(false);
      }
    }

    loadArticles();
  }, []);

  // LOAD IMAGE PREFERENCE
  useEffect(() => {
    const saved =
      localStorage.getItem("showImages");

    if (saved !== null) {
      setShowImages(saved === "true");
    }
  }, []);

  // SAVE IMAGE PREFERENCE
  useEffect(() => {
    localStorage.setItem(
      "showImages",
      showImages.toString()
    );
  }, [showImages]);

  // FILTER LOGIC
  const filteredArticles = articles
    .filter((article) => {
      if (!filterOn) return true;

      const text = (
        article.headline +
        " " +
        (article.topic || "")
      ).toLowerCase();

      return !triggerWords.some((word) =>
        text.includes(word)
      );
    })
    .slice(0, 10);

  // LOADING
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50">
        <p className="text-slate-600">
          Loading news...
        </p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-8 pb-16">

      <div className="mx-auto max-w-5xl">

        {/* HERO */}

        <div className="rounded-3xl border bg-white p-8 shadow-sm">

          <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
            Humanizing Headlines
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-900">
            A calmer way to stay informed.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Humanizing Headlines helps reduce
            information overload through
            AI-generated summaries and intentional
            news consumption.
          </p>

        </div>

        {/* HOW IT WORKS */}

        <div className="mt-8 grid gap-4 md:grid-cols-3">

          {/* STEP 1 */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
              Step 1
            </p>

            <h3 className="mt-2 text-lg font-semibold text-slate-900">
              Choose a Story
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Browse headlines in a calmer and
              more intentional reading experience.
            </p>

          </div>

          {/* STEP 2 */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
              Step 2
            </p>

            <h3 className="mt-2 text-lg font-semibold text-slate-900">
              Select Summary Length
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Read short, medium, or detailed
              AI-generated summaries.
            </p>

          </div>

          {/* STEP 3 */}

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">

            <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
              Step 3
            </p>

            <h3 className="mt-2 text-lg font-semibold text-slate-900">
              Read Intentionally
            </h3>

            <p className="mt-3 text-sm leading-6 text-slate-600">
              Stay informed without overwhelming
              doomscrolling and headline fatigue.
            </p>

          </div>

        </div>

        {/* CONTROLS */}

        <div className="mt-8 rounded-2xl border bg-white p-6 shadow-sm">

          <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">

            {/* FILTERS */}

            <div className="flex-1">

              <h3 className="font-medium text-slate-900">
                Content Filters
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Add trigger words to personalize
                your reading experience.
              </p>

              <div className="mt-4 flex gap-2">

                <input
                  type="text"
                  placeholder="Add trigger word..."
                  value={input}
                  onChange={(e) =>
                    setInput(e.target.value)
                  }
                  className="rounded-xl border p-3"
                />

                <button
                  onClick={() => {
                    if (input.trim()) {
                      setTriggerWords([
                        ...triggerWords,
                        input.toLowerCase(),
                      ]);

                      setInput("");
                    }
                  }}
                  className="rounded-xl bg-slate-900 px-4 py-3 text-white transition hover:bg-slate-700"
                >
                  Add
                </button>

              </div>

              {/* TAGS */}

              <div className="mt-4 flex flex-wrap gap-2">

                {triggerWords.map((word, i) => (
                  <span
                    key={i}
                    className="cursor-pointer rounded-full bg-slate-200 px-3 py-1 text-sm"
                    onClick={() =>
                      setTriggerWords(
                        triggerWords.filter(
                          (_, idx) => idx !== i
                        )
                      )
                    }
                  >
                    {word} ✕
                  </span>
                ))}

              </div>

              {/* FILTER TOGGLE */}

              <button
                onClick={() =>
                  setFilterOn(!filterOn)
                }
                className="mt-4 rounded-xl border px-4 py-2 text-sm transition hover:bg-slate-100"
              >
                {filterOn
                  ? "Filtering ON"
                  : "Filtering OFF"}
              </button>

            </div>

            {/* IMAGE TOGGLE */}

            <div>

              <h3 className="font-medium text-slate-900">
                Reading View
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Customize image visibility.
              </p>

              <button
                onClick={() =>
                  setShowImages(!showImages)
                }
                className="mt-4 rounded-xl bg-slate-200 px-4 py-3 text-sm transition hover:bg-slate-300"
              >
                {showImages
                  ? "Hide Images"
                  : "Show Images"}
              </button>

            </div>

          </div>

        </div>

        {/* WARNING */}

        {filteredArticles.length < 5 &&
          filterOn && (
            <p className="mt-4 text-sm text-slate-500">
              Not enough articles match your
              filters. Try removing some trigger
              words.
            </p>
          )}

        {/* ARTICLES */}

        <div className="mt-10 grid gap-6">

          {filteredArticles.map((article) => (

            <Link
              key={article.id}
              href={`/story/${article.id}`}
              className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
            >

              <div className="mb-2 text-sm text-slate-500">

                {article.source}

                {article.topic &&
                  ` • ${article.topic}`}

              </div>

              <h2 className="text-2xl font-medium text-slate-900">
                {article.headline}
              </h2>

              {/* READING TIME */}

              <p className="mt-2 text-sm text-blue-600">
                ~1 minute read
              </p>

              {/* IMAGE */}

              {showImages &&
                article.imageUrl && (
                  <img
                    src={article.imageUrl}
                    alt={
                      article.imageAlt ||
                      "Article image"
                    }
                    className="mt-4 h-56 w-full rounded-xl object-cover"
                  />
                )}

            </Link>

          ))}

        </div>

      </div>

    </main>
  );
}
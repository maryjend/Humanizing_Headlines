import Link from "next/link";
import { articles } from "@/data/articles";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-semibold tracking-tight text-slate-900">
          Humanizing Headlines
        </h1>
        <p className="mt-2 text-slate-600">
          Reduce news fatigue through intentional reading.
        </p>

        <div className="mt-8 grid gap-6">
          {articles.map((article) => (
            <Link
              key={article.id}
              href={`/story/${article.id}`}
              className="block rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="mb-2 text-sm text-slate-500">
                {article.source} • {article.topic}
              </div>

              <h2 className="text-2xl font-medium text-slate-900">
                {article.headline}
              </h2>

              <p className="mt-3 text-slate-700">
                {article.summaries["10s"]}
              </p>

              <div className="mt-4 flex gap-2 text-sm">
                <span className="rounded-full bg-slate-100 px-3 py-1">10s</span>
                <span className="rounded-full bg-slate-100 px-3 py-1">30s</span>
                <span className="rounded-full bg-slate-100 px-3 py-1">60s</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
import Link from "next/link";
import { notFound } from "next/navigation";
import { articles } from "@/data/articles";
import StoryReader from "@/components/StoryReader";

export default async function StoryPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const article = articles.find((a) => a.id === id);

  if (!article) {
    return notFound();
  }

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-6 inline-block text-sm text-slate-600 hover:underline"
        >
          ← Back to stories
        </Link>

        <StoryReader article={article} />
      </div>
    </main>
  );
}

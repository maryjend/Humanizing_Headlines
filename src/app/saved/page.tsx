"use client";

import { useEffect, useState } from "react";
import useAuth from "@/lib/useAuth";
import { db } from "@/firebase";
import { doc, getDoc } from "firebase/firestore";
import Link from "next/link";

export default function SavedPage() {
  const user = useAuth();
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const fetchSaved = async () => {
      try {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);

        if (snap.exists()) {
          const data = snap.data();

          // ✅ CORRECT PATH (matches your firestore.ts)
          const saved = data?.folders?.all?.articles || [];

          console.log("Loaded saved:", saved); // debug

          setArticles(saved);
        }
      } catch (err) {
        console.error("Error fetching saved articles:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSaved();
  }, [user]);

  if (!user) {
    return (
      <main className="p-8">
        <p>Please log in to view saved articles.</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <h1 className="text-3xl font-semibold text-slate-900">
        Saved Articles
      </h1>

      <div className="mt-6 space-y-4">
        {loading && <p>Loading...</p>}

        {!loading && articles.length === 0 && (
          <p className="text-slate-500">No saved articles yet.</p>
        )}

        {articles.map((article, i) => (
          <Link key={i} href={`/story/${article.id}`}>
            <div className="p-4 bg-white border rounded-xl shadow-sm hover:shadow-md cursor-pointer transition">

              <h2 className="text-lg font-medium">
                {article.headline}
              </h2>

              <p className="text-sm text-slate-500">
                {article.source} • {article.topic}
              </p>

            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
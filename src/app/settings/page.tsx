"use client";

import { useEffect, useState } from "react";

import useAuth from "@/lib/useAuth";

import {
  saveTriggerWords,
  getTriggerWords,
  saveHideImagesPreference,
  getHideImagesPreference,
} from "@/lib/firestore";

export default function SettingsPage() {
  const user = useAuth();

  const [triggerInput, setTriggerInput] = useState("");
  const [triggerWords, setTriggerWords] = useState<string[]>([]);

  const [hideImages, setHideImages] = useState(false);

  const [loading, setLoading] = useState(true);
  const [savedMessage, setSavedMessage] = useState("");

  /* =========================
     LOAD USER PREFERENCES
  ========================= */

  useEffect(() => {
    async function loadPreferences() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        const savedWords = await getTriggerWords(user.uid);

        const savedHideImages =
          await getHideImagesPreference(user.uid);

        setTriggerWords(savedWords);
        setHideImages(savedHideImages);
      } catch (error) {
        console.error("Error loading preferences:", error);
      }

      setLoading(false);
    }

    loadPreferences();
  }, [user]);

  /* =========================
     ADD TRIGGER WORD
  ========================= */

  const addTriggerWord = () => {
    const trimmed = triggerInput.trim();

    if (!trimmed) return;

    // Prevent duplicates
    if (triggerWords.includes(trimmed)) {
      setTriggerInput("");
      return;
    }

    setTriggerWords([...triggerWords, trimmed]);

    setTriggerInput("");
  };

  /* =========================
     REMOVE WORD
  ========================= */

  const removeWord = (word: string) => {
    setTriggerWords(
      triggerWords.filter((w) => w !== word)
    );
  };

  /* =========================
     SAVE PREFERENCES
  ========================= */

  const handleSave = async () => {
  if (!user) {
    console.log("NO USER");
    return;
  }

  console.log("USER UID:", user.uid);

  console.log("SAVING WORDS:", triggerWords);

  try {
    await saveTriggerWords(
      user.uid,
      triggerWords
    );

    console.log("SAVE SUCCESS");

    await saveHideImagesPreference(
      user.uid,
      hideImages
    );

    setSavedMessage("Preferences saved!");

    setTimeout(() => {
      setSavedMessage("");
    }, 3000);

  } catch (error) {
    console.error("SAVE ERROR:", error);
  }
};

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <main className="min-h-screen bg-slate-50 p-8">
        <p className="text-slate-600">
          Loading settings...
        </p>
      </main>
    );
  }

  /* =========================
     NOT LOGGED IN
  ========================= */

  if (!user) {
    return (
      <main className="min-h-screen bg-slate-50 p-8">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-semibold text-slate-900">
            Settings
          </h1>

          <p className="mt-4 text-slate-600">
            Please log in to manage your
            preferences.
          </p>
        </div>
      </main>
    );
  }

  /* =========================
     PAGE
  ========================= */

  return (
    <main className="min-h-screen bg-slate-50 p-8">
      <div className="mx-auto max-w-3xl">

        {/* HEADER */}

        <h1 className="text-3xl font-semibold text-slate-900">
          Settings
        </h1>

        <p className="mt-2 text-slate-600">
          Customize how you experience the
          news.
        </p>

        {/* PREFERENCES CARD */}

        <div className="mt-6 rounded-2xl border bg-white p-6 shadow-sm">

          <h2 className="text-lg font-medium text-slate-900">
            Preferences
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            Personalize your news experience by
            saving trigger words and controlling
            image visibility.
          </p>

          {/* TRIGGER WORDS */}

          <div className="mt-8">

            <h3 className="text-md font-medium text-slate-900">
              Trigger Words
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Add topics or keywords you would
              prefer to avoid.
            </p>

            {/* INPUT */}

            <div className="mt-4 flex gap-2">

              <input
                type="text"
                value={triggerInput}
                onChange={(e) =>
                  setTriggerInput(e.target.value)
                }
                placeholder="Enter trigger word..."
                className="flex-1 rounded-xl border border-slate-300 p-3 outline-none focus:border-slate-500"
              />

              <button
                onClick={addTriggerWord}
                className="rounded-xl bg-slate-900 px-5 py-3 text-white transition hover:bg-slate-700"
              >
                Add
              </button>
            </div>

            {/* TAGS */}

            <div className="mt-4 flex flex-wrap gap-2">

              {triggerWords.length === 0 && (
                <p className="text-sm text-slate-400">
                  No trigger words added yet.
                </p>
              )}

              {triggerWords.map((word) => (
                <button
                  key={word}
                  onClick={() =>
                    removeWord(word)
                  }
                  className="rounded-full bg-slate-200 px-3 py-1 text-sm text-slate-700 transition hover:bg-slate-300"
                >
                  {word} ×
                </button>
              ))}
            </div>
          </div>

          {/* IMAGE PREFERENCE */}

          <div className="mt-8">

            <h3 className="text-md font-medium text-slate-900">
              Image Visibility
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Hide article images for a calmer
              reading experience.
            </p>

            <label className="mt-4 flex items-center gap-3">

              <input
                type="checkbox"
                checked={hideImages}
                onChange={(e) =>
                  setHideImages(
                    e.target.checked
                  )
                }
                className="h-4 w-4"
              />

              <span className="text-sm text-slate-700">
                Hide article images
              </span>
            </label>
          </div>

          {/* SAVE BUTTON */}

          <button
            onClick={handleSave}
            className="mt-8 rounded-xl bg-blue-600 px-6 py-3 text-white transition hover:bg-blue-500"
          >
            Save Preferences
          </button>

          {/* SUCCESS MESSAGE */}

          {savedMessage && (
            <p className="mt-4 text-sm text-green-600">
              {savedMessage}
            </p>
          )}

        </div>
      </div>
    </main>
  );
}
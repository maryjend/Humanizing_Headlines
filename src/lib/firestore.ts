import { db } from "@/firebase";

import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";

/* =========================
   INITIALIZE USER
========================= */

export async function initializeUser(userId: string) {
  const ref = doc(db, "users", userId);

  const snap = await getDoc(ref);

  // ONLY CREATE IF USER DOES NOT EXIST
  if (!snap.exists()) {
    await setDoc(
      ref,
      {
        folders: {
          all: {
            name: "All Articles",
            articles: [],
          },
        },

        triggerWords: [],
        hideImages: false,
      },
      { merge: true }
    );

    console.log("NEW USER CREATED");
  }
}

/* =========================
   SAVE ARTICLE
========================= */

export async function saveArticle(
  userId: string,
  article: any
) {
  const ref = doc(db, "users", userId);

  await initializeUser(userId);

  const snap = await getDoc(ref);

  const data = snap.data();

  const allArticles =
    data?.folders?.all?.articles || [];

  const exists = allArticles.find(
    (a: any) => a.id === article.id
  );

  if (exists) return;

  const updated = [...allArticles, article];

  await updateDoc(ref, {
    "folders.all.articles": updated,
  });
}

/* =========================
   REMOVE ARTICLE
========================= */

export async function removeArticle(
  userId: string,
  articleId: string
) {
  const ref = doc(db, "users", userId);

  const snap = await getDoc(ref);

  if (!snap.exists()) return;

  const data = snap.data();

  const allArticles =
    data?.folders?.all?.articles || [];

  const updated = allArticles.filter(
    (a: any) => a.id !== articleId
  );

  await updateDoc(ref, {
    "folders.all.articles": updated,
  });
}

/* =========================
   CHECK IF SAVED
========================= */

export async function isArticleSaved(
  userId: string,
  articleId: string
) {
  const ref = doc(db, "users", userId);

  const snap = await getDoc(ref);

  if (!snap.exists()) return false;

  const data = snap.data();

  const allArticles =
    data?.folders?.all?.articles || [];

  return allArticles.some(
    (a: any) => a.id === articleId
  );
}

/* =========================
   CREATE FOLDER
========================= */

export async function createFolder(
  userId: string,
  folderName: string
) {
  const ref = doc(db, "users", userId);

  await initializeUser(userId);

  const folderId = `folder_${Date.now()}`;

  await updateDoc(ref, {
    [`folders.${folderId}`]: {
      name: folderName,
      articles: [],
    },
  });
}

/* =========================
   SAVE TRIGGER WORDS
========================= */

export async function saveTriggerWords(
  userId: string,
  triggerWords: string[]
) {
  const ref = doc(db, "users", userId);

  await initializeUser(userId);

  console.log("WRITING TO FIRESTORE");

  await setDoc(
    ref,
    {
      triggerWords,
    },
    { merge: true }
  );

  console.log("FIRESTORE WRITE COMPLETE");
}

/* =========================
   GET TRIGGER WORDS
========================= */

export async function getTriggerWords(
  userId: string
): Promise<string[]> {
  const ref = doc(db, "users", userId);

  await initializeUser(userId);

  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return [];
  }

  const data = snap.data();

  console.log("LOADED DATA:", data);

  return data?.triggerWords || [];
}

/* =========================
   SAVE IMAGE PREFERENCE
========================= */

export async function saveHideImagesPreference(
  userId: string,
  hideImages: boolean
) {
  const ref = doc(db, "users", userId);

  await initializeUser(userId);

  await setDoc(
    ref,
    {
      hideImages,
    },
    { merge: true }
  );
}

/* =========================
   GET IMAGE PREFERENCE
========================= */

export async function getHideImagesPreference(
  userId: string
): Promise<boolean> {
  const ref = doc(db, "users", userId);

  await initializeUser(userId);

  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return false;
  }

  const data = snap.data();

  return data?.hideImages || false;
}
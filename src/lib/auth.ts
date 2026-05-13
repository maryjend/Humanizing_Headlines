import { auth, db } from "@/firebase";

import {
  doc,
  setDoc,
} from "firebase/firestore";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

/*  SIGN UP */

export const signUp = async (
  email: string,
  password: string
) => {
  const userCred =
    await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

  // CREATE USER DOCUMENT
  await setDoc(
    doc(db, "users", userCred.user.uid),
    {
      email: userCred.user.email,

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

  return userCred;
};

/* LOGIN */

export const login = (
  email: string,
  password: string
) => {
  return signInWithEmailAndPassword(
    auth,
    email,
    password
  );
};

/* LOGOUT */

export const logout = () => {
  return signOut(auth);
};
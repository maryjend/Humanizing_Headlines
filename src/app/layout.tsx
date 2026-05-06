"use client";

import Link from "next/link";
import "./globals.css";

import { useRouter } from "next/navigation";

import { signOut } from "firebase/auth";
import { auth } from "@/firebase";

import useAuth from "@/lib/useAuth";

import Notification from "@/components/Notifications";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const user = useAuth();

  const router = useRouter();

  return (
    <html lang="en">

      <body className="bg-slate-50 text-slate-900">

        {/* NOTIFICATION */}

        <Notification />

        {/* NAVBAR */}

        <nav className="sticky top-0 z-50 w-full border-b bg-white/90 backdrop-blur">

          <div className="mx-auto flex max-w-6xl items-center justify-between px-8 py-4">

            {/* LOGO */}

            <Link
              href="/home"
              className="text-lg font-semibold tracking-tight text-slate-900 transition hover:text-slate-700"
            >
              Humanizing Headlines
            </Link>

            {/* NAVIGATION */}

            <div className="flex items-center gap-6">

              <Link
                href="/home"
                className="text-sm text-slate-700 transition hover:text-slate-900"
              >
                Home
              </Link>

              <Link
                href="/saved"
                className="text-sm text-slate-700 transition hover:text-slate-900"
              >
                Saved
              </Link>

              <Link
                href="/about"
                className="text-sm text-slate-700 transition hover:text-slate-900"
              >
                Mission
              </Link>

              {/* LOGIN */}

              {!user && (
                <Link
                  href="/login"
                  className="text-sm text-slate-700 transition hover:text-slate-900"
                >
                  Login
                </Link>
              )}

              {/* LOGOUT */}

              {user && (
                <button
                  onClick={async () => {

                    await signOut(auth);

                    localStorage.setItem(
                      "notification",
                      "Logged out successfully"
                    );

                    router.push("/");
                  }}
                  className="text-sm text-red-500 transition hover:underline"
                >
                  Logout
                </button>
              )}

            </div>

          </div>

        </nav>

        {/* PAGE CONTENT */}

        {children}

        {/* FOOTER */}

        <footer className="mt-16 border-t bg-white">

          <div className="mx-auto flex max-w-6xl flex-col gap-2 px-8 py-6 text-sm text-slate-500 md:flex-row md:items-center md:justify-between">

            <p>
              <span className="font-medium text-slate-700">
                Humanizing Headlines
              </span>
            </p>

            <p>
              Senior Capstone Project • Mary
              Jendricks • 2026
            </p>

          </div>

        </footer>

      </body>

    </html>
  );
}
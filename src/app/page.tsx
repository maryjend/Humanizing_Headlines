import Link from "next/link";

export default function LandingPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-8">

      <div className="w-full max-w-4xl rounded-3xl border bg-white p-10 shadow-sm">

        {/* HERO */}

        <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
          Senior Capstone Project
        </p>

        <h1 className="mt-4 text-6xl font-semibold tracking-tight text-slate-900">
          Humanizing Headlines
        </h1>

        <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
          A calmer and more intentional way to
          engage with the news. Humanizing
          Headlines uses AI-generated summaries
          and customizable reading experiences
          to reduce information overload and
          news fatigue.
        </p>

        {/* BUTTONS */}

        <div className="mt-10 flex flex-col gap-4 sm:flex-row">

          <Link href="/login">

            <button className="w-full rounded-2xl bg-slate-900 px-6 py-4 text-white transition hover:bg-slate-700 sm:w-auto">
              Log In
            </button>

          </Link>

          <Link href="/signup">

            <button className="w-full rounded-2xl border border-slate-300 bg-white px-6 py-4 text-slate-900 transition hover:bg-slate-100 sm:w-auto">
              Create Account
            </button>

          </Link>

          <Link href="/home">

            <button className="w-full rounded-2xl border border-blue-200 bg-blue-50 px-6 py-4 text-blue-700 transition hover:bg-blue-100 sm:w-auto">
              Continue as Guest
            </button>

          </Link>

        </div>

        {/* FEATURES */}

        <div className="mt-12 grid gap-4 md:grid-cols-3">

          <div className="rounded-2xl bg-slate-50 p-5">

            <h3 className="font-semibold text-slate-900">
              AI Summaries
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Read stories in short, medium, or
              detailed formats.
            </p>

          </div>

          <div className="rounded-2xl bg-slate-50 p-5">

            <h3 className="font-semibold text-slate-900">
              Intentional Reading
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Reduce doomscrolling and
              information overload.
            </p>

          </div>

          <div className="rounded-2xl bg-slate-50 p-5">

            <h3 className="font-semibold text-slate-900">
              Personalized Experience
            </h3>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Save articles and customize your
              reading preferences.
            </p>

          </div>

        </div>

      </div>

    </main>
  );
}

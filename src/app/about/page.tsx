export default function AboutPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-8 py-12">
      <div className="mx-auto max-w-4xl">

        {/* HERO */}

        <div className="rounded-3xl border bg-white p-10 shadow-sm">

          <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
            Humanizing Headlines
          </p>

          <h1 className="mt-4 text-5xl font-semibold tracking-tight text-slate-900">
            News designed for people,
            not algorithms.
          </h1>

          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-600">
            Humanizing Headlines is a web application
            designed to reduce news fatigue and create
            a healthier digital reading experience.
            Instead of overwhelming users with endless
            doomscrolling and emotionally exhausting
            headlines, the platform encourages more
            intentional and accessible news consumption.
          </p>
        </div>

        {/* MISSION */}

        <section className="mt-10 rounded-3xl border bg-white p-8 shadow-sm">

          <h2 className="text-3xl font-semibold text-slate-900">
            Our Mission
          </h2>

          <p className="mt-4 text-slate-600 leading-7">
            Modern news platforms are optimized for
            clicks, urgency, and emotional reactions.
            While staying informed is important, many
            people experience anxiety, stress, and
            emotional exhaustion from the way news is
            currently delivered online.
          </p>

          <p className="mt-4 text-slate-600 leading-7">
            Humanizing Headlines aims to create a more
            mindful news environment by helping users:
          </p>

          <ul className="mt-6 space-y-3 text-slate-700">
            <li>• Read news in shorter, more digestible formats</li>
            <li>• Reduce information overload</li>
            <li>• Avoid emotionally triggering content</li>
            <li>• Customize their reading experience</li>
            <li>• Engage with current events intentionally</li>
          </ul>
        </section>

        {/* HOW IT WORKS */}

        <section className="mt-10 rounded-3xl border bg-white p-8 shadow-sm">

          <h2 className="text-3xl font-semibold text-slate-900">
            How It Works
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-2">

            <div className="rounded-2xl bg-slate-50 p-6">
              <h3 className="text-xl font-medium text-slate-900">
                AI-Powered Summaries
              </h3>

              <p className="mt-3 text-slate-600 leading-7">
                Articles are processed through AI to
                generate multiple summary lengths,
                allowing users to choose between quick,
                medium, or detailed reading experiences.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-6">
              <h3 className="text-xl font-medium text-slate-900">
                Personalized Preferences
              </h3>

              <p className="mt-3 text-slate-600 leading-7">
                Users can customize their experience
                with trigger-word filtering and image
                visibility controls to create a calmer
                and more comfortable interface.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-6">
              <h3 className="text-xl font-medium text-slate-900">
                Saved Articles
              </h3>

              <p className="mt-3 text-slate-600 leading-7">
                Readers can save stories into folders
                for future reading and organization,
                encouraging intentional engagement
                rather than endless scrolling.
              </p>
            </div>

            <div className="rounded-2xl bg-slate-50 p-6">
              <h3 className="text-xl font-medium text-slate-900">
                Accessible Design
              </h3>

              <p className="mt-3 text-slate-600 leading-7">
                The interface was designed with a calm,
                minimal aesthetic to reduce visual
                stress and create a more approachable
                reading environment.
              </p>
            </div>

          </div>
        </section>

        {/* FUTURE FEATURES */}

        <section className="mt-10 rounded-3xl border bg-white p-8 shadow-sm">

          <h2 className="text-3xl font-semibold text-slate-900">
            Future Improvements
          </h2>

          <ul className="mt-6 space-y-3 text-slate-700">
            <li>• Real-time news API integration</li>
            <li>• Smarter emotional content detection</li>
            <li>• Personalized article recommendations</li>
            <li>• Accessibility-focused reading modes</li>
            <li>• Improved AI summarization accuracy</li>
            <li>• Cross-device user preference syncing</li>
          </ul>
        </section>

      </div>
    </main>
  );
}
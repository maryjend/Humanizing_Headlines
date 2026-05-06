export default function MissionPage() {
    return (
        <main className="min-h-screen bg-slate-50 p-8">
            <div className="mx-auto max-w-3xl">
                <h1 className="text-3xl font-semibold text-slate-900">
                    Our Mission
                </h1>

                <p className="mt-2 text-slate-600">
                    Humanizing Headlines is designed to rethink how we engage with news.
                </p>

                <div className="mt-6 p-6 bg-white rounded-2xl border shadow-sm">
                    <p className="text-slate-700 leading-relaxed">
                        Today’s news environment can feel overwhelming, fast-paced, and emotionally exhausting.
                        Many people disengage not because they don’t care, but because the experience becomes too heavy.
                    </p>

                    <p className="mt-4 text-slate-700 leading-relaxed">
                        This platform empowers users to control how they consume information — choosing their depth,
                        filtering sensitive topics, and engaging intentionally rather than reactively.
                    </p>

                    <p className="mt-4 text-slate-700 leading-relaxed">
                        The goal is simple: make staying informed feel sustainable, not overwhelming.
                    </p>
                </div>
            </div>
        </main>
    );
}
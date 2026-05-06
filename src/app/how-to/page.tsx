export default function HowToPage() {
    return (
        <main className="min-h-screen bg-slate-50 p-8">
            <div className="mx-auto max-w-3xl">
                <h1 className="text-3xl font-semibold text-slate-900">
                    How to Use
                </h1>

                <p className="mt-2 text-slate-600">
                    Navigate the news in a way that works for you.
                </p>

                <div className="mt-6 space-y-6">
                    <div className="p-6 bg-white rounded-2xl border shadow-sm">
                        <h2 className="font-medium">Choose your reading time</h2>
                        <p className="text-sm text-slate-600 mt-2">
                            Each story can be viewed in short, medium, or long form depending on how much time you have.
                        </p>
                    </div>

                    <div className="p-6 bg-white rounded-2xl border shadow-sm">
                        <h2 className="font-medium">Filter content</h2>
                        <p className="text-sm text-slate-600 mt-2">
                            Add trigger words to remove topics you don’t want to see.
                        </p>
                    </div>

                    <div className="p-6 bg-white rounded-2xl border shadow-sm">
                        <h2 className="font-medium">Browse intentionally</h2>
                        <p className="text-sm text-slate-600 mt-2">
                            The platform is designed to reduce overwhelm and help you stay informed at your own pace.
                        </p>
                    </div>
                </div>
            </div>
        </main>
    );
}

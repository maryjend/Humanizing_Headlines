"use client";

import { useState } from "react";
import { login, signUp } from "@/lib/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {

    const [isSignup, setIsSignup] = useState(false);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const router = useRouter();

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        try {

            // SIGN UP
            if (isSignup) {

                await signUp(email, password);

                // SUCCESS MESSAGE
                setSuccess(
                    "Account created successfully. Redirecting..."
                );

                // REDIRECT TO HOME
                setTimeout(() => {
                    router.push("/home");
                }, 1000);

            } else {

                // LOGIN
                await login(email, password);

                // REDIRECT TO HOME
                router.push("/home");
            }

        } catch (err: any) {

            console.error(err);

            setError(
                err.message || "Something went wrong."
            );
        }
    };

    return (
        <main className="flex min-h-screen items-center justify-center bg-slate-50 p-6">

            <div className="w-full max-w-md rounded-3xl border bg-white p-8 shadow-sm">

                {/* HEADER */}

                <p className="text-sm font-medium uppercase tracking-wide text-blue-600">
                    Humanizing Headlines
                </p>

                <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">

                    {isSignup
                        ? "Create Account"
                        : "Welcome Back"}

                </h1>

                <p className="mt-2 text-sm leading-6 text-slate-500">

                    {isSignup
                        ? "Start personalizing your news experience."
                        : "Sign in to continue reading intentionally."}

                </p>

                {/* FORM */}

                <form
                    onSubmit={handleSubmit}
                    className="mt-8 space-y-4"
                >

                    {/* EMAIL */}

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-slate-900"
                        value={email}
                        onChange={(e) =>
                            setEmail(e.target.value)
                        }
                        required
                    />

                    {/* PASSWORD */}

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full rounded-xl border border-slate-300 p-3 outline-none transition focus:border-slate-900"
                        value={password}
                        onChange={(e) =>
                            setPassword(e.target.value)
                        }
                        required
                    />

                    {/* SUCCESS */}

                    {success && (
                        <div className="rounded-xl border border-green-200 bg-green-50 p-3 text-sm text-green-700">

                            {success}

                        </div>
                    )}

                    {/* ERROR */}

                    {error && (
                        <div className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-600">

                            {error}

                        </div>
                    )}

                    {/* BUTTON */}

                    <button
                        type="submit"
                        className="w-full rounded-xl bg-slate-900 py-3 text-white transition hover:bg-slate-700"
                    >

                        {isSignup
                            ? "Create Account"
                            : "Login"}

                    </button>

                </form>

                {/* TOGGLE */}

                <div className="mt-6 text-center text-sm text-slate-600">

                    {isSignup
                        ? "Already have an account?"
                        : "New here?"}{" "}

                    <button
                        onClick={() => {
                            setIsSignup(!isSignup);

                            setError("");
                            setSuccess("");
                        }}
                        className="font-medium text-slate-900 hover:underline"
                    >

                        {isSignup
                            ? "Login"
                            : "Create account"}

                    </button>

                </div>

                {/* GUEST */}

                <button
                    onClick={() => router.push("/home")}
                    className="mt-6 w-full rounded-xl border border-blue-200 bg-blue-50 py-3 text-blue-700 transition hover:bg-blue-100"
                >
                    Continue as Guest
                </button>

            </div>

        </main>
    );
}
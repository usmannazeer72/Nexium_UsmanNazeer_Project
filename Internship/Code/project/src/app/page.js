"use client";

import { createClient } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const supabaseUrl =
    process.env.NEXT_PUBLIC_SUPABASE_URL || "YOUR_SUPABASE_URL";
  const supabaseAnonKey =
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "YOUR_SUPABASE_ANON_KEY";
  const supabase = createClient(supabaseUrl, supabaseAnonKey);

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  async function signInWithEmail(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(false);
    const { data, error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        shouldCreateUser: true,
        emailRedirsectTo: "http://localhost:3000/dashboard",
      },
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess(true);
      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push("/new-entry");
      }, 1000);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f7fafd]">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm flex flex-col items-center">
        <div className="mb-8 text-center">
          <div className="text-2xl font-semibold mb-2">
            AI-Powered
            <br />
            Mental Health Tracker
          </div>
        </div>
        <form onSubmit={signInWithEmail} className="w-full flex flex-col gap-4">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 text-left"
          >
            Enter your email
          </label>
          <input
            id="email"
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg px-4 py-2 transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Send Magic Link"}
          </button>
          {error && (
            <div className="text-red-600 text-sm text-center">{error}</div>
          )}
          {success && (
            <div className="text-green-600 text-sm text-center">
              Magic link sent! Redirecting...
            </div>
          )}
        </form>
        <div className="mt-4 text-xs text-gray-500 text-center">
          Check your inbox to incilin link.
        </div>
      </div>
    </div>
  );
}

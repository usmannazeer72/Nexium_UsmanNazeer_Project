"use client";
import TrendsChart from "@/components/TrendsChart";
import WordCloud from "@/components/WordCloud";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Insights() {
  const [trend, setTrend] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [wordCloud, setWordCloud] = useState([]);
  const [loading, setLoading] = useState(true);
  const [userEmail, setUserEmail] = useState("");
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.replace("/");
        return;
      }
      setUserEmail(data.user.email || "");
      // Fetch AI insights from new endpoint
      const res = await fetch("/api/ai-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: data.user.id }),
      });
      if (res.ok) {
        const json = await res.json();
        setTrend(Array.isArray(json.trends) ? json.trends : []);
        setSuggestions(Array.isArray(json.suggestions) ? json.suggestions : []);
        setWordCloud(Array.isArray(json.wordCloud) ? json.wordCloud : []);
      }
      setLoading(false);
    }
    getData();
  }, [router]);

  return (
    <div className="min-h-screen flex bg-[#f7fafd]">
      {/* Sidebar */}
      <aside className="w-64 bg-[#16213e] text-white flex flex-col justify-between py-8 px-6 min-h-screen">
        <div>
          <div className="flex items-center gap-3 mb-10">
            <div className="bg-[#1abc9c] rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
              A
            </div>
            <span className="font-semibold text-lg">AuraTrack</span>
          </div>
          <nav className="flex flex-col gap-2">
            <a
              href="/dashboard"
              className="rounded-lg px-3 py-2 hover:bg-white/10 font-medium"
            >
              Dashboard
            </a>
            <a
              href="/new-entry"
              className="rounded-lg px-3 py-2 hover:bg-white/10 font-medium"
            >
              New Entry
            </a>
            <a
              href="/insights"
              className="rounded-lg px-3 py-2 bg-white/10 font-medium"
            >
              Insights
            </a>
          </nav>
        </div>
        <div className="flex flex-col gap-1 text-xs text-white/70">
          <span>{userEmail || "No email found"}</span>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-10 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-[#16213e] mb-6">AI Insights</h1>
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Trend Analysis Chart */}
            <div className="bg-white rounded-xl shadow p-6 col-span-2 flex flex-col gap-2">
              <div className="font-semibold mb-2">Trend Analysis</div>
              <div className="flex items-center justify-center">
                {trend.length > 0 ? (
                  <TrendsChart data={trend} width={400} height={200} />
                ) : (
                  <span className="text-gray-400">
                    No trend analysis available.
                  </span>
                )}
              </div>
            </div>
            {/* Suggestions */}
            <div className="bg-white rounded-xl shadow p-6 col-span-1 flex flex-col gap-4">
              <div className="font-semibold mb-2">Suggestions</div>
              <div className="text-gray-700 text-sm">
                {suggestions.length > 0 ? (
                  <ul className="list-disc ml-5">
                    {suggestions.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                ) : (
                  "No suggestions available."
                )}
              </div>
            </div>
            {/* Word Cloud Visualization */}
            <div className="bg-white rounded-xl shadow p-6 col-span-3 flex flex-col gap-2">
              <div className="font-semibold mb-2">Word Cloud</div>
              <div className="flex items-center justify-center">
                {wordCloud.length > 0 ? (
                  <WordCloud words={wordCloud} width={500} height={250} />
                ) : (
                  <span className="text-gray-400">No words available.</span>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

"use client";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Insights() {
  const [trend, setTrend] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [wordCloud, setWordCloud] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getData() {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.replace("/");
        return;
      }
      const res = await fetch(`/api/entries/insights?userId=${data.user.id}`);
      if (res.ok) {
        const json = await res.json();
        setTrend(json.trendAnalysis);
        setSuggestions(json.suggestions);
        setWordCloud(json.wordCloud);
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
            <span className="font-semibold text-lg">MeHalin</span>
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
          <span>Nethor@example.com</span>
          <span>Darn-iherds</span>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-10 flex flex-col gap-6">
        <h1 className="text-2xl font-bold text-[#16213e] mb-6">AI Summary</h1>
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Trend Analysis */}
            <div className="bg-white rounded-xl shadow p-6 col-span-2 flex flex-col gap-2">
              <div className="font-semibold mb-2">Trend Analysis</div>
              <div className="h-24 flex items-center text-gray-600 text-lg">
                {trend || "Not enough data yet."}
              </div>
            </div>
            {/* Suggestions */}
            <div className="bg-white rounded-xl shadow p-6 col-span-1 flex flex-col gap-4">
              <div className="font-semibold mb-2">Suggestions</div>
              <ul className="list-disc ml-5 text-gray-700 text-sm">
                {suggestions.length ? (
                  suggestions.map((s, i) => <li key={i}>{s}</li>)
                ) : (
                  <li>No suggestions yet.</li>
                )}
              </ul>
            </div>
            {/* Mood Word Cloud */}
            <div className="bg-white rounded-xl shadow p-6 col-span-3 flex flex-col gap-2">
              <div className="font-semibold mb-2">Mood Word Cloud</div>
              <div className="flex flex-wrap gap-3 items-center">
                {wordCloud.length ? (
                  wordCloud.map(({ tag, count }) => (
                    <span
                      key={tag}
                      className="text-lg font-semibold"
                      style={{
                        fontSize: `${1 + count * 0.4}rem`,
                        color: "#1abc9c",
                      }}
                    >
                      {tag}
                    </span>
                  ))
                ) : (
                  <span className="text-gray-400">No tags yet.</span>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

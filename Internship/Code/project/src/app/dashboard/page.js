"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

function getDayLabel(date) {
  return date.toLocaleDateString(undefined, { weekday: "short" });
}

function getDateKey(date) {
  return date.toISOString().slice(0, 10);
}

export default function DashboardPage() {
  const [userId, setUserId] = useState(null);
  const [avgMood, setAvgMood] = useState(null);
  const [weekEntries, setWeekEntries] = useState([]);
  const [allEntries, setAllEntries] = useState([]);
  const [aiInsight, setAiInsight] = useState(null);
  const [aiSummary, setAiSummary] = useState(null); // summary
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function getUserAndData() {
      const { data } = await supabase.auth.getUser();
      if (!data?.user) {
        router.replace("/");
        return;
      }
      setUserId(data.user.id);
      // Fetch dashboard data
      const res = await fetch(`/api/entries/dashboard?userId=${data.user.id}`);
      if (res.ok) {
        const json = await res.json();
        setAvgMood(json.avgMood);
        setWeekEntries(json.weekEntries);
        setAllEntries(json.allEntries);
        setAiInsight(json.aiInsight);
      }
      // Fetch AI summary from Gemini
      const aiRes = await fetch("/api/ai-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userId: data.user.id }),
      });
      if (aiRes.ok) {
        const aiJson = await aiRes.json();
        setAiSummary(aiJson.summary || null);
      }
      setLoading(false);
    }
    getUserAndData();
  }, [router]);

  // Prepare heatmap data (group by date)
  const heatmap = {};
  allEntries.forEach((e) => {
    const key = getDateKey(new Date(e.createdAt));
    if (!heatmap[key]) heatmap[key] = [];
    heatmap[key].push(e.mood);
  });

  // Prepare last 7 days for heatmap
  const today = new Date();
  const days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(today);
    d.setDate(today.getDate() - (6 - i));
    return d;
  });

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
              className="rounded-lg px-3 py-2 bg-white/10 font-medium"
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
              className="rounded-lg px-3 py-2 hover:bg-white/10 font-medium"
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
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-[#16213e]">Dashboard</h1>
          <Button
            asChild
            className="bg-[#1abc9c] text-white px-5 py-2 rounded-lg font-semibold shadow hover:bg-[#16a085] transition"
          >
            <a href="/new-entry">+ New Entry</a>
          </Button>
        </div>
        {loading ? (
          <div className="text-center text-gray-500">Loading...</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Calendar Heatmap */}
            <div className="bg-white rounded-xl shadow p-6 col-span-2">
              <div className="font-semibold mb-2">Calendar Heatmap</div>
              <div className="flex gap-2 justify-between mt-4">
                {days.map((d) => {
                  const key = getDateKey(d);
                  const moods = heatmap[key] || [];
                  const avg =
                    moods.length > 0
                      ? moods.reduce((a, b) => a + b, 0) / moods.length
                      : null;
                  return (
                    <div
                      key={key}
                      className={`flex flex-col items-center gap-1`}
                    >
                      <div
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-lg font-bold border transition-all duration-150 ${
                          avg == null
                            ? "bg-gray-100 border-gray-200 text-gray-300"
                            : avg >= 4
                            ? "bg-green-200 border-green-400 text-green-700"
                            : avg >= 3
                            ? "bg-yellow-100 border-yellow-400 text-yellow-700"
                            : "bg-red-100 border-red-400 text-red-700"
                        }`}
                        title={avg ? `Avg mood: ${avg.toFixed(1)}` : "No entry"}
                      >
                        {avg ? avg.toFixed(1) : "-"}
                      </div>
                      <span className="text-xs text-gray-400 mt-1">
                        {getDayLabel(d)}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Mood Summary Widget */}
            <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center justify-center">
              <div className="font-semibold mb-2">Mood Selector</div>
              <div className="text-4xl font-bold text-[#1abc9c] mb-2">
                {avgMood ? avgMood.toFixed(1) : "-"}
              </div>
              <div className="text-xs text-gray-400">7-day average mood</div>
            </div>
            {/* AI Insight Card */}
            <div className="bg-white rounded-xl shadow p-6 col-span-1 flex flex-col gap-2">
              <div className="font-semibold mb-2">AI Insight</div>
              <div className="text-gray-700 text-sm min-h-[48px]">
                {aiSummary || "No summary available."}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

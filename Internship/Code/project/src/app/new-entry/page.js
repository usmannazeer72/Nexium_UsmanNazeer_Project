"use client";
import { supabase } from "@/utils/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const MOODS = [
  { value: 1, emoji: "😞" },
  { value: 2, emoji: "😐" },
  { value: 3, emoji: "😶" },
  { value: 4, emoji: "🙂" },
  { value: 5, emoji: "😄" },
];
const TAGS = [
  "anxious",
  "tired",
  "happy",
  "sad",
  "stressed",
  "excited",
  "calm",
];

export default function NewEntryPage() {
  const [mood, setMood] = useState(null);
  const [tags, setTags] = useState([]);
  const [journal, setJournal] = useState("");
  const [aiSummary, setAiSummary] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [userId, setUserId] = useState(null);
  const router = useRouter();

  useEffect(() => {
    async function getUser() {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setUserId(data.user.id);
      } else {
        router.replace("/"); // redirect to login if not authenticated
      }
    }
    getUser();
  }, [router]);

  const handleTagToggle = (tag) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      const res = await fetch("/api/entries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mood,
          tags,
          journal,
          userId,
          aiSummary: aiSummary ? "(AI summary placeholder)" : undefined,
        }),
      });
      if (!res.ok)
        throw new Error((await res.json()).error || "Failed to save");
      setSuccess(true);
      setMood(null);
      setTags([]);
      setJournal("");
      setAiSummary(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
              className="rounded-lg px-3 py-2 bg-white/10 font-medium"
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
          <span>Nethor@example.com</span>
          <span>Darn-iherds</span>
        </div>
      </aside>
      {/* Main Content */}
      <main className="flex-1 flex justify-center items-start p-10">
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg flex flex-col gap-8"
        >
          <h1 className="text-2xl font-bold mb-2">New Entry</h1>
          {/* Mood Selector */}
          <div>
            <label className="block font-medium mb-3 text-gray-700">
              Mood Selector
            </label>
            <div className="flex gap-4 justify-center">
              {MOODS.map((m) => (
                <button
                  type="button"
                  key={m.value}
                  className={`text-4xl p-2 rounded-full border-2 transition-all duration-150 ${
                    mood === m.value
                      ? "border-[#1abc9c] bg-[#e8faf6] scale-110"
                      : "border-gray-200 bg-white"
                  }`}
                  onClick={() => setMood(m.value)}
                  aria-label={`Mood ${m.value}`}
                >
                  {m.emoji}
                </button>
              ))}
            </div>
          </div>
          {/* Tags Picker */}
          <div>
            <label className="block font-medium mb-3 text-gray-700">
              Tags/Emotions
            </label>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((tag) => (
                <button
                  type="button"
                  key={tag}
                  className={`px-4 py-1 rounded-full border text-sm transition-all duration-150 ${
                    tags.includes(tag)
                      ? "bg-[#e8faf6] border-[#1abc9c] text-[#1abc9c] font-semibold"
                      : "bg-gray-100 border-gray-300 text-gray-600"
                  }`}
                  onClick={() => handleTagToggle(tag)}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          {/* Journal Text Area */}
          <div>
            <label className="block font-medium mb-3 text-gray-700">
              Journal entry
            </label>
            <textarea
              className="w-full border rounded-xl p-3 min-h-[100px] bg-[#f7fafd] focus:outline-none focus:ring-2 focus:ring-[#1abc9c]"
              value={journal}
              onChange={(e) => setJournal(e.target.value)}
              placeholder="Write about your day..."
              required
            />
          </div>
          {/* AI Summary Toggle */}
          <div className="flex items-center gap-3">
            <label className="flex items-center cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={aiSummary}
                  onChange={() => setAiSummary((v) => !v)}
                />
                <div
                  className={`block w-10 h-6 rounded-full transition-colors duration-150 ${
                    aiSummary ? "bg-[#1abc9c]" : "bg-gray-300"
                  }`}
                ></div>
                <div
                  className={`dot absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-150 ${
                    aiSummary ? "translate-x-4" : ""
                  }`}
                ></div>
              </div>
              <span className="ml-3 text-gray-700">Let AI summarize this?</span>
            </label>
          </div>
          {/* Save Button */}
          <button
            type="submit"
            className="w-full bg-[#1abc9c] text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:bg-[#16a085] transition-all duration-150 disabled:opacity-50"
            disabled={loading || !mood || !journal || !userId}
          >
            {loading ? "Saving..." : "Save Entry"}
          </button>
          {success && (
            <div className="text-green-600 text-center">Entry saved!</div>
          )}
          {error && <div className="text-red-600 text-center">{error}</div>}
        </form>
      </main>
    </div>
  );
}

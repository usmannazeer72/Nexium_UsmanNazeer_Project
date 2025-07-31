"use client";
import { Button } from "@/components/ui/button";
import { supabase } from "@/utils/supabaseClient";
import { motion } from "framer-motion";
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
    <motion.div
      className="min-h-screen flex bg-[#f7fafd]"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Sidebar */}
      <motion.aside
        className="w-64 bg-[#16213e] text-white flex flex-col justify-between py-8 px-6 min-h-screen"
        initial={{ x: -80, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 80, damping: 18, delay: 0.1 }}
      >
        <div>
          <motion.div
            className="flex items-center gap-3 mb-10"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="bg-[#1abc9c] rounded-full w-10 h-10 flex items-center justify-center text-lg font-bold">
              A
            </div>
            <span className="font-semibold text-lg">AuraTrack</span>
          </motion.div>
          <nav className="flex flex-col gap-2">
            <Button
              asChild
              className="rounded-lg px-3 py-2 hover:bg-white/10 font-medium"
            >
              <a href="/dashboard">Dashboard</a>
            </Button>
            <Button
              asChild
              className="rounded-lg px-3 py-2 bg-white/10 font-medium"
            >
              <a href="/new-entry">New Entry</a>
            </Button>
            <Button
              asChild
              className="rounded-lg px-3 py-2 hover:bg-white/10 font-medium"
            >
              <a href="/insights">Insights</a>
            </Button>
          </nav>
        </div>
        <div className="flex flex-col gap-1 text-xs text-white/70">
          <span>{userEmail || "No email found"}</span>
        </div>
      </motion.aside>
      {/* Main Content */}
      <motion.main
        className="flex-1 flex justify-center items-start p-10"
        initial={{ y: 40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 70, damping: 16, delay: 0.25 }}
      >
        <motion.form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-lg flex flex-col gap-8"
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 90,
            damping: 18,
            delay: 0.35,
          }}
        >
          <motion.h1
            className="text-2xl font-bold mb-2"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            New Entry
          </motion.h1>
          {/* Mood Selector */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <label className="block font-medium mb-3 text-gray-700">
              Mood Selector
            </label>
            <div className="flex gap-4 justify-center">
              {MOODS.map((m, i) => (
                <motion.div
                  key={m.value}
                  whileHover={{ scale: 1.15 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button
                    type="button"
                    variant="outline"
                    className={`text-4xl p-2 rounded-full border-2 transition-all duration-150 ${
                      mood === m.value
                        ? "border-[#1abc9c] bg-[#e8faf6] scale-110"
                        : "border-gray-200 bg-white"
                    }`}
                    onClick={() => setMood(m.value)}
                    aria-label={`Mood ${m.value}`}
                  >
                    {m.emoji}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
          {/* Tags Picker */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <label className="block font-medium mb-3 text-gray-700">
              Tags/Emotions
            </label>
            <div className="flex flex-wrap gap-2">
              {TAGS.map((tag, i) => (
                <motion.div
                  key={tag}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <Button
                    type="button"
                    variant="outline"
                    className={`px-4 py-1 rounded-full border text-sm transition-all duration-150 ${
                      tags.includes(tag)
                        ? "bg-[#e8faf6] border-[#1abc9c] text-[#1abc9c] font-semibold"
                        : "bg-gray-100 border-gray-300 text-gray-600"
                    }`}
                    onClick={() => handleTagToggle(tag)}
                  >
                    {tag}
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
          {/* Journal Text Area */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.55 }}
          >
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
          </motion.div>
          {/* AI Summary Toggle */}
          <motion.div
            className="flex items-center gap-3"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
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
          </motion.div>
          {/* Save Button */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65 }}
          >
            <Button
              type="submit"
              className="w-full bg-[#1abc9c] text-white py-3 rounded-xl font-semibold text-lg shadow-md hover:bg-[#16a085] transition-all duration-150 disabled:opacity-50"
              disabled={loading || !mood || !journal || !userId}
            >
              {loading ? "Saving..." : "Save Entry"}
            </Button>
          </motion.div>
          {success && (
            <motion.div
              className="text-green-600 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              Entry saved!
            </motion.div>
          )}
          {error && (
            <motion.div
              className="text-red-600 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
            >
              {error}
            </motion.div>
          )}
        </motion.form>
      </motion.main>
    </motion.div>
  );
}

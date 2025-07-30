import Entry from "@/utils/entryModel";
import { connectDB } from "@/utils/mongodb";

export async function GET(request) {
  await connectDB();
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get("userId");
  if (!userId) {
    return new Response(JSON.stringify({ error: "Missing userId" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const entries = await Entry.find({ userId });

  // Trend analysis: average mood by weekday
  const weekdayMood = Array(7)
    .fill()
    .map(() => []);
  entries.forEach((e) => {
    const day = new Date(e.createdAt).getDay();
    weekdayMood[day].push(e.mood);
  });
  const avgByDay = weekdayMood.map((moods) =>
    moods.length ? moods.reduce((a, b) => a + b, 0) / moods.length : null
  );
  // Find best day
  const bestDayIdx = avgByDay.indexOf(Math.max(...avgByDay.filter(Boolean)));
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const trendAnalysis =
    bestDayIdx >= 0 ? `You've felt better on ${days[bestDayIdx]}s.` : null;

  // Suggestions (static for now)
  const suggestions = [
    "Try meditating 5 mins daily",
    "Go for a short walk",
    "Talk to a friend",
  ];

  // Mood word cloud (most frequent tags)
  const tagCounts = {};
  entries.forEach((e) => {
    (e.tags || []).forEach((tag) => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1;
    });
  });
  const wordCloud = Object.entries(tagCounts)
    .sort((a, b) => b[1] - a[1])
    .map(([tag, count]) => ({ tag, count }));

  return new Response(
    JSON.stringify({
      trendAnalysis,
      suggestions,
      wordCloud,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

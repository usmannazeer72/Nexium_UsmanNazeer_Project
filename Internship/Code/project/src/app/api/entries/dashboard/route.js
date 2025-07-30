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

  // Get all entries for heatmap
  const allEntries = await Entry.find({ userId }).sort({ createdAt: 1 });

  // Get last 7 days' entries
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 6);
  const weekEntries = await Entry.find({
    userId,
    createdAt: { $gte: weekAgo },
  }).sort({ createdAt: 1 });

  // Calculate average mood for the week
  const avgMood =
    weekEntries.length > 0
      ? weekEntries.reduce((sum, e) => sum + e.mood, 0) / weekEntries.length
      : null;

  // Get latest AI summary
  const latestInsight = await Entry.findOne({
    userId,
    aiSummary: { $exists: true, $ne: null },
  }).sort({ createdAt: -1 });

  return new Response(
    JSON.stringify({
      weekEntries,
      avgMood,
      allEntries,
      aiInsight: latestInsight?.aiSummary || null,
    }),
    {
      status: 200,
      headers: { "Content-Type": "application/json" },
    }
  );
}

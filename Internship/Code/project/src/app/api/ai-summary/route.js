import Entry from "@/utils/entryModel";
import { getGeminiInsights } from "@/utils/gemini";
import Insight from "@/utils/insightModel";
import { connectDB } from "@/utils/mongodb";

export async function POST(req) {
  const { userId } = await req.json();

  try {
    await connectDB();
    // Fetch all entries for the user
    const entries = await Entry.find({ userId });
    // Prepare data for Gemini
    const userData = entries.map((e) => ({
      mood: e.mood,
      tags: e.tags,
      journal: e.journal,
      createdAt: e.createdAt,
    }));
    // Generate insights
    const insights = await getGeminiInsights(userData);
    // Save insights to the 'insights' collection
    await Insight.create({
      userId,
      summary: insights.summary,
      trends: insights.trends,
      suggestions: insights.suggestions,
      wordCloud: insights.wordCloud,
    });
    // Always return all fields
    return new Response(
      JSON.stringify({
        summary: insights.summary,
        trends: insights.trends,
        suggestions: insights.suggestions,
        wordCloud: insights.wordCloud,
        error: insights.error || undefined,
        raw: insights.raw || undefined,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        summary: [],
        trends: [],
        suggestions: [],
        wordCloud: [],
        error: error.message,
      }),
      { status: 200 }
    );
  }
}

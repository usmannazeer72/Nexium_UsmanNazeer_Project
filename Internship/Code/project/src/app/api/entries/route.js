import Entry from "@/utils/entryModel";
import { connectDB } from "@/utils/mongodb";

export async function POST(request) {
  try {
    await connectDB();
    const body = await request.json();
    const { mood, tags, journal, userId, aiSummary } = body;

    if (!mood || !journal || !userId) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    const entry = await Entry.create({
      mood,
      tags: tags || [],
      journal,
      userId,
      aiSummary,
    });

    return new Response(JSON.stringify(entry), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

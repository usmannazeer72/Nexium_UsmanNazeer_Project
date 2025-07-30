import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function getGeminiInsights(userData) {
  const prompt = `
    Analyze the following user data (moods, emotions, journals):
    ${JSON.stringify(userData, null, 2)}
    1. Provide a concise summary of the user's mental health as a short list of bullet points (not a paragraph).
    2. Identify trends or patterns in mood/emotion. Return trend analysis as an array of objects with 'label' (e.g., day or tag) and 'value' (e.g., average mood or count), suitable for charting.
    3. Suggest concise, actionable advice for the user as a list of short bullet points (short phrases, not sentences or paragraphs).
    4. List the most common words for a word cloud as an array of objects: { word: string, count: number }.
    Respond ONLY with a valid JSON object in this format (do not include any explanation or markdown):
    {
      "summary": ["point 1", "point 2", ...],
      "trends": [ { "label": "Monday", "value": 3.5 }, ... ],
      "suggestions": ["...", "..."],
      "wordCloud": [ { "word": "happy", "count": 5 }, ... ]
    }
    If you cannot determine a field, return an empty array or null for that field.
  `;

  const model = genAI.getGenerativeModel({ model: "models/gemini-2.5-flash" });
  const result = await model.generateContent(prompt);
  // Try to extract the text from the new response structure
  const responseText =
    result.response.candidates?.[0]?.content?.parts?.[0]?.text ||
    result.response.text ||
    "";

  // Try to parse JSON from the response
  try {
    const jsonStart = responseText.indexOf("{");
    const jsonEnd = responseText.lastIndexOf("}") + 1;
    const jsonString = responseText.substring(jsonStart, jsonEnd);
    const parsed = JSON.parse(jsonString);
    // Fallbacks for missing fields
    return {
      summary: Array.isArray(parsed.summary) ? parsed.summary : [],
      trends: Array.isArray(parsed.trends) ? parsed.trends : [],
      suggestions: Array.isArray(parsed.suggestions) ? parsed.suggestions : [],
      wordCloud: Array.isArray(parsed.wordCloud) ? parsed.wordCloud : [],
    };
  } catch (e) {
    // Always return all fields, even on error
    return {
      summary: [],
      trends: [],
      suggestions: [],
      wordCloud: [],
      error: "Failed to parse Gemini response",
      raw: responseText,
    };
  }
}

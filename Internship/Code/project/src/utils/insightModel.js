import mongoose from "mongoose";

const InsightSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  summary: { type: [String], default: [] },
  trends: { type: Array, default: [] },
  suggestions: { type: [String], default: [] },
  wordCloud: { type: Array, default: [] },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Insight ||
  mongoose.model("Insight", InsightSchema);

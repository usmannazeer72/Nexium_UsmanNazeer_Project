import mongoose from "mongoose";

const EntrySchema = new mongoose.Schema({
  userId: { type: String, required: true },
  mood: { type: Number, required: true, min: 1, max: 5 },
  tags: { type: [String], default: [] },
  journal: { type: String, required: true },
  aiSummary: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Entry || mongoose.model("Entry", EntrySchema);

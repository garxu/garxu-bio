import { Schema, model, models } from "mongoose";

const viewSchema = new Schema({
  ip: String,
  count: { type: Number, default: 1 },
});

// Prevent OverwriteModelError in Next.js hot reload
const View = models.View || model("View", viewSchema);
export default View;

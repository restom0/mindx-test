import mongoose, { Schema } from "mongoose";

const Quiz = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  user_id: { type: Schema.Types.ObjectId, ref: "User" },
});
export default mongoose.model("Quiz", Quiz);

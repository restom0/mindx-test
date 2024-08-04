import mongoose, { Schema } from "mongoose";

const Answer = new Schema({
  quiz_id: { type: Schema.Types.ObjectId, ref: "Quiz" },
  content: { type: String, required: true },
  point: { type: Number, required: true },
  answer1: { type: String, required: true },
  answer2: { type: String, required: true },
  answer3: { type: String, required: true },
  isCorrect_1: { type: Boolean, default: false },
  isCorrect_2: { type: Boolean, default: false },
  isCorrect_3: { type: Boolean, default: false },
});
export default mongoose.model("Answer", Answer);

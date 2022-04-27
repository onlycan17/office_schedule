import mongoose from "mongoose";

const commentSchema = new mongoose.Schema({
  text: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, required: true, ref: "User" },
  journal: { type: mongoose.Schema.Types.ObjectId, ref: "Journal" },
  meal: {type: mongoose.Schema.Types.ObjectId, ref: "Meal"},
  createdAt: { type: Date, required: true, default: Date.now },
});

const Comment = mongoose.model("Comment", commentSchema);

export default Comment;

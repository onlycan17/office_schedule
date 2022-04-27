import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const boardSchema = new mongoose.Schema({
  boardGroupId: { type: Number, require:true},
  title: { type: String, require: true},
  content: { type: String, require: true },
  files: [{type: mongoose.Schema.Types.ObjectId, ref: "File"}],
  publicYn: {type: String, default:'Y'},
  deleteYn: {type: String, default:'N'},
  createdAt: { type:Date, default:Date.now},
  writer: { type: mongoose.Schema.Types.ObjectId, ref: "User"},
});

boardSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hashSync(this.password, 5);
  }
});

const Board = mongoose.model("Board", boardSchema);

export default Board;

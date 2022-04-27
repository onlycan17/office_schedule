import mongoose from "mongoose";

const journalSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String },
  start: { type: String },
  end: { type: String },
  allDay: { type: Boolean },
  description: { type: String },
  file: {type: mongoose.Schema.Types.ObjectId, ref: "File"},
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
  url: { type: String },
  color: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, require:true, ref: "User" },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  createdAt:{type:Date, default:Date.now},
});

journalSchema.pre("save", function () {
  if (!this.isModified("id")) {
    this.id = this._id;
  }
});

const Journal = mongoose.model("Journal", journalSchema);

export default Journal;

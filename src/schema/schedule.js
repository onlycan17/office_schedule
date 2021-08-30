import mongoose from "mongoose";

const scheduleSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String, require: true },
  start: { type: String },
  end: { type: String },
  allDay: { type: Boolean },
  description: { type: String },
  url: { type: String },
  color: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
});

scheduleSchema.pre("save", function () {
  if (!this.isModified("id")) {
    this.id = this._id;
  }
});

const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;

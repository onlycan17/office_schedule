import mongoose from "mongoose";

const bongoCarSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String, require: true },
  start: { type: String },
  end: { type: String },
  allDay: { type: Boolean },
  description: { type: String },
  url: { type: String },
  color: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

bongoCarSchema.pre("save", function () {
  if (!this.isModified("id")) {
    this.id = this._id;
  }
});

const BongoCar = mongoose.model("BongoCar", bongoCarSchema);

export default BongoCar;

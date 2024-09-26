import mongoose from "mongoose";

const vocationTypeSchema = new mongoose.Schema({
  id: { type: String },
  code:{type: String, required:true},
  name: { type: String, required:true },
  consomeYn: { type: Boolean },
  description: { type: String },
  consomeYalue: { type: Number },
});

vocationTypeSchema.pre("save", function () {
  if (!this.isModified("id")) {
    this.id = this._id;
  }
});

const VocationType = mongoose.model("VocationType", vocationTypeSchema);

export default VocationType;

import mongoose from "mongoose";

const vocationSchema = new mongoose.Schema({
  year:{type: String, required:true},
  id: { type: String, required:true },
  title: { type: String },
  content: { type: String },
  start: { type: String },
  end: { type: String },
  allDay: { type: Boolean },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
  color: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, require:true, ref: "User" },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  firstPaymentYn: {type: Boolean},
  finalPaymentYn: {type: Boolean},
  createdAt:{type:Date, default:Date.now},
});

vocationSchema.index({year:-1,id:-1});

vocationSchema.pre("save", function () {
  if (!this.isModified("id")) {
    this.id = this._id;
  }
});

const Vocation = mongoose.model("Vocation", vocationSchema);

export default Vocation;

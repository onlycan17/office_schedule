import mongoose from "mongoose";

const mealSchema = new mongoose.Schema({
  id: { type: String },
  title: { type: String },
  start: { type: String },
  end: { type: String },
  allDay: { type: Boolean },
  description: { type: String },
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment"}],
  color: { type: String },
  user: { type: mongoose.Schema.Types.ObjectId, require:true, ref: "User" },
  createdAt:{type:Date, default:Date.now},
});

mealSchema.pre("save", function () {
  if (!this.isModified("id")) {
    this.id = this._id;
  }
});

const Meal = mongoose.model("Meal", mealSchema);

export default Meal;

import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  email: { type: String, require: true, unique: true },
  name: { type: String, require: true },
  password: { type: String, require: true },
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
  position: {type: String},
  menu: [{ type: mongoose.Schema.Types.ObjectId, ref: "Menu"}],
  color: {type: String, require: true},
  vocation: {type: Number}
});

userSchema.pre("save", async function () {
  if (this.isModified("password")) {
    this.password = await bcrypt.hashSync(this.password, 5);
  }
});

const User = mongoose.model("User", userSchema);

export default User;

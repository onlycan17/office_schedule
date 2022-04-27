import mongoose from "mongoose";

const menuSchema = new mongoose.Schema({
  menuName: { type: String, require: true },
  subMenu: [
    {
      subMenuName: { type: String, require: true },
      subMenuUrl: { type: String },
      order: { type: Number, require: true },
      department: [{ type: mongoose.Schema.Types.ObjectId, ref: "Department" }],
      user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    },
  ],
  menuUrl: { type: String },
  order: { type: Number, require: true },
  department: [{ type: mongoose.Schema.Types.ObjectId, ref: "Department" }],
  user: [{ type: mongoose.Schema.Types.ObjectId, require: false, ref: "User" }],
});

const Menu = mongoose.model("Menu", menuSchema);

export default Menu;

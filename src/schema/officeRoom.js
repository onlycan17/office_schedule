import mongoose from "mongoose";

const officeRoomSchema = new mongoose.Schema({
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

officeRoomSchema.pre("save", function () {
  if (!this.isModified("id")) {
    this.id = this._id;
  }
});

const OfficeRoom = mongoose.model("OfficeRoom", officeRoomSchema);

export default OfficeRoom;

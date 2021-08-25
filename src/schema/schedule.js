import mongoose from "mongoose";
import bcrypt from "bcrypt";

const scheduleSchema = new mongoose.Schema({
  id: {type: Number, require: true, default: function(){
    const collection = this.perent().schedules;
    return collection ? collection.length : 0;
  }},
  title: {type: String, require: true},
  start: {type: Date},
  end: {type: Date},
  allDay: {type: Boolean},
  description: {type: String},
  url:{type: String},
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department"},
});


const Schedule = mongoose.model("Schedule", scheduleSchema);

export default Schedule;

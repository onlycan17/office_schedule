import mongoose from "mongoose";
import bcrypt from "bcrypt";
import autoIncrementnumber from "autoIncrementnumber";

const scheduleSchema = new mongoose.Schema({
  id: {type:Number, default:0},
  title: {type: String, require: true},
  start: {type: String},
  end: {type: String},
  allDay: {type: Boolean},
  description: {type: String},
  url:{type: String},
  color:{type: String},
  user:{type: mongoose.Schema.Types.ObjectId, ref: "User"},
  department: { type: mongoose.Schema.Types.ObjectId, ref: "Department"},
});

scheduleSchema.pre("save",function(){
  const genNumber = autoIncrementnumber(this.id?this.id:0);

  if(this.isModified("id")){
    this.id = genNumber.next();
}
});

const Schedule = mongoose.model("Schedule", scheduleSchema);


export default Schedule;

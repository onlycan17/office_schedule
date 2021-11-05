import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    name: {type: String, require:true},
    user: [{type: mongoose.Schema.Types.ObjectId, ref:"User"}],
    menu: [{type: mongoose.Schema.Types.ObjectId, ref:"Menu"}],
    order: { type: Number, require: true },
});


const Department = mongoose.model("Department", departmentSchema);

export default Department;
import mongoose from "mongoose";

const departmentSchema = new mongoose.Schema({
    name: {type: String, require:true},
    user: [{type: mongoose.Schema.Types.ObjectId, ref:"User"}],
    menu: [{type: mongoose.Schema.Types.ObjectId, ref:"Menu"}],
});


const Department = mongoose.model("Department", departmentSchema);

export default Department;
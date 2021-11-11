import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    subUrl: {type: String, require:true},
    order: { type: Number, require: true },
    department: { type: mongoose.Schema.Types.ObjectId, ref: "Department" },
});

const Auth = mongoose.model("Auth", authSchema);

export default Auth;
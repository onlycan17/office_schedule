import mongoose from "mongoose";

const authSchema = new mongoose.Schema({
    name: {type: String, require:true},
    user: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    department: [{type: mongoose.Schema.Types.ObjectId, ref: "Department"}],
});

const Auth = mongoose.model("auth", authSchema);

export default Auth;
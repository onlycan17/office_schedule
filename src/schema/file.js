import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
    originalname: {type: String, require:true},
    mimetype: {type: String},
    filename: {type: String, require:true},
    path:{type: String, require:true},
    size: {type: Number},
    dropboxUrl: {type: String},
    createdAt:{type:Date, default:Date.now()},
});

const File = mongoose.model("File", fileSchema);

export default File;
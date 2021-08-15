import mongoose from "mongoose";
import moment from "moment";
import "moment-timezone";
moment.tz.setDefault("Asia/Seoul");
const actionLogSchema = new mongoose.Schema({
    url: {type: String},
    params: {type: String},
    body: {type:String},
    ip: {type:String},
    bigo: {type:String},
    header: {type:String},
    createdAt: { type:String, default: moment().format('YYYY-MM-DD HH:mm:ss')},
});

const ActionLog = mongoose.model("actionLog", actionLogSchema);

export default ActionLog;
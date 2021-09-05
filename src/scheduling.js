import Schedule from "./schema/schedule"


const getScehduling = async () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDay();
    const scheduleData  = await Schedule.find({start:new RegExp(year+'-'+month+'-'+day)}).populate("user").populate("department");
    return scheduleData;
}

export default getScehduling;
    

import Schedule from "./schema/schedule"


export default getScehduling = async() => {
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const day = date.getDay();
    return await Schedule.find({start:new RegExp(year+'-'+month+'-'+day)}).populate("user").populate("department");
}
    

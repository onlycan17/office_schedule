import mongoose from "mongoose";

console.log("test : "+process.env.DB_URL);

const connection = mongoose.connect(process.env.DB_URL,
{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
}
);



const db = mongoose.connection;

const handleOpen = () => console.log("✅ Connected to DB");
const handleError = (error) => console.log("❌ DB Error", error); 

db.on("error", handleError);
db.once("open", handleOpen);
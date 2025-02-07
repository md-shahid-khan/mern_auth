import mongoose from 'mongoose';


const connectDb = async ()=>{
    const MONGOOSE_URL = process.env.MONGO_URI;
    mongoose.connection.on("connected", ()=> console.log("database is connected successful"))
    const connection = await mongoose.connect(MONGOOSE_URL);

}


export default connectDb;
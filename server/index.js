import express, {urlencoded} from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors"
import authRouter from "./routes/auth.route.js"

//custom imports
import connectDb from "./database.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(urlencoded({extended:true}));
app.use(cors({credentials:true}))
app.use(cookieParser());
app.use("/api/v1/auth", authRouter)



//Temporary route
app.get("/", (req, res)=>{
    res.json({message:"successful"})
})




// Starting server here
app.listen(PORT, ()=> console.log(`server started at: ${PORT}`));
await connectDb();

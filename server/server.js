import express from "express"
import cors from "cors"
import "dotenv/config"
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoute.js";
import imageRouter from "./routes/imageRouter.js";
import reviewRouter from "./routes/reviewRoute.js";

const Port = process.env.Port || 4000;
const app = express();

app.use(express.json());
app.use(cors());
await connectDB();

app.use('/api/user' , userRouter);
app.use('/api/image' , imageRouter);
app.use("/api/reviews", reviewRouter);

app.get('/', (req, res)=> {
res.send("API WORKING");
})

app.listen(Port , ()=> {
    console.log("server runningon Port" , Port);
})


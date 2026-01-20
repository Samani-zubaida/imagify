import express from "express"
import "dotenv/config"
import cors from "cors";
import connectDB from "./config/mongodb.js";

const port = process.env.PORT ||  4000;
const app = express();

app.use(express.json());
app.use(cors());
await connectDB()

app.get("/", (req,res)=> {
    res.send("API working");
})
app.listen(port, ()=> {
    console.log("Running on port ",port);
});
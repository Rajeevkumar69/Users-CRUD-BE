import express from "express";
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from "helmet";
import mongoose, { mongo } from "mongoose";
import apiRoute from "./routes/api.route.js";



dotenv.config();

const app = express();
const arg = process.argv;

app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({extends:true}));

const dataBase = process.env.MONGO_URL;

try {
     await mongoose.connect(dataBase);
     console.log(`Database connected`);
} catch (error) {
     console.error(`Error connecting database ${error.message}`);
     process.exit(1);
}


app.get("/", (req, res)=>{
     res.send('Hello world!');
});

app.use("/api", apiRoute);

app.listen(arg[2], ()=>{
     console.log(`Server is runnig on port ${arg[2]}`);
     
})
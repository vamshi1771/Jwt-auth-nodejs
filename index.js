import connectDB from "./mongodB/connect.js";
import *as dotenv from "dotenv";
import express, { urlencoded } from 'express';
import cors from 'cors';
import authrouter from "./routes/authRoutes.js";
import cookieParser from "cookie-parser";
import requireAuth from "./middleware/authmiddleware.js";
import mainRouter from "./routes/mainRoutes.js";


dotenv.config();
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({extended : false}));
// app.use(cors());
app.use(cors());

app.get('/', requireAuth,mainRouter);
app.use(authrouter);

app.listen(8080,()=>{
    connectDB(process.env.MongodB_URL);
    console.log("server Started at Port 8080")
})

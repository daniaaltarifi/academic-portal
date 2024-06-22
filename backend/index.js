// packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import coursesRoutes from "./routes/coursesRoutes.js";
dotenv.config();
const port = process.env.PORT || 5000;

connectDB();

const app = express();
app.use(cors({
    origin: (origin, callback) => {
        callback(null, origin); 
    },
    methods: ["POST", "DELETE", "GET", "PUT"],
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use('/api/student',userRoutes)
app.use('/api/courses',coursesRoutes)
app.get('/', (req, res) =>{
    res.send('Hello World')
})
app.listen(port, () => console.log(`Server running on port: ${port}`));

import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";


//Routs
import authRoutes from "./routes/authUser.routes.js";
import headqueaterRoutes from "./routes/headqueater.routes.js";
import userRoutes from "./routes/User.routes.js";

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());

//Routs
app.use('/api',authRoutes);
app.use('/api',headqueaterRoutes);
app.use('/api', userRoutes);



export default app;
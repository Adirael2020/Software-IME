import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";


//Routs
import authRoutes from "./routes/authUser.routes.js";
import headqueaterRoutes from "./routes/headqueater.routes.js";
import userRoutes from "./routes/User.routes.js";

const app = express();

app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
/*
app.use((req, res, next) => {
    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');
    res.setHeader('Surrogate-Control', 'no-store');
    next();
  });
*/


//Routs
app.use('/api',authRoutes);
app.use('/api',headqueaterRoutes);
app.use('/api',userRoutes);



export default app;
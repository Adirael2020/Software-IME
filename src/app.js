import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import fileUpload from "express-fileupload";


//Routs
//login
import authRoutes from "./routes/authUser.routes.js";
//admin
import headqueaterRoutes from "./routes/headqueater.routes.js";
import userRoutes from "./routes/User.routes.js";
import specialtyRoutes from "./routes/specialty.routes.js"

const app = express();

app.use(cors({
    origin: 'http://localhost:3001',
    credentials: true,
}));
app.use(morgan('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload());
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
app.use('/api',specialtyRoutes);



export default app;
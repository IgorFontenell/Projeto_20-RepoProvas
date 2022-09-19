import cors from "cors";
import express, { json } from "express";
import "express-async-errors";
import errorHandler from "../middlewares/errorHandlerMiddleware";
import router from "../routers";



const app = express();
app.use(json());
app.use(cors());
app.use(router);
app.use(errorHandler);


export default app;






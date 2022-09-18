import { Router } from "express";
import { addExameController } from "../controllers/examsController";
import { autenticateMiddleware } from "../middlewares/authMiddleware";



const examsRouter = Router();

examsRouter.post("/exams/add",autenticateMiddleware, addExameController);
examsRouter.post("/user/login", );

export default examsRouter;

import { Router } from "express";
import { addExameController, getExamsByDiscipline } from "../controllers/examsController";
import { autenticateMiddleware } from "../middlewares/authMiddleware";



const examsRouter = Router();


examsRouter.get("/exams", autenticateMiddleware, getExamsByDiscipline);
examsRouter.post("/exams/add",autenticateMiddleware, addExameController);


export default examsRouter;

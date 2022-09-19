import { Router } from "express";
import { addExameController, getExamsByDiscipline, getExamsByTeachers } from "../controllers/examsController";
import { autenticateMiddleware } from "../middlewares/authMiddleware";



const examsRouter = Router();


examsRouter.get("/examsByTerms", autenticateMiddleware, getExamsByDiscipline);
examsRouter.get("/examsByTeachers", autenticateMiddleware, getExamsByTeachers);
examsRouter.post("/exams/add",autenticateMiddleware, addExameController);


export default examsRouter;

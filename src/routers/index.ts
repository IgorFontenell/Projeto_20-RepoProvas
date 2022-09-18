import { Router } from "express";
import examsRouter from "./examsRouter";
import userRouter from "./userRouter";


const router = Router();

router.use(userRouter);
router.use(examsRouter);

export default router;
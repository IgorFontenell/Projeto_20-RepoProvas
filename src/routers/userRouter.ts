import { Router } from "express";
import { loginController, registerController } from "../controllers/userController";


const userRouter = Router();

userRouter.post("/user/register", registerController);
userRouter.post("/user/login", loginController);

export default userRouter;

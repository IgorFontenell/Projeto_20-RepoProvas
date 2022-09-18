import { Router } from "express";
import { loginController, registerController } from "../controllers/userController";
import { validateSchemas } from "../middlewares/validateSchemaMiddleware";
import { userSchema } from "../schemas/userSchema";

const userRouter = Router();

userRouter.post("/user/register", registerController);
userRouter.post("/user/login", loginController);

export default userRouter;

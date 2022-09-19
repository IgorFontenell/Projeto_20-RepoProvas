"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = require("../controllers/userController");
const userRouter = (0, express_1.Router)();
userRouter.post("/user/register", userController_1.registerController);
userRouter.post("/user/login", userController_1.loginController);
exports.default = userRouter;

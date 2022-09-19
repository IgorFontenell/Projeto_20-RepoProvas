"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const examsRouter_1 = __importDefault(require("./examsRouter"));
const userRouter_1 = __importDefault(require("./userRouter"));
const router = (0, express_1.Router)();
router.use(userRouter_1.default);
router.use(examsRouter_1.default);
exports.default = router;

"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.autenticateMiddleware = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userService_1 = require("../services/userService");
dotenv_1.default.config();
function autenticateMiddleware(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const authorization = req.headers['authorization'];
        if (!authorization) {
            throw { type: "unauthorized", message: "Missing authorization header!" };
        }
        const token = authorization.replace('Bearer ', '');
        if (!token) {
            throw { type: "unauthorized", message: "Missing token!" };
        }
        try {
            const JWT_SECRET = process.env.JWT_SECRET;
            const tokenInfo = jsonwebtoken_1.default.verify(token, JWT_SECRET);
            const user = yield userService_1.userService.findUserById(tokenInfo.userId);
            res.locals.user = user;
            next();
        }
        catch (_a) {
            throw { type: "unauthorized", message: "Invalid Token!" };
        }
    });
}
exports.autenticateMiddleware = autenticateMiddleware;

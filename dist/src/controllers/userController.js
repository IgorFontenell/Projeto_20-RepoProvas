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
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginController = exports.registerController = void 0;
const userService_1 = require("../services/userService");
function registerController(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const userInfo = request.body;
        yield userService_1.userService.createUser(userInfo);
        response.status(201).send("User created sucessfully!");
    });
}
exports.registerController = registerController;
function loginController(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const userInfo = request.body;
        const token = yield userService_1.userService.loginUser(userInfo);
        response.status(200).send(token);
    });
}
exports.loginController = loginController;

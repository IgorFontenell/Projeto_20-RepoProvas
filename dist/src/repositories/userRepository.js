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
exports.userRepository = void 0;
const database_1 = require("../config/database");
function createUser(userInfo, passwordEncrypted) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.client.users.create({
            data: {
                email: userInfo.email,
                password: passwordEncrypted
            }
        });
    });
}
function getUserByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.client.users.findUnique({
            where: {
                email: email,
            }
        });
    });
}
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return database_1.client.users.findUnique({
            where: { id }
        });
    });
}
exports.userRepository = {
    createUser,
    getUserByEmail,
    findById
};

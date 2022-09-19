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
exports.userService = void 0;
const validateSchemaMiddleware_1 = require("../middlewares/validateSchemaMiddleware");
const userRepository_1 = require("../repositories/userRepository");
const userSchema_1 = require("../schemas/userSchema");
const criptrUtils_1 = require("../utils/criptrUtils");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function createUser(userInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, validateSchemaMiddleware_1.validateSchemas)(userSchema_1.userSchema.userRegisterSchema, userInfo); // Validating the stucture of the information send by the front.
        const passwordEncrypted = (0, criptrUtils_1.encrypt)(userInfo.password); // Encrypting the password so it can be storage in the DB safely.
        const user = yield userRepository_1.userRepository.getUserByEmail(userInfo.email); // Looking for the user by his email.
        if (user) {
            throw { type: "not_acceptable", message: "User already exist!" };
        }
        yield userRepository_1.userRepository.createUser(userInfo, passwordEncrypted); // Creating the user in the DB.
    });
}
function loginUser(userInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, validateSchemaMiddleware_1.validateSchemas)(userSchema_1.userSchema.userLoginSchema, userInfo); // Validating the stucture of the information send by the front.
        const user = yield userRepository_1.userRepository.getUserByEmail(userInfo.email); // Looking for the user by his email.
        if (user === null) {
            throw { type: "not_found", message: "User do not exist!" };
        }
        const passwordDecrypted = (0, criptrUtils_1.decrypt)(user.password); // Decypting the password got from the DB.
        if (userInfo.password !== passwordDecrypted) { // Checking if the password from the DB is the same send by the front.
            throw { type: "unauthorized", message: "Incorrect password!" };
        }
        const token = jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET); // Creating the token.
        return token;
    });
}
function findUserById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield userRepository_1.userRepository.findById(id);
        if (!user) {
            throw { type: "not_found", message: "User do not exist!" };
        }
        ;
        return user;
    });
}
exports.userService = {
    createUser,
    loginUser,
    findUserById
};

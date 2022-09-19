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
exports.invalidToken = exports.makeLogin = exports.createInvalidTeacherDisc = exports.createInvalidStructure = exports.createBodyTest = void 0;
const faker_1 = require("@faker-js/faker");
const supertest_1 = __importDefault(require("supertest"));
const app_1 = __importDefault(require("../../src/dist/app"));
const userFactory_1 = require("./userFactory");
function createBodyTest() {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            name: faker_1.faker.lorem.word(8),
            pdfUrl: faker_1.faker.internet.url(),
            categorie: "Projeto",
            discipline: "HTML e CSS",
            teacher: "Diego Pinho"
        };
    });
}
exports.createBodyTest = createBodyTest;
function createInvalidStructure() {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            invalidName: faker_1.faker.lorem.word()
        };
    });
}
exports.createInvalidStructure = createInvalidStructure;
function createInvalidTeacherDisc() {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            discipline: "HTML e CSS",
            teacher: "Bruna Hamori"
        };
    });
}
exports.createInvalidTeacherDisc = createInvalidTeacherDisc;
function makeLogin() {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield (0, userFactory_1.createBodyUser)();
        const createUser = yield (0, supertest_1.default)(app_1.default).post("/user/register").send(user);
        expect(createUser.status).toEqual(201);
        const login = yield (0, supertest_1.default)(app_1.default).post("/user/login").send({
            email: user.email,
            password: user.password
        });
        const token = login.text;
        return token;
    });
}
exports.makeLogin = makeLogin;
function invalidToken() {
    return __awaiter(this, void 0, void 0, function* () {
        return "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpYXQiOjE2NjMyNjkyMjUsImV4cCI6MTY2NTg2MTIyNX0.dC5lAWXiCpJpFbWOoHRvQlNKKIZ80-_PrHbpZjf3IeE";
    });
}
exports.invalidToken = invalidToken;

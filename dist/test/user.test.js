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
const supertest_1 = __importDefault(require("supertest"));
const database_1 = require("../src/config/database");
const app_1 = __importDefault(require("../src/dist/app"));
const userFactory_1 = require("./factories/userFactory");
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.client.$executeRaw `TRUNCATE TABLE "Users";`;
}));
describe("Test register User", () => {
    it("Should return  status error 422 when trying to create a user without the proprier format", () => __awaiter(void 0, void 0, void 0, function* () {
        const lackingPassword = {
            email: "test@gmail.com"
        };
        const incorrectPassword = (0, userFactory_1.passwordIncorret)();
        const resultLacking = yield (0, supertest_1.default)(app_1.default).post("/user/register").send(lackingPassword);
        const resultIncorrect = yield (0, supertest_1.default)(app_1.default).post("/user/register").send(incorrectPassword);
        expect(resultLacking.status).toEqual(422);
        expect(resultIncorrect.status).toEqual(422);
    }));
    it("Should return status 201 and create an user", () => __awaiter(void 0, void 0, void 0, function* () {
        const body = yield (0, userFactory_1.createBodyUser)();
        const result = yield (0, supertest_1.default)(app_1.default).post("/user/register").send(body);
        const findUser = yield database_1.client.users.findUnique({
            where: { email: body.email }
        });
        expect(result.status).toEqual(201);
        expect(findUser).not.toBeNull();
    }));
    it("Should return status error 406 if email was already registered", () => __awaiter(void 0, void 0, void 0, function* () {
        const body = yield (0, userFactory_1.createBodyUser)();
        const firstTry = yield (0, supertest_1.default)(app_1.default).post("/user/register").send(body);
        expect(firstTry.status).toEqual(201);
        const secondTry = yield (0, supertest_1.default)(app_1.default).post("/user/register").send(body);
        expect(secondTry.status).toEqual(406);
    }));
});
/////////////////////////////////////////////////////////////////
describe("Test Login User", () => {
    it("Should return  status error 422 when trying to create a user without the proprier format", () => __awaiter(void 0, void 0, void 0, function* () {
        const body = yield (0, userFactory_1.createBodyUser)();
        const result = yield (0, supertest_1.default)(app_1.default).post("/user/login").send({
            email: body.email
        });
        expect(result.status).toEqual(422);
    }));
    it("Should login the user and return status 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const user = yield (0, userFactory_1.createBodyUser)();
        const createUser = yield (0, supertest_1.default)(app_1.default).post("/user/register").send(user);
        expect(createUser.status).toEqual(201);
        const result = yield (0, supertest_1.default)(app_1.default).post("/user/login").send({
            email: user.email,
            password: user.password
        });
        expect(result.status).toEqual(200);
    }));
    it("Should return status error 404 when trying to login a user without the right credentials", () => __awaiter(void 0, void 0, void 0, function* () {
        const body = yield (0, userFactory_1.createBodyUser)();
        const result = yield (0, supertest_1.default)(app_1.default).post("/user/login").send({
            email: body.email,
            password: body.password
        });
        expect(result.status).toEqual(404);
    }));
});
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.client.$disconnect();
}));

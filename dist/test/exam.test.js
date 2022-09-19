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
const examFactory_1 = require("./factories/examFactory");
beforeEach(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.client.$executeRaw `TRUNCATE TABLE "Tests";`;
}));
afterAll(() => __awaiter(void 0, void 0, void 0, function* () {
    yield database_1.client.$disconnect();
}));
describe("Test create new Exams", () => {
    it("given a invalid body it should return 422", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield (0, examFactory_1.makeLogin)();
        const body = yield (0, examFactory_1.createBodyTest)();
        const result = yield (0, supertest_1.default)(app_1.default).post("/exams/add")
            .set({ Authorization: `Bearer ${token}` })
            .send({
            name: body.name
        });
        expect(result.status).toEqual(422);
    }));
    it("given a invalid category/discipline/teacher should return 401", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield (0, examFactory_1.makeLogin)();
        const { name, pdfUrl, categorie, discipline, teacher } = yield (0, examFactory_1.createBodyTest)();
        const invalidCategorie = yield (0, examFactory_1.createInvalidStructure)();
        const invalidDiscipline = yield (0, examFactory_1.createInvalidStructure)();
        const invalidTeacher = yield (0, examFactory_1.createInvalidStructure)();
        console.log({ name, pdfUrl, categorie: invalidCategorie.invalidName, discipline, teacher }, token);
        const resultCategorie = yield (0, supertest_1.default)(app_1.default).post("/exams/add")
            .set({ Authorization: `Bearer ${token}` })
            .send({ name, pdfUrl, categorie: invalidCategorie.invalidName, discipline, teacher });
        const resultDiscipline = yield (0, supertest_1.default)(app_1.default).post("/exams/add")
            .set({ Authorization: `Bearer ${token}` })
            .send({ name, pdfUrl, categorie, discipline: invalidDiscipline.invalidName, teacher });
        const resultTeacher = yield (0, supertest_1.default)(app_1.default).post("/exams/add")
            .set({ Authorization: `Bearer ${token}` })
            .send({ name, pdfUrl, categorie, discipline, teacher: invalidTeacher.invalidName });
        expect(resultCategorie.status).toEqual(404);
        expect(resultDiscipline.status).toEqual(404);
        expect(resultTeacher.status).toEqual(404);
    }));
    it("given a invalid relation should return 404", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield (0, examFactory_1.makeLogin)();
        const invalidRelation = yield (0, examFactory_1.createInvalidTeacherDisc)();
        const validCreateExame = yield (0, examFactory_1.createBodyTest)();
        const result = yield (0, supertest_1.default)(app_1.default).post("/exams/add")
            .set({ Authorization: `Bearer ${token}` })
            .send(Object.assign(Object.assign({}, validCreateExame), { discipline: invalidRelation.discipline, teacher: invalidRelation.teacher }));
        expect(result.status).toEqual(404);
    }));
    it("given a invalid token should return 401", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield (0, examFactory_1.invalidToken)();
        const body = yield (0, examFactory_1.createInvalidTeacherDisc)();
        const result = yield (0, supertest_1.default)(app_1.default).post("/exams/add")
            .set({ Authorization: `Bearer ${token}` })
            .send(body);
        expect(result.status).toEqual(401);
    }));
    it("given a requisiton without token should return 401", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield (0, examFactory_1.makeLogin)();
        const body = yield (0, examFactory_1.createInvalidTeacherDisc)();
        const result = yield (0, supertest_1.default)(app_1.default).post("/exams/add")
            .send(body);
        expect(result.status).toEqual(401);
    }));
    it("given a valid requisition return 201", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield (0, examFactory_1.makeLogin)();
        const user = yield (0, examFactory_1.createBodyTest)();
        const result = yield (0, supertest_1.default)(app_1.default).post("/exams/add")
            .set({ Authorization: `Bearer ${token}` })
            .send(user);
        expect(result.status).toEqual(201);
    }));
});
describe("Test get exams by disciplines ", () => {
    it("given a invalid token it should return 401", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield (0, examFactory_1.invalidToken)();
        const result = yield (0, supertest_1.default)(app_1.default).get("/examsByTerms")
            .set({ Authorization: `Bearer ${token}` })
            .send();
        expect(result.status).toEqual(401);
    }));
    it("given without token it should return 401", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield (0, examFactory_1.invalidToken)();
        const result = yield (0, supertest_1.default)(app_1.default).get("/examsByTerms")
            .send();
        expect(result.status).toEqual(401);
    }));
    it("given valid requisiton it should return 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield (0, examFactory_1.makeLogin)();
        const user = yield (0, examFactory_1.createBodyTest)();
        yield (0, supertest_1.default)(app_1.default).post("/exams/add")
            .set({ Authorization: `Bearer ${token}` })
            .send(user);
        const result = yield (0, supertest_1.default)(app_1.default).get("/examsByTerms")
            .set({ Authorization: `Bearer ${token}` })
            .send();
        expect(result.status).toEqual(200);
        expect(result.body).toBeInstanceOf(Array);
    }));
});
describe("Test get tests by teachers ", () => {
    it("given a invalid token it should return 401", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield (0, examFactory_1.invalidToken)();
        const result = yield (0, supertest_1.default)(app_1.default).get("/examsByTeachers")
            .set({ Authorization: `Bearer ${token}` })
            .send();
        expect(result.status).toEqual(401);
    }));
    it("given without token it should return 401", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield (0, examFactory_1.invalidToken)();
        const result = yield (0, supertest_1.default)(app_1.default).get("/examsByTeachers")
            .send();
        expect(result.status).toEqual(401);
    }));
    it("given valid requisiton it should return 200", () => __awaiter(void 0, void 0, void 0, function* () {
        const token = yield (0, examFactory_1.makeLogin)();
        const user = yield (0, examFactory_1.createBodyTest)();
        yield (0, supertest_1.default)(app_1.default).post("/exams/add")
            .set({ Authorization: `Bearer ${token}` })
            .send(user);
        const result = yield (0, supertest_1.default)(app_1.default).get("/examsByTeachers")
            .set({ Authorization: `Bearer ${token}` })
            .send();
        expect(result.status).toEqual(200);
        expect(result.body).toBeInstanceOf(Array);
    }));
});

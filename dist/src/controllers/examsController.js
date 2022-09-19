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
exports.getExamsByTeachers = exports.getExamsByDiscipline = exports.addExameController = void 0;
const examsService_1 = require("../services/examsService");
function addExameController(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const examsInfo = request.body;
        yield examsService_1.examsService.create(examsInfo);
        response.status(201).send("Exam created sucessfully!");
    });
}
exports.addExameController = addExameController;
function getExamsByDiscipline(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const exams = yield examsService_1.examsService.getByDiscipline();
        response.status(200).send(exams);
    });
}
exports.getExamsByDiscipline = getExamsByDiscipline;
function getExamsByTeachers(request, response) {
    return __awaiter(this, void 0, void 0, function* () {
        const exams = yield examsService_1.examsService.getByTeachers();
        response.status(200).send(exams);
    });
}
exports.getExamsByTeachers = getExamsByTeachers;

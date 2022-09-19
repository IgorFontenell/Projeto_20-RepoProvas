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
exports.examsService = void 0;
const validateSchemaMiddleware_1 = require("../middlewares/validateSchemaMiddleware");
const examSchema_1 = require("../schemas/examSchema");
const examRepository_1 = require("../repositories/examRepository");
function create(examInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        const { name, pdfUrl, categorie, discipline, teacher } = examInfo;
        yield (0, validateSchemaMiddleware_1.validateSchemas)(examSchema_1.examSchema.createSchema, examInfo);
        const categorieExist = yield examRepository_1.examRepository.lookForCategorieByName(categorie);
        if (categorieExist === null) {
            throw { type: "not_found", message: "Category do not exist!" };
        }
        const disciplineExist = yield examRepository_1.examRepository.lookForDisciplineByName(discipline);
        if (disciplineExist === null) {
            throw { type: "not_found", message: "Discipline do not exist!" };
        }
        const teacherExist = yield examRepository_1.examRepository.lookForTeacherByName(teacher);
        if (teacherExist === null) {
            throw { type: "not_found", message: "Teacher do not exist!" };
        }
        const teachersDisciplineExist = yield examRepository_1.examRepository.lookForTeachersDisciplines(teacherExist.id, disciplineExist.id);
        if (teachersDisciplineExist === null) {
            throw { type: "not_found", message: "This teacher dosen't teach in this discipline!" };
        }
        const examStruture = {
            name: name,
            pdfUrl: pdfUrl,
            categoryId: categorieExist.id,
            teacherDisciplineId: teachersDisciplineExist.id
        };
        yield examRepository_1.examRepository.createExam(examStruture);
        return;
    });
}
function getByDiscipline() {
    return __awaiter(this, void 0, void 0, function* () {
        const disciplineByTerms = yield examRepository_1.examRepository.getDisciplineByTerms();
        const buildTestByDisciplines = disciplineByTerms.map((item) => {
            return {
                periodo: item.number,
                disciplina: item.disciplines.map((disciplines) => {
                    return {
                        discipline: disciplines.name,
                        categorias: disciplines.teachersDisciplines[0].tests.map((categories) => {
                            return {
                                categoryName: categories.categories.name,
                                testsInfos: categories.categories.tests.map((tests) => {
                                    if (disciplines.id === tests.teacherDiscipline.disciplineId) {
                                        return {
                                            name: tests.name,
                                            teacherName: tests.teacherDiscipline.teachers.name
                                        };
                                    }
                                }).filter((testElement) => testElement)
                            };
                        })
                    };
                })
            };
        });
        return buildTestByDisciplines;
    });
}
function getByTeachers() {
    return __awaiter(this, void 0, void 0, function* () {
        const examByTeachers = yield examRepository_1.examRepository.getExamsByTeachers();
        const buildTestByTeacher = examByTeachers.map((item) => {
            return {
                teacherName: item.name,
                teacherId: item.id,
                infos: item.teachersDisciplines[0].tests.map((infos) => {
                    return {
                        categoryName: infos.categories.name,
                        infosTests: infos.categories.tests.map((tests) => {
                            if (tests.teacherDiscipline.teachers.name === item.name) {
                                return {
                                    testName: tests.name,
                                    disciplineName: tests.teacherDiscipline.disciplines.name,
                                    teacher: tests.teacherDiscipline.teachers.name
                                };
                            }
                        }).filter((element) => element)
                    };
                })
            };
        });
        return buildTestByTeacher;
    });
}
exports.examsService = {
    create,
    getByDiscipline,
    getByTeachers
};

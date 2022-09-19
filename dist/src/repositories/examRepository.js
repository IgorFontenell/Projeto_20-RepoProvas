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
exports.examRepository = void 0;
const database_1 = require("../config/database");
function lookForCategorieByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.client.categories.findFirst({
            where: {
                name: name
            }
        });
    });
}
function lookForDisciplineByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.client.disciplines.findFirst({
            where: {
                name: name
            }
        });
    });
}
function lookForTeacherByName(name) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.client.teachers.findFirst({
            where: {
                name: name
            }
        });
    });
}
function lookForTeachersDisciplines(idTeacher, idDisciplines) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.client.teachersDisciplines.findFirst({
            where: {
                teacherId: idTeacher,
                disciplineId: idDisciplines
            }
        });
    });
}
function createExam(examInfo) {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.client.tests.create({
            data: {
                name: examInfo.name,
                pdfUrl: examInfo.pdfUrl,
                categoryId: examInfo.categoryId,
                teacherDisciplineId: examInfo.teacherDisciplineId
            }
        });
    });
}
function getDisciplineByTerms() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.client.terms.findMany({
            select: {
                number: true,
                disciplines: {
                    select: {
                        name: true,
                        id: true,
                        teachersDisciplines: {
                            select: {
                                tests: { distinct: ['categoryId'],
                                    select: {
                                        categories: {
                                            select: { id: true,
                                                name: true,
                                                tests: {
                                                    select: {
                                                        name: true,
                                                        teacherDiscipline: {
                                                            select: {
                                                                teachers: {
                                                                    select: { name: true }
                                                                }, disciplineId: true
                                                            }
                                                        }
                                                    }
                                                } }
                                        }
                                    },
                                    orderBy: [{ categories: { name: "desc" } }],
                                }
                            }
                        }
                    }
                }
            }
        });
    });
}
function getExamsByTeachers() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield database_1.client.teachers.findMany({
            select: {
                name: true,
                id: true,
                teachersDisciplines: { distinct: ['teacherId'],
                    select: {
                        tests: { distinct: ['categoryId'],
                            select: {
                                categories: {
                                    select: {
                                        id: true,
                                        name: true,
                                        tests: {
                                            select: {
                                                name: true,
                                                teacherDiscipline: {
                                                    select: {
                                                        disciplines: { select: { name: true } },
                                                        teachers: { select: { name: true } }
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                            }, orderBy: [{ categories: { name: "desc" } }],
                        }
                    }, orderBy: [{ tests: { _count: 'desc' } }]
                }
            }
        });
    });
}
exports.examRepository = {
    lookForCategorieByName,
    lookForDisciplineByName,
    lookForTeacherByName,
    lookForTeachersDisciplines,
    createExam,
    getDisciplineByTerms,
    getExamsByTeachers
};

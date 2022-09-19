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
const database_1 = require("../src/config/database");
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        yield upsertTermsItens();
        yield upsertCategoriesItens();
        yield upsertTeachersItens();
        yield upsertDisciplinesItens();
        yield upsertTeachersDisciplinesItens();
    });
}
function upsertTeachersDisciplinesItens() {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.client.teachersDisciplines.upsert({
            where: { id: 1 },
            update: {},
            create: { teacherId: 1, disciplineId: 1 }
        });
        yield database_1.client.teachersDisciplines.upsert({
            where: { id: 2 },
            update: {},
            create: { teacherId: 1, disciplineId: 2 }
        });
        yield database_1.client.teachersDisciplines.upsert({
            where: { id: 3 },
            update: {},
            create: { teacherId: 1, disciplineId: 3 }
        });
        yield database_1.client.teachersDisciplines.upsert({
            where: { id: 4 },
            update: {},
            create: { teacherId: 2, disciplineId: 4 }
        });
        yield database_1.client.teachersDisciplines.upsert({
            where: { id: 5 },
            update: {},
            create: { teacherId: 2, disciplineId: 5 }
        });
        yield database_1.client.teachersDisciplines.upsert({
            where: { id: 6 },
            update: {},
            create: { teacherId: 2, disciplineId: 6 }
        });
    });
}
function upsertDisciplinesItens() {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.client.disciplines.upsert({
            where: { id: 1 },
            update: {},
            create: { name: "HTML e CSS", termId: 1 }
        });
        yield database_1.client.disciplines.upsert({
            where: { id: 2 },
            update: {},
            create: { name: "JavaScript", termId: 2 }
        });
        yield database_1.client.disciplines.upsert({
            where: { id: 3 },
            update: {},
            create: { name: "React", termId: 3 }
        });
        yield database_1.client.disciplines.upsert({
            where: { id: 4 },
            update: {},
            create: { name: "Humildade", termId: 1 }
        });
        yield database_1.client.disciplines.upsert({
            where: { id: 5 },
            update: {},
            create: { name: "Planejamento", termId: 2 }
        });
        yield database_1.client.disciplines.upsert({
            where: { id: 6 },
            update: {},
            create: { name: "Autoconfiança", termId: 3 }
        });
    });
}
function upsertTeachersItens() {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.client.teachers.upsert({
            where: { id: 1 },
            update: {},
            create: { name: "Diego Pinho" }
        });
        yield database_1.client.teachers.upsert({
            where: { id: 1 },
            update: {},
            create: { name: "Bruna Hamori" }
        });
    });
}
function upsertCategoriesItens() {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.client.categories.upsert({
            where: { id: 1 },
            update: {},
            create: { name: "Projeto" }
        });
        yield database_1.client.categories.upsert({
            where: { id: 2 },
            update: {},
            create: { name: "Prática" }
        });
        yield database_1.client.categories.upsert({
            where: { id: 3 },
            update: {},
            create: { name: "Recuperação" }
        });
    });
}
function upsertTermsItens() {
    return __awaiter(this, void 0, void 0, function* () {
        yield database_1.client.terms.upsert({
            where: { id: 1 },
            update: {},
            create: { number: 1 }
        });
        yield database_1.client.terms.upsert({
            where: { id: 2 },
            update: {},
            create: { number: 2 }
        });
        yield database_1.client.terms.upsert({
            where: { id: 3 },
            update: {},
            create: { number: 3 }
        });
        yield database_1.client.terms.upsert({
            where: { id: 4 },
            update: {},
            create: { number: 4 }
        });
        yield database_1.client.terms.upsert({
            where: { id: 5 },
            update: {},
            create: { number: 5 }
        });
        yield database_1.client.terms.upsert({
            where: { id: 6 },
            update: {},
            create: { number: 6 }
        });
    });
}
main()
    .catch(e => {
    console.error(e);
    process.exit(1);
})
    .finally(() => {
    database_1.client.$disconnect();
});

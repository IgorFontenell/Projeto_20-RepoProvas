import { client } from "../config/database";
import { TypeInsertExam } from '../types/examType';


async function lookForCategorieByName (name: string) {
    return await client.categories.findFirst({
        where: {
            name: name
        }
    })
}
async function lookForDisciplineByName (name: string) {
    return await client.disciplines.findFirst({
        where: {
            name: name
        }
    })
}
async function lookForTeacherByName (name: string) {
    return await client.teachers.findFirst({
        where: {
            name: name
        }
    })
}
async function lookForTeachersDisciplines(idTeacher: number, idDisciplines: number) {
    return await client.teachersDisciplines.findFirst({
        where: {
            teacherId: idTeacher,
            disciplineId: idDisciplines
        }
    })
}
async function createExam (examInfo: TypeInsertExam) {
    await client.tests.create({
        data: {
            name: examInfo.name,
            pdfUrl: examInfo.pdfUrl,
            categoryId: examInfo.categoryId,
            teacherDisciplineId: examInfo.teacherDisciplineId
        }
    })
}

export const examRepository = {
    lookForCategorieByName,
    lookForDisciplineByName,
    lookForTeacherByName,
    lookForTeachersDisciplines,
    createExam
}
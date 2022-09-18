import { client } from "../config/database";


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
async function createExam (examInfo) {
    await client.user.create({
        data: {
            examInfo.name,
            
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
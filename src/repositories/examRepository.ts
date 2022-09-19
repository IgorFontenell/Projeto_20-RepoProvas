import { client, connection } from "../config/database";
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

async function getDisciplineByTerms () {
    return await client.terms.findMany({
        select:{
            number: true,
            disciplines:{
                select:{
                    name: true,
                    id: true,
                    teachersDisciplines:{
                        select:{
                            tests:{ distinct: ['categoryId'],
                                select:{
                                    categories:{
                                        select: {id: true, 
                                                name: true,
                                                tests: { 
                                                    select: { 
                                                        name: true,
                                                        
                                                        teacherDiscipline:{
                                                            select:{
                                                                teachers:{
                                                                    select:{name:true} }, disciplineId: true
                                                                }
                                                        }
                                                    }
                                                }}
                                    }
                                },
                                orderBy: [{categories: {name: "desc"}}],
                            }
                        }
                    }
                }
            }
        }
    })
}





export const examRepository = {
    lookForCategorieByName,
    lookForDisciplineByName,
    lookForTeacherByName,
    lookForTeachersDisciplines,
    createExam,
    getDisciplineByTerms
}
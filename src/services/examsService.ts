import { IExam } from '../types/examType';
import { validateSchemas } from '../middlewares/validateSchemaMiddleware';
import { examSchema } from '../schemas/examSchema';
import { examRepository } from '../repositories/examRepository';
import { TypeInsertExam } from '../types/examType';
import { Terms } from '@prisma/client';

async function create (examInfo: IExam) {
    const { name,
            pdfUrl,
            categorie,
            discipline,
            teacher } = examInfo;

    await validateSchemas(examSchema.createSchema, examInfo);

    const categorieExist = await examRepository.lookForCategorieByName(categorie);
    if(!categorieExist) {
        throw {type: "not_found", message: "Category do not exist!"}
    }

    const disciplineExist = await examRepository.lookForDisciplineByName(discipline);
    if(!disciplineExist) {
        throw {type: "not_found", message: "Discipline do not exist!"}
    }

    const teacherExist = await examRepository.lookForTeacherByName(teacher);
    if(!teacherExist) {
        throw {type: "not_found", message: "Teacher do not exist!"}
    }

    const teachersDisciplineExist = await examRepository.lookForTeachersDisciplines(teacherExist.id, disciplineExist.id);
    if(!teachersDisciplineExist) {
        throw {type: "not_found", message: "This teacher dosen't teach in this discipline!"}
    }

    const examStruture: TypeInsertExam = {
        name: name,
        pdfUrl: pdfUrl, 
        categoryId: categorieExist.id,
        teacherDisciplineId: teachersDisciplineExist.id
    };
    await examRepository.createExam(examStruture);

    return;


}

async function getByDiscipline() {
    const disciplineByTerms =  await examRepository.getDisciplineByTerms(); 
    
    const buildTestByDisciplines = disciplineByTerms.map((item) => {
        return{
            periodo: item.number,
            disciplina: item.disciplines.map((disciplines) =>{
                return{
                    discipline: disciplines.name,
                    categorias: disciplines.teachersDisciplines[0].tests.map((categories)=>{
                        return{
                            categoryName: categories.categories.name,
                            
                            testsInfos: categories.categories.tests.map((tests)=>{
                                if(disciplines.id === tests.teacherDiscipline.disciplineId){

                                    return{
                                        name: tests.name,
                                        teacherName: tests.teacherDiscipline.teachers.name
                                    }
                                 } 
                            }).filter((testElement)=> testElement )
                        }
                    })
                }
            })
        }
    }) 
    
    
    return buildTestByDisciplines

}

async function getByTeachers () {
    const examByTeachers = await examRepository.getExamsByTeachers();

    const buildTestByTeacher = examByTeachers.map((item) =>{
        return{
            teacherName: item.name,
            teacherId: item.id,
            infos: item.teachersDisciplines[0].tests.map((infos)=>{
                return{
                    categoryName: infos.categories.name,
                    infosTests: infos.categories.tests.map((tests)=>{
                        if(tests.teacherDiscipline.teachers.name === item.name){
                            return{
                                testName: tests.name,
                                disciplineName: tests.teacherDiscipline.disciplines.name,
                                teacher: tests.teacherDiscipline.teachers.name
                            }
                        }
                        
                    }).filter((element)=> element)
                }
                
            })
        }
    })
    return buildTestByTeacher

}


export const examsService = {
    create,
    getByDiscipline,
    getByTeachers
}
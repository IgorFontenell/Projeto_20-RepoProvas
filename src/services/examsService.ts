import { IExam } from '../types/examType';
import { validateSchemas } from '../middlewares/validateSchemaMiddleware';
import { examSchema } from '../schemas/examSchema';
import { examRepository } from '../repositories/examRepository';
import { TypeInsertExam } from '../types/examType';

async function create (examInfo: IExam) {
    const { name,
            pdfUrl,
            categorie,
            discipline,
            teacher } = examInfo;

    await validateSchemas(examSchema.createSchema, examInfo);

    const categorieExist = await examRepository.lookForDisciplineByName(categorie);
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
        throw {type: "not_found", message: "This teacher don't lecture in this discipline!"}
    }

    const examStruture: TypeInsertExam = {
        name: name,
        pdfUrl: pdfUrl, 
        categoryId: categorieExist.id,
        teacherDisciplineId: teachersDisciplineExist.id
    };
    await examRepository.createExam(examStruture);


}
export const examsService = {
    create,
}
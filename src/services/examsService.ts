import { IExam } from '../types/examType';
import { validateSchemas } from '../middlewares/validateSchemaMiddleware';
import { examSchema } from '../schemas/examSchema';


async function create (examInfo: IExam) {
    await validateSchemas(examSchema.createSchema, examInfo);
}

export const examsService = {
    create,
}
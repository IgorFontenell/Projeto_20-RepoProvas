import joi from 'joi';
import { IExam } from '../types/examType';

const createSchema = joi.object<IExam>({
    name: joi.string().required(),
    pdfUrl: joi.string().uri().required(),
    categorie: joi.string().required(),
    discipline: joi.string().required(),
    teacher: joi.string().required(),
});

export const examSchema = {
    createSchema
}
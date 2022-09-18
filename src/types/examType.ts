import { Tests } from "@prisma/client";

export interface IExam {
    name: string;
    pdfUrl: string;
    categorie: string;
    discipline: string;
    teacher: string;
}

export type TypeInsertExam = Omit<Tests, 'id'>;
import { Request, Response } from 'express';
import { examsService } from '../services/examsService';
import { IExam } from '../types/examType';
import { Terms } from "@prisma/client";

export async function addExameController (request: Request, response: Response) {
    const examsInfo: IExam = request.body;

    await examsService.create(examsInfo);

    response.status(201).send("Exam created sucessfully!");
    

}

export async function getExamsByDiscipline (request: Request, response: Response) {
    
    const exams = await examsService.getByDiscipline();
    

    response.status(200).send(exams);
    

}


import { Request, Response } from 'express';
import { examsService } from '../services/examsService';
import { IExam } from '../types/examType';

export async function addExameController (request: Request, response: Response) {
    const examsInfo: IExam = request.body;
    
    await examsService.create(examsInfo);

    response.status(201).send("Exam created sucessfully!");
    

}


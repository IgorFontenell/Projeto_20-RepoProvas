import { Request, Response } from 'express';
import { IUser, TypeUserLogin } from '../types/userTypes';
import { userService } from '../services/userService';

export async function registerController (request: Request, response: Response) {

    const userInfo: IUser = request.body;
    await userService.createUser(userInfo);

    response.status(201).send("User created sucessfully!");

}

export async function loginController (request: Request, response: Response) {

    const userInfo: TypeUserLogin = request.body;
    const token = await userService.loginUser(userInfo);

    response.status(200).send(token);

}
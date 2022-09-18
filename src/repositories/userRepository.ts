import { client } from "../config/database";
import { IUser, TypeUserLogin } from '../types/userTypes';
import { User } from "@prisma/client";

export async function createUserRepository (userInfo: IUser, passwordEncrypted: string) {
    await client.user.create({
        data: {
            email: userInfo.email,
            password: passwordEncrypted
        }
    })
}

export async function getUserByEmailRepository (email: string) {
    console.log(email);
    await client.user.findMany({
        where: {
            email: email,
        }
    })
}
import { client } from "../config/database";
import { IUser, TypeUserLogin } from '../types/userTypes';
import { User } from "@prisma/client";

 async function createUser (userInfo: IUser, passwordEncrypted: string) {
    await client.user.create({
        data: {
            email: userInfo.email,
            password: passwordEncrypted
        }
    })
}

 async function getUserByEmail (email: string) {
    
    return await client.user.findFirst({
        where: {
            email: email,
        }
    })
}

 async function findById (id: number) {
    
    return client.user.findUnique({
        where: { id }
      });
}

export const userRepository = {
    createUser,
    getUserByEmail,
    findById

}
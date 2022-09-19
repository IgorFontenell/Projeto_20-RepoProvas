import { client } from "../config/database";
import { IUser, TypeUserLogin } from '../types/userTypes';


 async function createUser (userInfo: IUser, passwordEncrypted: string) {
    await client.users.create({
        data: {
            email: userInfo.email,
            password: passwordEncrypted
        }
    })
}

 async function getUserByEmail (email: string) {
    
    return await client.users.findFirst({
        where: {
            email: email,
        }
    })
}

 async function findById (id: number) {
    
    return client.users.findUnique({
        where: { id }
      });
}

export const userRepository = {
    createUser,
    getUserByEmail,
    findById

}
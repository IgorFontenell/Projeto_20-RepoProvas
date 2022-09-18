import { validateSchemas } from "../middlewares/validateSchemaMiddleware";
import { createUserRepository, getUserByEmailRepository } from "../repositories/userRepository";
import { userSchema } from "../schemas/userSchema";
import { IUser, TypeUserLogin} from '../types/userTypes';
import { decrypt, encrypt } from "../utils/criptrUtils";
import jwt from 'jsonwebtoken';
import { User } from "@prisma/client";


async function createUser (user: IUser) {

    await validateSchemas(userSchema.userRegisterSchema, user);
    const passwordEncrypted: string = encrypt(user.password);
    await createUserRepository(user, passwordEncrypted);
}

async function loginUser (userInfo: TypeUserLogin) {

    await validateSchemas(userSchema.userLoginSchema, userInfo);
    const user: any = await getUserByEmailRepository(userInfo.email);
    console.log(user);
    if(user === undefined) {
        throw {type: "not_found", message: "User do not exist!"}
    }
    const token : string = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string)
    
    return token;
    
}

export const userService = {
    createUser,
    loginUser
}

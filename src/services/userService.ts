import { validateSchemas } from "../middlewares/validateSchemaMiddleware";
import { userRepository }  from "../repositories/userRepository";
import { userSchema } from "../schemas/userSchema";
import { IUser, TypeUserLogin} from '../types/userTypes';
import { decrypt, encrypt } from "../utils/criptrUtils";
import jwt from 'jsonwebtoken';
import { User } from "@prisma/client";


async function createUser (user: IUser) {

    await validateSchemas(userSchema.userRegisterSchema, user); // Validating the stucture of the information send by the front.
    const passwordEncrypted: string = encrypt(user.password); // Encrypting the password so it can be storage in the DB safely.
    await userRepository.createUser(user, passwordEncrypted); // Creating the user in the DB.
}

async function loginUser (userInfo: TypeUserLogin) {

    await validateSchemas(userSchema.userLoginSchema, userInfo); // Validating the stucture of the information send by the front.
    const user: any = await userRepository.getUserByEmail(userInfo.email); // Looking for the user by his email.
    
    if(user === undefined) {
        throw {type: "not_found", message: "User do not exist!"}
    }

    const passwordDecrypted: string = decrypt(user.password); // Decypting the password got from the DB.
    if(userInfo.password !== passwordDecrypted) { // Checking if the password from the DB is the same send by the front.
        throw {type: "unauthorized", message: "Incorrect password!"}
    }

    const token : string = jwt.sign({ userId: user.id }, process.env.JWT_SECRET as string) // Creating the token.
    
    return token;
    
}

async function findUserById(id: number) {
    const user = await userRepository.findById(id);
    if (!user) {
        throw {type: "not_found", message: "User do not exist!"}
    };
  
    return user;
}

export const userService = {
    createUser,
    loginUser,
    findUserById
}

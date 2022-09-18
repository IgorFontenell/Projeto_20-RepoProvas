import joi from 'joi';
import { IUser, TypeUserLogin } from '../types/userTypes';

const userRegisterSchema = joi.object<IUser>({
    email: joi.string().email().required(),
    password: joi.string().required(),
    confirmPassword: joi.string().valid(joi.ref('password')).required()
});

const userLoginSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().required()
});

export const userSchema = {
    userRegisterSchema,
    userLoginSchema
}
import {faker} from "@faker-js/faker"
import supertest from 'supertest';
import app from "../../src/app";
import { createBodyUser } from './userFactory';

export async function createBodyTest(){
    return {
        name: faker.lorem.word(8),
        pdfUrl: faker.internet.url(),
        categorie: "Projeto",
        discipline: "HTML e CSS",
        teacher: "Diego Pinho"
    };

}

export async function createInvalidStructure(){
    return {
        invalidName: faker.lorem.word()
    };

}

export async function createInvalidTeacherDisc(){
    return {
        discipline: "HTML e CSS",
        teacher: "Bruna Hamori"
    };
}

export async function makeLogin() {
    const user = await createBodyUser();
        
    const createUser = await supertest(app).post("/user/register").send(user);

    expect(createUser.status).toEqual(201);

    const login = await supertest(app).post("/user/login").send({
            email: user.email,
            password: user.password
        });
    
    const token  = login.text;
    return token;
}

export async function invalidToken(){
    return "yJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEwLCJpYXQiOjE2NjMyNjkyMjUsImV4cCI6MTY2NTg2MTIyNX0.dC5lAWXiCpJpFbWOoHRvQlNKKIZ80-_PrHbpZjf3IeE"      
    
}
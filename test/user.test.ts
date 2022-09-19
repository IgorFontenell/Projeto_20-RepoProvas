import supertest from 'supertest';
import app from '../src/app';
import { client } from '../src/config/database';
import dotenv from 'dotenv';
import { testUser } from './userFactory/userTest';

dotenv.config();


beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE "Users"`;
});

describe('Test user register', () => {
    
    
    it('Should return  status error 422 when trying to create a user without the proprier format', async () => {

        const userWrongConfirmPassword  = await supertest(app).post('/user/register').send({...testUser, confirmPassword: "test1"});
        const userWithoutConfirmPassword  = await supertest(app).post('/user/register').send({...testUser});
        const createdUser = await client.users.findUnique({
            where: {email: testUser.email}
        });

        expect(userWrongConfirmPassword.status).toBe(422);
        expect(userWithoutConfirmPassword.status).toBe(422);
        expect(createdUser).toBeNull();

    });
    
    it('Should create the user and return status 201', async () => {

        const creatingUser  = await supertest(app).post('/user/register').send({...testUser, confirmPassword: "test"});
        const createdUser = await client.users.findUnique({
            where: {email: testUser.email}
        });

        expect(creatingUser.status).toBe(201);
        expect(createdUser).not.toBeNull();

    });

    it('Should return status error 406 when user already exists', async () => {

        const userAlreadyExist  = await supertest(app).post('/user/register').send({
            email: testUser.email,
            password: "test2",
            confirmPassword: "test2"
        });
        const onlyOneUser = await client.users.findMany({
            where: {email: testUser.email}
        });
        console.log(onlyOneUser);
        expect(userAlreadyExist.status).toBe(406);
        expect(onlyOneUser.length).toBe(1);
        

    });
   
});

 describe('Test user login', () => {
    
     it('Should return  status error 422 when trying to create a user without the proprier format', async () => {

         const userWithoutPassword  = await supertest(app).post('/user/login').send({
             email: testUser.email
         });
         expect(userWithoutPassword.status).toBe(422);

     });

     it('Should return status error 401 when trying to login a user without the right credentials', async () => {

        const userWrongPassword  = await supertest(app).post('/user/login').send({
            email: testUser.email, 
            password: "test1"
        });

        expect(userWrongPassword.status).toBe(401);
        

    });
     it('Should login the user and return status 200', async () => {

         const loginUser  = await supertest(app).post('/user/login').send({...testUser});

         
         expect(loginUser.status).toBe(200);
        

     });
   
 });

afterAll(async () => {
    await client.$disconnect();
  });

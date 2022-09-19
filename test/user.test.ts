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
    console.log(process.env.DATABASE_URL);
    
    it('Should return error status 422 when trying to create a user without the proprier format', async () => {

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
   
});

afterAll(async () => {
    await client.$disconnect();
  });

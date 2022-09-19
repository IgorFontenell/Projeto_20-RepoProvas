import supertest from 'supertest';
import { client } from '../src/config/database';
import app from '../src/dist/app';
import { createBodyUser, passwordIncorret } from './factories/userFactory';


beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE "Users";`
  });
  

 describe("Test register User", () => {

    it("Should return  status error 422 when trying to create a user without the proprier format", async () => {
        const lackingPassword = {
            email: "test@gmail.com"    
        };
        const incorrectPassword = passwordIncorret()

        const resultLacking = await supertest(app).post("/user/register").send(lackingPassword);
        const resultIncorrect = await supertest(app).post("/user/register").send(incorrectPassword);

        expect(resultLacking.status).toEqual(422);
        expect(resultIncorrect.status).toEqual(422);
    });

    it("Should return status 201 and create an user", async () => {
       const body = await createBodyUser()

       const result = await supertest(app).post("/user/register").send(body);
        
       const findUser = await client.users.findUnique({
            where: { email: body.email }
        });

        expect(result.status).toEqual(201);
        expect(findUser).not.toBeNull();
    });

    it("Should return status error 406 if email was already registered", async () => {
        const body = await createBodyUser()

        const firstTry = await supertest(app).post("/user/register").send(body);
        expect(firstTry.status).toEqual(201);

        const secondTry = await supertest(app).post("/user/register").send(body);
        expect(secondTry.status).toEqual(406);
    });
});


/////////////////////////////////////////////////////////////////

describe("Test Login User", () => {

    it("Should return  status error 422 when trying to create a user without the proprier format", async () => {
        const body = await createBodyUser()

        const result = await supertest(app).post("/user/login").send({
            email: body.email
        });
        
        expect(result.status).toEqual(422);
    });

    it("Should login the user and return status 200", async () => {
        const user = await createBodyUser()
        
        const createUser = await supertest(app).post("/user/register").send(user);

        expect(createUser.status).toEqual(201);

    
        const result = await supertest(app).post("/user/login").send({
            email: user.email,
            password: user.password
        });
        
        expect(result.status).toEqual(200);
    });

    it("Should return status error 404 when trying to login a user without the right credentials", async () => {
        const body = await createBodyUser()

        const result = await supertest(app).post("/user/login").send({
            email: body.email,
            password: body.password
        });
        expect(result.status).toEqual(404);
    });

});

afterAll(async () => {
    await client.$disconnect();
});
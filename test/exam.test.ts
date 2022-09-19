import supertest from 'supertest';
import { client } from '../src/config/database';
import app from '../src/dist/app';
import { createBodyTest, createInvalidStructure, createInvalidTeacherDisc, makeLogin, invalidToken } from './factories/examFactory';


beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE "Tests";`
  });
  afterAll(async () => {
    await client.$disconnect();
});



describe("Test create new Exams", () => {

    it("given a invalid body it should return 422", async () => {
        const token = await makeLogin()
        
        const body = await createBodyTest()

        const result = await supertest(app).post("/exams/add")
        .set({Authorization: `Bearer ${token}`})
        .send({
            name: body.name
        })
        expect(result.status).toEqual(422);
    });
   
   
    it("given a invalid category/discipline/teacher should return 401", async () => {
        const token = await makeLogin();

        const { name, pdfUrl, categorie, discipline, teacher} = await createBodyTest();
        const invalidCategorie = await createInvalidStructure();
        const invalidDiscipline = await createInvalidStructure();
        const invalidTeacher = await createInvalidStructure();

        console.log({name, pdfUrl, categorie: invalidCategorie.invalidName, discipline, teacher}, token);
        
        const resultCategorie = await supertest(app).post("/exams/add")
        .set({Authorization: `Bearer ${token}`})
        .send({name, pdfUrl, categorie: invalidCategorie.invalidName, discipline, teacher});

        const resultDiscipline = await supertest(app).post("/exams/add")
        .set({Authorization: `Bearer ${token}`})
        .send({name, pdfUrl, categorie, discipline: invalidDiscipline.invalidName, teacher});

        const resultTeacher = await supertest(app).post("/exams/add")
        .set({Authorization: `Bearer ${token}`})
        .send({name, pdfUrl, categorie, discipline, teacher: invalidTeacher.invalidName});

        expect(resultCategorie.status).toEqual(404);
        expect(resultDiscipline.status).toEqual(404);
        expect(resultTeacher.status).toEqual(404);

    });

    it("given a invalid relation should return 404", async () => {
        const token = await makeLogin();
        const invalidRelation = await createInvalidTeacherDisc();
        const validCreateExame = await createBodyTest();

        const result = await supertest(app).post("/exams/add")
        .set({Authorization: `Bearer ${token}`})
        .send({...validCreateExame, discipline: invalidRelation.discipline, teacher: invalidRelation.teacher});
        expect(result.status).toEqual(404);
    });
    it("given a invalid token should return 401", async () => {
        const token = await invalidToken()
        const body = await createInvalidTeacherDisc()

        const result = await supertest(app).post("/exams/add")
        .set({Authorization: `Bearer ${token}`})
        .send(body);
        expect(result.status).toEqual(401);
    });
    
    it("given a requisiton without token should return 401", async () => {
        const token = await makeLogin()
        const body = await createInvalidTeacherDisc()

        const result = await supertest(app).post("/exams/add")
        .send(body);
        expect(result.status).toEqual(401);
    });
     
    it("given a valid requisition return 201", async () => {
        const token = await makeLogin()
        const user = await createBodyTest()

        const result = await supertest(app).post("/exams/add")
        .set({Authorization: `Bearer ${token}`})
        .send(user);
        expect(result.status).toEqual(201);
    });


});

describe("Test get exams by disciplines ", () => {

    it("given a invalid token it should return 401", async () => {
        const token = await invalidToken()

        const result = await supertest(app).get("/examsByTerms")
        .set({Authorization: `Bearer ${token}`})
        .send()
        expect(result.status).toEqual(401);
    });

    it("given without token it should return 401", async () => {
        const token = await invalidToken()

        const result = await supertest(app).get("/examsByTerms")
        .send()
        expect(result.status).toEqual(401);
    });

    it("given valid requisiton it should return 200", async () => {
        const token = await makeLogin();

        const user = await createBodyTest();
        await supertest(app).post("/exams/add")
        .set({Authorization: `Bearer ${token}`})
        .send(user);

        const result = await supertest(app).get("/examsByTerms")
        .set({Authorization: `Bearer ${token}`})
        .send();

        
        
        expect(result.status).toEqual(200);
        expect(result.body).toBeInstanceOf(Array);
        
    });

});

describe("Test get tests by teachers ", () => {

    it("given a invalid token it should return 401", async () => {
        const token = await invalidToken()

        const result = await supertest(app).get("/examsByTeachers")
        .set({Authorization: `Bearer ${token}`})
        .send()
        expect(result.status).toEqual(401);
    });
    

    it("given without token it should return 401", async () => {
        const token = await invalidToken()

        const result = await supertest(app).get("/examsByTeachers")
        .send()
        expect(result.status).toEqual(401);
    });

    it("given valid requisiton it should return 200", async () => {
        const token = await makeLogin()

        const user = await createBodyTest()

        await supertest(app).post("/exams/add")
        .set({Authorization: `Bearer ${token}`})
        .send(user);

        const result = await supertest(app).get("/examsByTeachers")
        .set({Authorization: `Bearer ${token}`})
        .send()


        expect(result.status).toEqual(200)
        expect(result.body).toBeInstanceOf(Array);
        
    });
    
});


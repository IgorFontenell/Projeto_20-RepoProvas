import supertest from 'supertest';
import app from '../src/app';
import { client } from '../src/config/database';


beforeEach(async () => {
    await client.$executeRaw`TRUNCATE TABLE "Users"`;
})

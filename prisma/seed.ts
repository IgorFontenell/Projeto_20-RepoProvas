import { client } from '../src/config/database';

async function main() {
    await upsertTermsItens();

    await upsertCategoriesItens();

    await upsertTeachersItens();

    await upsertDisciplinesItens();

    await upsertTeachersDisciplinesItens();
}

async function upsertTeachersDisciplinesItens() {
    await client.teachersDisciplines.upsert({
        where: { id: 1 },
        update: {},
        create: { teacherId: 1, disciplineId: 1 }
    });
    await client.teachersDisciplines.upsert({
        where: { id: 2 },
        update: {},
        create: { teacherId: 1, disciplineId: 2 }
    });
    await client.teachersDisciplines.upsert({
        where: { id: 3 },
        update: {},
        create: { teacherId: 1, disciplineId: 3 }
    });
    await client.teachersDisciplines.upsert({
        where: { id: 4 },
        update: {},
        create: { teacherId: 2, disciplineId: 4 }
    });
    await client.teachersDisciplines.upsert({
        where: { id: 5 },
        update: {},
        create: { teacherId: 2, disciplineId: 5 }
    });
    await client.teachersDisciplines.upsert({
        where: { id: 6 },
        update: {},
        create: { teacherId: 2, disciplineId: 6 }
    });
}

async function upsertDisciplinesItens() {
    await client.disciplines.upsert({
        where: { id: 1 },
        update: {},
        create: { name: "HTML e CSS", termId: 1 }
    });
    await client.disciplines.upsert({
        where: { id: 2 },
        update: {},
        create: { name: "JavaScript", termId: 2 }
    });
    await client.disciplines.upsert({
        where: { id: 3 },
        update: {},
        create: { name: "React", termId: 3 }
    });
    await client.disciplines.upsert({
        where: { id: 4 },
        update: {},
        create: { name: "Humildade", termId: 1 }
    });
    await client.disciplines.upsert({
        where: { id: 5 },
        update: {},
        create: { name: "Planejamento", termId: 2 }
    });
    await client.disciplines.upsert({
        where: { id: 6 },
        update: {},
        create: { name: "Autoconfiança", termId: 3 }
    });
}

async function upsertTeachersItens() {
    await client.teachers.upsert({
        where: { id: 1 },
        update: {},
        create: { name: "Diego Pinho" }
    });
    await client.teachers.upsert({
        where: { id: 1 },
        update: {},
        create: { name: "Bruna Hamori" }
    })
}

async function upsertCategoriesItens() {
    await client.categories.upsert({
        where: { id: 1 },
        update: {},
        create: { name: "Projeto" }
    });
    await client.categories.upsert({
        where: { id: 2 },
        update: {},
        create: { name: "Prática" }
    });
    await client.categories.upsert({
        where: { id: 3 },
        update: {},
        create: { name: "Recuperação" }
    });
}

async function upsertTermsItens() {
    await client.terms.upsert({
        where: { id: 1 },
        update: {},
        create: { number: 1 }
    });
    await client.terms.upsert({
        where: { id: 2 },
        update: {},
        create: { number: 2 }
    });
    await client.terms.upsert({
        where: { id: 3 },
        update: {},
        create: { number: 3 }
    });
    await client.terms.upsert({
        where: { id: 4 },
        update: {},
        create: { number: 4 }
    });
    await client.terms.upsert({
        where: { id: 5 },
        update: {},
        create: { number: 5 }
    });
    await client.terms.upsert({
        where: { id: 6 },
        update: {},
        create: { number: 6 }
    });
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(() => {
        client.$disconnect();
    })
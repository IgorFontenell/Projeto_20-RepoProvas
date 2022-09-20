# projeto20-RepoProvas
A Typescript designed project to manage previous testes between students

<p align="center">
  <img  src="https://thumbs.dreamstime.com/z/exame-dos-desenhos-animados-22162286.jpg" height="500px">
</p>
<h1 align="center">
  RepoProvas
</h1>
<div align="center">

  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/Prisma-316192?style=for-the-badge&logo=prisma&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" height="30px"/>
  <img src="https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white" height="30px"/>  
  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express.js&logoColor=white" height="30px"/>
  <!-- Badges source: https://dev.to/envoy_/150-badges-for-github-pnk -->
</div>

<br/>

# Description

Valex simulates an API that manages a benefit card, generally made available by companies to their employees.

</br>

## Features

-   Register
-   Login
-   Create cards
-   Activate / Block / Unlock a card
-   Recharge a card
-   Make card payments with online payment option

</br>

## API Reference

### Sign-Up

```http
POST /user/register
```

#### Request:

| Params               | Type      | Description           |
| :----------          | :-------- | :-------------------- |
| `email`              | `string` | **Required**. User email |
| `password`           | `string` | **Required**.  User password|
| `confirmPassword`    | `string` | **Required**.  Confirm password|

#

### Sign-In User

```http
POST /user/login
```

#### Request:

| Body        | Type     | Description                      |
| :-----------| :------- | :------------------------------- |
| `email`     | `string` | **Required**. User email         |
| `password`  | `string` | **Required**. User password      |

`Valid types: [groceries, restaurant, transport, education, health]`

#

</br>

#### Response:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsImlhdCI6MTY2MzQ3ODM4MH0.tGgIaowvK0Ha4S9cSTkkiWH3Zr-9P_GeUsnkE3_oTqw
```
`The token as string`

#

### Create an exam file

```http
POST /exams/add
```

#### Request:

| Headers         | Type     | Description           |
| :----------     | :------- | :-------------------- |
| `Authorization` | `string` | **Required**. Token   |

####

| Body             | Type     | Description                          |
| :--------------- | :------- | :------------------------------------|
| `name`           | `string` | **Required**. Title of the file      |
| `pdfUrl`         | `string` | **Required**. Link of the pdf        |
| `categorie`      | `string` | **Required**. Name of the categorie  |
| `discipline`     | `string` | **Required**. Name of the discipline |
| `teacher`        | `string` | **Required**. Name of the teacher    |

`pdfUrl: A link.`

`categorie: Only the ones created previously in the DB(Projeto / Prática / Recuperação).`

`discipline: Only the ones created previously in the DB (HTML e CSS / JavaScript / React / Humildade / Planejamento / Autoconfiança).`

`teacher: Only the ones created previously in the DB and they have to teach the discipline (Diego Pinho / Bruna Hamori).`


#

### Get exams by each term

```http
GET /examsByTerms
```

#### Request:

| Headers         | Type     | Description           |
| :----------     | :------- | :-------------------- |
| `Authorization` | `string` | **Required**. Token   |

#

### Get exams by each teacher

```http
GET /examsByTeachers
```

#### Request:

| Headers         | Type     | Description           |
| :----------     | :------- | :-------------------- |
| `Authorization` | `string` | **Required**. Token   |

#


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`

`PORT = number #recommended:5000`

`CRYPTR_SECRET= hashed word`

`JWT_SECRET= unhashed word`


</br>

## Run Locally

Clone the project

```bash
  git clone https://github.com/IgorFontenell/Projeto_20-RepoProvas
```

Go to the project directory

```bash
  cd projeto_20-RepoProvas/
```

Install dependencies

```bash
  npm install
```

Create database

```bash
  cd src/db/dbConfig
```
```bash
  bash ./create-database
```
```bash
  cd ../../..
```

Start the server

```bash
  npm run start
```

</br>

## Lessons Learned

In this project I trained the TypeScript way of coding with interfaces and Types, how to work with Prisma as ORM and trained the Layered Structure. I learned as well how to set an file of automatic tests for the API how to make a project following the Layered Architecture.

</br>

## Acknowledgements

-   [README Structure](https://github.com/andrezopo/projeto18-valex/blob/main/README.md)

- [Prisma Structure](https://github.com/CaioVitor1)

</br>

## Authors

-   Igor Fontenelle is a student at Driven Education putting a lot of effort into the programing world. He is looking for the transiction of the engineering world to be a Dev.
<br/>

#
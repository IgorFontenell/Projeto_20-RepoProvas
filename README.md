# projeto20-RepoProvas
A Typescript designed project to manage previous testes between students

<p align="center">
  <img  src="https://cdn.iconscout.com/icon/free/png-256/credit-card-2650080-2196542.png">
</p>
<h1 align="center">
  Valex
</h1>
<div align="center">

  <h3>Built With</h3>

  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" height="30px"/>
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

### Activate a card

```http
POST /cards/activate
```

#### Request:

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `number`         | `string`| **Required**. number of the card    |
| `password`       | `string` | **Required**. card password        |
| `securityCode`   | `string` | **Required**. card cvv             |

`Password length: 4`

`Password pattern: only numbers`

`Secutiry code  length: 3`

#

### Block a card

```http
POST /cards/block
```

#### Request:

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `number`         | `string`| **Required**. number of the card    |
| `password`       | `string` | **Required**. card password        |

#

### Unlock a card

```http
POST /cards/unblock
```

#### Request:

| Body             | Type     | Description                        |
| :--------------- | :------- | :--------------------------------- |
| `number`         | `string`| **Required**. number of the card    |
| `password`       | `string` | **Required**. card password        |

#

### Recharge a card

```http
POST /recharge
```

#### Request:

| Headers     | Type     | Description           |
| :---------- | :------- | :-------------------- |
| `x-api-key` | `string` | **Required**. api key |

####

| Body             | Type      | Description                        |
| :--------------- | :-------- | :--------------------------------- |
| `number`         | `string` | **Required**. number of the card    |
| `amount`         | `integer` | **Required**. recharge amount      |

#

### Card payments

```http
POST /buying
```
#### Request:

| Body             | Type      | Description                        |
| :--------------- | :-------- | :--------------------------------- |
| `number`         | `string`  | **Required**. number of the card   |
| `businessName`   | `string`  | **Required**. name of the business |
| `password`       | `string`  | **Required**. card password        |
| `amount`         | `integer` | **Required**. payment amount       |

`By the DB rules, the businessName is a unique string`

#


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL = postgres://UserName:Password@Hostname:5432/DatabaseName`

`PORT = number #recommended:5000`


</br>

## Run Locally

Clone the project

```bash
  git clone https://github.com/IgorFontenell/Projeto-18---Valex.git
```

Go to the project directory

```bash
  cd projeto18-valex/
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

In this project I learned a lot about how to structure an API with TypeScript as how to make a project following the Layered Architecture.

</br>

## Acknowledgements

-   [README Structure](https://github.com/andrezopo/projeto18-valex/blob/main/README.md)

</br>

## Authors

-   Igor Fontenelle is a student at Driven Education putting a lot of effort into the programing world. He is looking for the transiction of the engineering world to be a Dev.
<br/>

#
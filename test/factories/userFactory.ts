import {faker} from "@faker-js/faker"

export async function createBodyUser(){
    return {
        email: faker.internet.email(),
        password: "test1*",
        confirmPassword: "test1*"
    };

}
export async function passwordIncorret(){
    return {
        email: faker.internet.email(),
        password: "test1*",
        confirmPassword: "test1*"
    };

}

export interface IUser {
    email: string;
    password: string;
    confirmPassword: string;
}

export type TypeUserLogin = Omit<IUser, 'confirmPassword'>; 
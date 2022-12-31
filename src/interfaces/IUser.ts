export interface IUser {
    id?: number;
    name: string;
    password?: string;
    token?: string;
    avatar?: string;
    email?: string;
    permissions?: string[];
}
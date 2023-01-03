import { IUser } from "./IUser";

export interface IAuthContext {
    user: IUser | null;
    sign: (userName: string, password: string) => Promise<boolean>;
    signup: (name: string, email: string, password: string) => Promise<boolean>;
    sigout: () => void;
}

export interface IAuthProvider {
    children: JSX.Element
}

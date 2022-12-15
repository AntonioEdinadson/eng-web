import { useEffect, useState } from "react";
import { useAuthentication } from "../../hooks/useAPI";
import { IAuthProvider } from "../../interfaces/Auth";
import { IUser } from "../../interfaces/IUser";
import { AuthContext } from "./AuthContext";

export const AuthProvider = ({ children }: IAuthProvider) => {

    const [user, setUser] = useState<IUser | null>(null);

    useEffect(() => {
        validateToken();
    }, []);

    const validateToken = async () => {

        const storagetoken = localStorage.getItem('auth');

        if (!storagetoken) {
            console.log("storagetoken is empty");
            setUser(null);
            return;
        }

        const request = await useAuthentication.Validate(storagetoken);

        if (!request.user) {
            console.log("user is empty");
            setUser(null);
            return;
        }

        setUser({ 
            userName: request.user, 
            avatar: request.avatar,
            email: request.email,
            permissions: request.permissions
        });

        return true;

    };

    const sign = async (userName: string, password: string) => {

        const request = await useAuthentication.Login(userName, password);

        if (!request.token) {
            return false;
        }

        setToken(request.token);
        setUser({ userName: request.userName });

        return true;
    };

    const sigout = async () => {
        setUser(null);
        setToken('');
    };

    const setToken = async (token: string) => localStorage.setItem('auth', token);

    return (
        <AuthContext.Provider value={{ user, sign, sigout }}>
            {children}
        </AuthContext.Provider>
    );
};
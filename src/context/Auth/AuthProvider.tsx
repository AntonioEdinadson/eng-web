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

        try {

            const storagetoken = localStorage.getItem('token');

            if (!storagetoken) {
                console.log("storagetoken is empty");
                setUser(null);
                return;
            }

            const request = await useAuthentication.Validate();

            if (!request.user) {
                console.log("user is empty");
                setUser(null);
                return;
            }

            setUser({
                id: request.user.id,
                name: request.user.name,
                email: request.user.email,
                avatar: request.user.avatar,
                permissions: request.user.permissions
            });

            return true;

        } catch (error) {            
            console.log(error);
        } finally { }
    };

    const sign = async (email: string, password: string) => {

        const request = await useAuthentication.Login(email, password);        

        if (!request.user) {
            console.log("fpekpefgpk");
            sigout();
            return false
        };

        localStorage.setItem('user-config', JSON.stringify({
            id: request.user.id,
            name: request.user.name,
            email: request.user.email,
            avatar: request.user.avatar,
            permissions: request.user.permissions
        }));

        localStorage.setItem('token', request.user.token);

        setUser(request.user);
        return true;
    };

    const sigout = async () => {
        setUser(null);
        localStorage.setItem('token', '');
        localStorage.setItem('user-config', '');
    };

    return (
        <AuthContext.Provider value={{ user, sign, sigout }}>
            {children}
        </AuthContext.Provider>
    );
};
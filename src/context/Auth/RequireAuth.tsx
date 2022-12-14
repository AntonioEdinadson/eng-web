import { useContext } from "react";
import { IAuthProvider } from "../../interfaces/Auth";
import { Login } from "../../pages/Login";
import { AuthContext } from "./AuthContext";

export const RequireAuth = ({ children }: IAuthProvider) => {

    const auth = useContext(AuthContext);

    if (!auth.user) {
        return <Login />
    }

    return children;
}
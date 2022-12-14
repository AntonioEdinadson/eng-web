import { createContext } from "react";
import { IAuthContext } from "../../interfaces/Auth";

export const AuthContext = createContext<IAuthContext>({} as IAuthContext);
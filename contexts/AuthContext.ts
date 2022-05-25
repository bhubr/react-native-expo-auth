import { createContext } from "react";

export interface IUser {
  id: string;
  email: string;
}

interface IAuthContext {
  user: IUser | null;
  login: (jwt: string, user: IUser | null) => void;
  logout: () => void;
}

export default createContext<IAuthContext>({
  user: null,
  login: () => {
    /*  */
  },
  logout: () => {
    /*  */
  },
});

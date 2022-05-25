import { createContext } from "react";

export interface IUser {
  id: string;
  email: string;
}

interface IAuthContext {
  user: IUser | null;
  setUser: (user: IUser | null) => void;
}

export default createContext<IAuthContext>({
  user: null,
  setUser: () => {
    /*  */
  },
});

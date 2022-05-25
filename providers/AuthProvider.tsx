import { ReactNode, useEffect, useState } from "react";
// import jwtDecode from "jwt-decode";

import AuthContext, { IUser } from "../contexts/AuthContext";
import { clearJwt, retrieveJwt, storeJwt } from "../helpers/token-storage";
import { getUser } from "../helpers/api";

export default function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);

  const login = async (jwt: string, user: IUser | null) => {
    await storeJwt(jwt);
    setUser(user);
  };

  const logout = async () => {
    await clearJwt();
    setUser(null);
  };

  useEffect(() => {
    async function getJwtAndUser() {
      const jwt = await retrieveJwt();
      if (!jwt) {
        return;
      }
      // si on avait les infos dans le jwt on pourrait les recuperer
      // directement via jwtDecode, au lieu de faire une requete au back
      // const { _id } = jwtDecode(jwt);
      const user = await getUser(jwt);
      console.log(user);
      setUser({ id: user._id, email: user.email });
    }

    getJwtAndUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

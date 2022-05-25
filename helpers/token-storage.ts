import * as SecureStore from "expo-secure-store";

export const storeJwt = async (jwt: string) =>
  SecureStore.setItemAsync("jwt", jwt);

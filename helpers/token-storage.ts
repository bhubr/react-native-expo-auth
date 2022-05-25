import * as SecureStore from "expo-secure-store";

export const retrieveJwt = async () => SecureStore.getItemAsync("jwt");

export const storeJwt = async (jwt: string) =>
  SecureStore.setItemAsync("jwt", jwt);

export const clearJwt = async () => SecureStore.deleteItemAsync("jwt");

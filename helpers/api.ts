import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.1.35:5000/api",
});

interface ICredentials {
  email: string;
  password: string;
}

export const postSignup = (credentials: ICredentials) =>
  instance.post("/auth/signup", credentials).then(({ data }) => data);

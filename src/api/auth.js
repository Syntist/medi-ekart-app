import baseApi from "./base";

export const signIn = (data) => baseApi.post("/login", data);

export const verifyLogin = () => baseApi.get("/verifyLogin");

export const signUp = (data) => baseApi.post("/register", data);

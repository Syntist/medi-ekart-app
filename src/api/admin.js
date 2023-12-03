import baseApi from "./base";

export const getUsers = () => baseApi.get("/admin/users");

export const authorize = (username) =>
  baseApi.post("/admin/authorized/" + username);

export const unauthorize = (username) =>
  baseApi.post("/admin/unauthorized/" + username);

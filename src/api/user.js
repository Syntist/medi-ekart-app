import baseApi from "./base";

export const getMedicinesUser = () => baseApi("/medicines");

export const createOrder = (data) => baseApi.post("/order/create", data);

export const getOrdersUser = () => baseApi.get("/orders");

export const getUser = () => baseApi.get("/user");

export const updateUser = (data) => baseApi.post("/user/update", data);

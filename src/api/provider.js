import baseApi from "./base";

export const getMedicinesProvider = () => baseApi("/provider/medicines");
export const getMedicineProvider = (id) => baseApi("/provider/medicine/" + id);

export const createProduct = (data) =>
  baseApi.post("/provider/createMedicine", data);

export const updateProduct = (data) =>
  baseApi.post("/provider/updateMedicine/" + data._id, data);

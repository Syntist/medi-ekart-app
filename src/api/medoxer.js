import baseApi from "./base";

export const getMedicinesMedoxer = () => baseApi("/medoxer/medicines");

export const approveMedicine = (id) =>
  baseApi.post("/medoxer/approveMedicine/" + id);

export const unapproveMedicine = (id) =>
  baseApi.post("/medoxer/rejectMedicine/" + id);

export const getOrdersMedoxer = () => baseApi("/medoxer/orders");

export const approveOrder = (id) => baseApi.post("/medoxer/approveOrder/" + id);

export const rejectOrder = (id) => baseApi.post("/medoxer/rejectOrder/" + id);

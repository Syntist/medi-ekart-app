import React from "react";
import { Route, Routes } from "react-router-dom";
import { Home } from "../Pages/Home";
import Header from "../component/Header";
import { Admin } from "../Pages/Admin";
import { Provider } from "../Pages/Provider";
import { CreateProduct } from "../Pages/Provider/CreateProduct";
import { UpdateProduct } from "../Pages/Provider/UpdateProduct";
import {
  MedicineDashboard,
} from "../Pages/Medoxer.jsx/MedicineDashboard/index.jsx";
import { OrderDashboard } from "../Pages/Medoxer.jsx/OrderDashboard/index.jsx";

export const AuthorizedRoutes = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/provider/medicines" element={<Provider />} />
        <Route path="/provider/create" element={<CreateProduct />} />
        <Route path="/provider/edit/:id" element={<UpdateProduct />} />
        <Route path="/medoxer/medicines" element={<MedicineDashboard />} />
        <Route path="/medoxer/orders" element={<OrderDashboard />} />
      </Routes>
    </>
  );
};

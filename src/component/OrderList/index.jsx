import React from "react";
import { Grid } from "@mui/material";
import OrderCard from "./OrderCard"; // Make sure to import the OrderCard component

const OrderList = ({ orders, refetch }) => {
  return (
    <Grid p={3} container spacing={2}>
      {orders.map((order) => (
        <OrderCard key={order._id} order={order} refetch={refetch} />
      ))}
    </Grid>
  );
};

export default OrderList;

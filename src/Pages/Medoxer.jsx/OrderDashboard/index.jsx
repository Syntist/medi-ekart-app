import React, { useEffect, useState } from "react";
import { getOrdersMedoxer } from "../../../api/medoxer";
import OrderList from "../../../component/OrderList";

export const OrderDashboard = () => {
  const [refetch, setRefetch] = useState();
  const [orders, setOrders] = useState();

  useEffect(() => {
    getOrdersMedoxer()
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, [refetch]);

  if (orders) return <OrderList orders={orders} refetch={setRefetch} />;
};

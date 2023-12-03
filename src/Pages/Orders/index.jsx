import React, { useEffect, useState } from "react";
import { getOrdersUser } from "../../api/user";
import OrderList from "../../component/OrderList";

export const Orders = () => {
  const [orders, setOrders] = useState();

  useEffect(() => {
    getOrdersUser()
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (orders) return <OrderList orders={orders} />;
};

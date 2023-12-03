import React, { useEffect, useState } from "react";
import ProductGrid from "../../component/ProductGrid";
import { getMedicinesProvider } from "../../api/provider";

export const Provider = () => {
  const [medicines, setMedicines] = useState();

  useEffect(() => {
    getMedicinesProvider()
      .then((res) => setMedicines(res.data))
      .catch((err) => console.log(err));
  }, []);

  return <ProductGrid products={medicines} />;
};

import React, { useEffect, useState } from "react";
import ProductGrid from "../../../component/ProductGrid";
import { getMedicinesMedoxer } from "../../../api/medoxer";

export const MedicineDashboard = () => {
  const [refetch, setRefetch] = useState();
  const [medicines, setMedicines] = useState();

  useEffect(() => {
    getMedicinesMedoxer()
      .then((res) => setMedicines(res.data))
      .catch((err) => console.log(err));
  }, [refetch]);

  return <ProductGrid products={medicines} refetch={setRefetch} />;
};

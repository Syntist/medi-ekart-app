import React, { useEffect, useState } from "react";
import ProductForm from "../../../component/ProductForm";
import { uploadImage } from "../../../utils/cloudinary";
import {
  getMedicineProvider,
  updateProduct,
} from "../../../api/provider";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const UpdateProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [medicine, setMedicine] = useState();

  const onSubmit = async (data) => {
    let imageUrl = data.imageUrl;
    if (typeof data.imageUrl === "object") {
      imageUrl = await uploadImage(data.imageUrl);
    }

    updateProduct({ ...data, imageUrl })
      .then((res) => {
        toast.success(`Product Updated: ${res.data.name}`);
        navigate("/provider/medicines");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMedicineProvider(id)
      .then((res) => setMedicine(res.data))
      .catch((err) => console.log(err));
  }, []);

  if (medicine)
    return <ProductForm onSubmit={onSubmit} initialValue={medicine} />;
};

import React from "react";
import ProductForm from "../../../component/ProductForm";
import { uploadImage } from "../../../utils/cloudinary";
import { createProduct } from "../../../api/provider";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const CreateProduct = () => {
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    let imageUrl = data.imageUrl;
    if (typeof data.imageUrl === "object") {
      imageUrl = await uploadImage(data.imageUrl);
    }

    createProduct({ ...data, imageUrl })
      .then((res) => {
				toast.success(`Product Created: ${res.data.name}`)
				navigate("/provider/medicines")
			})
      .catch((err) => console.log(err));
  };
  return <ProductForm onSubmit={onSubmit} />;
};

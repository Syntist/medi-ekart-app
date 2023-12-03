import axios from "axios";

const cloudName = "ddudg5a3r"; // Replace with your Cloudinary cloud name
const unsignedUploadPreset = "ruip4bhw"; // Replace with your Cloudinary unsigned upload preset

export const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", unsignedUploadPreset);

  try {
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      formData
    );

    return response.data.secure_url;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    throw error;
  }
};

// const url = `https://api.cloudinary.com/v1_1/${process.env.CLOUD_NAME}/image/upload`;
// cloundinary url's cloud name getting it from env

const url = `https://api.cloudinary.com/v1_1/dootbczgt/image/upload`

const uploadImage = async (image) => {
  const formData = new FormData();
  formData.append("file", image);
  formData.append("upload_preset", "mern_product");

  const dataResponse = await fetch(url, {
    method: "post",
    body: formData,
  });
  return dataResponse.json();
};

export default uploadImage;

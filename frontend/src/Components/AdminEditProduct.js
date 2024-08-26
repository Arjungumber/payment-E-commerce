import React, { useState } from "react";
import { CgClose } from "react-icons/cg";
import productCategory from "../helpers/productCategory";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../helpers/uploadImage";
import DisplayImage from "./DisplayImage";
import { MdDelete } from "react-icons/md";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const AdminEditProduct = ({ productData,onClose ,fetchData}) => {
  // loading of previously filled fields, so that it looks good for editing(Professional)
  const [data, setData] = useState({
    ...productData, // this is for getting the id of product
    productName: productData?.productName,
    brandName: productData?.brandName,
    category: productData?.category,
    productImage: productData?.productImage || [],
    description: productData?.description,
    price: productData?.price,
    sellingPrice: productData?.sellingPrice,
  });

  const [uploadProductImageInput, setUploadProductImageInput] = useState("");

  // this is for setting the image url so that we can display it full for preview
  const [fullScreenImage, setFullScreenImage] = useState("");

  // this is for displaying full image and setting it onClose
  const [openFullScreenImage, setOpenFullScreenImage] = useState(false);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    setUploadProductImageInput(file.name);
    // console.log("file", file);
    const uploadImageCloudinary = await uploadImage(file);
    setData((prev) => {
      return {
        ...prev,
        productImage: [...prev.productImage, uploadImageCloudinary.url],
      };
    });
  };

  const handleDelete = async (index) => {
    const newProductImage = [...data.productImage];
    newProductImage.splice(index, 1); // deleting the particular image with this index count - 1
    setData((prev) => {
      return {
        ...prev,
        productImage: [...newProductImage],
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataResponse = await fetch(SummaryApi.updateProduct.url, {
      method: SummaryApi.updateProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const responseData = await dataResponse.json();
    if (responseData.success) {
      toast.success(responseData?.message);
      onClose();
      fetchData()
    }
    if (responseData.error) {
      toast.error(responseData.message);
    }
  };

  return (
    <div className="fixed w-full bg-slate-200 bg-opacity-35 h-full top-0 left-0 bottom-0 right-0 flex justify-center items-center">
      <div className="bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden">
        <div className="flex justify-between items-center pb-3">
          <h2 className="font-bold text-lg"> Edit Product</h2>
          <div
            className="w-fit ml-auto text-2xl hover:cursor-pointer hover:text-red-600"
            onClick={onClose}
          >
            <CgClose />
          </div>
        </div>
        <form
          className="grid p-4 gap-2 overflow-y-scroll h-full pb-5"
          onSubmit={handleSubmit}
        >
          <label htmlFor="productName">Product Name:</label>
          <input
            className="p-2 bg-slate-100 border rounded"
            type="text"
            name="productName"
            id="productName"
            placeholder="enter product name"
            value={data.productName}
            onChange={handleOnChange}
            required
          />
          <label htmlFor="brandName" className="mt-3">
            Brand Name:
          </label>
          <input
            className="p-2 bg-slate-100 border rounded"
            type="text"
            id="brandName"
            name="brandName"
            placeholder="enter brand name"
            value={data.brandName}
            onChange={handleOnChange}
            required
          />
          <label htmlFor="category" className="mt-3">
            Category:
          </label>
          <select
            name="category"
            value={data.category}
            className="p-2 bg-slate-100 border rounded"
            onChange={handleOnChange}
            required
          >
            <option value={""}>Select Category</option>
            {productCategory.map((ele, index) => {
              return (
                <option value={ele.value} key={ele.value + index}>
                  {ele.label}
                </option>
              );
            })}
          </select>
          <label htmlFor="productImage" className="mt-3">
            Product Image:
          </label>
          <label htmlFor="uploadImageInput">
            <div className="p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer">
              <div className="text-slate-500 flex justify-center items-center flex-col gap-2">
                {/* flex-col we've given so that they come in a different row and the flex works in column wise parallely */}
                <span className="text-4xl">
                  {" "}
                  <FaCloudUploadAlt />{" "}
                </span>
                <p className="text-sm">Upload Product Image</p>
                {uploadProductImageInput && <p>{uploadProductImageInput}</p>}
                <input
                  type="file"
                  id="uploadImageInput"
                  className="hidden"
                  onChange={handleUpload}
                />
                {/* class hidden becz vo input box nhi dikhaenge work properly krega vo */}
              </div>
            </div>
          </label>
          <div>
            {data?.productImage[0] ? (
              <div className="flex items-center gap-2 ">
                {data.productImage.map((el, index) => {
                  return (
                    <div className="relative group">
                      <img
                        src={el}
                        alt={el}
                        width={80}
                        height={80}
                        className="bg-slate-100 border cursor-pointer"
                        onClick={() => {
                          setOpenFullScreenImage(true);
                          setFullScreenImage(el);
                        }}
                      />
                      <div
                        onClick={() => handleDelete(index)}
                        className="cursor-pointer absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block"
                      >
                        <MdDelete />
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-red-600 text-xs">*Upload Product Image</p>
            )}
          </div>

          <label htmlFor="price" className="mt-3">
            Price:
          </label>
          <input
            className="p-2 bg-slate-100 border rounded"
            type="number"
            id="price"
            name="price"
            placeholder="enter price"
            value={data.price}
            onChange={handleOnChange}
            // for an input the name and value needs to be same
            required
          />
          <label htmlFor="sellingPrice" className="mt-3">
            Selling Price:
          </label>
          <input
            className="p-2 bg-slate-100 border rounded"
            type="number"
            id="sellingPrice"
            name="sellingPrice"
            placeholder="enter selling price"
            value={data.sellingPrice}
            onChange={handleOnChange}
            required
          />
          <label htmlFor="description" className="mt-3">
            Description:
          </label>
          <textarea
            className=" h-28 p-1 bg-slate-100 border resize-none"
            name="description"
            value={data.description}
            onChange={handleOnChange}
            placeholder="enter product description"
            rows={3}
          ></textarea>

          <button className="px-2 py-2 bg-red-600 text-white mb-10 hover:bg-red-700 ">
            Update Product
          </button>
        </form>
      </div>

      {/* display image full screen */}
      {openFullScreenImage && (
        <DisplayImage
          onClose={() => setOpenFullScreenImage(false)}
          imageUrl={fullScreenImage}
        />
      )}
    </div>
  );
};

export default AdminEditProduct;

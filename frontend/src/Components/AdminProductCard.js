import React, { useState } from "react";
import { MdModeEditOutline } from "react-icons/md";
import AdminEditProduct from "./AdminEditProduct";
import displayINR from "../helpers/displayCurrency";

const AdminProductCard = ({ data, fetchData }) => {
  const [editProduct, setEditProduct] = useState(false);

  return (
    <div className="bg-white p-4 rounded">
      <div className="w-40 ">
        <div className=" w-32 h-32 justify-center items-center">
          <img
            src={data?.productImage[0]}
            alt={data.productName + "image"}
            className=" mx-auto object-fill h-full"
          />
        </div>
        <h1 className="text-ellipsis line-clamp-2">{data.productName}</h1>
        {/* line clap2 means if the name of product exceeds 2 line it will show in .... form from line 2 */}
        <div>
          <p className="font-semibold">{displayINR(data?.sellingPrice)}</p>
          <div
            className="w-fit ml-auto p-2 cursor-pointer bg-green-100 hover:bg-green-600 rounded-full hover:text-white"
            onClick={() => setEditProduct(true)} // it is crucial to give in a callback form everytime everywhere, other wise it'll throw an error of infinite reders
          >
            <MdModeEditOutline />
          </div>
        </div>
      </div>
      {editProduct && (
        <AdminEditProduct
          productData={data}
          onClose={() => setEditProduct(false)}
          fetchData={fetchData}
        />
      )}
    </div>
  );
};

export default AdminProductCard;

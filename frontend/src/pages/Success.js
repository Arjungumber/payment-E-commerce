import React from "react";
import success from "../assest/assest/success.gif";
import {Link} from "react-router-dom";

const Success = () => {
  return (
    <div className="bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded">
      <img src={success}  alt="" />
      <p className="text-green-600 font-bold text-lg">Payment Success</p>
    <Link to={'/orders'} className="p-2 mt-5 px-3 border-2 border-green-600 rounded font-semibold text-green-600 hover:bg-green-600 hover:text-white">See Order</Link>
    </div>
  )
};

export default Success;

import React from 'react';
import cancel from "../assest/assest/cancel.gif";
import {Link} from "react-router-dom";

const Cancel = () => {
  return (
    <div className="bg-slate-200 w-full max-w-md mx-auto flex justify-center items-center flex-col p-4 m-2 rounded">
    <img src={cancel}  alt="" className='mix-blend-multiply' />
    <p className="text-red-600 font-bold text-lg">Payment Abort</p>
  <Link to={'/cart'} className="p-2 mt-5 px-3 border-2 border-red-600 rounded font-semibold text-red-600 hover:bg-red-600 hover:text-white">Try Again</Link>
  </div>
  )
}

export default Cancel
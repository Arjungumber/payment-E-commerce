import React, { useContext, useEffect, useState } from "react";
import SummaryApi from "../common";
import Context from "../context";
import displayINR from "../helpers/displayCurrency";
import { MdDelete } from "react-icons/md";
import {loadStripe} from "@stripe/stripe-js";

const Cart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const context = useContext(Context);
  const loadingCart = new Array(context?.cartProductCount).fill(null);

  const fetchData = async () => {
    const response = await fetch(SummaryApi.addToCartProductView.url, {
      method: SummaryApi.addToCartProductView.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
    });
    const responseData = await response.json();
    if (responseData.success) {
      setData(responseData.data);
    }
  };

  const handleLoading = async () => {
    setLoading(true);
    await fetchData();
    setLoading(false);
  };

  // ye do useEffect isliye banane pade becz everytime, whether we were dec the quantity or increasing we were fetching the data and earlier we were setting loading in
  // fetchData, but now we are setting the loading in handleLoading() where we are fetching data as well, so first we enter the cart handleloading will be called
  // loading will be shown and data will be fetched so only single loading, but as we dec or inc quantity, we are just fetching data, an dnot setting loading, it will
  // not show the refreshing effect.

  useEffect(() => {
    handleLoading();
  }, []);

  const increaseQuantity = async (id, qty) => {
    const response = await fetch(SummaryApi.updateCartProduct.url, {
      method: SummaryApi.updateCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
        quantity: qty + 1,
      }),
    });
    const responseData = await response.json();
    if (responseData.success) {
      fetchData();
      // isko call krke update ho jaega na page re render
    }
  };
  const decreaseQuantity = async (id, qty) => {
    if (qty >= 2) {
      const response = await fetch(SummaryApi.updateCartProduct.url, {
        method: SummaryApi.updateCartProduct.method,
        credentials: "include",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          _id: id,
          quantity: qty - 1,
        }),
      });
      const responseData = await response.json();
      if (responseData.success) {
        fetchData();
        // isko call krke update ho jaega na page re render
      }
    }
  };

  const deleteCartProduct = async (id) => {
    const response = await fetch(SummaryApi.deleteCartProduct.url, {
      method: SummaryApi.deleteCartProduct.method,
      credentials: "include",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        _id: id,
      }),
    });
    const responseData = await response.json();
    if (responseData.success) {
      await fetchData();
      context.fetchUserAddToCartCount();
    }
  };
  const totalQty = data.reduce(
    (previous, current) => previous + current.quantity,
    0
  );

  const toatlPrice = data.reduce(
    (previous, current) =>
      previous + current?.quantity * current?.productId?.sellingPrice,
    0
  );

  const handleCheckout = async(e) => {
    // e.preventDefault();
   // console.log(process.env.REACT_APP_PUBLIC_KEY_STRIPE);
    const stripePromise = await loadStripe(process.env.REACT_APP_PUBLIC_KEY_STRIPE);
    const response = await fetch(SummaryApi.payment.url, {
      method: SummaryApi.payment.method,
      credentials:'include',
      headers :{
        "content-type":"application/json"
      },
      body:JSON.stringify({
        cartItems : data
      })
    });
  
    // console.log("response",response);

  const responseData = await response.json();

  if(responseData?.id){
    stripePromise.redirectToCheckout({sessionId : responseData.id});
  }
  // console.log("payment response",responseData);
  };

  return (
    <div className="container mx-auto">
      <div className="text-center text-lg my-3">
        {data.length === 0 && !loading && (
          <p className="bg-white py-5">No Item added</p>
        )}
      </div>
      <div className="flex flex-col lg:flex-row gap-10 lg:justify-between p-4">
        {/* view product */}
        <div className="w-full max-w-3xl">
          {loading
            ? loadingCart.map((el, index) => {
                return (
                  <div
                    key={el + "ADD TO CART LOADING" + index}
                    className="w-full bg-slate-200 h-32 my-2 border border-slate-300 animate-pulse rounded"
                  ></div>
                );
              })
            : data.map((product, index) => {
                return (
                  <div
                    key={product?._id + "ADD TO CART"}
                    className="w-full bg-white h-32 my-2 border border-slate-300 rounded grid grid-cols-[128px,1fr]"
                  >
                    <div className="w-32 h-32 bg-slate-200">
                      <img
                        src={product?.productId?.productImage[0]}
                        className="w-full h-full object-scale-down mix-blend-multiply"
                        alt=""
                      />
                    </div>
                    <div className="px-4 py-2 relative">
                      {/* delete product */}
                      <div
                        onClick={() => deleteCartProduct(product?._id)}
                        className="absolute right-0 text-red-600 rounded-full p-2 hover:bg-red-600 hover:text-white cursor-pointer"
                      >
                        <MdDelete />
                      </div>
                      <h2 className="text-lg lg:text-xl text-ellipsis line-clamp-1">
                        {product?.productId?.productName}
                      </h2>
                      <p className="capitalize text-slate-500 ">
                        {product?.productId?.category}
                      </p>
                      <div className="flex items-center justify-between">
                        <p className="text-red-600 font-medium text-lg">
                          {displayINR(product?.productId?.sellingPrice)}
                        </p>
                        <p className="text-slate-600 font-semibold text-lg">
                          {displayINR(
                            product?.productId?.sellingPrice * product?.quantity
                          )}
                        </p>
                      </div>
                      <div className="flex items-center gap-3 mt-1">
                        <button
                          className="border border-red-600 text-red-600 w-6 h-6 flex justify-center items-center rounded hover:bg-red-600 hover:text-white"
                          onClick={() =>
                            decreaseQuantity(product?._id, product?.quantity)
                          }
                        >
                          -
                        </button>
                        <span>{product?.quantity}</span>
                        <button
                          className="border border-red-600 text-red-600 w-6 h-6 flex justify-center items-center rounded hover:bg-red-600 hover:text-white"
                          onClick={() =>
                            increaseQuantity(product?._id, product?.quantity)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
        </div>
        {/* summary product */}
        {
          // summary or checkout section will be shown only when there is dome data to be bought
          data[0] && (
            <div className="mt-5 lg:mt-0 w-full max-w-sm">
              {loading ? (
                <div className="h-36 bg-slate-200 border border-slate-300 animate-pulse"></div>
              ) : (
                <div className="h-36 bg-white">
                  <h2 className="text-white bg-red-600 px-4 py-1">Summary</h2>
                  <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                    <p>Quantity</p>
                    <p>{totalQty}</p>
                  </div>
                  <div className="flex items-center justify-between px-4 gap-2 font-medium text-lg text-slate-600">
                    <p>Total Price</p>
                    <p>{displayINR(toatlPrice)}</p>
                  </div>
                  <button
                    className="bg-blue-600 p-2  text-white w-full"
                    onClick={handleCheckout}
                  >
                    Checkout
                  </button>
                </div>
              )}
            </div>
          )
        }
      </div>
    </div>
  );
};

export default Cart;

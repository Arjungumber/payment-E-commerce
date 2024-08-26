import { Outlet } from "react-router-dom";
import "./App.css";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import SummaryApi from "./common";
import Context from "./context";
import { useDispatch } from "react-redux";
import { SetUserDetails } from "./store/userSlice";

function App() {
  const dispatch = useDispatch();
  const [cartProductCount,setCartProductCount] = useState(0);
  
  const fetchUserDetails = async () => {
    const dataResponse = await fetch(SummaryApi.current_user.url, {
      method: SummaryApi.current_user.method,
      credentials: "include", // this will help in taking the cookie token and sent to backend
    });
    const dataApi = await dataResponse.json();
    if (dataApi.success) {
      dispatch(SetUserDetails(dataApi.data));
    }
  };
  
  const fetchUserAddToCartCount = async() =>{
 const response = await fetch(SummaryApi.addToCartProductCount.url,{
  method: SummaryApi.addToCartProductCount.method,
  credentials:"include"
 })
  const responseData = await response.json();
  console.log(responseData);
   setCartProductCount(responseData.data?.count);
  }

  useEffect(() => {
    //  user Details
    fetchUserDetails();
    // count of cart product of a user
    fetchUserAddToCartCount();
  }, []);

  return (
    <>
      <Context.Provider
        value={{
          fetchUserDetails, // user details fetch context ke through isse pass krenge
          cartProductCount, // current user's cart product count
          fetchUserAddToCartCount
        }}
      >
        <ToastContainer position="top-center" />
        <Header/>
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
          {/* this outlet will help in rendering all the children routes of app in index.js of routes */}
        </main>
        <Footer />
      </Context.Provider>
    </>
  );
}

export default App;

import React, { useContext, useState } from "react";
import loginIcon from "../assest/assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import Context from "../context";
const Login = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [data,setData] = useState({
    email:"",
    password:""
  });
  const handleOnChange=(e)=>{
   const {name,value} = e.target;
   setData((preve)=>{
    return{
      ...preve,
      [name]:value
    }
   })
  }
  const navigate = useNavigate();
  const {fetchUserDetails,fetchUserAddToCartCount} = useContext(Context); // getting that api call here through context provider
// also getting the no of products a user has in the cart
  const handleSubmit= async(e)=>{
   e.preventDefault();
   const dataResponse = await fetch(SummaryApi.signIn.url,{
    method:SummaryApi.signIn.method,
    credentials:'include',
    headers:{
      "content-type":"application/json"
    },
    body:JSON.stringify(data)
   })
   const response = await dataResponse.json();
   if(response.success){
    toast.success(response.message);
     navigate('/');
      // here as the user logged in successfully we would like to call fetchuserDetails which we were passing through context
      fetchUserDetails();
      fetchUserAddToCartCount();
   }
   if(response.error){
    toast.error(response.message);
   }
  }
  console.log("data login", data);

  return (
    <section id="login">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 py-5 w-full max-w-md mx-auto ">
          <div className="w-20 h-20 mx-auto">
            <img src={loginIcon} alt="Login icon" />
          </div>
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label htmlFor="Email">Email:</label>
              <div className="bg-slate-100 p-2">
                {" "}
                <input
                  type="email"
                  placeholder="enter email"
                  className="w-full h-full  outline-none bg-transparent"
                  name="email"
                  value={data.email}
                  onChange={handleOnChange}
                />
              </div>
            </div>
            <div>
              <label htmlFor="Password">Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="enter password"
                  className="w-full h-full  outline-none bg-transparent"
                  name="password"
                  value={data.password}
                  onChange={handleOnChange}
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setshowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
              <Link
                to={"/forgot-password"}
                className="block w-fit ml-auto hover:underline hover:text-red-600"
              >
                Forgot Password ?
              </Link>
            </div>
            {/* hover scale means it will scale(zoom) the element on hover with transition means it will slowly does the work looks
               like animated */}
            <button className="bg-red-600 hover:bg-red-800 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              Login
            </button>
          </form>
          <p className="my-5">
            Don't have an account ? <Link className="text-red-600  hover:text-red-700 hover:underline" to={"/sign-up"}>Sign up</Link>{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;

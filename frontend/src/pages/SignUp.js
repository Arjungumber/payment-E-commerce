import React from "react";
import { useState } from "react";
import loginIcon from "../assest/assest/signin.gif";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import imageTobase64 from "../helpers/imageTobase64";
import SummaryApi from "../common";
import { toast } from "react-toastify";

const SignUp = () => {
  const [showPassword, setshowPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profileImage: "",
  });
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((preve) => {
      return {
        ...preve,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password === data.confirmPassword) {
      const dataResponse = await fetch(SummaryApi.signUP.url, {
        method: SummaryApi.signUP.method,
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await dataResponse.json();
      if (response.success) {
        toast.success(response.message);
        navigate("/login"); // if signup is success user will be nvigated to login page
      }
      if (response.error) {
        toast.error(response.message);
      }
    } else {
      toast.error("Please Check your password and confirm password");
    }
  };

  const handleUploadPic = async (e) => {
    const file = e.target.files[0];
    const image = await imageTobase64(file);
    // console.log("Image",image);
    setData((preve) => {
      return {
        ...preve,
        profileImage: image,
      };
    });
  };

  return (
    <section id="Signup">
      <div className="mx-auto container p-4">
        <div className="bg-white p-5 py-5 w-full max-w-sm mx-auto">
          <div className="w-20 h-20 mx-auto relative overflow-hidden rounded-full ">
            <div>
              {/* display picture if available otherwise the login icon only */}
              <img src={data.profileImage || loginIcon} alt="Login icon" />
            </div>
            <form>
              <label>
                <div className="text-xs bg-opcaity-80 bg-slate-200 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full">
                  Upload Profile
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleUploadPic}
                />
              </label>
            </form>
          </div>
          {/* flex-col defines the direction of flex, gap between nme email password and confirm pass */}
          <form className="pt-6 flex flex-col gap-2" onSubmit={handleSubmit}>
            <div className="grid">
              <label htmlFor="text">Name:</label>
              <div className="bg-slate-100 p-2">
                {" "}
                <input
                  type="name"
                  placeholder="enter your name"
                  className="w-full h-full  outline-none bg-transparent"
                  name="name"
                  value={data.name}
                  onChange={handleOnChange}
                  required
                />
              </div>
            </div>
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
                  required
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
                  required
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setshowPassword((preve) => !preve)}
                >
                  <span>{showPassword ? <FaEyeSlash /> : <FaEye />}</span>
                </div>
              </div>
            </div>
            <div>
              <label htmlFor="Password">Confirm Password:</label>
              <div className="bg-slate-100 p-2 flex">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="enter confirm password"
                  className="w-full h-full  outline-none bg-transparent"
                  name="confirmPassword"
                  value={data.confirmPassword}
                  onChange={handleOnChange}
                  required
                />
                <div
                  className="cursor-pointer text-xl"
                  onClick={() => setshowConfirmPassword((preve) => !preve)}
                >
                  <span>
                    {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>
              </div>
            </div>
            {/* hover scale means it will scale(zoom) the element on hover with transition means it will slowly does the work looks
               like animated */}
            <button className="bg-red-600 hover:bg-red-800 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6">
              SignUp
            </button>
          </form>
          <p className="my-5">
            Already have account ?{" "}
            <Link
              className="text-red-600  hover:text-red-700 hover:underline"
              to={"/login"}
            >
              Login
            </Link>{" "}
          </p>
        </div>
      </div>
    </section>
  );
};

export default SignUp;

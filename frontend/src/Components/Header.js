import React, { useContext } from "react";
import Logo from "./Logo";
import { FaSearch } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { SetUserDetails } from "../store/userSlice";
import { useState } from "react";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  // coming with the help o redux
  const user = useSelector(state => state?.user?.user);
   console.log("user header", user);
  const dispatch = useDispatch(); // as we logout we need to clear details from the redux store
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const urlSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = urlSearch.getAll("q")
  const [search , setSearch] = useState(searchQuery);
// it will get us the searched value

 const [menuDisplay, setmenuDisplay] = useState(false);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();
    if (data.success) {
      toast.success(data.message);
      dispatch(SetUserDetails(null));
      navigate("/");
    }
    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);
    if (value) {
      navigate(`/search?q=${value}`);
    }  else{
      navigate("/search")
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-10">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        <div className="ml-10">
          <Link to={"/"}>
            <Logo w={90} h={50} />
          </Link>
        </div>
        {/* class hidden in below div will keep the search tab hidden but when we come in large display(1024px minwidth) it will work fine */}
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-md pl-2">
          <input
            type="text"
            placeholder="search product here...."
            className="w-full outline-none"
            
            value={search}
            onChange={handleSearch}
          />
          <div className="text-lg min-w-[50px] bg-red-600 h-8 flex items-center justify-center rounded-r-full text-white">
            <FaSearch />
          </div>
        </div>

        <div className="flex items-center gap-7 mr-7">
          <div className="relative flex justify-center ">
            {
              // if the user login is not done, there's no need to show the profile Icon
              user?._id && (
                <div
                  className="text-3xl cursor-pointer flex relative justify-center"
                  onClick={() => setmenuDisplay((prev) => !prev)}
                >
                  {user?.profileImage ? (
                    <img
                      src={user?.profileImage}
                      className="w-10 h-10 rounded-full"
                      alt={user?.name}
                    />
                  ) : (
                    <FaRegCircleUser />
                  )}
                </div>
              )
            }

            {menuDisplay && (
              <div className=" absolute bg-white bottom-0 top-11 h-fit shadow-lg p-2 rounded">
                <nav>
                  {/* this class whitespace nowrap helps to get the admin and panel in a single line unlike earlier it was coming on diff line(ugly) */}
                  {/* newlines and the spaces will be collapsed */}
                  {/* when we'r on the mid size dusplay then only the admin panel button will be displayed */}

                  {user?.role === ROLE.ADMIN && ( // when the user is admin then only admin panel link would be visible
                    <Link
                      to={"admin-panel/all-products"}
                      className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-3"
                      onClick={() => setmenuDisplay((prev) => !prev)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <Link to={"/orders"} className="whitespace-nowrap hidden md:block hover:bg-slate-100 p-3" onClick={() => setmenuDisplay((prev) => !prev)}>Your Orders</Link>
                </nav>
              </div>
            )}
          </div>
          {user?._id && (
            <Link to={"/cart"} className="text-2xl cursor-pointer relative">
              <span>
                {" "}
                <FaShoppingCart />
              </span>
              <div className="bg-red-600 text-white w-5 p-1 h-5 rounded-full flex items-center justify-center absolute  -top-2 -right-3">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}
          <div>
            {user?._id ? ( // if we hve the user id means the user is logged in
              <button
                onClick={handleLogout}
                className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700"
              >
                Logout
              </button>
            ) : (
              <Link to={"/login"}>
                <button className="px-3 py-1 rounded-full text-white bg-red-600 hover:bg-red-700">
                  Login
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

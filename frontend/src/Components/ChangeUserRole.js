import React, { useState } from "react";
import ROLE from "../common/role";
import { IoMdClose } from "react-icons/io";
import SummaryApi from "../common";
import { toast } from "react-toastify";
 
const ChangeUserRole = ({ name, email, role, userId,onClose,callFunc }) => {
  const [userRole, setUserRole] = useState(role);

  const handleOnChange = (e) => {
    setUserRole(e.target.value);
    console.log(e.target.value);
  };

  const updateUserRole = async () => {
    const fetchData = await fetch(SummaryApi.updateUser.url, {
      method: SummaryApi.updateUser.method,
      credentials: 'include',
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify( {
      userId:userId,
        role: userRole,
      } ),
    });
    const dataResponse = await fetchData.json();

    if(dataResponse.success){
      toast.success(dataResponse.message);
      onClose();
      callFunc(); // to get the refreshed data of all users to show the new edited role of a user.
    }
    if(dataResponse.error){
      console.log(dataResponse.error);
    }
    console.log("Updated User", dataResponse);
  };

  return (
    <div className="fixed top-0 left-0 bottom-0  right-0 w-full h-full z-10 flex justify-center items-center bg-slate-200 bg-opacity-50  ">
      <div className="mx-auto bg-white shadow-md p-4 w-full max-w-sm">
        <button className="block ml-auto" onClick={ onClose }>
          <IoMdClose />
        </button>
        <h1 className="pb-4 text-lg font-medium">Change User Role</h1>
        <p>Name : {name}</p>
        <p>Email:{email}</p>
        <div className="flex items-center justify-between my-4">
          <p>Role : </p>
          <select
            className="border px-4 py-1"
            value={userRole}
            onChange={handleOnChange}
          >
            {
              // object.values return Role object as an array which then can be mapped, which we've done
              Object.values(ROLE).map((el) => {
                return (
                  <option value={el} key={el}>
                    {el}
                  </option>
                );
              })
            }
          </select>
        </div>
        <button
          className="w-fit mx-auto block py-1 px-3 rounded-full bg-red-600 text-white hover:bg-red-700"
          onClick={updateUserRole}
        >
          Change Role
        </button>
      </div>
    </div>
  );
};

export default ChangeUserRole;

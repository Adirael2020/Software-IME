"use client"

//Redux
import { useSelector } from "react-redux";

//Components
import LoginUser from "./components/LoginUser.jsx";
import LoginStuden from "./components/LoginStuden.jsx";

const login = () => {

  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <div className=" bg-zinc-800 rounded-sm text-white p-10">
        <div className="flex items-center justify-center">
          <label htmlFor="login">Login</label>
        </div>
        <div className="flex ">
          <div className="">
            <LoginUser />
          </div>
          <div className="">
            <LoginStuden />
          </div>
        </div>
      </div>
    </div>
  )
};

export default login;
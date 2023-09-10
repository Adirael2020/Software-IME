"use client";

//Redux
import { useSelector } from "react-redux";
import Button from "@/components/Button.jsx";

//Components
import LoginUser from "./components/LoginUser.jsx";
import LoginStuden from "./components/LoginStuden.jsx";
import { useState } from "react";

const login = () => {
  const [visual, setVisual] = useState(true);

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-900 to bg-slate-900">
      <div className="" ></div>
      <div className="bg-slate-800/30  border-b-2 border-slate-700  text-white overflow-visible  w-3/5 h-3/5 md:w-2/5 md:h-2/5 ">
        <div className=" flex justify-center items-center">
          <Button
            onClick={() => {
              setVisual(true);
            }}
            text={"Personal"}
            className="bg-slate-900 text-white w-1/2  font-medium hover:bg-slate-800"
          />
          <Button
            onClick={() => {
              setVisual(false);
            }}
            text={"Alumno"}
            className="bg-slate-900 text-white w-1/2 font-medium hover:bg-slate-800"
          />
        </div>
        <div className="p-5">
          <div className="flex justify-center items-center">
            <label htmlFor="login" className="mx-center">
              LOGIN
            </label>
          </div>
          <div className="">
            {visual ? (
              <div className="">
                <LoginUser />
              </div>
            ) : (
              <div className="">
                <LoginStuden />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default login;

"use client";

//Redux
import Button from "../../components/Button.jsx";

//Components
import LoginUser from "./components/LoginUser.jsx";
import LoginStuden from "./components/LoginStuden.jsx";
import { useState } from "react";
//Estilos css
import styles from "../styles/login.module.css";
//Imagenes
import Carousel from "./components/CarouselLogin.jsx";
//Logo
import Logo from "./components/Logo.jsx";

const login = () => {
  const [visual, setVisual] = useState(true);

  const arrayImage = ["/feed.jpg", "/feed_2.jpg", "/feed_3 (1).jpg"];

  return (
    <div className="items-center justify-center h-screen bg-[url('/fondo.jpg')]">
      <div className="">
        <Logo />
      </div>
      <div className="flex justify-center my-20">
        <div className={styles.carrouselcontainer}>
          <Carousel images={arrayImage} />
        </div>
        <div className=" bg-slate-800/30 overflow-auto	border-b-2 border-slate-700  text-white w-6/12">
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
              <label
                htmlFor="login"
                className="mx-center text-2xl font-bold text-slate-900"
              >
                INICIO DE SESION
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
    </div>
  );
};

export default login;

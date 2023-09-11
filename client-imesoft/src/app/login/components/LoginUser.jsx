"use client";
import { useRouter } from "next/navigation";
//Formulario
import { useForm } from "react-hook-form";
//Redux
import { useDispatch } from "react-redux";
import { useLoginUserMutation } from "@/redux/services/userApi.js";
import { logUser } from "@/redux/features/userSlice.ts";
//React
import { useEffect, useState } from "react";

const LoginUser = () => {
  const navigate = useRouter();
  //React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
  } = useForm();

  //Errors
  const [error, setError] = useState();
  useEffect(()=>{
    if(error !== undefined){
      setTimeout(()=>{
        setError()
      },5000)
    }
  },[error]) //Cuando salta el mensaje de error de credenciales a los 5sg desaparece

  //Contex
  const [loginUser, isLoading] = useLoginUserMutation();
  const dispatch = useDispatch();

  //Funcion de Login
  const onSubmit = async (data) => {
    try {
      const result = await loginUser(data);
      if (result?.error) {
        setError(result.error.data.message)
      } else {
        dispatch(logUser(result.data));
        navigate.push('/homePage');
      }
    } catch (error) {
      console.error("Error de inicio de sesión:", error);
    }
  };
  return (
    <div className="p-2">
      {error !== undefined &&
        <div className="bg-red-500 text-white text-center my-2">
          {error}
        </div>
      }
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          label="Write your username"
          type="username"
          name="username"
          placeholder="Usuario"
          className="w-full focus:outline-none appearance-none placeholder:italic placeholder:text-slate-600 bg-transparent font-medium border-b-2 border-slate-700 text-white px-4 py-2 my-4"
          {...register("username", {
            required: { value: true, message: "Se requiere nombre de Usuario" },
          })}
        />
        <p className="text-red-700">{formErrors.username?.message}</p>
        <input
          type="password"
          name="password"
          placeholder="Contraseña"
          className="w-full focus:outline-none appearance-none bg-transparent placeholder:italic placeholder:text-slate-600  border-b-2 border-slate-700 text-white px-4 py-2 my-4"
          {...register("password", { required: { value: true, message: "Se requiere Contraseña" }, minLength: { value: 6, message: "La contraseña debe ser de 6 caracteres" } })}
        />
        <p className="text-red-700">{formErrors.password?.message}</p>
        <div className="flex items-center justify-center my-4">
          <button className="bg-slate-900 text-white w-1/2 font-medium hover:bg-slate-800 p-2 rounded-full">
            Ingresar
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginUser;

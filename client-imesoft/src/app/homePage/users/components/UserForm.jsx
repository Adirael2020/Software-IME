"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
//Formulario
import { useForm } from "react-hook-form";
//Components
import Button from "../../../../components/Button.jsx";
//redux

const UserForm = () => {
  const navigate = useRouter();
  const params = useParams();

  //React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    reset,
  } = useForm();
  //Messange
  const [message, setMessage] = useState();

  const onSubmit = async (data) => {
    if (params.id !== "newUser") {
    } else {
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Nombre de Usuario */}
        <input
          type="username"
          name="username"
          placeholder="Nombre de Usuario"
          className="w-full focus:outline-none appearance-none placeholder:italic placeholder:text-slate-600 bg-transparent font-medium border-b-2 border-slate-700 px-4 py-2 my-4"
          {...register("username", {
            required: { value: true, message: "Se requiere nombre de usuario" },
            minLength: {value: 2 , message: "Minimo 2 Caracteres"},
            maxLength: {value: 20, message:"Maximo 20 Caracteres"}
          })}
        />
        <p className="text-red-700">{formErrors.username?.message}</p>

        {/* FullName */}
        <input
          type="text"
          name="fullname"
          placeholder="Nombre Completo de Usuario"
          className="w-full focus:outline-none appearance-none placeholder:italic placeholder:text-slate-600 bg-transparent font-medium border-b-2 border-slate-700 px-4 py-2 my-4"
          {...register("fullname", {
            required: { value: true, message: "Se requiere nombre completo de usuario" },
          })}
        />
        <p className="text-red-700">{formErrors.fullname?.message}</p>

        {/* Contraseña */}
        <input
          type="text"
          name="password"
          placeholder="Contraseña"
          className="w-full focus:outline-none appearance-none placeholder:italic placeholder:text-slate-600 bg-transparent font-medium border-b-2 border-slate-700 px-4 py-2 my-4"
          {...register("password", {
            required: { value: true, message: "Se requiere contraseña" },
          })}
        />
        <p className="text-red-700">{formErrors.password?.message}</p>

        {/* Email */}
        <input
          type="email"
          name="email"
          placeholder="Correo Electronico"
          className="w-full focus:outline-none appearance-none placeholder:italic placeholder:text-slate-600 bg-transparent font-medium border-b-2 border-slate-700 px-4 py-2 my-4"
          {...register("email", {
            required: { value: true, message: "Se requiere Correo Electronico" },
          })}
        />
        <p className="text-red-700">{formErrors.email?.message}</p>

        {/* Fecha de Nacimiento */}
        <input
          type="date"
          name="birthday"
          placeholder="Correo Electronico"
          className="w-full focus:outline-none appearance-none placeholder:italic placeholder:text-slate-600 bg-transparent font-medium border-b-2 border-slate-700 px-4 py-2 my-4"
          {...register("birthday", {
            required: { value: true, message: "Se requiere Fecha de Nacimiento" },
          })}
        />
        <p className="text-red-700">{formErrors.birthday?.message}</p>

        <div className="flex items-center justify-center ">
          <button className="bg-slate-900 text-white w-1/2 font-medium hover:bg-slate-800 p-2 rounded-full">
            {params.id !== "newUser" ? (
              <div>Guardar Cambios</div>
            ) : (
              <div>Crear Usuario</div>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserForm;

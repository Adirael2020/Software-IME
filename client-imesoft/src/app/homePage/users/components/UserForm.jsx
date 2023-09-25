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
          })}
        />
        <p className="text-red-700">{formErrors.username?.message}</p>

        {/* FullName */}
        <input
          type="fullname"
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
          type="password"
          name="password"
          placeholder="Contraseña"
          className="w-full focus:outline-none appearance-none placeholder:italic placeholder:text-slate-600 bg-transparent font-medium border-b-2 border-slate-700 px-4 py-2 my-4"
          {...register("password", {
            required: { value: true, message: "Se requiere contraseña" },
          })}
        />
        <p className="text-red-700">{formErrors.password?.message}</p>

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

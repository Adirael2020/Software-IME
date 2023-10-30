"use client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useGetUserMutation } from "../../../redux/services/userApi";

//Formulario
import { useForm, Controller } from "react-hook-form";

const page = () => {
  const user = useSelector((state) => state.user.user);

  const [getUser, isLoadingGet] = useGetUserMutation();

  useEffect(() => {
    function formatDateForInput(dateString) {
      const date = new Date(dateString);
      return date.toISOString().slice(0, 10); // Esto formatea la fecha como "aaaa-mm-dd"
    }
    const loadUser = async () => {
      const response = await getUser(user.data.id);
      const { fullname, email, birthday } = response.data;
      const formattedBirthday = formatDateForInput(birthday);
      reset({
        fullname,
        email,
        birthday: formattedBirthday
      });
    };
    loadUser();
  }, []);

  //React Hook Form
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors: formErrors, isSubmitted },
    control,
    reset,
    watch,
  } = useForm();

  const onSubmit = async (data) => { };

  return (
    <div>
      profile
      <div className="w-80">
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* FullName */}
          <input
            type="text"
            name="fullname"
            placeholder="Nombre Completo de Usuario"
            className="w-full focus:outline-none appearance-none placeholder:italic placeholder:text-slate-600 bg-transparent font-medium border-b-2 border-slate-700 px-4 py-2 my-4"
            {...register("fullname", {
              required: {
                value: true,
                message: "Se requiere nombre completo de usuario",
              },
            })}
          />
          <p className="text-red-700">{formErrors.fullname?.message}</p>
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Correo Electronico"
            className="w-full focus:outline-none appearance-none placeholder:italic placeholder:text-slate-600 bg-transparent font-medium border-b-2 border-slate-700 px-4 py-2 my-4"
            {...register("email", {
              required: {
                value: true,
                message: "Se requiere Correo Electronico",
              },
            })}
          />
          <p className="text-red-700">{formErrors.email?.message}</p>

          {/* Fecha de Nacimiento */}
          <input
            type="date"
            name="birthday"
            className="w-full focus:outline-none appearance-none placeholder:italic placeholder:text-slate-600 bg-transparent font-medium border-b-2 border-slate-700 px-4 py-2 my-4"
            {...register("birthday", {
              required: {
                value: true,
                message: "Se requiere Fecha de Nacimiento",
              },
            })}
          />
          <p className="text-red-700">{formErrors.birthday?.message}</p>
        </form>
      </div>
    </div>
  );
};

export default page;

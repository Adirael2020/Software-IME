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
    const loadUser = async () => {
      const response = await getUser(user.data.id);
      const { fullname } = response.data;
      reset({
        fullname,
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

  const onSubmit = async (data) => {};

  return (
    <div>
      profile
      <div>
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
        </form>
      </div>
    </div>
  );
};

export default page;

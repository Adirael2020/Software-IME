"use client";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useGetUserMutation,useEditProfileUserMutation } from "../../../redux/services/userApi";
import { useDispatch } from "react-redux";
import { editUser } from "../../../redux/features/userSlice.ts";

//Formulario
import { useForm } from "react-hook-form";

//Components
import Loading from "../../../components/Loading.jsx";
import Button from "../../../components/Button.jsx";
import ModalPassword from "./components/ModalPassword.jsx";

const page = () => {

  //redux
  const dispach = useDispatch();
  const user = useSelector((state) => state.user.user);

  //modals y edits
  const [editProfile, setEditProfile] = useState(true);
  const [editPasswordModal, setEditPasswordModal] = useState(false);
  const [getUser, isLoading] = useGetUserMutation();
  const [editProfileBack, isLoadingBackend] = useEditProfileUserMutation();

  useEffect(() => {
    function formatDateForInput(dateString) {
      const date = new Date(dateString);
      return date.toISOString().slice(0, 10); // Esto formatea la fecha como "aaaa-mm-dd"
    }
    const loadUser = async () => {
      if (!isLoading.isLoading && user != null) {
        const response = await getUser(user.data.id);
        const { fullname, email, birthday } = response.data;
        const formattedBirthday = formatDateForInput(birthday);
        reset({
          fullname,
          email,
          birthday: formattedBirthday,
        });
      }
    };
    loadUser();
  }, [user]);

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

  //function from modal pasword
  function closeModal() {
    setEditPasswordModal(false);
  };

  const onSubmit = async (data) => {
    const {fullname,email,birthday} = data;
    const edit = {
      _id: user.data.id,
      fullname,
      email,
      birthday
    }
    const response = await editProfileBack(edit);    
    await dispach(editUser(edit));
    setEditProfile(true);
  };

  if (user == null && isLoading) {
    return <Loading />;
  }
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
            disabled={editProfile}
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
            disabled={editProfile}
            {...register("email", {
              required: {
                value: true,
                message: "Se requiere Correo Electronico",
              },
              pattern: {
                value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
                message: "Correo no válido",
              },
            })}
          />
          <p className="text-red-700">{formErrors.email?.message}</p>

          {/* Fecha de Nacimiento */}
          <input
            type="date"
            name="birthday"
            className="w-full focus:outline-none appearance-none placeholder:italic placeholder:text-slate-600 bg-transparent font-medium border-b-2 border-slate-700 px-4 py-2 my-4"
            disabled={editProfile}
            {...register("birthday", {
              required: {
                value: true,
                message: "Se requiere Fecha de Nacimiento",
              },
            })}
          />
          <p className="text-red-700">{formErrors.birthday?.message}</p>
          {!editProfile &&
            <Button text={"Guardar Cambios"} className={"bg-green-600 p-2 text-white"} />
          }
        </form>
      </div>
      <div>
        {editProfile &&
          <Button
            text={"Editar Perfil"}
            className={"bg-slate-600 p-1 m-1"}
            onClick={() => {
              setEditProfile(false);
            }}
          />
        }
        {!editPasswordModal &&
          <Button
            text={"Editar Contraseña"}
            className={"bg-slate-600 p-1 m-1"}
            onClick={() => {
              setEditPasswordModal(true);
            }}
          />}
      </div>
      {editPasswordModal &&
        <ModalPassword closeModal={closeModal} />
      }
    </div>
  );
};

export default page;

"useClient"
import { useRef } from "react";
//componets
import Button from "../../../../components/Button";

//Formulario
import { useForm } from "react-hook-form";

const ModalPassword = ({ closeModal }) => {
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

  const newPassword = useRef(null);
  newPassword.current = watch("newPassword", "");

  const onSubmit = async (data) => {
    console.log(data);
    closeModal();
  };



  return (
    <div>
      Editar contraseña
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            Contraseña Actual
            <input
              type="password"
              name="currentPassword"
              placeholder="Contraseña Actual"
              className="w-full focus:outline-none appearance-none placeholder:italic placeholder:text-slate-600 bg-transparent font-medium border-b-2 border-slate-700 px-4 py-2 my-4"
              {...register("currentPassword", {
                required: { value: true, message: "Se requiere contraseña" },
                minLength: {value: 6 , message: "La contraseña debe ser de mas de 6 caracteres"}
              })}
            />
            <p className="text-red-700">{formErrors.currentPassword?.message}</p>
          </div>
          <div>
            Nueva Contraseña
            <input
              type="password"
              name="newPassword"
              placeholder="Nueva Contraseña"
              className="w-full focus:outline-none appearance-none placeholder:italic placeholder:text-slate-600 bg-transparent font-medium border-b-2 border-slate-700 px-4 py-2 my-4"
              {...register("newPassword", {
                required: { value: true, message: "Se requiere contraseña" },
                minLength: {value: 6 , message: "La contraseña debe ser de mas de 6 caracteres"}
              })}
            />
            <p className="text-red-700">{formErrors.newPassword?.message}</p>
          </div>
          <div>
            Repetir Contraseña
            <input
              type="password"
              name="retryNewPassword"
              placeholder="Repetir Nueva Contraseña"
              className="w-full focus:outline-none appearance-none placeholder:italic placeholder:text-slate-600 bg-transparent font-medium border-b-2 border-slate-700 px-4 py-2 my-4"
              {...register("retryNewPassword", {
                required: { value: true, message: "Se requiere contraseña" },
                minLength: {value: 6 , message: "La contraseña debe ser de mas de 6 caracteres"},
                validate: (value) =>
                value === newPassword.current || "Las contraseñas no coinciden",
              })}
            />
            <p className="text-red-700">{formErrors.retryNewPassword?.message}</p>
          </div>
          <Button
            text={"Cambiar Contraseña"}
            className={"bg-green-600 p-2 text-white"}
          />
        </form>
      </div>
      <Button
        text={"X"}
        className="bg-red-600 h-10 p-2"
        onClick={() => {
          closeModal();
        }}
      />
    </div>
  );
};

export default ModalPassword;

"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
//Formulario
import { useForm, Controller } from "react-hook-form";
//Components
import Button from "../../../../components/Button.jsx";
//redux
import { useGetHeadqueartersQuery } from "../../../../redux/services/headquearterApi.js";
import { useGetSpecialtiesQuery } from "../../../../redux/services/specialtyApi.js";

const UserForm = () => {
  const navigate = useRouter();
  const params = useParams();

  //Redux
  const { data: dataSpecialties, isLoading: loadingSpecialties } =
    useGetSpecialtiesQuery();
  const { data: dataHeadquearters, isLoading: loadingHeadquearters } =
    useGetHeadqueartersQuery();

  //Hierarchy
  const hierarchyUser = [
    { _id: "1", name: "Gerente" },
    { _id: "2", name: "Supervisor" },
    { _id: "3", name: "Administrativo" },
    { _id: "4", name: "Coordinador" },
    { _id: "5", name: "Profesor" },
  ];

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

  //useState
  //Messange
  const [message, setMessage] = useState();
  //hierarchy Teacher
  const [openTeacher, setOpenTeacher] = useState(false);
  //wath for hierarchy
  useEffect(() => {
    if (watch("hierarchy.Profesor") || watch("hierarchy.Coordinador")) {
      setOpenTeacher(true);
    } else {
      setOpenTeacher(false);
    }
  }, [watch("hierarchy.Profesor"), watch("hierarchy.Coordinador")]);
  //open hierarchy headquearter
  const [operHeadquearter, setOpenHeadquearter] = useState(false);
  useEffect(() => {
    if (
      (watch("hierarchy.Administrativo") &&
        !watch("hierarchy.Supervisor") &&
        !watch("hierarchy.Gerente")) ||
      (watch("hierarchy.Profesor") &&
        !watch("hierarchy.Supervisor") &&
        !watch("hierarchy.Gerente"))
    ) {
      setOpenHeadquearter(true);
    } else {
      setOpenHeadquearter(false);
    }
  }, [
    watch("hierarchy.Administrativo"),
    watch("hierarchy.Profesor"),
    watch("hierarchy.Supervisor"),
    watch("hierarchy.Gerente"),
    watch("hierarchy.Coordinador"),
  ]);
  useEffect(() => {
    if (
      watch("hierarchy.Gerente") ||
      watch("hierarchy.Coordinador") ||
      watch("hierarchy.Supervisor")
    ) {
      setOpenHeadquearter(false);
    }
  }, [
    watch("hierarchy.Gerente"),
    watch("hierarchy.Coordinador"),
    watch("hierarchy.Supervisor"),
  ]);

  //submit
  const onSubmit = async (data) => {
    if (params.id === "newUser") {
      const { username, fullname, email, password, birthday } = data;
      //select Hierarchy
      let selectedHierarchy = hierarchyUser.filter((hierarchy) => {
        return data.hierarchy[hierarchy.name] === true;
      });
      //Hierarchy > 1
      let checkbox = false;
      if (selectedHierarchy.length > 1) {
        const selectedHierarchies = Object.keys(data.hierarchy).filter(
          (key) => data.hierarchy[key]
        );
        if (selectedHierarchies.includes("Supervisor")) {
          selectedHierarchy = "mixto_superior";
        } else {
          selectedHierarchy = "mixto";
        }
      } else if (selectedHierarchy.length === 0) {
        /*
        checkbox = true;
        setError("checkboxGroup", {
          type: "manual",
          message: "Selecciona al menos una Jerarquia",
        });
        */
      } else {
        selectedHierarchy = selectedHierarchy[0].name.toLowerCase();
      }
      //Select Headquearter
      let selectedHeadquarters;
      if (!checkbox) {
        if (
          selectedHierarchy === "coordinador" ||
          selectedHierarchy === "supervisor" ||
          selectedHierarchy === "gerente" ||
          selectedHierarchy === "mixto_superior"
        ) {
          selectedHeadquarters = dataHeadquearters;
        } else {
          selectedHeadquarters = dataHeadquearters.filter((headquearter) => {
            return data.headquearters[headquearter.name] === true;
          });
        }
      }

      const newUser = {
        username,
        fullname,
        email,
        password,
        birthday,
        headquearters: selectedHeadquarters,
        hierarchy: selectedHierarchy,
      };
      console.log(newUser);
      //console.log(data);
    } else {
    }
  };

  //Funtion for checkbox
  const renderCheckBox = (data, loading, option) => {
    if (!loading) {
      return data.map((data) => {
        return (
          <div className="flex items-center mb-4" key={data._id}>
            <Controller
              name={`${option}.${data.name}`}
              control={control}
              defaultValue={false}
              render={({ field }) => (
                <div className="flex items-center mb-4">
                  <input
                    id={`checkbox-${data._id}`}
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    {...field}
                  />
                  <label
                    htmlFor={`checkbox-${data._id}`}
                    className="ml-2 text-sm font-medium"
                  >
                    {data.name}
                  </label>
                </div>
              )}
            />
          </div>
        );
      });
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {/* Nombre de Usuario */}
          <input
            type="username"
            name="username"
            placeholder="Nombre de Usuario"
            className="w-full focus:outline-none appearance-none placeholder:italic placeholder:text-slate-600 bg-transparent font-medium border-b-2 border-slate-700 px-4 py-2 my-4"
            {...register("username", {
              required: {
                value: true,
                message: "Se requiere nombre de usuario",
              },
              minLength: { value: 2, message: "Minimo 2 Caracteres" },
              maxLength: { value: 20, message: "Maximo 20 Caracteres" },
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
              required: {
                value: true,
                message: "Se requiere nombre completo de usuario",
              },
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
        </div>
        <div className="flex">
          <div>
            {renderCheckBox(hierarchyUser, loadingSpecialties, "hierarchy")}
            <p className="text-red-700">{formErrors.checkboxGroup?.message}</p>
          </div>
          {operHeadquearter && (
            <div>
              {renderCheckBox(
                dataHeadquearters,
                loadingHeadquearters,
                "headquearters"
              )}
            </div>
          )}
          {openTeacher && (
            <div>
              {renderCheckBox(dataSpecialties, loadingSpecialties, "specialty")}
            </div>
          )}
        </div>
        {Object.keys(formErrors).length === 0 ? (
          <div className="flex items-center justify-center ">
            <button
              className="bg-slate-900 text-white w-1/2 font-medium hover:bg-slate-800 p-2 rounded-full"
              type="submit"
            >
              {params.id !== "newUser" ? (
                <div>Guardar Cambios</div>
              ) : (
                <div>Crear Usuario</div>
              )}
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-center ">
            <button
              className="bg-gray-500 w-1/2 font-medium p-2 rounded-full"
              type="submit"
              disabled
            >
              {params.id !== "newUser" ? (
                <div>Guardar Cambios</div>
              ) : (
                <div>Crear Usuario</div>
              )}
            </button>
          </div>
        )}
      </form>
    </div>
  );
};

export default UserForm;

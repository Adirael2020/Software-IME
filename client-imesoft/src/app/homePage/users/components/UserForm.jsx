"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";
//Formulario
import { useForm, Controller } from "react-hook-form";
//Components
import Button from "../../../../components/Button.jsx";
//redux
import { useGetHeadqueartersQuery } from "../../../../redux/services/headquearterApi.js";
import { useGetSpecialtiesQuery } from "../../../../redux/services/specialtyApi.js";
import {
  useCreateUserMutation,
  useGetUserMutation,
  useEditUserMutation,
} from "../../../../redux/services/userApi.js";

const UserForm = () => {
  const navigate = useRouter();
  const params = useParams();

  //Redux
  const { data: dataSpecialties, isLoading: loadingSpecialties } =
    useGetSpecialtiesQuery();
  const { data: dataHeadquearters, isLoading: loadingHeadquearters } =
    useGetHeadqueartersQuery();
  const [createUser, isLoadingCreate] = useCreateUserMutation();
  const [getUser, isLoadingGet] = useGetUserMutation();
  const [editUser] = useEditUserMutation();

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
    getValues
  } = useForm();

  //useState
  //Messange
  const [message, setMessage] = useState();
  //hierarchy Teacher
  const [openTeacher, setOpenTeacher] = useState(false);
  //option is teacher
  const [openTeacherOther, setOpenTeacherOther] = useState(false);
  useEffect(() => {
    if (watch("hierarchy.Administrativo")) {
      setOpenTeacherOther(true);
    } else {
      setOpenTeacherOther(false);
    }
  }, [watch("hierarchy.Administrativo")]);
  //wath for hierarchy
  useEffect(() => {
    if (
      watch("hierarchy.Profesor") ||
      watch("hierarchy.Coordinador") ||
      watch("isTeacher")
    ) {
      setOpenTeacher(true);
    } else {
      setOpenTeacher(false);
    }
  }, [
    watch("hierarchy.Profesor"),
    watch("hierarchy.Coordinador"),
    watch("isTeacher"),
  ]);
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

  //Pre Load
  useEffect(() => {
    function formatDateForInput(dateString) {
      const date = new Date(dateString);
      return date.toISOString().slice(0, 10); // Esto formatea la fecha como "aaaa-mm-dd"
    }
    async function getData() {
      const response = await getUser(params.id);
      const {
        username,
        fullname,
        email,
        birthday,
        hierarchy,
        isTeacher,
        specialty,
      } = response.data;
      const formattedBirthday = formatDateForInput(birthday);
      const hierarchySelect = {
        Administrativo: false,
        Coordinador: false,
        Gerente: false,
        Profesor: false,
        Supervisor: false,
      };
      switch (hierarchy) {
        case "administrativo":
          hierarchySelect.Administrativo = true;
          break;
        case "coordinador":
          hierarchySelect.Coordinador = true;
          break;
        case "gerente":
          hierarchySelect.Gerente = true;
          break;
        case "profesor":
          hierarchySelect.Profesor = true;
          break;
        case "supervisor":
          hierarchySelect.Supervisor = true;
        default:
          hierarchySelect.Profesor = true;
          hierarchySelect.Administrativo = true;
          break;
      }
      const headquearterSelect = {};
      const headqueartersUser = response.data.headquearters.map(
        (headquearter) => headquearter.name
      );
      if (!loadingHeadquearters) {
        dataHeadquearters.forEach((headquearter) => {
          headquearterSelect[headquearter.name] = headqueartersUser.includes(
            headquearter.name
          );
        });
      }
      const specialtySelect = {};
      const specialtyUser = specialty;
      if (!loadingSpecialties) {
        dataSpecialties.forEach((specialty) => {
          specialtySelect[specialty.name] = specialtyUser.includes(
            specialty._id
          );
        });
      }

      reset({
        username,
        fullname,
        email,
        birthday: formattedBirthday,
        hierarchy: hierarchySelect,
        headquearters: headquearterSelect,
        specialty: specialtySelect,
        isTeacher,
      });
    }
    if (params.id !== "newUser") {
      getData();
    }
  }, [loadingHeadquearters, loadingSpecialties]);

  //submit
  const onSubmit = async (data) => {
    if (params.id === "newUser") {
      const { username, fullname, email, password, birthday } = data;
      //select Hierarchy
      let selectedHierarchy = hierarchyUser.filter((hierarchy) => {
        return data.hierarchy[hierarchy.name] === true;
      });
      selectedHierarchy = selectedHierarchy[0].name.toLowerCase();
      //Teacher
      let isTeacher = data.isTeacher;
      if (
        selectedHierarchy === "coordinador" ||
        selectedHierarchy === "profesor"
      ) {
        isTeacher = true;
      }
      //Select Headquearter
      let selectedHeadquarters;
      if (
        selectedHierarchy === "coordinador" ||
        selectedHierarchy === "supervisor" ||
        selectedHierarchy === "gerente"
      ) {
        selectedHeadquarters = dataHeadquearters;
      } else {
        selectedHeadquarters = dataHeadquearters.filter((headquearter) => {
          return data.headquearters[headquearter.name] === true;
        });
      }

      //selec Specialties for Teacher
      let selectedSpecialties;
      if (isTeacher) {
        //if not a teacher, no setting for specialty
        selectedSpecialties = dataSpecialties.filter((specialty) => {
          return data.specialty[specialty.name] === true;
        });
      } else {
        selectedSpecialties = [];
      }

      const newUser = {
        username,
        fullname,
        email,
        password,
        birthday,
        headquearters: selectedHeadquarters,
        hierarchy: selectedHierarchy,
        specialty: selectedSpecialties,
        isTeacher,
      };
      const response = await createUser(newUser);
      console.log(response);
      navigate.push("/homePage/users");
    } else {
      const { username, fullname, email, birthday } = data;
      let selectedHierarchy = hierarchyUser.filter((hierarchy) => {
        return data.hierarchy[hierarchy.name] === true;
      });
      selectedHierarchy = selectedHierarchy[0].name.toLowerCase();
      //Teacher
      let isTeacher = data.isTeacher;
      if (
        selectedHierarchy === "coordinador" ||
        selectedHierarchy === "profesor"
      ) {
        isTeacher = true;
      }
      //Select Headquearter
      let selectedHeadquarters;
      if (
        selectedHierarchy === "coordinador" ||
        selectedHierarchy === "supervisor" ||
        selectedHierarchy === "gerente"
      ) {
        selectedHeadquarters = dataHeadquearters;
      } else {
        selectedHeadquarters = dataHeadquearters.filter((headquearter) => {
          return data.headquearters[headquearter.name] === true;
        });
      }

      //selec Specialties for Teacher
      let selectedSpecialties;
      if (isTeacher) {
        //if not a teacher, no setting for specialty
        selectedSpecialties = dataSpecialties.filter((specialty) => {
          return data.specialty[specialty.name] === true;
        });
      } else {
        selectedSpecialties = [];
      }

      //Image Profile
      const formData = new FormData();
      formData.append("imageProfile", data.imageProfile[0]);
      formData.append("username", data.username);

      const editedUser = {
        _id: params.id,
        username,
        fullname,
        email,
        birthday,
        headquearters: selectedHeadquarters,
        hierarchy: selectedHierarchy,
        specialty: selectedSpecialties,
        isTeacher,
        imageProfile: formData,
      };
      const response = await editUser(editedUser);
      console.log(response);
      console.log(formData);
      console.log(data.imageProfile[0]);
      //navigate.push("/homePage/users");
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
                    checked={field.value} // Usar field.value para establecer el estado del checkbox
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
  //validation image
  const validateImage = (value) => {
    if (!value || value.length === 0) {
      return true;
    }
    if (!["image/jpeg", "image/png"].includes(value[0].type)) {
      return "Solo se permiten archivos JPG o PNG";
    }
    return true;
  };
  const [defaultImagePath, setDefaultImagePath] = useState("/profile.png");
  //change image select
  const handleFileChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      const imageURL = URL.createObjectURL(selectedImage);
      setDefaultImagePath(imageURL);
    }
  };
  //reset image select
  const clearSelection = () => {
    setDefaultImagePath("/profile.png");
    reset({ ...getValues(), imageProfile: '' });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
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
          {params.id === "newUser" && (
            <div>
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
            </div>
          )}
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
          <label>Subir imagen:</label>
          <Controller
            name="imageProfile"
            control={control}
            render={({ field }) => (
              <>
                <input
                  type="file"
                  {...register("imageProfile", { validate: validateImage })}
                  onChange={(e) => {
                    field.onChange(e);
                    handleFileChange(e);
                  }}
                />
              </>
            )}
          />
          <Image
            src={defaultImagePath}
            alt="Imagen predeterminada"
            width={100}
            height={100}
          />
          <p className="text-red-700">{formErrors.imageProfile?.message}</p>
          <Button text={"Limpiar Imagen"} className={"bg-green-500 text-white p-2"} onClick={clearSelection}/>
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
          {openTeacherOther && (
            <div>
              <div className="flex items-center mb-4">
                <Controller
                  name="isTeacher"
                  control={control}
                  defaultValue={false}
                  render={({ field }) => (
                    <div className="flex items-center mb-4">
                      {/*console.log(field)*/}
                      {field.value ? (
                        <input
                          id={`checkbox-isTeacher`}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          {...field}
                          checked
                        />
                      ) : (
                        <input
                          id={`checkbox-isTeacher`}
                          type="checkbox"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                          {...field}
                        />
                      )}

                      <label
                        htmlFor={`checkbox-isTeacher`}
                        className="ml-2 text-sm font-medium"
                      >
                        Es Profesor
                      </label>
                    </div>
                  )}
                />
              </div>
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

"use client"
import { useEffect } from "react";
//redux
import { useCreateSpecialtyMutation, useGetSpecialtyMutation, useEditSpecialtyMutation } from "../../../../redux/services/specialtyApi.js"
//Formulario
import { useForm } from "react-hook-form";
//components
import Button from "../../../../components/Button.jsx";

const ModalSpectForm = ({ option, closeModal }) => {
    //React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors: formErrors },
        reset
    } = useForm();

    const [createSpecialty, isLoadingCreate] = useCreateSpecialtyMutation();
    const [getSpecialty, isLoadingGet] = useGetSpecialtyMutation();
    const [editSpecialty, isloadingEdit] = useEditSpecialtyMutation();

    //load Spec
    useEffect(() => {
        async function getData() {
            const response = await getSpecialty(option);
            const { name } = response.data;
            reset({
                name
            });
        }
        if (option !== "new") {
            getData();
        };
    }, []);

    //Submit
    const onSubmit = async (data) => {
        if (option === "new") {
            const result = await createSpecialty(data);
            console.log(result);
            closeModal();
        } else {
            const editSpec = {
                id: option,
                name: data.name
            };
            const result = await editSpecialty(editSpec);
            setTimeout(() => {
                //setMessage("Guardado Correctamente")
            }, 3000);
            console.log(result);
            closeModal();
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    {option === "new"
                        ? <>Crear</>
                        : <>Editar</>
                    }
                </div>
                <div className="flex">
                    <div>
                        <input
                            type="text"
                            name="name"
                            placeholder="Nombre de Especialidad"
                            className="w-full focus:outline-none appearance-none placeholder:italic placeholder:text-slate-600 bg-transparent font-medium border-b-2 border-slate-700 px-4 py-2 my-4"
                            {...register("name", {
                                required: { value: true, message: "Se requiere Nombre" },
                            })}
                        />
                        <p className="text-red-700">{formErrors.name?.message}</p>
                    </div>
                    {option === "new"
                        ? <Button text={"Crear"} className="bg-green-600 h-10 p-2" />
                        : <Button text={"Guardar"} className="bg-green-600 h-10 p-2" />
                    }
                </div>
            </form>
            <Button text={"X"} className="bg-red-600 h-10 p-2" onClick={()=>{closeModal()}} />
        </div>
    )
}

export default ModalSpectForm;
"use client"
import { useEffect } from "react";
//redux
import {useCreateSpecialtyMutation} from "../../../../redux/services/specialtyApi.js"
//Formulario
import { useForm } from "react-hook-form";
//components
import Button from "../../../../components/Button";

const ModalForm = ({option}) => {

    //React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors: formErrors },
        reset
    } = useForm();

    const [createSpecialty,isLoadingCreate] = useCreateSpecialtyMutation();

    //load Spec
    useEffect(()=>{

    },[]);

    //Submit
    const onSubmit = async (data) => {

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
                    <Button text={"Crear"} className="bg-green-600 h-10 p-2"/>
                </div>
            </form>
        </div>
    )
}

export default ModalForm
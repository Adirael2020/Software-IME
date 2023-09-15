"use client"

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
//Formulario
import { useForm } from "react-hook-form";
//Components 
import Button from "@/components/Button";
//redux
import { useGetHeadquearterMutation, useCreateHeadquearterMutation, useEditHeadquearterMutation } from "@/redux/services/headquearterApi";

const FormHead = () => {
    const navigate = useRouter();
    const params = useParams();
    const [createHeadquearter, isLoadingCreate] = useCreateHeadquearterMutation();
    const [getHeadquearter, isLoadingGet] = useGetHeadquearterMutation();
    const [editHeadquearter, isloadingEdit] = useEditHeadquearterMutation();

    //React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors: formErrors },
        reset
    } = useForm();

    //PreCarga
    useEffect(() => {
        async function getData() {
            const response = await getHeadquearter(params.id);
            const { abbreviation, name, direction } = response.data;
            reset({
                name,
                direction,
                abbreviation
            });
        }
        if (params.id !== "newHeadquearter") {
            getData();
        };
    }, []);
    //Messange
    const [message, setMessage] = useState();
    useEffect(() => {
        if (error !== undefined) {
            setTimeout(() => {
                setMessage()
            }, 5000)
        }
    }, [message]) //Cuando salta el mensaje a los 5sg desaparece  
    //Errors
    const [error, setError] = useState();
    useEffect(() => {
        if (error !== undefined) {
            setTimeout(() => {
                setError()
            }, 5000)
        }
    }, [error]) //Cuando salta el mensaje de error de credenciales a los 5sg desaparece

    //Submit
    const onSubmit = async (data) => {
        if (params.id !== "newHeadquearter") {
            console.log(params.id);
            const result = await editHeadquearter(data,params.id);
            console.log(result);
            setTimeout(() => {
                setMessage("Guardado Correctamente")
            }, 3000);
            navigate.push('/homePage/headquearters')
        } else {
            console.log("Crear");
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="name"
                    name="name"
                    placeholder="Nombre de Sede"
                    className="w-full focus:outline-none appearance-none placeholder:italic placeholder:text-slate-600 bg-transparent font-medium border-b-2 border-slate-700 px-4 py-2 my-4"
                    {...register("name", {
                        required: { value: true, message: "Se requiere nombre de Sede" },
                    })}
                />
                <p className="text-red-700">{formErrors.name?.message}</p>
                <input
                    type="abbreviation"
                    name="abbreviation"
                    placeholder="Abreviacion"
                    className="w-full focus:outline-none appearance-none placeholder:italic placeholder:text-slate-600 bg-transparent font-medium border-b-2 border-slate-700 px-4 py-2 my-4"
                    {...register("abbreviation", {
                        required: { value: true, message: "Se requiere Abreviacion de Sede" },
                        maxLength: { value: 2, message: "Solamente 2 Letras" }
                    })}
                />
                <p className="text-red-700">{formErrors.abbreviation?.message}</p>
                <input
                    type="direction"
                    name="direction"
                    placeholder="Direccion"
                    className="w-full focus:outline-none appearance-none placeholder:italic placeholder:text-slate-600 bg-transparent font-medium border-b-2 border-slate-700 px-4 py-2 my-4"
                    {...register("direction", {
                        required: { value: true, message: "Se requiere Direccion de Sede" },
                    })}
                />
                <p className="text-red-700">{formErrors.direction?.message}</p>
                <div className="flex items-center justify-center ">
                    <button className="bg-slate-900 text-white w-1/2 font-medium hover:bg-slate-800 p-2 rounded-full">
                        {
                            params.id !== "newHeadquearter"
                                ? <div>Guardar Cambios</div>
                                : <div>Crear</div>
                        }
                    </button>
                </div>
            </form>
        </div>
    )
}

export default FormHead
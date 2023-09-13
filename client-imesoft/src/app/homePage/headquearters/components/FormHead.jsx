"use client"

import { useRouter, useSearchParams} from "next/navigation";
//Formulario
import { useForm } from "react-hook-form";
//Components 
import Button from "@/components/Button";
//redux
import { useGetHeadquearterMutation, useCreateHeadquearterMutation } from "@/redux/services/headquearterApi";

const FormHead = () => {
    const navigate = useRouter();
    const params = useSearchParams();
    const [createHeadquearter, isLoadingCreate] = useCreateHeadquearterMutation();
    const [getHeadquearter, isLoadingGet] = useGetHeadquearterMutation();

    //React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors: formErrors },
        reset
    } = useForm();

    const onSubmit = async (data) => {

    };

    console.log(params.get(''));

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="name"
                    name="name"
                    placeholder="Nombre de Sede"
                    className="w-full focus:outline-none appearance-none placeholder:italic placeholder:text-slate-600 bg-transparent font-medium border-b-2 border-slate-700 text-white px-4 py-2 my-4"
                    {...register("name", {
                        required: { value: true, message: "Se requiere nombre de Sede" },
                    })}
                />
                <p className="text-red-700">{formErrors.name?.message}</p>
                <input
                    type="abbreviation"
                    name="abbreviation"
                    placeholder="Abreviacion"
                    className="w-full focus:outline-none appearance-none placeholder:italic placeholder:text-slate-600 bg-transparent font-medium border-b-2 border-slate-700 text-white px-4 py-2 my-4"
                    {...register("abbreviation", {
                        required: { value: true, message: "Se requiere Abreviacion de Sede" },
                        maxLength: {value: 2, message: "Solamente 2 Letras"}
                    })}
                />
                <p className="text-red-700">{formErrors.abbreviation?.message}</p>
                <input
                    type="direction"
                    name="direction"
                    placeholder="Direccion"
                    className="w-full focus:outline-none appearance-none placeholder:italic placeholder:text-slate-600 bg-transparent font-medium border-b-2 border-slate-700 text-white px-4 py-2 my-4"
                    {...register("direction", {
                        required: { value: true, message: "Se requiere Direccion de Sede" },
                    })}
                />
                <p className="text-red-700">{formErrors.direction?.message}</p>
            </form>
        </div>
    )
}

export default FormHead
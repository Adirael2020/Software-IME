"use client"
import { useRouter } from 'next/navigation';
//Formulario
import { useForm } from "react-hook-form";
//Redux
import { useDispatch } from 'react-redux';
import { useLoginUserMutation } from "@/redux/services/userApi.js";
import { logUser } from "@/redux/features/userSlice.ts";

const LoginUser = () => {
    const navigate = useRouter();
    //React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    //Contex
    const [ loginUser , isLoading, isError  ]= useLoginUserMutation();
    const dispatch = useDispatch();

    //Funcion de Login
    const onSubmit = async (data) => {
        try { 
            const result = await loginUser(data);
            dispatch(logUser(result.data));
            navigate.push('/homePage');
        } catch (error) {
            console.error('Error de inicio de sesión:', error);
        }
    };

    return (
        <div className="p-2">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    label="Write your username"
                    type="username"
                    name="username"
                    placeholder="Usuario"
                    className="w-full appearance-none bg-transparent font-medium border-b-2 border-slate-700 text-black px-4 py-2 my-4"
                    {...register("username", { required: true })}
                />
                <p>{errors.username?.message}</p>
                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="w-full appearance-none bg-transparent border-b-2 border-slate-700 text-black px-4 py-2 my-4"
                    {...register("password", { required: true, minLength: 6 })}
                />
                <p>{errors.password?.message}</p>
                <div className='flex items-center justify-center my-4'>
                    <button className='bg-slate-900 text-white w-1/2 font-medium hover:bg-slate-800 p-2 rounded-full'>Ingresar</button>
                </div>
            </form>
        </div>
    )
}

export default LoginUser
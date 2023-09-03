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
            navigate.push('/Home');
        } catch (error) {
            console.error('Error de inicio de sesión:', error);
        }
    };

    return (
        <div className="p-2">
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="username">Username:</label>
                <input
                    label="Write your username"
                    type="username"
                    name="username"
                    placeholder="Write your username"
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
                    {...register("username", { required: true })}
                />
                <p>{errors.username?.message}</p>

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    name="password"
                    placeholder="Write your password"
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
                    {...register("password", { required: true, minLength: 6 })}
                />
                <p>{errors.password?.message}</p>

                <button>Login</button>
            </form>
        </div>
    )
}

export default LoginUser
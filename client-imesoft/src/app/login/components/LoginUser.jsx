"use client"
import { useForm } from "react-hook-form";

const LoginUser = () => {
    //React Hook Form
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    //Envio de datos
    const onSubmit = (data) => console.log(data);

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
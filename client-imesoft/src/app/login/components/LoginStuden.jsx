"use client"
import { useForm } from "react-hook-form";
import Link from 'next/link'

const LoginStuden = () => {
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
                <label htmlFor="email">Email:</label>
                <input
                    label="Write your email"
                    type="email"
                    name="email"
                    placeholder="youremail@domain.tld"
                    className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md"
                    {...register("email", { required: true })}
                />
                <p>{errors.email?.message}</p>

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
            <p className="flex gap-x-2 justify-between">
                No tienes Cuenta? <Link href="/login/registerStudent" className="text-sky-500">Registrarse</Link>
            </p>
        </div>
    )
}

export default LoginStuden
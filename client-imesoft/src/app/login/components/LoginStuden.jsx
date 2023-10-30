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
        <div className="p-1">
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    label="Write your email"
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full focus:outline-none appearance-none bg-transparent font-medium border-b-2 placeholder:italic placeholder:text-slate-600 border-slate-700 text-slate-900 px-4 py-2 my-4"
                    {...register("email", { required: true })}
                />
                <p>{errors.email?.message}</p>

                <input
                    type="password"
                    name="password"
                    placeholder="Contraseña"
                    className="w-full focus:outline-none appearance-none bg-transparent placeholder:italic placeholder:text-slate-600  border-b-2 border-slate-700 text-slate-900 px-4 py-2 my-4"
                    {...register("password", { required: true, minLength: 6 })}
                />
                <p>{errors.password?.message}</p>
                <div className='flex items-center justify-center my-4'>
                    <button className='bg-slate-900 text-white w-1/2 font-medium hover:bg-slate-800 p-2 rounded-full'>Ingresar</button>
                </div>
            </form>
            <p className="flex gap-x-2 justify-between">
                ¿No tenes Cuenta? <Link href="/login/registerStudent" className="text-slate-400 hover:text-slate-500">Registrarse</Link>
            </p>
        </div>
    )
}

export default LoginStuden
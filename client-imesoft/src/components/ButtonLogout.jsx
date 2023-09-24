"use client"

import React from 'react'
import { useDispatch } from 'react-redux'
import { outUser } from '../redux/features/userSlice'
import { useLogoutUserMutation } from '../redux/services/userApi.js';
import { useRouter } from 'next/navigation';
import { signOut } from "next-auth/react";

const ButtonLogout = () => {
  
    const navigate = useRouter();
    const dispatch = useDispatch();
    const [logoutUser] = useLogoutUserMutation();
    const logOut = async() => {
        const result = logoutUser();
        dispatch(outUser());
        await signOut({
          callbackUrl: "/login",
        })
    }
  
    return (
    <button onClick={() => {logOut()}} className='btn bg-red-700 p-1 text-white'>Cerrar Sesion</button>
  )
}

export default ButtonLogout;
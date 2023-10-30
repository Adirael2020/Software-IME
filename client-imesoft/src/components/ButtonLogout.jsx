"use client"

import React from 'react'
import { useDispatch } from 'react-redux'
import { outUser } from '../redux/features/userSlice'
import { useLogoutUserMutation } from '../redux/services/authApi.js';
import { signOut } from "next-auth/react";

const ButtonLogout = () => {
  
    const dispatch = useDispatch();
    const [logoutUser] = useLogoutUserMutation();
    const logOut = async() => {
        const result = logoutUser();
        await signOut({
          callbackUrl: "/login",
        });
        dispatch(outUser());
    }
  
    return (
    <button onClick={() => {logOut()}} className='btn bg-red-700 p-2 mx-2 text-white hover:underline underline-offset-4'>Cerrar Sesion</button>
  )
}

export default ButtonLogout;
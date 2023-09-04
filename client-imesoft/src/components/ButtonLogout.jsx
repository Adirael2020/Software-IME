"use client"

import React from 'react'
import { useDispatch } from 'react-redux'
import { outUser } from '@/redux/features/userSlice'
import { useLogoutUserMutation } from '@/redux/services/userApi';
import { useRouter } from 'next/navigation';

const ButtonLogout = () => {
  
    const navigate = useRouter();
    const dispatch = useDispatch();
    const [logoutUser] = useLogoutUserMutation();
    const logOut = async() => {
        const result = logoutUser();
        console.log(result);
        await dispatch(outUser());
        navigate.push('/login');
    }
  
    return (
    <button onClick={() => {logOut()}} className='btn bg-red-700 p-2 text-white'>Cerrar Sesion</button>
  )
}

export default ButtonLogout;
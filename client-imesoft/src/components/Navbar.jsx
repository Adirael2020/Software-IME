"use client"
import React from 'react'
import Button from './Button'
import ButtonLogout from './ButtonLogout'
import { useRouter, usePathname } from "next/navigation";


export default function Navbar() {

  const navigate = useRouter();
  const pathname = usePathname();

 return (
  <nav className="bg-slate-900 flex items-center py-3 justify-between px-24 text-white">
    <Button text={"Home"} onClick={() => navigate.push("/homePage")}/>
    {pathname !== "/homePage" && 
      <Button text={"Back"} onClick={() => navigate.back()}/>
    }
    <ButtonLogout/>
  </nav>      
  )
}

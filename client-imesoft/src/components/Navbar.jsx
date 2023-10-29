"use client"
import React, { useState } from 'react'
import Button from './Button'
import ButtonLogout from './ButtonLogout'
import ProfileUser from './ProfileUser.jsx'
import { useRouter, usePathname } from "next/navigation";


export default function Navbar() {

  const navigate = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeModal = () => {
    setOpen(false)
  }

 return (
  <div>
    <nav className="bg-slate-900 flex items-center py-3 justify-between px-24 text-white">
      <Button text={"Home"} onClick={() => navigate.push("/homePage")}/>
      {pathname !== "/homePage" && 
        <Button text={"Back"} onClick={() => navigate.back()}/>
      }
      <div>
        { !open && <Button text={"Perfil"} onClick={()=>{setOpen(true)}}/>}
        <ButtonLogout/>
      </div>
    </nav>      
      {open && <ProfileUser closeModal={closeModal}/>}
  </div>
  )
}

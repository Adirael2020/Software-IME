import React from 'react'
import Button from './Button'
import ButtonLogout from './ButtonLogout'


export default function Navbar() {
 return (
  <nav className="bg-slate-900 flex items-center py-3 justify-between px-24 text-white">
    <ButtonLogout/>
  </nav>      
  )
}

import React from 'react'
import Button from './Button'
import ButtonLogout from './ButtonLogout'


export default function Navbar() {
 return (
    <div className='shadow-md w-full fixed top-0 left-0'>
      <div className='md:flex items-center justify-between bg-white py-4 md:px-10 px-7'>
      <div className='font-bold text-2xl cursor-pointer flex items-center font-[Poppins] 
      text-gray-800'>
        Designer
      </div>
      </div>

        <Button>
          Get Started
        </Button>
        <ButtonLogout/>
      </div>
  )
}

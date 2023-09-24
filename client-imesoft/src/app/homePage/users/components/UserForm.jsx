"use client"

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
//Formulario
import { useForm } from "react-hook-form";
//Components 
import Button from "../../../../components/Button.jsx";
//redux


const UserForm = () => {

  const navigate = useRouter();
  const params = useParams();

  //React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors: formErrors },
    reset
  } = useForm();
  //Messange
  const [message, setMessage] = useState();

  return (
    <div>UserForm</div>
  )
}

export default UserForm
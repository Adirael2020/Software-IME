"use client"
import FormHead from "../components/FormHead"
import { useParams } from "next/navigation"

const FormHeadquearter = () => {

  const params = useParams();

  return (
    <div>
      {params.id !== "newHeadquearter" ?
      <div>Edicion</div>
      :
      <div>Nueva Sede</div>
    }
      <FormHead/>
    </div>
  )
}

export default FormHeadquearter
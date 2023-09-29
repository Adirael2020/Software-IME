"use client"
import { useState } from 'react'
//Componets
import Button from "../../../../components/Button.jsx"
import ModalSpectForm from './ModalSpecForm.jsx';
//redux
import { useDeleteSpecialtyMutation } from "../../../../redux/services/specialtyApi.js";


const SpecialtyCard = ({ specialty }) => {

  //Modal Edit
  const [openEdit,setOpenEdit] = useState(false);
  const closeModal = () => {
    setOpenEdit(false);
  };

  const [deleteSpecialty] = useDeleteSpecialtyMutation();

  return (
    <div>
      <div>{specialty.name}</div>
      <Button text={"Editar"} onClick={() => {setOpenEdit(true)}} className="bg-gray-600 text-white ml-4 p-2" />
      <Button text={"ELiminar"} onClick={() => {deleteSpecialty(specialty._id);}} className="bg-red-700 text-white ml-4 p-2" />
      {openEdit && <ModalSpectForm option={"edit"} closeModal={closeModal} />}
    </div>
  )
}

export default SpecialtyCard
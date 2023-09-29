"use client"

import { useState } from 'react'

//Components
import Button from '../../../components/Button.jsx'
import ModalSpectForm from './components/ModalSpecForm.jsx'
import Loading from '../../../components/Loading.jsx'
import SpecialtyCard from './components/SpecialtyCard.jsx'

//Redux
import { useGetSpecialtiesQuery } from '../../../redux/services/specialtyApi.js'


const specialty = () => {

    const [openNew,setOpenNew] = useState(false);

    const closeModal = () => {
        setOpenNew(false);
      };

    //Cargar sedes
    const { data, isLoading, isError } = useGetSpecialtiesQuery();
    function renderMain(data, isLoading) {
        if (isLoading) {
          return <Loading />;
        } else if (data.length === 0) {
          return <div>No hay Especialidades Cargadas</div>;
        } else {
          return data.map((specialty) => {
            return <SpecialtyCard specialty={specialty} key={specialty._id} />;
          });
        }
      }

    return (
        <div>
            <div>
                Especialidades
                <Button text={"Nueva"} className="bg-green-500 p-2" onClick={() => {setOpenNew(true)}}/>
            </div>
            <div>
                Lista
                {renderMain(data,isLoading)}
            </div>
            {openNew && <ModalSpectForm option={"new"} closeModal={closeModal} />}
        </div>

    )
}

export default specialty
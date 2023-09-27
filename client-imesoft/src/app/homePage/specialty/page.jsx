"use client"

import { useState } from 'react'

//Components
import Button from '../../../components/Button.jsx'
import ModalForm from './components/ModalForm.jsx'


const specialty = () => {

    const [openNew,setOpenNew] = useState(false);

    return (
        <div>
            <div>
                Especialidades
                <Button text={"Nueva"} className="bg-green-500 p-2" onClick={() => {setOpenNew(true)}}/>
            </div>
            <div>
                Lista
            </div>
            {openNew && <ModalForm option={"new"}/>}
        </div>

    )
}

export default specialty
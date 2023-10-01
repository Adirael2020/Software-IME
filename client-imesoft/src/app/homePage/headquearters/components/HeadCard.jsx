"use client"
import { useRouter } from "next/navigation";
//Componets
import Button from "../../../../components/Button.jsx"
//Redux
import { useDeleteHeadquearterMutation } from "../../../../redux/services/headquearterApi.js";

const HeadCard = ({ headquearter }) => {

    const navigate = useRouter();
    const [deleteHeadquearter, isLoading] = useDeleteHeadquearterMutation();

    return (
        <div>
            <div>{headquearter.name} {headquearter.abbreviation}</div>
            <Button text={"Editar"} onClick={()=> {navigate.push(`/homePage/headquearters/${headquearter._id}`)}} className="bg-gray-600 text-white ml-4 p-2"/>
            <Button text={"ELiminar"} onClick={() => {deleteHeadquearter(headquearter._id);}} className="bg-red-700 text-white ml-4 p-2"/>
        </div>
    )
}

export default HeadCard;
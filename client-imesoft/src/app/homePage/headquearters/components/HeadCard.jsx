"use client"
import Button from "@/components/Button"

const HeadCard = ({ headquearter }) => {
    console.log("Entra");
    console.log(headquearter);
    return (
        <div>
            <div>{headquearter.name} {headquearter.abbreviation}</div>
            <Button text={"Editar"} />
            <Button text={"ELiminar"} />
        </div>
    )
}

export default HeadCard
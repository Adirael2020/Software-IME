"use client"
import Button from "@/components/Button"

const HeadCard = ({ headquearter }) => {
    return (
        <div>
            <div>{headquearter.name} {headquearter.abbreviation}</div>
            <Button text={"Editar"} />
            <Button text={"ELiminar"} />
        </div>
    )
}

export default HeadCard
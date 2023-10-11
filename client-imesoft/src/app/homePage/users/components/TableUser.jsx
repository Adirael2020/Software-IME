"use client"
import Button from "../../../../components/Button"
import { useRouter } from "next/navigation";

const TableUser = ({ data }) => {

    const navigate = useRouter();

    return (
        <div className="p-4">
            <table>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Jerarquia</th>
                        <th>Sede</th>
                        <th>Config</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user) => (
                        <tr key={user._id}>
                            <td>{user.fullname}</td>
                            <td>{user.hierarchy}</td>
                            <td className="flex p-2">{user.headquearters.map((headquearters) => {
                                return(
                                    <div className="pl-2" key={headquearters._id}>
                                        {headquearters.name}
                                    </div>
                                )
                            })}</td>
                            <td>
                               <Button text={"Editar"} className="bg-slate-500 text-white p-2 ml-2" onClick={() => { navigate.push(`/homePage/users/${user._id}`); }}/>
                               <Button text={"Contraseña"} className="bg-slate-500 text-white p-2 ml-2"/>
                               <Button text={"Baja"} className="bg-red-500 text-white p-2 ml-2"/>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableUser
"use client"
import { useRouter } from "next/navigation";
//components
import Button from "../../../components/Button";

const UserPage = () => {

  const navigate = useRouter();

  return (
    <div>
      <div>
        Lista de Usuarios
      </div>
      <Button text={"Nuevo Usuario"} className="bg-green-600 p-2" onClick={()=>{navigate.push('/homePage/users/newUser');}} />
    </div>
  )
}

export default UserPage;
"use client"
import { useRouter } from "next/navigation";
//components
import Button from "../../../components/Button";
import TableUser from "./components/TableUser.jsx";
import Loading from "../../../components/Loading";
//redux
import { useGetUsersQuery } from "../../../redux/services/userApi";

const UserPage = () => {

  const navigate = useRouter();
  const { data, isLoading } = useGetUsersQuery();
  //console.log(data);

  return (
    <div>
      {isLoading
        ? <Loading />
        :
        <div>
          <div>
            Lista de Usuarios
          </div>
          <div>
            <TableUser data={data} />
          </div>
          <Button text={"Nuevo Usuario"} className="bg-green-600 p-2" onClick={() => { navigate.push('/homePage/users/newUser'); }} />
        </div>
      }
    </div>
  )
}

export default UserPage;
"use client";
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

  if (isLoading) {
    return <Loading />;
  }

  const result = data.reduce(
    (acc, user) => {
      if (user.isActive) {
        acc.activeUsers.push(user);
      } else {
        acc.inactiveUsers.push(user);
      }
      return acc;
    },
    { activeUsers: [], inactiveUsers: [] }
  );
  const activeUsers = result.activeUsers;
  const inactiveUsers = result.inactiveUsers;


  return (
    <div>
      <div>
        <Button
          text={"Nuevo Usuario"}
          className="bg-green-600 p-2"
          onClick={() => {
            navigate.push("/homePage/users/newUser");
          }}
        />
      </div>
      <div>Lista de Usuarios Activos</div>
      <div>
        <TableUser data={activeUsers} />
      </div>
      <div>Lista de Usuarios Inactivos</div>
      <div>
        <TableUser data={inactiveUsers} />
      </div>
    </div>
  );
};

export default UserPage;

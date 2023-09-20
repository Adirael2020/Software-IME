"use client"
import { useRouter } from "next/navigation";
//Components
import Loading from "../../../components/Loading.jsx";
import HeadCard from "./components/HeadCard";
import Button from "../../../components/Button.jsx";
//Redux
import { useGetHeadqueartersQuery } from "../../../redux/services/headquearterApi.js"

const HeadquearterList = () => {
  const navigate = useRouter();
  const { data, isLoading, isError } = useGetHeadqueartersQuery();

  function renderMain(data, isLoading) {
    if (isLoading) {
      return <Loading />;
    } else if (data.length === 0) {
      return <div>No hay Sedes Cargadas</div>;
    } else {
      return data.map((headquearter) => {
        return <HeadCard headquearter={headquearter} key={headquearter._id} />;
      });
    }
  }

  return (
    <div>
      Lista <Button text={"Nueva Sede"} className="bg-green-600 p-2" onClick={()=>{navigate.push('/homePage/headquearters/newHeadquearter');}} />
      <div>
        {renderMain(data,isLoading)}
      </div>
    </div>
  )
}

export default HeadquearterList
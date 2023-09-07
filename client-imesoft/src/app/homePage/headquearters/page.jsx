"use client"
import Loading from "@/components/Loading";
import HeadCard from "./components/HeadCard";

import { useGetHeadqueartersQuery } from "@/redux/services/headquearterApi"

const HeadquearterList = () => {

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
      Lista
      <div>
        {renderMain(data,isLoading)}
      </div>
    </div>
  )
}

export default HeadquearterList
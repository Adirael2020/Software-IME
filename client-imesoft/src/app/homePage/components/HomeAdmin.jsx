"use client"
import Button from "../../../components/Button.jsx"
import Link from "next/link";

const HomeAdmin = () => {
  return (
    <div>
      <h1>Home Admin</h1>
      <div className="p-2">
        <Link href="/homePage/headquearters">
          <h1>Sedes</h1>
        </Link>
      </div>
      <div className="p-2">
        <Link href="/homePage/users">
          <h1>Usuarios</h1>
        </Link>
      </div>
      <div className="p-2">
        <Link href="/homePage/specialty">
          <h1>Especialidades</h1>
        </Link>
      </div>
    </div>
  )
}

export default HomeAdmin
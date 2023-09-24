"use client"
import Button from "../../../components/Button.jsx"
import Link from "next/link";

const HomeAdmin = () => {
  return (
    <div>
      <h1>Home Admin</h1>
      <Link href="/homePage/headquearters">
        <h1>Sedes</h1>
      </Link>
      <Link  href="/homePage/users">
        <h1>Usuarios</h1>
      </Link>
    </div>
  )
}

export default HomeAdmin
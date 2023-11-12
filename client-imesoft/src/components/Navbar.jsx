"use client";
import React, { useState } from "react";
import Button from "./Button";
import ButtonLogout from "./ButtonLogout";
import ProfileUser from "./ProfileUser.jsx";
import { useRouter, usePathname } from "next/navigation";
import Logo from "./LogoNavbar";

export default function Navbar() {
  const navigate = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const closeModal = () => {
    setOpen(false);
  };

  return (
    <div>
      <nav className="bg-slate-900 flex items-center py-1 px-2  text-white">
        <Button text={"Back"} onClick={() => navigate.back()} />
        <a
          href="/homePage"
          onClick={(e) => {
            e.preventDefault();
            navigate.push("/homePage");
          }}
        >
          <Logo text={"Home"} />
        </a> 
        
        <div className="items-right justify mx-2">
          {!open && (
            <Button
              text={"Perfil"}
              onClick={() => {
                setOpen(true);
              }}
            />
          )}
          <ButtonLogout />
        </div>
      </nav>
      {open && <ProfileUser closeModal={closeModal} />}
    </div>
  );
}

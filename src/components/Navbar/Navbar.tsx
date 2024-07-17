"use client"
import React from "react";
import BotonNav from "../reusables/Nav/BotonNav";
import Image from "next/image";
import { IoIosLogOut } from "react-icons/io";
import { useAuth } from "../contextos/AuthContext";
import { useRouter } from "next/navigation";

function NavBar() {
  const listNavBar = ["Habitaciones", "Informacion", "Usuarios", "Promociones"];
  const { logout } = useAuth();
  const router = useRouter();

  const handleSignOut = () => {
    logout();
    router.push("/");
  };

  return (
    <div className="bg-light-white flex flex-col h-full border-right shadow-eco justify-between">
      <div>
        <div className="flex justify-center items-center m-6 ">
          <Image src="/logos/logo.svg" alt="" width={200} height={100} />
        </div>
        <div>
          {listNavBar.map((item, key) => (
            <BotonNav
              key={key}
              prop={item}
              path={
                item === "Habitaciones"
                  ? "/dashboard/Habitaciones"
                  : "/dashboard/" + item
              }
            />
          ))}
        </div>
      </div>
      <div 
        className="flex gap-2 py-4 px-4 w-[85%] border-right hover:bg-[#17858A] hover:text-white hover:shadow-eco my-4 cursor-pointer"
        onClick={handleSignOut}
      >
        <div className="text-2xl font-normal">
          <IoIosLogOut />
        </div>
        <div className="pl-2">Cerrar sesión</div>
      </div>
    </div>
  );
}

export default NavBar;

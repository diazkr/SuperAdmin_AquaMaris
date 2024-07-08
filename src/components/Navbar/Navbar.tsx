import React from "react";
import BotonNav from "../reusables/Nav/BotonNav";
import Image from "next/image";

function NavBar() {
  const listNavBar = ["Habitaciones","Informacion", "Usuarios", "Promociones"];
  return (
    <div className="bg-light-white  flex flex-col h-full border-right shadow-eco">
      <div className="flex justify-center items-center m-6 ">
        <Image src="/logos/logo.svg" alt="" width={200} height={100}/>
      </div>
      <div>
        {listNavBar.map((item, key) => (
          <BotonNav
            key={key}
            prop={item}
            path={(item == "Habitaciones" ? "/" :"/"+ item)}
          ></BotonNav>
        ))}
      </div>

    </div>
  );
}

export default NavBar;

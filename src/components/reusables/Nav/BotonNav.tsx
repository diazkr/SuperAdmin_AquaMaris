"use client";
import { BsFileEarmarkBarGraph } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { LuBedDouble } from "react-icons/lu";
import { MdDiscount } from "react-icons/md";
import { FaHotel } from "react-icons/fa";

import { usePathname } from "next/navigation";
import Link from "next/link";

const iconos = {
  Habitaciones: <LuBedDouble />,
  Informacion: <BsFileEarmarkBarGraph />,
  Usuarios: <FaUserFriends />,
  Promociones: <MdDiscount />,
};

function BotonNav({ prop, path }: { prop: string; path: string }) {
  const pathname = usePathname();
  const current = pathname == path;
  const icono = iconos[prop as keyof typeof iconos] || <FaHotel />;
  return (
    <Link
      href={path}
      className={`p-4 flex items-center w-[85%] border-right ${
        current ? "bg-[#17858A] text-white shadow-eco" : ""
      }`}
    >
      <div className="text-2xl font-normal ">{icono}</div>
      <div className="pl-2 ">{prop}</div>
    </Link>
  );
}

export default BotonNav;

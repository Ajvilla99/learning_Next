'use client';

// Next
import Link from "next/link"

// Libraries
import clsx from "clsx";
// Zustand
import { useUIStore } from "@/store";

// Icons
import { IoCloseOutline, IoLogInOutline, IoLogOutOutline, IoPeopleOutline, IoPersonOutline, IoSearchOutline, IoShirtOutline, IoTicketOutline } from "react-icons/io5"

export const Sidebar = () => {

    const isSideMenuOpen = useUIStore( state => state.isSideMenuOpen);
    const closeMenu = useUIStore( state => state.closeSideMenu);


  return (
    <div>

        {/* Background black */}
        {
            isSideMenuOpen && (
                <div
                    className="fixed top-0 left-0 w-screen h-screen z-10 bg-black opacity-30"
                />
            )
        }

        {/* Blur */}
        {
            isSideMenuOpen && (
                <div
                    onClick={ () => closeMenu() }
                    className="fade-in fixed left-0 w-screen h-screen z-10 backdrop-filter backdrop-blur-sm"
                />
            )
        }
        

        {/* SideMenu */}
        <nav
            className={
                clsx(
                    "fixed p-5 right-0 top-0 w-[500px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
                    {
                        "translate-x-full": !isSideMenuOpen
                    }
                )
            }>


            <IoCloseOutline 
                size={ 50 }
                className="absolute top-5 right-5 cursor-pointer"
                onClick={ () => closeMenu() }
            />

            {/* Input */}
            <div className="relative mt-14">
                <IoSearchOutline 
                    size={20}
                    className="absolute top-2 left-2"
                />
                <input
                    type="text"
                    placeholder="Buscar"
                    className="w-full bg-gray-50 rounded px-10 py-1 border-b-2 text-xl border-r-gray-200 focus:outline-none focus:border-blue-500"
                />
            </div>

            {/* Menú */}
            <Link
                onClick={ () => closeMenu() }
                href="/profile"
                className="flex items-center mt-7 p-2 hover:bg-gray-100 rounded transition-all"
            >
                <IoPersonOutline size={30}/>
                <span className="ml-3 text-base">Perfil</span>
            </Link>

            <Link
                onClick={ () => closeMenu() }
                href="/"
                className="flex items-center mt-7 p-2 hover:bg-gray-100 rounded transition-all"
            >
                <IoTicketOutline size={30}/>
                <span className="ml-3 text-base">Ordenes</span>
            </Link>

            <Link
                onClick={ () => closeMenu() }
                href="/"
                className="flex items-center mt-7 p-2 hover:bg-gray-100 rounded transition-all"
            >
                <IoLogInOutline size={30}/>
                <span className="ml-3 text-base">Ingresar</span>
            </Link>

            <Link
                onClick={ () => closeMenu() }
                href="/"
                className="flex items-center mt-7 p-2 hover:bg-gray-100 rounded transition-all text-red-500"
            >
                <IoLogOutOutline size={30}/>
                <span className="ml-3 text-base ">Salir</span>
            </Link>

            <div
                className="w-full h-px bg-gray-200 my-10" />

            <Link
                onClick={ () => closeMenu() }
                href="/"
                className="flex items-center mt-7 p-2 hover:bg-gray-100 rounded transition-all"
            >
                <IoShirtOutline size={30}/>
                <span className="ml-3 text-base ">Productos</span>
            </Link>

            <Link
                onClick={ () => closeMenu() }
                href="/"
                className="flex items-center mt-7 p-2 hover:bg-gray-100 rounded transition-all"
            >
                <IoTicketOutline size={30}/>
                <span className="ml-3 text-base ">Ordenes</span>
            </Link>

            <Link
                onClick={ () => closeMenu() }
                href="/"
                className="flex items-center mt-7 p-2 hover:bg-gray-100 rounded transition-all"
            >
                <IoPeopleOutline size={30}/>
                <span className="ml-3 text-base ">Usuarios</span>
            </Link>
        </nav>

    </div>
  )
}

import React from "react";
import { SideBarMenu } from "./SideBarMenu";
import { SideBarMenuItem, SideBarMenuCard } from "../../types/types";
import { FaAddressBook, FaBox, FaBoxes, FaUserCircle } from "react-icons/fa"
import { AiOutlineQuestionCircle, AiOutlineShop } from "react-icons/ai"
import { GoSignOut, GoGraph, GoOrganization, GoListOrdered } from "react-icons/go"
import {VscBell, VscBellDot} from "react-icons/vsc";
import { GrList } from "react-icons/gr"
import profileImage from "./bill.jpeg";
import { Header } from "./Header"

export const LateralMenu = ({ children }: any) => {
    const items:SideBarMenuItem[] = [
        {
            rol: ["administrador"],
            id: "1",
            label: "Notificaciones",
            icon: VscBell,
            url: "/Tienda/Notificaciones",
            type: "link",
            icon2: AiOutlineQuestionCircle,
            texto: "Accede a las notificaciones del usuario.",
        },
        {
            rol: ["administrador", "vendedor"],
            id: "2",
            label: "Perfil de Usuario",
            icon: FaUserCircle,
            url: "/Tienda/Perfil",
            type: "link",
            icon2: AiOutlineQuestionCircle,
            texto: "Despliega el perfil del usuario.",
        },
        {
            rol: ["administrador"],
            id: "3",
            label: "Registrar Usuario",
            icon: FaAddressBook,
            url: "/Tienda/RegistrarUsuario",
            type: "link",
            icon2: AiOutlineQuestionCircle,
            texto: "Registra un nuevo administrador o vendedor al sistema.",
        },
        {
            rol: ["administrador"],
            id: "4",
            label: "Registrar Producto",
            icon: FaBox,
            url: "/Tienda/RegistrarProducto",
            type: "link",
            icon2: AiOutlineQuestionCircle,
            texto: "Registra un nuevo producto al sistema.",
        },
        {
            rol: ["administrador", "vendedor"],
            id: "5",
            label: "Venta de Productos",
            icon: AiOutlineShop,
            url: "/Tienda/RealizarVenta",
            type: "link",
            icon2: AiOutlineQuestionCircle,
            texto: "Permite realizar una venta.",
        },  
        {
            rol: ["administrador", "vendedor"],
            id: "6",
            label: "Lista de Productos",
            icon: GoListOrdered,
            url: "/Tienda/ListaProductos",
            type: "link",
            icon2: AiOutlineQuestionCircle,
            texto: "Despliega el inventario y permite modificar el stock de produtos o realizar una venta.",
        },   
        {
            rol: ["administrador", "vendedor"],
            id: "7",
            label: "Reportes",
            icon: GoGraph,
            url: "/Tienda/Reporte",
            type: "link",
            icon2: AiOutlineQuestionCircle,
            texto: "Muestra diversos tipos de reportes.",
        },
        {
            rol: ["administrador", "vendedor"],
            id: "8",
            label: "Cerrar Sesión",
            icon: GoSignOut,
            url: "/",
            type: "button",
            icon2: AiOutlineQuestionCircle,
            texto: "Cierra sesión.",
        },
    ];
    const card:SideBarMenuCard = {
        id: "",
        displayName: "",
        title: "",
        photoUrl: "",
        url: "",
    };
    return (
        <>
            <div>
                <SideBarMenu items={items} card={card} />
            </div>
            <main >
                
                {children}
            </main>
        </>
    );
}
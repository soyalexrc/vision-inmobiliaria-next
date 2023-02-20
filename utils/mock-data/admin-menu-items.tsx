import React from 'react';
import WidgetsIcon from "@mui/icons-material/Widgets";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import ApartmentIcon from "@mui/icons-material/Apartment";
import GroupsIcon from "@mui/icons-material/Groups";
import VolunteerActivismIcon from "@mui/icons-material/VolunteerActivism";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import PollIcon from '@mui/icons-material/Poll';

interface AdminMenu {
  title: string;
  path?: string;
  value: string;
  icon: JSX.Element;
  id: number;
  roles: string[],
  children?: AdminMenuSubPath[]
}

interface AdminMenuSubPath {
  title: string;
  path: string;
  value: string;
  id: number;
}

export const ADMIN_MENU_ITEMS: AdminMenu[] = [
  {
    title: "Inicio",
    path: "/admin",
    value: "inicio",
    icon: <WidgetsIcon style={{ color: "white" }} />,
    id: 2,
    roles: [
      "Administrador",
      "Asesor inmobiliario Vision",
      "Coordinador de servicios",
    ],
  },
  {
    title: "Propietarios",
    path: "/admin/propietarios",
    icon: <AssignmentIndIcon style={{ color: "white" }} />,
    value: "propietarios",
    id: 5,
    roles: ["Administrador"],
  },
  {
    title: "Usuarios",
    path: "/admin/usuarios",
    icon: <PeopleAltIcon style={{ color: "white" }} />,
    value: "usuarios",
    id: 4,
    roles: ["Administrador"],
  },
  {
    title: "Propiedades",
    path: "/admin/propiedades",
    icon: <ApartmentIcon style={{ color: "white" }} />,
    value: "propiedades",
    id: 3,
    roles: [
      "Administrador",
      "Asesor inmobiliario Vision",
      "Coordinador de servicios",
    ],
  },
  {
    title: "Asesores Externos",
    path: "/admin/asesores-externos",
    value: "asesores-externos",
    icon: <GroupsIcon style={{ color: "white" }} />,
    id: 9,
    roles: ["Administrador"],
  },
  {
    title: "Aliados",
    path: "/admin/aliados",
    value: "aliados",
    icon: <VolunteerActivismIcon style={{ color: "white" }} />,
    id: 1,
    roles: ["Administrador"],
  },
  {
    title: "Administracion",
    path: "/admin/administracion",
    icon: <AdminPanelSettingsIcon style={{ color: "white" }} />,
    value: "administracion",
    id: 6,
    roles: ["Administrador"],
  },
  {
    title: "Formatos",
    icon: <PollIcon style={{ color: "white" }} />,
    value: "formatos",
    id: 7,
    roles: ["Administrador"],
    children: [
      {
        title: 'Clientes',
        path: '/admin/formatos/clientes',
        id: 71,
        value: 'formatos-clientes'
      },
      {
        title: 'Flujo de efectivo',
        path: '/admin/formatos/flujo-de-efectivo',
        id: 71,
        value: 'formatos-flujo-efectivo'
      },
      {
        title: 'Calculo de comisiones',
        path: '/admin/formatos/calculo-de-comisiones',
        id: 71,
        value: 'formatos-calculo-comisiones'
      },
    ]
  },
];

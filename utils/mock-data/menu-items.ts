export interface MenuElement {
  id: number;
  label: string;
  path?: string;
  children?: MenuChild[]
}

export interface MenuChild {
  id: number;
  label: string;
  path?: string;
}
export const MENU_ITEMS: MenuElement[] = [
  {
    id: 1,
    label: "inicio",
    path: "/",
  },
  {
    id: 2,
    label: "Venta",
    path: "/venta",
  },
  {
    id: 3,
    label: "Alquiler",
    path: "/alquiler",
    children: [
      {
        id: 31,
        label: "Estadias vacacionales",
        path: "/alquiler/estadias-vacacionales",
      },
      {
        id: 32,
        label: "Temporadas largas",
        path: "/alquiler/temporadas-largas",
      },
    ],
  },
  {
    id: 4,
    label: "Servicios",
    path: "/servicios",
    children: [
      { id: 41, label: "Inmobiliario", path: "/servicios#inmobiliario" },
      {
        id: 42,
        label: "Administración de inmuebles alquilados",
        path: "/servicios#administracion-de-inmuebles-alquilados",
      },
      {
        id: 43,
        label: "Trámites legales",
        path: "/servicios#tramites-legales",
      },
      {
        id: 44,
        label: "Gestión contable",
        path: "/servicios#gestion-contable",
      },
      { id: 45, label: "Ama de llaves", path: "/servicios#ama-de-llaves" },
      { id: 46, label: "Remodelación", path: "/servicios#remodelacion" },
      {
        id: 47,
        label: "Mantenimiento de inmuebles",
        path: "/servicios#mantenimiento-de-inmuebles",
      },
    ],
  },
  {
    id: 5,
    label: "Acerca de Vision",
    path: "/acerca-de-nosotros",
    children: [
      { id: 51, label: "Acerca de nosotros", path: "/acerca-de-nosotros" },
      {
        id: 52,
        label: "Nuestro equipo de trabajo",
        path: "/acerca-de-nosotros#equipo-de-trabajo",
      },
      { id: 53, label: "Comentarios", path: "/acerca-de-nosotros/comentarios" },
    ],
  },
  {
    id: 6,
    label: "Contacto",
    path: "/contacto",
    children: [
      { id: 61, label: "Contactanos", path: "/contacto" },
      {
        id: 62,
        label: "Trabaja con nosotros",
        path: "/contacto/trabaja-con-nosotros",
      },
    ],
  },
];



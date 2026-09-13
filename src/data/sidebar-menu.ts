import { MenuItem } from "@/interFace/interFace";

export const getMenuData = (t: (arg0: string) => string): MenuItem[] => [
  {
    label: "Dashboard",
    routeLink: "/dashboard",
    iconClas: "fal fa-chart-line",
  },
  {
    label: "Usuarios y Membresías",
    routeLink: "/users",
    iconClas: "fal fa-users-cog",
  },
  {
    label: "Mi Perfil",
    routeLink: "/profile",
    iconClas: "fal fa-user-shield",
  },
];

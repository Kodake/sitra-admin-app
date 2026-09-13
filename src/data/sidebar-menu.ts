import { MenuItem } from "@/interFace/interFace";

export const getMenuData = (t: (arg0: string) => string): MenuItem[] => [
  {
    label: t("dashboard"),
    routeLink: "/dashboard",
    iconClas: "fal fa-chart-line",
  },
  {
    label: t("usersAndMemberships"),
    routeLink: "/users",
    iconClas: "fal fa-users-cog",
  },
  {
    label: t("myProfile"),
    routeLink: "/profile",
    iconClas: "fal fa-user-shield",
  },
];

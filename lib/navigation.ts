import { NavigationItems } from "@/interfaces/navigationItem";
import { Home, Leaf, RadioReceiver, Droplets, Settings } from "lucide-react";

export const publicPageNavigation: NavigationItems[] = [
  {
    title: "Início",
    href: "/",
  },
  {
    title: "Funcionalidades",
    href: "#funcionalidades",
  },
  {
    title: "Como funciona",
    href: "#como-funciona",
  },
  {
    title: "Hardware",
    href: "#hardware",
  },
  {
    title: "FAQ",
    href: "#faq",
  },
];

export const dashboardNavigationItems = {
  documents: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      name: "Minhas Plantas",
      url: "/dashboard/my-plants",
      icon: Leaf,
    },
    {
      name: "Meus dispositivos",
      url: "/dashboard/devices",
      icon: RadioReceiver,
    },
    {
      name: "Histórico de irrigação",
      url: "/dashboard/irrigation-history",
      icon: Droplets,
    },
  ],
};
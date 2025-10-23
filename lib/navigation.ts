import { NavigationItems } from "@/interfaces/navigationItem";
import { Home, Leaf, RadioReceiver, Droplets } from "lucide-react";

export const publicPageNavigation: NavigationItems[] = [
  {
    title: "Início",
    href: "/",
  },
  {
    title: "Funcionalidades",
    href: "/#funcionalidades",
  },
  {
    title: "Como funciona",
    href: "/#como-funciona",
  },
  {
    title: "Hardware",
    href: "/#hardware",
  },
  {
    title: "FAQ",
    href: "/#faq",
  },
  {
    title: "Sobre nós",
    href: "/about-us",
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
      name: "Meus dispositivos",
      url: "/dashboard/devices",
      icon: RadioReceiver,
    },
    {
      name: "Minhas Plantas",
      url: "/dashboard/my-plants",
      icon: Leaf,
    },
    {
      name: "Histórico de irrigação",
      url: "/dashboard/irrigation-history",
      icon: Droplets,
    },
  ],
};
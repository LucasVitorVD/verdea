"use client";

import * as React from "react";
import { Home, Leaf, Settings, Droplets, RadioReceiver } from "lucide-react";

import { NavSections } from "@/components/nav-sections";
import { NavMain } from "@/components/nav-main";
import { NavSecondary } from "@/components/nav-secondary";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Droplet } from "lucide-react";
import Link from "next/link";

const data = {
  documents: [
    {
      name: "Dashboard",
      url: "/dashboard",
      icon: Home,
    },
    {
      name: "Minhas Plantas",
      url: "/plants",
      icon: Leaf,
    },
    {
      name: "Meus dispositivos",
      url: "/devices",
      icon: RadioReceiver,
    },
    {
      name: "Histórico de irrigação",
      url: "/irrigation-history",
      icon: Droplets,
    },
  ],
  navSecondary: [
    {
      title: "Configurações",
      url: "/settings",
      icon: Settings,
    }
  ]
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <Link href="/" className="flex items-center gap-1.5">
                <Droplet className="size-6 text-primary" />
                <span className="text-xl font-bold">Verdea</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain />
        <NavSections items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  );
}

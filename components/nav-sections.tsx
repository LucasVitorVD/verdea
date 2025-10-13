"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { IconUserStar } from "@tabler/icons-react";
import { LucideProps } from "lucide-react";
import { usePathname } from "next/navigation";
import { Badge } from "./ui/badge";
import { useAuth } from "@/context/AuthContext";

interface NavSectionsProps {
  items: {
    name: string;
    url: string;
    icon: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
  }[];
}

export function NavSections({ items }: NavSectionsProps) {
  const { userQuery: user } = useAuth();
  const pathName = usePathname();

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Seções</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenuItem
            key={item.name}
            className={
              pathName === item.url
                ? "transition-all border-r-2 border-primary"
                : ""
            }
          >
            <SidebarMenuButton asChild>
              <a href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
        {user.data && user.data.role === "ADMIN" && (
          <SidebarMenuItem
            className={
              pathName === "/dashboard/admin"
                ? "transition-all border-r-2 border-primary"
                : ""
            }
          >
            <SidebarMenuButton asChild>
              <a href={"/dashboard/admin"}>
                <IconUserStar />
                <span>Gerenciamento</span>
                <Badge>Admin</Badge>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}

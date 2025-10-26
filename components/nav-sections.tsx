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
import Link from "next/link";

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
        {user.data && user.data.role === "USER" && items.map((item) => (
          <SidebarMenuItem
            key={item.name}
            className={
              pathName === item.url
                ? "transition-all border-r-2 border-primary"
                : ""
            }
          >
            <SidebarMenuButton asChild>
              <Link href={item.url}>
                <item.icon />
                <span>{item.name}</span>
              </Link>
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
              <Link href={"/dashboard/admin"}>
                <IconUserStar />
                <span>Gerenciamento</span>
                <Badge>Admin</Badge>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
}

"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import Link from "next/link";

export default function ProfileAvatar() {
  const { logoutMutation, userQuery } = useAuth()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Avatar>
          <AvatarFallback>{userQuery.data?.email.slice(0, 2).toUpperCase() ?? "CN"}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Perfil</DropdownMenuItem>
        <DropdownMenuItem>
          <Link href="/dashboard">Dashboard</Link>
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-500 hover:text-red-400" onClick={() => logoutMutation.mutate()}>
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

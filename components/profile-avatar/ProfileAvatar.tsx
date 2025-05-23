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
import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function ProfileAvatar() {
  const router = useRouter();

  const mutation = useMutation({
    mutationFn: async () => {
      return axiosInstance.post(process.env.NEXT_PUBLIC_API_URL + "/auth/logout");
    },
    onSuccess: () => {
      toast.success("Logout realizado com sucesso!");
      router.push("/register?tab=login");
    },
    onError: () => {
      toast.error("Erro ao realizar logout!");
    },
    retry: 2,
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Minha conta</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Perfil</DropdownMenuItem>
        <DropdownMenuItem>Dashboard</DropdownMenuItem>
        <DropdownMenuItem className="text-red-500 hover:text-red-400" onClick={() => mutation.mutate()}>
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

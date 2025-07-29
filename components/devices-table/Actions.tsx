"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Device } from "@/interfaces/device";
import axiosInstance from "@/lib/axios";
import { useMutation } from "@tanstack/react-query";
import { MoreHorizontal, Copy, Eye, SquarePen, Trash2 } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface ActionsProps {
  device: Device;
}

export default function Actions({ device }: ActionsProps) {
  const queryClient = useQueryClient();

  const deleteDeviceMutation = useMutation({
    mutationFn: async (deviceId: number) => {
      return axiosInstance.delete(
        process.env.NEXT_PUBLIC_API_URL + `/device/delete/${deviceId}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserDevices"] });
      toast.success("Dispositivo excluído!");
    },
    onError: () => {
      toast.error("Erro ao excluir dispositivo. Por favor, tente novamente.");
    }
  });

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Abrir menu</span>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Ações</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex items-center gap-2"
          onClick={() => navigator.clipboard.writeText(device.macAddress)}
        >
          <Copy />
          Copiar endereço MAC
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <Eye />
          Ver detalhes
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center gap-2">
          <SquarePen />
          Alterar informações
        </DropdownMenuItem>
        <DropdownMenuItem
          className="flex items-center gap-2 text-destructive cursor-pointer hover:underline"
          onClick={() => deleteDeviceMutation.mutate(device.id)}
        >
          <Trash2 className="text-destructive" />
          Remover
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

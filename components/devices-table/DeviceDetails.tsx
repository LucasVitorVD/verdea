"use client";

import { Device } from "@/interfaces/device";
import { Activity, Router, Sprout, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import EmptyState from "../empty-state";
import GardeningIllustration from "@/public/images/illustrations/undraw_gardening.svg";
import Link from "next/link";

interface Props {
  device: Device;
}

export default function DeviceDetails({ device }: Props) {
  const queryClient = useQueryClient();

  const deleteDeviceMutation = useMutation({
    mutationFn: async (id: number) => {
      return axiosInstance.delete(
        process.env.NEXT_PUBLIC_API_URL + `/device/delete/${id}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserDevices"] });
      toast.success("Dispositivo removido!");
    },
    onError: () => {
      toast.error("Não foi possível remover o dispositivo!");
    },
    retry: 2,
  });

  const handleResetWifi = async (device: Device) => {
    if (!device.currentIp) {
      toast.error("IP do dispositivo não encontrado!");
      return;
    }

    try {
      const response = await fetch("/api/reset-wifi", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ip: device.currentIp,
          username: process.env.NEXT_PUBLIC_ESP_USER,
          password: process.env.NEXT_PUBLIC_ESP_PASS,
        }),
      });

      if (response.status >= 200 && response.status < 300) {
        toast.success("Dispositivo resetou o Wi-Fi!");
      } else {
        toast.warning("Não foi possível resetar o Wi-Fi!");
      }
    } catch (err) {
      toast.error("❌ Erro ao se comunicar com o dispositivo!");
    }
  };

  return (
    <div className="flex flex-col flex-1 p-4 gap-4">
      <div className="flex flex-col flex-1 gap-6">
        <div className="flex items-center gap-4 py-4 border-t-1">
          <div className="flex items-center justify-center bg-primary p-3 rounded-full">
            <Router className="size-6 text-secondary" />
          </div>
          <div>
            <p>{device.name}</p>
            <p className="text-muted-foreground text-sm">{device.macAddress}</p>
          </div>
        </div>
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Planta Conectada</CardTitle>
          </CardHeader>
          <CardContent>
            {!device.plantSummary ? (
              <div className="flex flex-col items-center justify-center gap-4">
                <EmptyState
                  title="Nenhuma planta encontrada"
                  description="Você ainda não adicionou nenhuma planta. Clique no botão abaixo para adicionar sua primeira planta."
                  imgSrc={GardeningIllustration}
                  imgAlt="Sem plantas"
                />

                <Button asChild>
                  <Link href="/dashboard/my-plants">Adicionar planta</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={device.plantSummary.imageUrl} />
                      <AvatarFallback className="bg-primary">
                        <Sprout className="h-4 w-4 text-secondary" />
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p>{device.plantSummary.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {device.plantSummary.species}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="flex flex-col gap-2">
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="outline" className="w-full bg-transparent">
              <Activity className="mr-2 h-4 w-4" />
              Resetar Wi-Fi do Dispositivo
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Resetar conexão Wi-Fi</AlertDialogTitle>
              <AlertDialogDescription>
                Você está prestes a resetar a conexão Wi-Fi do dispositivo "
                {device.name}". Após esta ação, será necessário cadastrar a rede
                Wi-Fi novamente.
                <strong>
                  Os dados do dispositivo e das plantas conectadas não serão
                  apagados.
                </strong>
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                className="bg-yellow-500 cursor-pointer hover:bg-bg-yellow-500/90"
                onClick={() => handleResetWifi(device)}
              >
                Resetar Wi-Fi
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive" className="w-full">
              <Trash2 className="mr-2 h-4 w-4" />
              Remover Dispositivo
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Remover dispositivo</AlertDialogTitle>
              <AlertDialogDescription>
                Tem certeza que deseja remover o dispositivo "{device.name}"?
                Esta ação não pode ser desfeita e todas as plantas conectadas a
                este dispositivo ficarão sem monitoramento.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancelar</AlertDialogCancel>
              <AlertDialogAction
                className="bg-destructive cursor-pointer hover:bg-destructive/90"
                onClick={() => deleteDeviceMutation.mutate(device.id)}
              >
                Remover
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}

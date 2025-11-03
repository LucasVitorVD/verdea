import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import type { Device, DeviceAdmin, DeviceAvailable } from "@/interfaces/device";
import type { AxiosError } from "axios";

interface AssignData {
  email?: string;
  macAddress: string;
}

export function useDevices(isAdmin: boolean = false) {
  const queryClient = useQueryClient();
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;
  const queryKey = [isAdmin ? "admin" : "user", "devices"];

  const devicesQuery = useQuery({
    queryKey,
    queryFn: async <T extends boolean>() => {
      try {
        const url = `${baseUrl}${isAdmin ? "/admin/devices" : "/device/my-devices"}`

        const response = await axiosInstance.get(url);

        return response.data as T extends true ? DeviceAvailable[] : DeviceAdmin[] | Device[];
      } catch (error) {
        toast.error("Erro ao carregar dispositivos.");
      }
    },
    refetchOnWindowFocus: false,
  });

  const assignDevice = useMutation({
    mutationFn: async (assignData: AssignData) => {
      const url = `${baseUrl}${isAdmin ? "/admin/devices/assign" : "/device/assign"}`

      if (isAdmin) {
        return axiosInstance.patch(url, assignData);
      }

      return axiosInstance.patch(
        `${url}/${assignData.macAddress}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success("Dispositivo vinculado com sucesso!");
    },
    onError: (error: AxiosError<any>) => {
      const msg =
        error.response?.data?.message ||
        "Erro ao vincular o dispositivo. Por favor, tente novamente.";
      toast.error(msg);
    },
  });

  const unassignDevice = useMutation({
    mutationFn: async (deviceId: number) => {
      const url = `${baseUrl}/admin/devices/unassign/${deviceId}`
      return axiosInstance.patch(url);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success("Dispositivo desvinculado com sucesso!");
    },
    onError: (error: AxiosError<any>) => {
      const msg =
        error.response?.data?.message ||
        "Erro ao desvincular o dispositivo. Por favor, tente novamente.";
      toast.error(msg);
    },
  });

  const updateDevice = useMutation({
    mutationFn: async (device: Partial<Device> & { id: number }) => {
      const url = `${baseUrl}${isAdmin ? "/admin/devices" : "/device"}`
      
      return axiosInstance.patch(`${url}/${device.id}`, device);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success("Dispositivo atualizado com sucesso!");
    },
    onError: (error: AxiosError<any>) => {
      const msg =
        error.response?.data?.message ||
        "Erro ao atualizar o dispositivo. Por favor, tente novamente.";
      toast.error(msg);
    },
  });

  const deleteDevice = useMutation({
    mutationFn: async (id: number) => {
      const url = `${baseUrl}${isAdmin ? "/admin/devices" : "/device"}`

      return axiosInstance.delete(`${url}/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success("Dispositivo removido com sucesso!");
    },
    onError: (error: AxiosError<any>) => {
      const msg =
        error.response?.data?.message ||
        "Erro ao remover o dispositivo. Por favor, tente novamente.";
      toast.error(msg);
    },
  });

  const resetWifi = useMutation({
    mutationFn: async (id: number) => {
      const url = `${baseUrl}${isAdmin ? "/admin/devices/reset-wifi" : "/device/reset-wifi"}`

      if (isAdmin) {
        return axiosInstance.post(`${url}/${id}`);
      }

      return axiosInstance.post(
        `${url}/${id}`
      );
    },
    onSuccess: () => {
      toast.success("Wifi resetado com sucesso!");
    },
    onError: (error: AxiosError<any>) => {
      const msg =
        error.response?.data?.message ||
        "Erro ao resetar o Wifi do dispositivo. Por favor, tente novamente.";
      toast.error(msg);
    },
  });

  return {
    devicesQuery,
    assignDevice,
    unassignDevice,
    updateDevice,
    deleteDevice,
    resetWifi,
  };
}

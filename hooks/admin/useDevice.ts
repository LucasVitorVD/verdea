import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { Device } from "@/interfaces/device";
import { AxiosError } from "axios";

export function useDevices() {
  const queryClient = useQueryClient();

  const devicesQuery = useQuery({
    queryKey: ["admin", "devices"],
    queryFn: async () => {
      const response = await axiosInstance.get(process.env.NEXT_PUBLIC_API_URL + "/admin/devices");

      return response.data as Device[];
    },
  });

  const assignDevice = useMutation({
    mutationFn: async (assignData: { email: string, macAddress: string }) => {
      return axiosInstance.patch(process.env.NEXT_PUBLIC_API_URL + "/admin/devices/assign", assignData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "devices"] });
      toast.success("Dispositivo atualizado!");
    },
    onError: (error: any) => {
      let errorDescription =
        "Ocorreu um erro ao vincular o dispositivo. Por favor, tente novamente mais tarde.";

      toast.error(error.response.data.message || errorDescription);
    },
  });

  const updateDevice = useMutation({
    mutationFn: async (device: Partial<Device> & { id: number }) => {
      return axiosInstance.put(process.env.NEXT_PUBLIC_API_URL + `/admin/devices/${device.id}`, device);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "devices"] });
      toast.success("Dispositivo atualizado!");
    },
    onError: (error: any) => {
      let errorDescription =
        "Ocorreu um erro ao atualizar o dispositivo. Por favor, tente novamente mais tarde.";

      toast.error(error.response.data.message || errorDescription);
    },
  });

  const deleteDevice = useMutation({
    mutationFn: async (id: number) => {
      return axiosInstance.delete(process.env.NEXT_PUBLIC_API_URL + `/admin/devices/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "devices"] });
      toast.success("Dispositivo removido!");
    },
    onError: (error: any) => {
      let errorDescription =
        "Ocorreu um erro ao remover o dispositivo. Por favor, tente novamente mais tarde.";

      toast.error(error.response.data.message || errorDescription);
    },
  });

  return {
    devicesQuery,
    assignDevice,
    updateDevice,
    deleteDevice,
  };
}

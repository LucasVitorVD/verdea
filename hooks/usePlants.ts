import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { Plant } from "@/interfaces/plant";

export function usePlants(isAdmin?: boolean) {
  const queryClient = useQueryClient();
  const queryKey = isAdmin ? ["admin", "plants"] : ["user", "plants"];
  const baseUrl = process.env.NEXT_PUBLIC_API_URL;

  const plantsQuery = useQuery({
    queryKey,
    queryFn: async () => {
      const url = `${baseUrl}${isAdmin ? "/admin/plants" : "/plant/all"}`

      const response = await axiosInstance.get(url);

      return response.data as Plant[];
    },
  });

  const createPlant = useMutation({
    mutationFn: async (plantData: Omit<Plant, "device">) => {
      const url = `${baseUrl}${isAdmin ? "/admin/plants/add" : "/plant/add"}`

      return axiosInstance.post(
        url,
        plantData
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success("Planta criada com sucesso!");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Ocorreu um erro ao adicionar a planta. Tente novamente mais tarde.";
      toast.error(message);
    },
  });

  const updatePlant = useMutation({
    mutationFn: async (plant: Plant) => {
      const url = `${baseUrl}${isAdmin ? "/admin/plants/update" : "/plant/update"}`

      return axiosInstance.patch(
        url + `/${plant.id}`,
        plant
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success("Planta atualizada!");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Ocorreu um erro ao atualizar a planta. Tente novamente mais tarde.";
      toast.error(message);
    },
  });

  const deletePlant = useMutation({
    mutationFn: async (id: number) => {
      const url = `${baseUrl}${isAdmin ? "/admin/plants" : "/plant/delete"}`

      return axiosInstance.delete(
        url + `/${id}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey });
      toast.success("Planta removida!");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Ocorreu um erro ao deletar a planta. Tente novamente mais tarde.";
      toast.error(message);
    },
  });

  return {
    plantsQuery,
    createPlant,
    updatePlant,
    deletePlant,
  };
}
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { Plant } from "@/interfaces/plant";

export function usePlants() {
  const queryClient = useQueryClient();

  const plantsQuery = useQuery({
    queryKey: ["admin", "plants"],
    queryFn: async () => {
      const response = await axiosInstance.get(process.env.NEXT_PUBLIC_API_URL + "/admin/plants");
      return response.data as Plant[];
    },
  });

  const createPlant = useMutation({
    mutationFn: async (plantData: Omit<Plant, "device">) => {
      return axiosInstance.post(process.env.NEXT_PUBLIC_API_URL + "/admin/plants", plantData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "plants"] });
      toast.success("Planta criada com sucesso!");
    },
    onError: (error: any) => {
      let errorDescription =
        "Ocorreu um erro ao adicionar uma planta. Por favor, tente novamente mais tarde.";

      toast.error(error.response.data.message || errorDescription);
    },
  });

  const updatePlant = useMutation({
    mutationFn: async (plant: Partial<Plant> & { id: string }) => {
      return axiosInstance.put(process.env.NEXT_PUBLIC_API_URL + `/admin/plants/${plant.id}`, plant);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "plants"] });
      toast.success("Planta atualizada!");
    },
    onError: (error: any) => {
      let errorDescription =
        "Ocorreu um erro ao atualizar a planta. Por favor, tente novamente mais tarde.";

      toast.error(error.response.data.message || errorDescription);
    },
  });

  const deletePlant = useMutation({
    mutationFn: async (id: number) => {
      return axiosInstance.delete(process.env.NEXT_PUBLIC_API_URL + `/admin/plants/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "plants"] });
      toast.success("Planta removida!");
    },
    onError: (error: any) => {
      let errorDescription =
        "Ocorreu um erro ao deletar a planta. Por favor, tente novamente mais tarde.";

      toast.error(error.response.data.message || errorDescription);
    },
  });

  return {
    plantsQuery,
    createPlant,
    updatePlant,
    deletePlant,
  };
}

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { User } from "@/interfaces/user";

export function useUsers() {
  const queryClient = useQueryClient();

  const usersQuery = useQuery({
    queryKey: ["admin", "users"],
    queryFn: async () => {
      const response = await axiosInstance.get(process.env.NEXT_PUBLIC_API_URL + "/admin/users");
      return response.data as User[];
    },
  });

  const createUser = useMutation({
    mutationFn: async (newUser: { email: string; password: string }) => {
      return axiosInstance.post(process.env.NEXT_PUBLIC_API_URL + "/admin/users", newUser);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      toast.success("Usuário criado com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao criar usuário");
    },
  });

  const updateUser = useMutation({
    mutationFn: async (user: { id: number; email: string, password: string }) => {
      return axiosInstance.put(process.env.NEXT_PUBLIC_API_URL + `/admin/users/${user.id}`, user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      toast.success("Usuário atualizado!");
    },
    onError: () => {
      toast.error("Erro ao atualizar usuário");
    },
  });

  const deleteUser = useMutation({
    mutationFn: async (id: number) => {
      return axiosInstance.delete(process.env.NEXT_PUBLIC_API_URL + `/admin/users/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
      toast.success("Usuário removido!");
    },
    onError: () => {
      toast.error("Erro ao remover usuário");
    },
  });

  return {
    usersQuery,
    createUser,
    updateUser,
    deleteUser,
  };
}

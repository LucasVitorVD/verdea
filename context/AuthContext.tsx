"use client";

import { User } from "@/interfaces/user";
import axiosInstance, { refreshCsrfToken } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

function useAuthValue() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const [isInitialLoad, setIsInitialLoad] = useState(true);

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const response = await axiosInstance.get<User>(
          `/user/me`
        );
        return response.data;
      } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 401) {
          queryClient.setQueryData(["user"], null);
        }
        throw error;
      }
    },
    retry: (failureCount, error: AxiosError) => {
      if (error?.response?.status === 401 && failureCount < 2) {
        return true;
      }
      return false;
    },
    refetchOnWindowFocus: false
  });

  const loginMutation = useMutation({
    mutationFn: async (user: { email: string; password: string }) =>
      axiosInstance.post(`/auth/login`, user),
    onSuccess: async () => {
      // Força uma nova busca do usuário
      await queryClient.invalidateQueries({ queryKey: ["user"] });
      
      // Aguarda a query do usuário ser atualizada
      await queryClient.refetchQueries({ queryKey: ["user"] });
      
      // Pequeno delay para garantir que tudo foi processado
      setTimeout(() => {
        router.push("/dashboard");
      }, 100);
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Erro ao fazer login. Tente novamente.";
      toast.error(message);
    },
  });

  const signUpMutation = useMutation({
    mutationFn: async (newUser: { email: string; password: string }) =>
      axiosInstance.post(`/auth/register`, newUser),
    onSuccess: () => {
      toast.success("Conta criada com sucesso! Faça login.");
      router.push("/register?tab=login");
    },
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Ocorreu um erro ao criar uma nova conta. Tente novamente mais tarde.";
      toast.error(message);
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () =>
      axiosInstance.post(`/auth/logout`),
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      queryClient.removeQueries({ queryKey: ["user"] });
      toast.success("Logout realizado com sucesso!");
      router.push("/register?tab=login");
    },
    onError: () => toast.error("Erro ao realizar logout!"),
    retry: 2,
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: async (email: { email: string }) =>
      axiosInstance.post(`/auth/forgot-password`, email),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (data: { token: string; newPassword: string }) =>
      axiosInstance.post(`/auth/reset-password`, data),
  });

  return {
    userQuery,
    signUpMutation,
    loginMutation,
    logoutMutation,
    forgotPasswordMutation,
    resetPasswordMutation,
    isInitialLoad,
  };
}

type AuthContextType = ReturnType<typeof useAuthValue>;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const init = async () => {
      await refreshCsrfToken();
    };
    init();
  }, []);

  const value = useAuthValue();

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};
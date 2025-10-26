"use client";

import { User } from "@/interfaces/user";
import axiosInstance, { refreshCsrfToken } from "@/lib/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext, useEffect } from "react";
import { toast } from "sonner";

function useAuthValue() {
  const queryClient = useQueryClient();
  const router = useRouter();

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await axiosInstance.get<User>(
        `${process.env.NEXT_PUBLIC_API_URL}/user/me`
      );
      return response.data;
    },
    retry: (failureCount, error: AxiosError) => {
      if (error?.response?.status === 401 && failureCount < 2) {
        return true;
      }
      return false;
    },
    refetchOnWindowFocus: false,
  });

  const signUpMutation = useMutation({
    mutationFn: async (newUser: { email: string; password: string }) =>
      axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/register`,
        newUser
      ),
    onSuccess: () => router.push("/register?tab=login"),
    onError: (error: any) => {
      const message =
        error?.response?.data?.message ||
        "Ocorreu um erro ao criar uma nova conta. Tente novamente mais tarde.";

      return message;
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (user: { email: string; password: string }) =>
      axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, user),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/dashboard");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () =>
      axiosInstance.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/logout`),
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      toast.success("Logout realizado com sucesso!");
      router.push("/register?tab=login");
    },
    onError: () => toast.error("Erro ao realizar logout!"),
    retry: 2,
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: async (email: { email: string }) =>
      axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/forgot-password`,
        email
      ),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (data: { token: string; newPassword: string }) =>
      axiosInstance.post(
        `${process.env.NEXT_PUBLIC_API_URL}/auth/reset-password`,
        data
      ),
  });

  return {
    userQuery,
    signUpMutation,
    loginMutation,
    logoutMutation,
    forgotPasswordMutation,
    resetPasswordMutation,
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

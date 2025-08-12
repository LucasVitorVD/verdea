"use client";

import { User } from "@/interfaces/user";
import axiosInstance from "@/lib/axios";
import {
  useMutation,
  UseMutationResult,
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { AxiosError, AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext } from "react";
import { toast } from "sonner";

type AuthContextType = {
  userQuery: UseQueryResult<User, Error>;
  signUpMutation: UseMutationResult<
    AxiosResponse<any, any>,
    AxiosError,
    {
      email: string;
      password: string;
    },
    unknown
  >;
  loginMutation: UseMutationResult<
    AxiosResponse<any, any>,
    AxiosError,
    {
      email: string;
      password: string;
    },
    unknown
  >;
  logoutMutation: UseMutationResult<
    AxiosResponse<any, any>,
    unknown,
    void,
    unknown
  >;
  forgotPasswordMutation: UseMutationResult<
    AxiosResponse<any, any>,
    AxiosError,
    {
      email: string;
    },
    unknown
  >;
  resetPasswordMutation: UseMutationResult<
    AxiosResponse<any, any>,
    AxiosError,
    {
      token: string;
      newPassword: string;
    },
    unknown
  >;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const request = await axiosInstance.get(
          process.env.NEXT_PUBLIC_API_URL + "/user/me"
        );

        return request.data;
      } catch (error) {
        throw error;
      }
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
    mutationFn: async (newUser: { email: string; password: string }) => {
      return axiosInstance.post(
        process.env.NEXT_PUBLIC_API_URL + "/auth/register",
        newUser
      );
    },
    onSuccess: () => {
      router.push("/register?tab=login");
    },
  });

  const loginMutation = useMutation({
    mutationFn: async (user: { email: string; password: string }) => {
      return axiosInstance.post(
        process.env.NEXT_PUBLIC_API_URL + "/auth/login",
        user
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      router.push("/dashboard");
    },
  });

  const logoutMutation = useMutation({
    mutationFn: async () => {
      return axiosInstance.post(
        process.env.NEXT_PUBLIC_API_URL + "/auth/logout"
      );
    },
    onSuccess: () => {
      queryClient.setQueryData(["user"], null);
      toast.success("Logout realizado com sucesso!");
      router.push("/register?tab=login");
    },
    onError: () => {
      toast.error("Erro ao realizar logout!");
    },
    retry: 2,
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: async (email: { email: string }) => {
      return axiosInstance.post(
        process.env.NEXT_PUBLIC_API_URL + "/auth/forgot-password",
        email
      );
    },
  });

  const resetPasswordMutation = useMutation({
    mutationFn: async (resetPasswordRequest: {
      token: string;
      newPassword: string;
    }) => {
      return axiosInstance.post(
        process.env.NEXT_PUBLIC_API_URL + "/auth/reset-password",
        resetPasswordRequest
      );
    },
  });

  return (
    <AuthContext.Provider
      value={{
        userQuery,
        signUpMutation,
        loginMutation,
        logoutMutation,
        forgotPasswordMutation,
        resetPasswordMutation
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

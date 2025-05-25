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
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { createContext, useContext } from "react";
import { toast } from "sonner";

type AuthContextType = {
  userQuery: UseQueryResult<User, Error>;
  signUpMutation: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
    {
      email: string;
      password: string;
    },
    unknown
  >;
  loginMutation: UseMutationResult<
    AxiosResponse<any, any>,
    Error,
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
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const router = useRouter();

  const userQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const request = await axiosInstance.get(
        process.env.NEXT_PUBLIC_API_URL + "/user/me"
      );

      return request.data;
    },
    retry: false,
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

  return (
    <AuthContext.Provider
      value={{
        userQuery,
        signUpMutation,
        loginMutation,
        logoutMutation,
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

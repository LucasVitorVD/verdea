"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Pencil } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Input } from "../ui/input";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import PasswordInput from "../register-forms/PasswordInput";
import axiosInstance from "@/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const FormSchema = z
  .object({
    email: z.string().email("Email inválido"),
    newPassword: z
      .string()
      .min(6, "A nova senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z
      .string()
      .min(6, "Senha deve ter pelo menos 6 caracteres"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export default function ProfileCard() {
  const [isEditing, setIsEditing] = useState(false);

  const router = useRouter();
  const queryClient = useQueryClient();
  const { userQuery: profileData, logoutMutation } = useAuth();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const updateInfoMutation = useMutation({
    mutationFn: async (updatedInfo: { email: string; password: string }) => {
      return axiosInstance.patch(
        process.env.NEXT_PUBLIC_API_URL + "/user/update",
        updatedInfo
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
      logoutMutation.mutate();
      router.push("/register?tab=login");
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    const updatedInfo = {
      email: data.email,
      password: data.newPassword,
    };

    toast.promise(updateInfoMutation.mutateAsync(updatedInfo), {
      loading: "Atualizando informações...",
      success: "Informações atualizadas com sucesso! Faça login novamente.",
      error: (error) => {
        return error instanceof Error
          ? error.message
          : "Erro ao atualizar informações";
      },
    });
  }

  return (
    <div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between flex-wrap gap-6">
            <div>
              <CardTitle>Informações da Conta</CardTitle>
              <CardDescription>
                Gerencie suas informações básicas de login.
              </CardDescription>
            </div>
            <Button
              variant={isEditing ? "default" : "outline"}
              onClick={() => setIsEditing((prev) => !prev)}
            >
              {isEditing ? (
                <>
                  <Pencil className="mr-px size-4" />
                  Editando...
                </>
              ) : (
                "Editar"
              )}
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex items-center flex-wrap gap-4 lg:gap-6">
            <Avatar className="size-18">
              <AvatarFallback className="text-2xl bg-primary text-white">
                {profileData.data?.email.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div className="space-y-1">
              <h3 className="text-lg font-medium">{profileData.data?.email}</h3>
              <p className="text-sm text-muted-foreground">
                Membro desde{" "}
                {profileData.data?.createdAt &&
                  format(
                    new Date(profileData.data.createdAt),
                    "MMMM 'de' yyyy",
                    {
                      locale: ptBR,
                    }
                  )}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={profileData.data?.email}
                          {...field}
                          disabled={!isEditing}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nova senha</FormLabel>
                      <FormControl>
                        <PasswordInput
                          name={field.name}
                          register={form.register}
                          disabled={!isEditing}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirmar senha</FormLabel>
                      <FormControl>
                        <PasswordInput
                          name={field.name}
                          register={form.register}
                          disabled={!isEditing}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {isEditing && (
                  <Button type="submit">Alterar informações</Button>
                )}
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

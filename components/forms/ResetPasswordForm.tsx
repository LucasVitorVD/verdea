"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import { Button } from "../ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "../ui/form";
import PasswordInput from "./PasswordInput";
import { useAuth } from "@/context/AuthContext";
import { useSearchParams, useRouter } from "next/navigation";

const resetPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(6, { message: "Senha deve ter pelo menos 6 caracteres" }),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "As senhas não coincidem",
  });

export default function ResetPasswordForm() {
  const { resetPasswordMutation } = useAuth();

  const searchParams = useSearchParams()
  const router = useRouter()
 
  const token = searchParams.get('token')

  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof resetPasswordFormSchema>) {
    const retryMutation = () => {
      toast.promise(resetPasswordMutation.mutateAsync({ token: token!, newPassword: values.password }), {
        loading: "Processando...",
        success: () => {
          router.push("/register?tab=login")
          return {
            message: "Nova senha registrada!",
          };
        },
        error: () => {
          return {
            message:
              resetPasswordMutation.error?.message || "Erro ao mudar senha",
            action: {
              label: "Reenviar",
              onClick: retryMutation,
              children: (
                <Button disabled={resetPasswordMutation.isPending}>Reenviar</Button>
              ),
            },
            style: {
              background: "hsl(0 50% 45%)",
              color: "white",
              border: "1px solid hsl(0 50% 45%)",
            },
          };
        },
      });
    };

    retryMutation();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="password">Nova senha</FormLabel>
                <FormControl>
                  <PasswordInput name={field.name} register={form.register} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="confirmPassword">Confirmar senha</FormLabel>
                <FormControl>
                  <PasswordInput name={field.name} register={form.register} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit" className="w-full cursor-pointer" disabled={resetPasswordMutation.isPending}>
            Mudar Senha
          </Button>
        </div>
      </form>
    </Form>
  );
}

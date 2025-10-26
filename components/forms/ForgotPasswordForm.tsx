"use client";

import React from "react";
import { Button } from "../ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form,
} from "../ui/form";
import { Input } from "../ui/input";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { AxiosError } from "axios";

const formSchema = z.object({
  email: z.string().email({ message: "E-mail inválido." }),
});

export default function ForgotPasswordForm() {
  const [lastSubmitTime, setLastSubmitTime] = React.useState<number | null>(
    null
  );
  const [cooldown, setCooldown] = React.useState<number>(0);
  const { forgotPasswordMutation } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  React.useEffect(() => {
    if (cooldown > 0) {
      const timer = setTimeout(() => setCooldown(cooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [cooldown]);

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const now = Date.now();

    if (lastSubmitTime && now - lastSubmitTime < 60_000) {
      const secondsLeft = Math.ceil((60_000 - (now - lastSubmitTime)) / 1000);
      toast.error(`Aguarde ${secondsLeft}s para tentar novamente.`);
      return;
    }

    setLastSubmitTime(now);
    setCooldown(60);

    const retryMutation = () => {
      toast.promise(
        forgotPasswordMutation.mutateAsync({ email: values.email }),
        {
          loading: "Carregando...",
          success: () => {
            return {
              message:
                "Email enviado! Caso não apareça, verifique sua caixa de spam.",
            };
          },
          error: () => {
            const err = forgotPasswordMutation.error;
            let message = "Erro ao enviar email";

            if (err instanceof AxiosError && err.response) {
              message = err.response.data.message;
            }

            return {
              message,
              action: {
                label: "Reenviar",
                onClick: retryMutation,
                children: (
                  <Button disabled={forgotPasswordMutation.isPending}>
                    Reenviar
                  </Button>
                ),
              },
              style: {
                background: "hsl(0 50% 45%)",
                color: "white",
                border: "1px solid hsl(0 50% 45%)",
              },
            };
          },
        }
      );
    };

    retryMutation();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="grid gap-2">
                <FormLabel htmlFor="email">Email</FormLabel>
                <FormControl>
                  <Input
                    id="email"
                    placeholder="johndoe@mail.com"
                    type="email"
                    autoComplete="email"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full cursor-pointer"
            disabled={forgotPasswordMutation.isPending || cooldown > 0}
          >
            {cooldown > 0 ? `Aguarde ${cooldown}s` : "Enviar link"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

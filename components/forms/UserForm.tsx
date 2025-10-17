"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { User } from "@/interfaces/user";
import { useUsers } from "@/hooks/admin/useUsers";
import PasswordInput from "./PasswordInput";

interface UserFormProps {
  data?: User;
  onSuccess?: () => void;
}

const userFormSchema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter no mínimo 6 caracteres"),
});

type UserFormSchema = z.infer<typeof userFormSchema>;

export default function UserForm({ data }: UserFormProps) {
  const { createUser, updateUser } = useUsers();

  const form = useForm<UserFormSchema>({
    resolver: zodResolver(userFormSchema),
    defaultValues: data
      ? {
          email: data.email,
          password: "",
        }
      : {
          email: "",
          password: "",
        },
  });

  const onSubmit = (values: UserFormSchema) => {
    if (!data) {
      createUser.mutate(values);
    } else {
      updateUser.mutate({ ...values, id: data.id });
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        id="user-form"
        className="space-y-6 px-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>E-mail</FormLabel>
              <FormControl>
                <Input
                  placeholder="exemplo@email.com"
                  type="email"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Senha</FormLabel>
              <FormControl>
                <PasswordInput name={field.name} register={form.register} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="pt-4">
          <Button
            type="submit"
            className="w-full"
            disabled={createUser.isPending || updateUser.isPending}
          >
            {data ? "Salvar alterações" : "Criar usuário"}
          </Button>
        </div>
      </form>
    </Form>
  );
}

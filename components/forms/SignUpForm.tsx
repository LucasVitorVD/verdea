import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PasswordInput from "./PasswordInput";
import {
  SignUpFormSchemaType,
  signUpFormSchema,
} from "@/zod-schemas/form/sign-up";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";

export default function SignUpForm() {
  const { signUpMutation } = useAuth()

  const form = useForm<SignUpFormSchemaType>({
    resolver: zodResolver(signUpFormSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: SignUpFormSchemaType) {
    const newUser = {
      email: values.email,
      password: values.password,
    };

    const retryMutation = () => {
      toast.promise(signUpMutation.mutateAsync(newUser), {
        loading: "Processando...",
        success: () => {
          return {
            message: "Usuário criado com sucesso!",
          };
        },
        error: () => {
          return {
            message: signUpMutation.error?.message || "Erro ao criar usuário",
            action: {
              label: "Reenviar",
              onClick: retryMutation,
              children: <Button disabled={signUpMutation.isPending}>Reenviar</Button>,
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

    retryMutation()
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
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

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirmar senha</FormLabel>
              <FormControl>
                <PasswordInput name={field.name} register={form.register} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" className="w-full cursor-pointer">
          Criar conta
        </Button>

        <div className="text-center text-sm">
          Já tem uma conta?{" "}
          <Link
            href="/register?tab=login"
            className="underline underline-offset-4 hover:text-primary"
          >
            Entrar
          </Link>
        </div>
      </form>
    </Form>
  );
}

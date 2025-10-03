import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  SignInFormSchemaType,
  signInFormSchema,
} from "@/zod-schemas/form/sign-in";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import PasswordInput from "./PasswordInput";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { AxiosError, isAxiosError } from "axios";

export default function LoginForm() {
  const { loginMutation } = useAuth();

  const form = useForm<SignInFormSchemaType>({
    resolver: zodResolver(signInFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInFormSchemaType) => {
    const user = {
      email: values.email,
      password: values.password,
    };

    const retryMutation = () => {
      toast.promise(loginMutation.mutateAsync(user), {
        loading: "Processando...",
        success: () => {
          return {
            message: "Usuário autenticado com sucesso!",
          };
        },
        error: (error) => {
          const apiMessage =
            isAxiosError(error) && error.response?.data?.message
              ? error.response.data.message
              : "Erro ao autenticar usuário";

          return {
            message: apiMessage,
            action: {
              label: "Reenviar",
              onClick: retryMutation,
              children: (
                <Button disabled={loginMutation.isPending}>Reenviar</Button>
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
  };

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

        <div className="space-y-2">
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

          <Link
            href="/register/forgot-password"
            className="text-primary text-sm underline-offset-4 hover:underline"
          >
            Esqueci minha senha
          </Link>
        </div>

        <Button type="submit" className="w-full cursor-pointer">
          Entrar
        </Button>

        <div className="text-center text-sm">
          Não possui uma conta?{" "}
          <Link
            href="/register?tab=sign-up"
            className="text-primary underline-offset-4 hover:underline"
          >
            Criar conta
          </Link>
        </div>
      </form>
    </Form>
  );
}

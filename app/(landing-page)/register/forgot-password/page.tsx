import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import ForgotPasswordForm from "@/components/forms/ForgotPasswordForm";

export default function ForgotPasswordPage() {
  return (
    <div className="w-full max-w-lg space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Esqueci minha senha</CardTitle>
          <CardDescription>
            Digite seu endereço de e-mail para receber um link para redefinir
            sua senha.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ForgotPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}

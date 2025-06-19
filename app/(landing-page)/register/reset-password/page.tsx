import ResetPasswordForm from "@/components/register-forms/ResetPasswordForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

export default function ResetPasswordPage() {
  return (
    <div className="w-full max-w-lg space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Redefina Sua Senha</CardTitle>
          <CardDescription>
            Digite sua nova senha para redefini-la.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ResetPasswordForm />
        </CardContent>
      </Card>
    </div>
  );
}

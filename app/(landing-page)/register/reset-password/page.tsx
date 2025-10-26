import ResetPasswordForm from "@/components/forms/ResetPasswordForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Suspense } from "react";

export default  async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const token = (await searchParams).token as string

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
          <ResetPasswordForm token={token} />
        </CardContent>
      </Card>
    </div>
  );
}

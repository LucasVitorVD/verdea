"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import ForgotPasswordForm from "@/components/register-forms/ForgotPasswordForm";
import ResetPasswordForm from "@/components/register-forms/ResetPasswordForm";
import { Droplet } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordPage() {
  const [currentTab, setCurrentTab] = useState<
    "forgot-password" | "reset-password"
  >("forgot-password");

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex flex-col flex-1 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <Link href="/" className="flex items-center gap-2 font-medium">
            <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
              <Droplet className="size-4" />
            </div>
            Verdea
          </Link>
        </div>
        <section className="flex flex-col flex-1 justify-center items-center">
          <Tabs className="w-80 md:w-[450px]" value={currentTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger
                value="forgot-password"
                className={
                  currentTab === "forgot-password"
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }
              >
                Esqueci minha senha
              </TabsTrigger>
              <TabsTrigger
                value="reset-password"
                className={
                  currentTab === "reset-password"
                    ? "cursor-pointer"
                    : "cursor-not-allowed"
                }
              >
                Redefinir senha
              </TabsTrigger>
            </TabsList>
            <TabsContent value="forgot-password">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl">
                    Esqueci minha senha
                  </CardTitle>
                  <CardDescription>
                    Digite seu endereço de e-mail para receber um link para
                    redefinir sua senha.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ForgotPasswordForm setCurrentTab={setCurrentTab} />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reset-password">
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
            </TabsContent>
          </Tabs>
        </section>
      </main>
    </div>
  );
}

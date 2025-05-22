"use client";

import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import LoginForm from "@/components/register-forms/LoginForm";
import SignUpForm from "@/components/register-forms/SignUpForm";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { useSearchParams, useRouter } from "next/navigation";

export default function RegisterTab() {
  const [currentTab, setCurrentTab] = useState<"login" | "sign-up">("login");
  const searchParams = useSearchParams();
  const router = useRouter();
  const tab = searchParams.get("tab");

  function handleTabChange(value: typeof currentTab) {
    router.push(`/register?tab=${value}`);
  }

  useEffect(() => {
    if (tab === "sign-up" || tab === "login") {
      setCurrentTab(tab);
    } else {
      router.push("/register?tab=login");
    }
  }, [tab]);

  return (
    <Tabs
      className="w-80 md:w-[400px]"
      value={currentTab}
      onValueChange={(value) => handleTabChange(value as typeof currentTab)}
    >
      <TabsList className="grid w-full grid-cols-2">
        <TabsTrigger value="login" className="cursor-pointer">
          Login
        </TabsTrigger>
        <TabsTrigger value="sign-up" className="cursor-pointer">
          Criar conta
        </TabsTrigger>
      </TabsList>
      <TabsContent value="login">
        <Card>
          <CardHeader>
            <CardTitle>Entrar</CardTitle>
            <CardDescription>
              Entre com suas informações para acessar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <LoginForm />
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="sign-up">
        <Card>
          <CardHeader>
            <CardTitle>Criar conta</CardTitle>
            <CardDescription>
              Preencha os dados abaixo para criar sua conta
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <SignUpForm />
          </CardContent>
        </Card>
      </TabsContent>
    </Tabs>
  );
}

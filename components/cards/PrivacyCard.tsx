"use client";

import { Separator } from "@/components/ui/separator";
import { Shield, Trash2 } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { Input } from "../ui/input";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function PrivacyCard() {
  const [deleteInput, setDeleteInput] = useState("");

  const handleDeleteAccount = () => {
    if (deleteInput === "EXCLUIR") {
      console.log("deletando conta...");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Privacidade e Dados</CardTitle>
        <CardDescription>
          Gerencie suas configurações de privacidade e dados da conta.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-start gap-3 p-4 border rounded-lg">
            <Shield className="h-5 w-5 text-primary mt-0.5" />
            <div className="flex-1">
              <h3 className="font-medium">Seus dados estão seguros</h3>
              <p className="text-sm text-muted-foreground mt-1">
                Utilizamos criptografia de ponta para proteger suas informações
                pessoais e dados das plantas. Seus dados são armazenados de
                forma segura e nunca são compartilhados com terceiros.
              </p>
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="text-lg font-medium">Informações Coletadas</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Email de login</p>
                  <p className="text-sm text-muted-foreground">
                    Usado para autenticação e comunicação
                  </p>
                </div>
                <Badge>Necessário</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Dados das plantas</p>
                  <p className="text-sm text-muted-foreground">
                    Informações sobre suas plantas e configurações
                  </p>
                </div>
                <Badge>Funcional</Badge>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">Histórico de irrigação</p>
                  <p className="text-sm text-muted-foreground">
                    Dados de sensores e ações de irrigação
                  </p>
                </div>
                <Badge>Funcional</Badge>
              </div>
            </div>
          </div>

          <Separator />

          <div className="space-y-3">
            <h4 className="font-medium text-destructive">Zona de Perigo</h4>
            <p className="text-sm text-muted-foreground">
              A ação abaixo é permanente e não pode ser desfeita.
            </p>

            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" className="cursor-pointer">
                  <Trash2 className="mr-px h-4 w-4" />
                  Excluir minha conta
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Tem certeza que deseja excluir sua conta?
                  </AlertDialogTitle>
                  <AlertDialogDescription className="space-y-2">
                    <p>
                      Esta ação não pode ser desfeita. Isso irá permanentemente:
                    </p>
                    <ul className="list-disc pl-5 space-y-1 text-start">
                      <li>Excluir sua conta e email de acesso</li>
                      <li>Remover todas as suas plantas cadastradas</li>
                      <li>Desconectar todos os seus dispositivos</li>
                      <li>
                        Apagar todo o histórico de irrigação e dados dos
                        sensores
                      </li>
                      <li>Cancelar todas as notificações</li>
                      <li>Remover todas as configurações personalizadas</li>
                    </ul>
                    <p className="font-medium text-destructive mt-4">
                      Digite "EXCLUIR" abaixo para confirmar:
                    </p>
                    <Input
                      placeholder="Digite EXCLUIR para confirmar"
                      value={deleteInput}
                      onChange={(e) => setDeleteInput(e.target.value)}
                      className="mt-2"
                    />
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancelar</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDeleteAccount}
                    className="bg-destructive text-white hover:bg-destructive/90 cursor-pointer"
                  >
                    Excluir conta permanentemente
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

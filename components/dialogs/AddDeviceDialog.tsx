"use client";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
  Check,
  ChevronRight,
  CircleAlert,
  CircleCheckBig,
  CirclePlus,
  Copy,
  Link2,
  Router,
  TabletSmartphone,
  Wifi,
} from "lucide-react";
import { Button } from "../ui/button";
import React, { useRef, useState } from "react";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { cn } from "@/lib/utils";
import { withMask } from "use-mask-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { celebrations } from "@/lib/celebrations";

const assignDeviceFormSchema = z.object({
  macAddress: z
    .string({ required_error: "Campo obrigatório" })
    .regex(
      /^([0-9A-Fa-f]{2}:){5}[0-9A-Fa-f]{2}$/,
      "Formato de endereço MAC inválido. Exemplo: B4:E8:F5:2A:05:F8"
    ),
});

export default function AddDeviceDialog() {
  const [currentStep, setCurrentStep] = useState(1);
  const [openDialog, setOpenDialog] = useState(false);
  const queryClient = useQueryClient();
  const retryCountRef = useRef(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const form = useForm<z.infer<typeof assignDeviceFormSchema>>({
    resolver: zodResolver(assignDeviceFormSchema),
    defaultValues: {
      macAddress: "",
    },
  });

  const steps = [
    {
      number: 1,
      icon: Router,
      title: "Preparar o Dispositivo",
      description: "Ligue seu dispositivo ESP32 e aguarde a inicialização",
    },
    {
      number: 2,
      icon: Wifi,
      title: "Conectar ao Wi-Fi do Dispositivo",
      description: "Conecte-se à rede Wi-Fi temporária criada pelo dispositivo",
    },
    {
      number: 3,
      icon: TabletSmartphone,
      title: "Interface de Configuração",
      description: "Abra o navegador e acesse a página de configuração",
    },
    {
      number: 4,
      icon: CircleCheckBig,
      title: "Finalizar Vinculação",
      description: "Confirme a vinculação e teste a conexão",
    },
  ];

  const assignDeviceMutation = useMutation({
    mutationFn: async (macAddress: string) => {
      const response = await axiosInstance.patch(
        process.env.NEXT_PUBLIC_API_URL + "/device/assign/" + macAddress
      );

      return response;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "user", "devices"] });

      setOpenDialog(false);

      if (!buttonRef.current) return;

      const rect = buttonRef.current.getBoundingClientRect();

      const x = (rect.left + rect.width / 2) / window.innerWidth;
      const y = (rect.top + rect.height / 2) / window.innerHeight;

      celebrations.device({ x, y });
    },
  });

  const onSubmit = async (values: z.infer<typeof assignDeviceFormSchema>) => {
    const macAddress = values.macAddress;

    const retryMutation = () => {
      const MAX_ATTEMPTS = 5;

      if (
        assignDeviceMutation.isPending ||
        retryCountRef.current >= MAX_ATTEMPTS
      )
        return;

      toast.promise(assignDeviceMutation.mutateAsync(macAddress), {
        loading: "Processando...",
        success: () => {
          retryCountRef.current = 0;

          return {
            message: "Dispositivo vínculado!",
          };
        },
        error: (error) => {
          retryCountRef.current += 1;

          let errorDescription =
            "Ocorreu um erro ao vincular o dispositivo. Por favor, tente novamente mais tarde.";

          if (retryCountRef.current + 1 >= MAX_ATTEMPTS) {
            setTimeout(() => {
              retryCountRef.current = 0;
            }, 60000);
          }

          return {
            message: "Erro ao vincular dispositivo.",
            description:
              retryCountRef.current + 1 >= MAX_ATTEMPTS
                ? "Limite de tentativas atingido. Tente novamente em 1 minuto."
                : error.response?.data?.message || errorDescription,
            action: retryCountRef.current + 1 < MAX_ATTEMPTS && {
              label: "Reenviar",
              onClick: retryMutation,
              children: (
                <Button disabled={assignDeviceMutation.isPending}>
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
      });
    };

    retryMutation();
  };

  const handleGoBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="w-full md:w-auto">
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button className="w-full">
            <CirclePlus />
            Adicionar Dispositivo
          </Button>
        </DialogTrigger>
        <DialogContent className="lg:min-w-3xl">
          <DialogHeader>
            <DialogTitle>Adicionar Novo Dispositivo</DialogTitle>
            <DialogDescription>
              Siga as etapas abaixo para vincular um novo dispositivo ESP32 à
              sua conta.
            </DialogDescription>

            <div className="flex items-center justify-center mt-2">
              {steps.map((step, index) => {
                const isActive = currentStep === step.number;
                const isCompleted = currentStep > step.number;
                return (
                  <div key={step.number} className="flex items-center">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-colors ${
                        isCompleted
                          ? "bg-primary border-primary text-white"
                          : isActive
                          ? "border-primary text-primary"
                          : "border-gray-300 text-gray-400 bg-white"
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="h-5 w-5" />
                      ) : (
                        <p>{step.number}</p>
                      )}
                    </div>
                    {index < steps.length - 1 && (
                      <div
                        className={`w-16 h-0.5 transition-colors ${
                          currentStep > step.number
                            ? "bg-primary"
                            : "bg-gray-300"
                        }`}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </DialogHeader>

          {currentStep === 1 && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                {React.createElement(steps[currentStep - 1].icon, {
                  className: "h-8 w-8 text-primary",
                })}
                <div>
                  <p className="text-lg">{steps[currentStep - 1].title}</p>
                  <p className="text-sm text-muted-foreground">
                    {steps[currentStep - 1].description}
                  </p>
                </div>
              </div>

              <Card className="py-3 bg-primary/30">
                <CardContent className="space-y-3">
                  <p className="font-semibold">Instruções:</p>

                  <ol className="list-decimal pl-4 space-y-2 text-sm">
                    <li>Conecte seu dispositivo ESP32 à fonte de energia</li>
                    <li>
                      Aguarde cerca de 30 segundos para a inicialização completa
                    </li>
                    <li>
                      O LED azul deve piscar indicando que está em modo de
                      configuração
                    </li>
                    <li>
                      Se o LED não piscar, pressione o botão RESET por 3
                      segundos
                    </li>
                  </ol>
                </CardContent>
              </Card>

              <Card className="py-3 bg-amber-50">
                <CardContent className="flex gap-3 text-amber-700">
                  <CircleAlert />
                  <div>
                    <p className="text-sm font-semibold">Importante:</p>
                    <p className="text-sm">
                      Se o dispositivo já foi configurado anteriormente, ele
                      lembrará as credenciais do Wi-Fi e se conectará
                      automaticamente ao ligar. Nesse caso, basta ligar o
                      dispositivo, aguardar a conexão e adiciná-lo na última
                      etapa.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {currentStep === 2 && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                {React.createElement(steps[currentStep - 1].icon, {
                  className: "h-8 w-8 text-primary",
                })}
                <div>
                  <p className="text-lg">{steps[currentStep - 1].title}</p>
                  <p className="text-sm text-muted-foreground">
                    {steps[currentStep - 1].description}
                  </p>
                </div>
              </div>

              <Card className="py-3 bg-primary/30">
                <CardContent className="space-y-3">
                  <p className="font-semibold">Como conectar:</p>

                  <ol className="list-decimal pl-4 space-y-2 text-sm">
                    <li>
                      Abra as configurações de Wi-Fi do seu celular/computador
                    </li>
                    <li>Procure por uma rede chamada "VERDEA-SETUP-XXXX"</li>
                    <li>
                      Conecte-se a esta rede com a senha:{" "}
                      <strong>verdeasetup</strong>
                    </li>
                    <li>Aguarde a conexão ser estabelecida</li>
                    <li>Vá para o próximo passo</li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          )}

          {currentStep === 3 && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                {React.createElement(steps[currentStep - 1].icon, {
                  className: "h-8 w-8 text-primary",
                })}
                <div>
                  <p className="text-lg">{steps[currentStep - 1].title}</p>
                  <p className="text-sm text-muted-foreground">
                    {steps[currentStep - 1].description}
                  </p>
                </div>
              </div>

              <Card className="py-3 bg-primary/30">
                <CardContent className="space-y-3">
                  <p className="font-semibold">Acessar configuração:</p>

                  <ol className="list-decimal pl-4 space-y-2 text-sm">
                    <li>
                      No dispositivo utilizado para realizar a conexão, acesse a
                      barra de pesquisa do navegador e acesse o endereço:
                      192.168.4.1{" "}
                      <Copy
                        className="size-4 inline ml-px cursor-pointer"
                        onClick={() =>
                          navigator.clipboard.writeText("192.168.4.1")
                        }
                      />
                    </li>
                    <li>A página de configuração será exibida</li>
                    <li>Clique em "Configure WiFi"</li>
                    <li>Selecione sua rede e informe a senha</li>
                    <li>Clique em "Save"</li>
                    <li>Reconecte-se à sua rede Wi-Fi normal</li>
                  </ol>
                </CardContent>
              </Card>
            </div>
          )}

          {currentStep === 4 && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3">
                {React.createElement(steps[currentStep - 1].icon, {
                  className: "h-8 w-8 text-primary",
                })}
                <div>
                  <p className="text-lg">{steps[currentStep - 1].title}</p>
                  <p className="text-sm text-muted-foreground">
                    {steps[currentStep - 1].description}
                  </p>
                </div>
              </div>

              <Card className="py-3 bg-primary/30">
                <CardContent className="space-y-3">
                  <p className="font-semibold">Conectando seu dispositivo:</p>

                  <ol className="list-decimal pl-4 space-y-2 text-sm">
                    <li>
                      Localize o endereço MAC no visor do dispositivo ou no
                      e-mail que você recebeu.
                    </li>
                    <li>
                      Insira o endereço no campo abaixo para vincular o
                      dispositivo à sua conta.
                    </li>
                  </ol>

                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className={cn("flex flex-col gap-6")}
                    >
                      <div className="grid gap-6">
                        <FormField
                          control={form.control}
                          name="macAddress"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Endereço MAC</FormLabel>
                              <FormControl ref={withMask("**:**:**:**:**:**")}>
                                <Input
                                  id="macAddress"
                                  type="text"
                                  placeholder="Ex: B4:E8:F5:2W:05:F8"
                                  className="bg-secondary"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          )}

          <DialogFooter>
            <Button
              variant="outline"
              onClick={handleGoBack}
              disabled={currentStep <= 1}
            >
              Anterior
            </Button>
            {currentStep != 4 ? (
              <Button
                className="flex items-center gap-2"
                onClick={() => setCurrentStep((prev) => prev + 1)}
              >
                Próximo
                <ChevronRight />
              </Button>
            ) : (
              <Button
                ref={buttonRef}
                className="flex items-center gap-2"
                onClick={form.handleSubmit(onSubmit)}
                disabled={assignDeviceMutation.isPending}
              >
                {assignDeviceMutation.isPending ? "Vinculando..." : "Vincular"}
                <Link2 />
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

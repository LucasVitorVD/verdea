import Link from "next/link";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  ArrowRight,
  Check,
  Droplet,
  Droplets,
  Leaf,
  Smartphone,
  Zap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const featuresCards = [
  {
    title: "Irrigação automática",
    description:
      "Sistema inteligente que irriga suas plantas automaticamente com base nas necessidades específicas de cada espécie.",
    icon: <Droplet className="text-primary size-7" />,
  },
  {
    title: "Dicas Personalizadas",
    description:
      "Receba dicas e recomendações personalizadas para cada planta, geradas por IA com base em dados reais.",
    icon: <Leaf className="text-primary size-7" />,
  },
  {
    title: "Monitoramento em Tempo Real",
    description:
      "Acompanhe a umidade, temperatura e status de irrigação das suas plantas em tempo real.",
    icon: <Zap className="text-primary size-7" />,
  },
  {
    title: "Controle Remoto",
    description:
      "Controle a irrigação das suas plantas de qualquer lugar através do seu smartphone ou computador.",
    icon: <Smartphone className="text-primary size-7" />,
  },
  {
    title: "Fácil Configuração",
    description:
      "Configure o sistema em minutos, sem necessidade de conhecimentos técnicos avançados.",
    icon: <Check className="text-primary size-7" />,
  },
  {
    title: "Economia de Água",
    description:
      "Economize água irrigando suas plantas apenas quando necessário, na quantidade ideal.",
    icon: <Droplets className="text-primary size-7" />,
  },
];

export default function Home() {
  return (
    <>
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="w-full h-full object-cover brightness-50"
          >
            <source src="/stand-irrigation.mp4" type="video/mp4" />
          </video>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex items-center justify-center h-full">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center text-white">
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Cuide das suas plantas de forma inteligente
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-white/90">
                O Verdea é um sistema de irrigação automática que monitora e
                cuida das suas plantas quando você não pode.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/register"
                  className={buttonVariants({ size: "lg" })}
                >
                  Começar Agora
                  <ArrowRight />
                </Link>
                <Link
                  href="#como-funciona"
                  className={buttonVariants({
                    size: "lg",
                    variant: "outline",
                    className: "text-black",
                  })}
                >
                  Como funciona
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
          <div className="flex flex-col items-center">
            <span className="text-white text-sm mb-2">Saiba mais</span>
            <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
              <div className="w-1 h-3 bg-white rounded-full mt-2 animate-bounce"></div>
            </div>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center gap-10 py-15 px-6">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Funcionalidades principais</h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            O Verdea oferece tudo o que você precisa para manter suas plantas
            saudáveis e felizes.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 container">
          {featuresCards.map((feature) => (
            <Card className="flex flex-col gap-4" key={feature.title}>
              <CardHeader className="space-y-2">
                <div className="bg-primary/20 rounded-full w-fit p-2">
                  {feature.icon}
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center gap-10 py-15 px-6 bg-primary/10">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Como Funciona</h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Em apenas três passos simples, você pode começar a cuidar melhor das
            suas plantas.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 container">
          <Card className="flex flex-col gap-4 relative">
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-center bg-primary rounded-full size-12 absolute -top-3 -left-4">
                <span className="text-white text-xl">1</span>
              </div>
              <CardTitle className="text-xl mt-6">
                Conecte o Dispositivo
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Conecte o dispositivo ESP32 à sua rede Wi-Fi e ao sistema de
                irrigação.
              </p>
            </CardContent>
          </Card>
          <Card className="flex flex-col gap-4 relative">
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-center bg-primary rounded-full size-12 absolute -top-3 -left-4">
                <span className="text-white text-xl">2</span>
              </div>
              <CardTitle className="text-xl mt-6">
                Cadastre suas Plantas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Adicione suas plantas ao sistema, informando espécie e
                localização.
              </p>
            </CardContent>
          </Card>
          <Card className="flex flex-col gap-4 relative">
            <CardHeader className="space-y-2">
              <div className="flex items-center justify-center bg-primary rounded-full size-12 absolute -top-3 -left-4">
                <span className="text-white text-xl">3</span>
              </div>
              <CardTitle className="text-xl mt-6">Configure e Relaxe</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Defina as preferências de irrigação e deixe o Verdea cuidar
                do resto.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section
        id="hardware"
        className="flex flex-col items-center gap-10 py-15 px-6"
      >
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-bold">Hardware Compatível</h2>
          <p className="text-xl text-muted-foreground max-w-2xl">
            O Verdea funciona com dispositivos ESP32 para monitorar e
            controlar a irrigação das suas plantas.
          </p>
        </div>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <figure>
              <img
                src="/esp32.png"
                alt="ESP32 Device"
                className="rounded-xl shadow-lg border dark:border-plant/20 mx-auto"
              />
            </figure>
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="text-2xl font-bold">
                  ESP32 - Compacto e Poderoso
                </h3>
                <p className="text-muted-foreground">
                  O ESP32 é um microcontrolador de baixo custo e baixo consumo
                  de energia, perfeito para projetos de IoT como o Verdea.
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full dark:bg-plant-dark/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-3.5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">
                      Wi-Fi e Bluetooth Integrados
                    </h4>
                    <p className="text-sm text-muted-foreground">
                      Conecte-se facilmente à sua rede doméstica sem fios
                      adicionais.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="size-6 rounded-full dark:bg-plant-dark/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-3.5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Sensores de Umidade</h4>
                    <p className="text-sm text-muted-foreground">
                      Monitore com precisão a umidade do solo das suas plantas.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full dark:bg-plant-dark/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-3.5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Controle de Válvulas</h4>
                    <p className="text-sm text-muted-foreground">
                      Controle válvulas solenoides para irrigação automática
                      precisa.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-6 w-6 rounded-full dark:bg-plant-dark/30 flex items-center justify-center shrink-0 mt-0.5">
                    <Check className="size-3.5 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium">Baixo Consumo de Energia</h4>
                    <p className="text-sm text-muted-foreground">
                      Funciona com baterias ou energia solar para instalação em
                      qualquer lugar.
                    </p>
                  </div>
                </div>
              </div>

              <Button className="mt-4">Saiba Mais Sobre o Hardware</Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

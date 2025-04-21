import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Esp32Model from "@/components/3dModel/Esp32Model";

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

      <section
        className="flex flex-col items-center gap-10 py-15 px-6"
        id="funcionalidades"
      >
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

      <section
        className="flex flex-col items-center gap-10 py-15 px-6 bg-primary/10"
        id="como-funciona"
      >
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
                Defina as preferências de irrigação e deixe o Verdea cuidar do
                resto.
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
            O Verdea funciona com dispositivos ESP32 para monitorar e controlar
            a irrigação das suas plantas.
          </p>
        </div>
        <div className="container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0 items-center">
            <Esp32Model />
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

              <Link
                href="https://www.espressif.com/en/products/socs/esp32"
                rel="external"
                target="_blank"
                className={`${buttonVariants()} mt-4`}
              >
                Saiba Mais Sobre o Hardware
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="space-y-10 py-15 px-6 bg-primary/10">
        <div className="flex flex-col items-center gap-4">
          <h2 className="text-center text-3xl font-bold">
            Perguntas Frequentes
          </h2>
          <p className="text-center text-xl text-muted-foreground max-w-2xl">
            Tire suas dúvidas sobre o Verdea e como ele pode ajudar você a
            cuidar melhor das suas plantas.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left text-xl font-medium">
                Preciso ter conhecimentos técnicos para usar o Verdea?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Não! O Verdea foi projetado para ser fácil de configurar e
                usar. Nosso guia passo a passo torna a instalação simples, mesmo
                para quem não tem experiência técnica.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left text-xl font-medium">
                O Verdea funciona com qualquer tipo de planta?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Sim! O Verdea é compatível com qualquer tipo de planta. Nosso
                sistema permite configurar parâmetros específicos para cada
                espécie, garantindo cuidados adequados.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left text-xl font-medium">
                Posso controlar o Verdea quando estiver fora de casa?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Absolutamente! O Verdea é acessível de qualquer lugar através
                do nosso aplicativo web. Você pode monitorar e controlar suas
                plantas mesmo durante viagens.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left text-xl font-medium">
                Como o sistema de IA gera dicas personalizadas?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                Nossa IA analisa dados de umidade, temperatura e histórico de
                irrigação, combinando com informações específicas sobre cada
                espécie para gerar recomendações precisas.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger className="text-left text-xl font-medium">
                O Verdea é difícil de instalar?
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground">
                A instalação é simples e leva apenas alguns minutos. Conecte o
                dispositivo à sua rede Wi-Fi, configure no aplicativo e conecte
                ao seu sistema de irrigação.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <section className="flex flex-col items-center gap-10 py-15 px-6 bg-primary">
        <div className="text-center space-y-4 text-white">
          <h2 className="text-3xl font-bold">
            Pronto para Revolucionar o Cuidado com suas Plantas?
          </h2>
          <p className="text-xl max-w-2xl">
            Junte-se a milhares de pessoas que já estão usando o Verdea para
            cuidar melhor de suas plantas.
          </p>
        </div>

        <Link href="/register" className={buttonVariants({ size: "lg", variant: "outline" })}>
          Começar Gratuitamente
          <ArrowRight />
        </Link>
      </section>
    </>
  );
}

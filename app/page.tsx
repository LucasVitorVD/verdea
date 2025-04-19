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
                O PlantCare é um sistema de irrigação automática que monitora e
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

      <section className="flex flex-col items-center gap-10 py-15 px-4">
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
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </>
  );
}

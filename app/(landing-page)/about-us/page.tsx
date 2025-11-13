import { buttonVariants } from "@/button";
import Header from "@/components/header/Header";
import { publicPageNavigation } from "@/lib/navigation";
import Image from "next/image";
import AboutUsHeroImage from "@/public/images/about-us-hero.jpg";
import React from "react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Award, Leaf, Target } from "lucide-react";
import Footer from "@/components/footer/Footer";
import { TextAnimate } from "@/components/ui/text-animate";

export default function AboutUsPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header navigationItems={publicPageNavigation} />
      <main className="flex flex-col flex-1">
        <section className="grid md:grid-cols-2 items-center gap-12 px-12 py-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Cuidar das plantas é cuidar da vida <br />{" "}
              <TextAnimate className="text-primary" animation="slideUp" as="span" by="word" delay={1} once>
                — nós só tornamos isso mais fácil.
              </TextAnimate>
            </h1>
            <p className="pr-2">
              Soluções inteligentes e acessíveis para irrigação automatizada e
              cuidado de plantas. Ajudamos pessoas a cuidarem melhor de suas
              plantas, mesmo com a correria do dia a dia.
            </p>
            <Link
              href="/register?tab=login"
              className={buttonVariants({ variant: "default" })}
            >
              Acessar dashboard
            </Link>
          </div>

          <figure className="w-full">
            <Image
              src={AboutUsHeroImage}
              alt="Equipe Verdea"
              className="w-full h-full rounded-md object-cover shadow-2xl"
            />
          </figure>
        </section>

        <section className="px-12 py-16">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 max-w-6xl mx-auto">
            <div className="md:col-span-2 md:row-span-2 md:block hidden">
              <div className="aspect-[16/9] w-full h-full overflow-hidden rounded-2xl">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-full object-cover"
                >
                  <source src="/about-us-verdea-video.mp4" type="video/mp4" />
                </video>
              </div>
            </div>

            <Card className="md:col-span-2">
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Nossa Missão</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Ajudar pessoas a cuidarem melhor de suas plantas, mesmo com
                    a correria do dia a dia, promovendo o uso consciente da água
                    e incentivando o cultivo de hortas caseiras.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Nossa Visão</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Tornar a irrigação inteligente acessível para todos,
                    contribuindo para uma agricultura doméstica mais
                    sustentável.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col gap-4">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Nossos Valores</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    Sustentabilidade, inovação, acessibilidade e praticidade.
                    Tecnologia que serve às pessoas e ao meio ambiente.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        <section className="flex flex-col items-center justify-center gap-6 border-b-2 pb-12">
          <h2 className="text-2xl md:text-4xl">Nossa história</h2>

          <div className="space-y-6 text-justify text-muted-foreground px-12 md:max-w-4xl">
            <p>
              A EcoNativa é uma startup fundada em 2025 com o objetivo de
              revolucionar o cuidado de plantas através da tecnologia. Nascemos
              da observação de problemas reais enfrentados por pessoas que
              desejam cultivar suas próprias plantas e alimentos.
            </p>
            <p>
              Identificamos desafios importantes: os preços elevados dos
              alimentos, o uso excessivo de agrotóxicos na agricultura
              convencional e o desperdício significativo de água em irrigações
              tradicionais. Além disso, a rotina corrida da vida moderna deixa
              pouco tempo para o cuidado adequado das plantas.
            </p>
            <p>
              Nossa solução combina hardware IoT de última geração com uma
              plataforma web intuitiva, permitindo que qualquer pessoa possa
              cultivar plantas de forma eficiente, sustentável e sem
              complicações. Utilizamos sensores inteligentes e automação para
              garantir que suas plantas recebam exatamente a quantidade de água
              necessária, no momento certo.
            </p>
          </div>
        </section>
      </main>
      <Footer navigationItems={publicPageNavigation} />
    </div>
  );
}

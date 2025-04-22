import { ArrowRight, Droplet } from "lucide-react";
import Link from "next/link";
import RegisterTab from "@/components/register-tab/RegisterTab";
import { Suspense } from "react";
import Spinner from "@/components/spinner/Spinner";

export default function RegisterPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <div className="grid min-h-svh lg:grid-cols-2">
          <div className="flex flex-col gap-4 p-6 md:p-10">
            <div className="flex justify-center gap-2 md:justify-start">
              <Link href="/" className="flex items-center gap-2 font-medium">
                <div className="bg-primary text-primary-foreground flex size-6 items-center justify-center rounded-md">
                  <Droplet className="size-4" />
                </div>
                Verdea
              </Link>
            </div>
            <div className="flex flex-1 items-center justify-center">
              <div className="w-full max-w-xs space-y-8">
                <Suspense fallback={<Spinner />}>
                  <RegisterTab />
                </Suspense>
              </div>
            </div>
          </div>
          <div
            style={{ backgroundImage: "url('/images/agricultora.jpg')" }}
            className="bg-muted relative hidden lg:block bg-cover bg-center text-white"
          >
            <div className="flex flex-col items-center justify-center backdrop-brightness-50 h-full w-full">
              <h2 className="text-4xl font-bold mb-6 text-center max-w-xl">
                Cuide das suas plantas de forma inteligente
              </h2>
              <p className="text-xl mb-8 text-center max-w-lg">
                Junte-se a milhares de pessoas que já estão usando o Verdea
                para monitorar e cuidar melhor de suas plantas.
              </p>
              <div className="space-y-6 max-w-md">
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1">
                    <ArrowRight className="size-3.5 text-white" />
                  </div>
                  <p className="text-white/90">
                    Monitore a umidade e temperatura em tempo real
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1">
                    <ArrowRight className="size-3.5 text-white" />
                  </div>
                  <p className="text-white/90">
                    Receba dicas personalizadas para cada tipo de planta
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="h-6 w-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 mt-1">
                    <ArrowRight className="size-3.5 text-white" />
                  </div>
                  <p className="text-white/90">
                    Economize água com irrigação inteligente e automática
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

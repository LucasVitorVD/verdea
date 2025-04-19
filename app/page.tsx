import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

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
                  className={buttonVariants({ size: "lg", variant: "outline", className: "text-black" })}
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
    </>
  );
}

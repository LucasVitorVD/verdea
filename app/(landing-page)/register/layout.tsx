import Link from 'next/link'
import { Droplet, ArrowRight } from 'lucide-react'
import React from 'react'

export default function Layout({ children }: { children: React.ReactNode }) {
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
              {children}
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
                Junte-se a outras pessoas que já estão usando o Verdea para
                monitorar e cuidar melhor de suas plantas.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
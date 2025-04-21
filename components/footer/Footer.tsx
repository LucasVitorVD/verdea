import { Droplet, Github, Linkedin } from "lucide-react";
import Link from "next/link";
import { navigationItems } from "@/lib/navigation";
import { Separator } from "../ui/separator";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-10 px-12">
      <div className="grid md:grid-cols-4 gap-6 pb-12">
        <div className="space-y-2">
          <Link href="/" className="flex items-center gap-1.5">
            <Droplet className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold">Verdea</span>
          </Link>
          <p className="text-muted-foreground text-sm max-w-xs">
            Sistema de irrigação automática inteligente para suas plantas.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl">Produto</h3>
          <nav className="space-y-2">
            {navigationItems.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="text-muted-foreground block hover:underline"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl">Empresa</h3>
          <nav className="space-y-2">
            <Link
              href="/sobre"
              className="text-muted-foreground block hover:underline"
            >
              Sobre Nós
            </Link>
          </nav>
        </div>
        <div className="space-y-2">
          <h3 className="text-xl">Legal</h3>
          <nav className="space-y-2">
            <Link
              href="/termos"
              className="text-muted-foreground block hover:underline"
            >
              Termos de serviço
            </Link>
            <Dialog>
              <DialogTrigger className="text-muted-foreground hover:underline cursor-pointer">
                Cookies
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Política de Cookies</DialogTitle>
                  <DialogDescription>
                    Como utilizamos cookies em nosso site
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-6">
                  <p className="text-muted-foreground text-sm">
                    O Verdea utiliza cookies para melhorar sua experiência em
                    nosso site. Cookies são pequenos arquivos de texto que são
                    armazenados em seu dispositivo quando você visita nosso
                    site.
                  </p>

                  <div className="space-y-2">
                    <h4>Tipos de cookies que utilizamos:</h4>
                    <ul className="text-muted-foreground text-sm list-disc pl-6 space-y-2">
                      <li>
                        Cookies essenciais: necessários para o funcionamento
                        básico do site
                      </li>
                      <li>
                        Cookies de preferências: armazenam suas configurações e
                        preferências
                      </li>
                      <li>
                        Cookies analíticos: nos ajudam a entender como você usa
                        nosso site
                      </li>
                      <li>
                        Cookies de marketing: utilizados para personalizar
                        anúncios
                      </li>
                    </ul>
                  </div>
                  <p className="text-muted-foreground text-sm">
                    Você pode gerenciar suas preferências de cookies a qualquer
                    momento através das configurações do seu navegador.
                  </p>
                </div>
                <DialogFooter className="sm:justify-end">
                  <DialogClose asChild>
                    <Button type="button" variant="default">
                      Entendi
                    </Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </nav>
        </div>
      </div>
      <Separator />
      <div className="flex items-center justify-between flex-wrap gap-4 text-muted-foreground pt-6">
        <p>© {currentYear} Verdea. Todos os direitos reservados.</p>
        <div className="flex items-center gap-4">
          <Link
            href="https://www.linkedin.com/in/lucasvvicente/"
            rel="external"
            target="_blank"
          >
            <Linkedin />
          </Link>
          <Link
            href="https://github.com/LucasVitorVD"
            rel="external"
            target="_blank"
          >
            <Github />
          </Link>
        </div>
      </div>
    </footer>
  );
}

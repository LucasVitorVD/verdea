import { buttonVariants } from "@/components/ui/button";
import { Droplet, MoveLeft } from "lucide-react";
import Link from "next/link";

export default function LandingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="flex justify-between px-8 py-6 sticky top-0 bg-white/80 backdrop-blur-lg z-50">
        <Link href="/" className="flex items-center gap-1.5">
          <Droplet className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Verdea</span>
        </Link>

        <div className="flex items-center gap-12">
          <div className="space-x-4">
            <Link href="/" className={buttonVariants({ variant: "outline" })}>
              <MoveLeft />
              Início
            </Link>
          </div>
        </div>
      </header>
      <main className="flex flex-1">{children}</main>
      <footer className="border-t-2 p-6">
        <p className="text-muted-foreground text-center">
          © {new Date().getFullYear()} Verdea. Todos os direitos reservados.
        </p>
      </footer>
    </>
  );
}

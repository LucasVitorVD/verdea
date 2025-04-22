import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"

export default function SignUpForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form className={cn("flex flex-col gap-6", className)} {...props}>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" type="email" placeholder="m@example.com" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="password">Senha</Label>
          <Input id="password" type="password" required />
        </div>
        <div className="grid gap-3">
          <Label htmlFor="confirm-password">Confirmar senha</Label>
          <Input id="confirm-password" type="password" required />
        </div>
        <Button type="submit" className="w-full cursor-pointer">
          Criar conta
        </Button>
      </div>
      <div className="text-center text-sm">
        Já tem uma conta?{" "}
        <Link href="/register?tab=login" className="underline underline-offset-4 hover:text-primary">
          Entrar
        </Link>
      </div>
    </form>
  )
}
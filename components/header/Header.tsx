import Link from "next/link";
import { Droplet } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { navigationItems } from "@/lib/navigation";
import MobileNavigation from "./MobileNavigation";
import { buttonVariants } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="flex justify-between px-8 py-6 sticky top-0">
      <Link href="/" className="flex items-center gap-1.5">
        <Droplet className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">Verdea</span>
      </Link>

      <NavigationMenu className="hidden lg:block">
        <NavigationMenuList>
          {navigationItems.map((navigation) => (
            <NavigationMenuItem key={navigation.href}>
              <Link href={navigation.href} passHref>
                <NavigationMenuLink className={`${navigationMenuTriggerStyle()} hover:text-primary`}>
                  {navigation.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-12">
        <div className="space-x-4 hidden lg:block">
          <Link href="/login" className={buttonVariants()}>Entrar</Link>
        </div>

        <MobileNavigation />
      </div>
    </header>
  );
}
import Link from "next/link";
import { Droplet } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "../ui/button";
import { navigationItems } from "@/lib/navigation";
import MobileNavigation from "./MobileNavigation";

export default function Header() {
  return (
    <header className="flex justify-between px-8 py-6 sticky top-0">
      <div className="flex items-center gap-1.5">
        <Droplet className="h-6 w-6 text-primary" />
        <span className="text-xl font-bold">Verdea</span>
      </div>

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
          <Button variant="outline" className="cursor-pointer">
            Entrar
          </Button>
          <Button className="cursor-pointer">Cadastrar</Button>
        </div>

        <MobileNavigation />
      </div>
    </header>
  );
}

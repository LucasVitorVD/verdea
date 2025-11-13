import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import MobileNavigation from "./MobileNavigation";
import { NavigationItems } from "@/interfaces/navigationItem";
import { buttonVariants } from "../ui/button";
import Image from "next/image";
import VerdeaLogo from "@/public/images/logo-verdea.png"

interface Props {
  navigationItems: NavigationItems[];
}

export default function Header({ navigationItems }: Props) {
  return (
    <header className="flex justify-between items-center px-8 py-6 sticky top-0 bg-white/80 backdrop-blur-lg z-50 md:px-16">
      <Link href="/" className="flex items-center gap-1.5">
        <Image src={VerdeaLogo} alt="Logo Verdea" width={130} height={100} />
      </Link>

      <NavigationMenu className="hidden lg:block">
        <NavigationMenuList>
          {navigationItems.map((navigation) => (
            <NavigationMenuItem key={navigation.href}>
              <Link href={navigation.href} passHref>
                <NavigationMenuLink className="hover:text-primary">
                  {navigation.title}
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center gap-12">
        <div className="space-x-4 hidden lg:block">
          <Link href="/register?tab=login" className={buttonVariants()}>
            Entrar
          </Link>
        </div>

        <MobileNavigation navigationItems={navigationItems} />
      </div>
    </header>
  );
}
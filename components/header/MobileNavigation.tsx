"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import Link from "next/link";
import { Menu } from "lucide-react";
import { navigationItems } from "@/lib/navigation";
import { buttonVariants } from "@/components/ui/button"
import { useState } from "react";

export default function MobileNavigation() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="lg:hidden">
        <Menu className="text-primary" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <NavigationMenu className="py-12">
            <NavigationMenuList className="flex flex-col items-start">
              {navigationItems.map((navigation) => (
                <NavigationMenuItem key={navigation.href}>
                  <Link
                    href={navigation.href}
                    passHref
                    onClick={() => setOpen(false)}
                  >
                    <NavigationMenuLink
                      className={navigationMenuTriggerStyle()}
                    >
                      {navigation.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
              <NavigationMenuItem>
                <Link
                  href="/login"
                  passHref
                  className={`${buttonVariants()} underline`}
                  onClick={() => setOpen(false)}
                >
                  Entrar
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}

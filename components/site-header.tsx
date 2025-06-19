"use client";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Bell } from "lucide-react";
import { dashboardNavigationItems } from "@/lib/navigation";
import { usePathname } from "next/navigation";
import {  useMemo } from "react"

export function SiteHeader() {
  const pathName = usePathname();

  const currentPage = useMemo(() => {
    return dashboardNavigationItems.documents.find(
      (item) => item.url === pathName
    );
  }, [pathName]);

  return (
    <header className="flex h-(--header-height) shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-(--header-height)">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />

        <div className="flex items-center justify-between flex-1">
          <h1 className="text-base font-medium">{currentPage?.name ?? "Seu jardim"}</h1>
          <div className="flex items-end gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <Bell className="size-5" />
                  <div className="absolute -top-0.5 -right-0 size-4 flex items-center justify-center text-xs bg-primary text-white rounded-full">
                    3
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                align="end"
                className="w-80 z-50 bg-white border shadow-lg"
              >
                <DropdownMenuItem className="flex flex-col items-start p-4 border-b">
                  <div className="font-medium text-red-600">Device Offline</div>
                  <div className="text-sm">
                    Garden Sensor #2 has been offline for 2 hours
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start p-4 border-b">
                  <div className="font-medium text-orange-600">
                    Low Water Level
                  </div>
                  <div className="text-sm">
                    Main reservoir is at 15% capacity
                  </div>
                </DropdownMenuItem>
                <DropdownMenuItem className="flex flex-col items-start p-4">
                  <div className="font-medium text-blue-600">
                    Irrigation Complete
                  </div>
                  <div className="text-sm">
                    Tomato plants were watered successfully
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
}

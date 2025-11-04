"use client";

import StatsCards from "@/components/stats-cards/StatsCards";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import UsersTable from "../users-table/UsersTable";
import DevicesTableAdmin from "../devices-table/DevicesTableAdmin";
import PlantsTable from "../plants-table/PlantsTable";
import { redirect, useSearchParams } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function AdminPageContent() {
  const [currentTab, setCurrentTab] = useState("users");

  const { userQuery } = useAuth();
  const searchParams = useSearchParams();

  const tab = searchParams.get("tab") ?? "users";

  useEffect(() => {
    setCurrentTab(tab);
  }, [tab]);

  useEffect(() => {
    if (userQuery.data?.role !== "ADMIN") {
      redirect("/dashboard");
    }
  }, [userQuery.data]);

  return (
    <section className="flex flex-col flex-1 py-4 px-4 gap-12 md:p-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Painel Administrativo</h1>
          <p className="text-muted-foreground">
            Gerencie plantas, dispositivos e usuários do sistema.
          </p>
        </div>
      </div>

      <StatsCards />

      <Tabs
        defaultValue="users"
        value={currentTab}
        onValueChange={setCurrentTab}
        className="w-full"
      >
        <TabsList>
          <TabsTrigger value="users">Usuários</TabsTrigger>
          <TabsTrigger value="devices">Dispositivos</TabsTrigger>
          <TabsTrigger value="plants">Plantas</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UsersTable />
        </TabsContent>
        <TabsContent value="devices">
          <DevicesTableAdmin />
        </TabsContent>
        <TabsContent value="plants">
          <PlantsTable />
        </TabsContent>
      </Tabs>
    </section>
  );
}

"use client";

import { Leaf, Router, Users } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useUsers } from "@/hooks/admin/useUsers";
import { useDevices } from "@/hooks/admin/useDevice";
import { usePlants } from "@/hooks/admin/usePlants";

export default function StatsCards() {
  const { usersQuery } = useUsers()
  const { devicesQuery } = useDevices()
  const { plantsQuery } = usePlants()

  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Total de Plantas
          </CardTitle>
          <Leaf className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{plantsQuery.data?.length}</div>
          <p className="text-xs text-muted-foreground">
            Cadastradas no sistema
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">
            Dispositivos Registrados
          </CardTitle>
          <Router className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {devicesQuery.data?.length}
          </div>
          <p className="text-xs text-muted-foreground">
            Total de dispositivos no sistema
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="text-sm font-medium">Usuários Cadastrados</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {usersQuery.data?.length}
          </div>
          <p className="text-xs text-muted-foreground">
            Total de usuários no sistema
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

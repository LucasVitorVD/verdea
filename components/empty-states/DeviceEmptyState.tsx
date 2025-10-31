"use client";

import Link from "next/link";
import EmptyState from "../empty-state";
import EmptyStateIllustration from "@/public/images/illustrations/undraw_gardening.svg";
import { useAuth } from "@/context/AuthContext";

export default function DeviceEmptyState() {
  const { userQuery } = useAuth();
  const role = userQuery.data?.role;

  const isAdmin = role === "ADMIN";

  return (
    <div className="flex flex-col items-center gap-4">
      <EmptyState
        title={
          isAdmin
            ? "Nenhum dispositivo registrado ainda"
            : "Nenhum dispositivo encontrado"
        }
        description={
          isAdmin
            ? "Assim que um novo dispositivo for ligado e se registrar na plataforma, ele aparecerá automaticamente aqui."
            : "Você ainda não possui dispositivos conectados. Adicione um dispositivo ESP32 para monitorar suas plantas."
        }
        imgSrc={EmptyStateIllustration}
        imgAlt="Sem dispositivos"
      />

      {!isAdmin && (
        <Link
          href="/dashboard/devices"
          className="text-blue-500 text-center hover:underline"
        >
          Adicionar dispositivo
        </Link>
      )}
    </div>
  );
}

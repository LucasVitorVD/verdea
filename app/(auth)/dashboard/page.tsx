"use client";

import { ChartAreaInteractive } from "@/components/chart-area-interactive";
import { SectionCards } from "@/components/section-cards";
import { useAuth } from "@/context/AuthContext";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export default function DashboardPage() {
  const { userQuery } = useAuth();
  const user = userQuery.data;

  useEffect(() => {
    if (user && user.role === "ADMIN") {
      redirect("/dashboard/admin");
    }
  }, [user]);

  return (
    <section className="flex flex-col flex-1 py-4 px-4 md:p-6">
      <div className="flex flex-col gap-4">
        <SectionCards />
        <div className="px-4 lg:px-6">
          <ChartAreaInteractive />
        </div>
      </div>
    </section>
  );
}

import React from "react";
import IrrigationHistoryList from "@/components/irrigation-history-list/IrrigationHistoryList";

export default function IrrigationHistoryPage() {
  return (
    <section className="flex flex-col flex-1 py-4 px-4 gap-6 md:p-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Histórico de Irrigação</h1>
          <p className="text-muted-foreground">
            Monitore e analise o histórico de irrigação das suas plantas.
          </p>
        </div>
      </div>

      <IrrigationHistoryList />
    </section>
  );
}

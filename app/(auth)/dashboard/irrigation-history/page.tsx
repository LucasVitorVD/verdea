import { buttonVariants } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Clock, Droplets, ListFilterPlus } from "lucide-react";
import React from "react";
import IrrigationHistoryList from "@/components/irrigation-history-list/IrrigationHistoryList";

const mockHistory = [
  {
    id: 1,
    soil_moisture: 45.5,
    mode: "AUTO",
    duration_seconds: 180,
    timestamp: "2024-01-15T08:30:00",
    plant_id: 1,
    plant_name: "Tomate Cereja",
    device_id: 1,
    device_name: "Dispositivo Jardim A",
  },
  {
    id: 2,
    soil_moisture: 38.2,
    mode: "PROGRAMADO",
    duration_seconds: 240,
    timestamp: "2024-01-15T14:00:00",
    plant_id: 2,
    plant_name: "Alface Crespa",
    device_id: 2,
    device_name: "Dispositivo Horta B",
  },
  {
    id: 3,
    soil_moisture: 42.8,
    mode: "AUTO",
    duration_seconds: 150,
    timestamp: "2024-01-15T18:45:00",
    plant_id: 3,
    plant_name: "Manjericão",
    device_id: 1,
    device_name: "Dispositivo Jardim A",
  },
  {
    id: 4,
    soil_moisture: 35.0,
    mode: "AUTO",
    duration_seconds: 300,
    timestamp: "2024-01-16T07:15:00",
    plant_id: 1,
    plant_name: "Tomate Cereja",
    device_id: 1,
    device_name: "Dispositivo Jardim A",
  },
  {
    id: 5,
    soil_moisture: 40.5,
    mode: "PROGRAMADO",
    duration_seconds: 200,
    timestamp: "2024-01-16T12:00:00",
    plant_id: 4,
    plant_name: "Pimentão",
    device_id: 3,
    device_name: "Dispositivo Estufa C",
  },
];

export default function IrrigationHistoryPage() {
  const filteredHistory = mockHistory.filter((item) => {
    return item.mode === "PROGRAMADO";
  });

  return (
    <section className="flex flex-col flex-1 py-4 px-4 gap-6 md:p-6">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-semibold">Histórico de Irrigação</h1>
          <p className="text-muted-foreground">
            Monitore e analise o histórico de irrigação das suas plantas.
          </p>
        </div>

        <Sheet>
          <SheetTrigger className={buttonVariants({ variant: "outline" })}>
            Filtrar <ListFilterPlus />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filtros de Irrigação</SheetTitle>
              <SheetDescription>
                Filtre os registros de irrigação conforme necessário
              </SheetDescription>
            </SheetHeader>
          </SheetContent>
        </Sheet>
      </div>

      <IrrigationHistoryList history={mockHistory} />
    </section>
  );
}

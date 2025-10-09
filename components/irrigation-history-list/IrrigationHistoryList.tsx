"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Droplets } from "lucide-react";
import { Badge } from "../ui/badge";
import { useState } from "react";

interface IrrigationRecord {
  id: number;
  soil_moisture: number;
  mode: "AUTO" | "PROGRAMADO";
  duration_seconds: number;
  timestamp: string;
  plant_id: number;
  plant_name: string;
  device_id: number;
  device_name: string;
}

interface IrrigationHistoryListProps {
  history: IrrigationRecord[];
}

export default function IrrigationHistoryList({
  history,
}: IrrigationHistoryListProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;

  const totalItems = history.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = history.slice(startIndex, endIndex);

  const handlePrevious = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const formatDuration = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}m ${secs}s`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex flex-col flex-1">
      <div className="flex-1">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {history.length > 0 ? (
            history.map((item) => (
              <Card
                key={item.id}
                className="border-l-4 border-l-primary hover:shadow-md transition-shadow"
              >
                <CardContent>
                  <div className="mb-2">
                    <h3 className="font-semibold text-sm truncate">
                      {item.plant_name}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">
                      Dispositivo: {item.device_name}
                    </p>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                      <span className="truncate">
                        {formatDate(item.timestamp)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Droplets className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                      <span>{item.soil_moisture.toFixed(1)}%</span>
                      <span className="text-muted-foreground">•</span>
                      <span>{formatDuration(item.duration_seconds)}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5 mt-2.5 pt-2.5 border-t">
                    <Badge
                      variant={item.mode === "AUTO" ? "default" : "secondary"}
                      className={`${
                        item.mode === "PROGRAMADO" && "bg-blue-500 text-white"
                      } text-xs py-0`}
                    >
                      {item.mode}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card>
              <CardContent className="py-12 text-center">
                <Droplets className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <p className="text-muted-foreground">
                  Nenhum registro encontrado com os filtros aplicados
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={handlePrevious}
                className={
                  currentPage === 1 ? "opacity-50 pointer-events-none" : ""
                }
              />
            </PaginationItem>

            {Array.from({ length: totalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {totalPages > 5 && <PaginationEllipsis />}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={handleNext}
                className={
                  currentPage === totalPages
                    ? "opacity-50 pointer-events-none"
                    : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

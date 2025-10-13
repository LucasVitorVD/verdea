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
import { Clock, Droplets, RefreshCcw, Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";
import { useState } from "react";
import { IrrigationPage } from "@/interfaces/irrigationRecord";
import { formatDate } from "@/lib/utils";
import { formatDuration } from "@/lib/utils";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import EmptyState from "../empty-state";
import EmptyIllustration from "@/public/images/illustrations/undraw_search-app.svg";
import { Button } from "../ui/button";

export default function IrrigationHistoryList() {
  const [currentPage, setCurrentPage] = useState(1);
  const queryClient = useQueryClient();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["getUserIrrigationHistory", currentPage],
    queryFn: async ({ queryKey }) => {
      const [, page] = queryKey as [string, number];

      try {
        const response = await axiosInstance.get(
          process.env.NEXT_PUBLIC_API_URL +
            `/irrigation-history/all?page=${page - 1}&size=8`
        );

        return response.data as IrrigationPage;
      } catch (error) {
        toast.error(
          "Erro ao carregar o histórico de irrigação. Tente novamente mais tarde."
        );
      }
    },
    refetchOnWindowFocus: false,
  });

  const deleteHistoryMutation = useMutation({
    mutationFn: async (historyId: number) => {
      return axiosInstance.delete(
        process.env.NEXT_PUBLIC_API_URL +
          `/irrigation-history/delete/${historyId}`
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUserIrrigationHistory"] });
      toast.success("Registro de irrigação excluído!");
    },
    onError: () => {
      toast.error("Não foi possível excluir o registro de irrigação!");
    },
    retry: 2,
  });

  const handlePrevious = () => {
    if (!data?.first) {
      const prev = currentPage - 1;
      setCurrentPage(prev);
    }
  };

  const handleNext = () => {
    if (!data?.last) {
      const next = currentPage + 1;
      setCurrentPage(next);
    }
  };

  const handlePageClick = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12 text-muted-foreground">
        Carregando histórico...
      </div>
    );
  }

  if (data && data.content.length <= 0) {
    return (
      <div className="flex flex-col items-center justify-center flex-1 gap-6">
        <EmptyState
          title="Nenhum registro de irrigação encontrado… por enquanto!"
          description="Quando você começar a irrigar suas plantas, os registros aparecerão aqui."
          imgSrc={EmptyIllustration}
          imgAlt="Ilustração de histórico não encontrado"
        />
        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isLoading}
          className="hover:cursor-pointer"
        >
          Atualizar <RefreshCcw />
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <div className="flex justify-end mb-4">
        <Button
          variant="outline"
          onClick={() => refetch()}
          disabled={isLoading}
          className="hover:cursor-pointer"
        >
          Atualizar <RefreshCcw />
        </Button>
      </div>
      <div className="flex-1">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {data &&
            data.content.length > 0 &&
            data.content.map((history) => (
              <Card
                key={history.id}
                className="border-l-4 border-l-primary hover:shadow-md transition-shadow"
              >
                <CardContent>
                  <div className="mb-2">
                    <h3 className="font-semibold text-sm truncate">
                      {history.plant.name}
                    </h3>
                    <p className="text-xs text-muted-foreground truncate">
                      Dispositivo: {history.deviceName}
                    </p>
                  </div>

                  <div className="space-y-1.5 text-xs">
                    <div className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                      <span className="truncate">
                        {formatDate(history.createdAt)}
                      </span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <Droplets className="h-3 w-3 text-muted-foreground flex-shrink-0" />
                      <span>{history.soilMoisture.toFixed(1)}%</span>
                      <span className="text-muted-foreground">•</span>
                      <span>{formatDuration(history.durationSeconds)}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-1.5 mt-2.5 pt-2.5 border-t">
                    <Badge
                      variant={
                        history.mode === "AUTO" ? "default" : "secondary"
                      }
                      className={`${
                        history.mode === "PROGRAMADO" &&
                        "bg-blue-500 text-white"
                      } text-xs py-0`}
                    >
                      {history.mode}
                    </Badge>
                    <Trash2
                      className="size-5 text-muted-foreground hover:text-destructive hover:cursor-pointer"
                      onClick={() => deleteHistoryMutation.mutate(history.id)}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
        </div>
      </div>

      {data && data.totalPages >= 1 && (
        <Pagination className="mt-5">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={handlePrevious}
                className={data.first ? "opacity-50 pointer-events-none" : ""}
              />
            </PaginationItem>

            {Array.from({ length: data.totalPages }).map((_, index) => (
              <PaginationItem key={index}>
                <PaginationLink
                  href="#"
                  isActive={currentPage === index + 1}
                  onClick={() => handlePageClick(index + 1)}
                >
                  {index + 1}
                </PaginationLink>
              </PaginationItem>
            ))}

            {data.totalPages > 5 && <PaginationEllipsis />}

            <PaginationItem>
              <PaginationNext
                href="#"
                onClick={handleNext}
                className={data.last ? "opacity-50 pointer-events-none" : ""}
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}

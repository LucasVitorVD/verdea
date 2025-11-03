"use client";

import * as React from "react";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { SoilMoisture } from "@/interfaces/dashboard";
import EmptyState from "./empty-state";
import EmptyIllustration from "@/public/images/illustrations/undraw_search-app.svg";

interface Props {
  data: SoilMoisture[];
}

export const description = "An interactive area chart";

const chartConfig = {
  totalAverage: {
    label: "Umidade Total",
  },
  averageMoisture: {
    label: "Valor:",
    color: "var(--primary)",
  },
} satisfies ChartConfig;

export function ChartAreaInteractive({ data }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Níveis de umidade do solo</CardTitle>
        <CardDescription>
          Níveis de umidade do solo durante os últimos dias
        </CardDescription>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        {data && data.length > 0 ? (
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[300px] w-full"
          >
            <AreaChart
              accessibilityLayer
              data={data}
              margin={{
                left: 12,
                right: 12,
              }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("pt-BR", {
                    month: "short",
                    day: "2-digit",
                  })
                }
              />
              <ChartTooltip
                cursor={false}
                content={
                  <ChartTooltipContent
                    indicator="line"
                    labelKey="totalAverage"
                    nameKey="averageMoisture"
                  />
                }
              />
              <Area
                dataKey="averageMoisture"
                type="natural"
                fill="var(--color-primary)"
                fillOpacity={0.4}
                stroke="var(--color-primary)"
              />
            </AreaChart>
            {/* <BarChart accessibilityLayer data={data}>
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                tickMargin={10}
                axisLine={false}
                tickFormatter={(value) =>
                  new Date(value).toLocaleDateString("pt-BR", {
                    month: "short",
                    day: "2-digit",
                  })
                }
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelKey="totalAverage"
                    nameKey="averageMoisture"
                  />
                }
              />
              <Bar
                dataKey="averageMoisture"
                fill="var(--color-averageMoisture)"
                radius={4}
              />
            </BarChart> */}
          </ChartContainer>
        ) : (
          <EmptyState
            title="Nenhum dado de umidade disponível"
            description="Não encontramos registros de irrigação. Realize a primeira irrigação para que os dados sejam exibidos neste gráfico."
            imgSrc={EmptyIllustration}
            imgAlt="Ilustração de dados não encontrados"
          />
        )}
      </CardContent>
    </Card>
  );
}

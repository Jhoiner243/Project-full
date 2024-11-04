"use client"

import React, { useMemo } from 'react';
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Line, LineChart } from "recharts";
import {
  ChartTooltip,
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { usePedidosGet } from '@/hooks/Pedidos/usePedidosGet';
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


interface PedidoGet {
  id: number;
  fecha: string;
  total: number;
  estado: 'pagado' | 'fiado';
}

interface ChartData {
  periodo: string;
  ganancias: number;
}

interface UsePedidosGetResult {
  pedidos: PedidoGet[];
  isLoading: boolean;
  error: Error | null;
  diario: ChartData[];
  semanal: ChartData[];
  mensual: ChartData[];
}


interface ChartData {
  periodo: string;
  ganancias: number;
  pedidos: number;
  clientes: Set<number>;
}

const chartConfig = {
  ganancias: {
    label: "Ganancias",
    color: "hsl(var(--chart-1))",
  },
  pedidos: {
    label: "Pedidos",
    color: "hsl(var(--chart-2))",
  },
  clientes: {
    label: "Clientes",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig;

type PeriodType = "diario" | "semanal" | "mensual";

export default function GraficBarra() {
  const { pedidos, isLoading, error, diario, semanal, mensual } = usePedidosGet() as UsePedidosGetResult;
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("ganancias");
  const [activePeriod, setActivePeriod] = React.useState<PeriodType>("mensual");

  const activeData = useMemo(() => {
    switch (activePeriod) {
      case 'diario':
        return diario;
      case 'semanal':
        return semanal;
      case 'mensual':
        return mensual;
      default:
        return [];
    }
  }, [activePeriod, diario, semanal, mensual]);

  const totals = useMemo(() => {
    if (!activeData || activeData.length === 0) {
      return { ganancias: 0, pedidos: pedidos.length, clientes: new Set(pedidos.map((p: { id: number; }) => p.id)).size };
    }
    return {
      ganancias: activeData.reduce((sum, item: { ganancias: number; }) => sum + item.ganancias, 0),
      pedidos: pedidos.length,
      clientes: new Set(pedidos.map((p: { id: number; }) => p.id)).size,
    };
  }, [activeData, pedidos]);

  const renderChart = () => {
    if (isLoading) {
      return <Skeleton className="h-[400px] w-full" />;
    }
    if (error) {
      return <div className="text-red-500">Error: {error.message}</div>;
    }
    if (!activeData || activeData.length === 0) {
      return <div className="flex items-center justify-center h-[400px]">No hay datos disponibles para este período</div>;
    }
    if (activeChart === "ganancias") {
      return (
        <LineChart
          data={activeData}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="periodo" />
          <YAxis />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Line type="monotone" dataKey="ganancias" stroke={chartConfig.ganancias.color} activeDot={{ r: 8 }} />
        </LineChart>
      );
    }
    return (
      <BarChart
        data={activeData}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="periodo" />
        <YAxis />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="pedidos" fill={chartConfig.pedidos.color} />
        <Bar dataKey="clientes" fill={chartConfig.clientes.color} />
      </BarChart>
    );
  };
  console.log('Pedidos recibidos:', pedidos);
console.log('Datos activos:', activeData);
  return (
    <div className='container min-[150px] max-[200px]:'>
      <Card className=''>
        <CardHeader className="flex flex-col items-stretch space-y-0 border-b p-0 sm:flex-row">
          <div className="flex flex-1 flex-col justify-center gap-1 px-6 py-5 sm:py-6">
            <CardTitle>Dashboard de Ventas - Interactivo</CardTitle>
            <CardDescription>
              Mostrando ganancias, pedidos y clientes
            </CardDescription>
          </div>
          <div className="flex">
            {(Object.keys(chartConfig) as Array<keyof typeof chartConfig>).map((key) => (
              <button
                key={key}
                data-active={activeChart === key}
                className="relative z-30 flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6"
                onClick={() => setActiveChart(key)}
              >
                <span className="text-xs text-muted-foreground">
                  {chartConfig[key].label}
                </span>
                <span className="text-lg font-bold leading-none sm:text-3xl">
                  {key === "ganancias" 
                    ? `$${totals[key].toLocaleString()}`
                    : totals[key].toLocaleString()}
                </span>
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent className="px-2 sm:p-6">
          <Tabs value={activePeriod} onValueChange={(value) => setActivePeriod(value as "diario" | "semanal" | "mensual")}>
            <TabsList>
              <TabsTrigger value="diario">Diario</TabsTrigger>
              <TabsTrigger value="semanal">Semanal</TabsTrigger>
              <TabsTrigger value="mensual">Mensual</TabsTrigger>
            </TabsList>
            <TabsContent value={activePeriod}>
              <ChartContainer config={chartConfig} className="min-h-[400px] w-full">
                {renderChart()}
              </ChartContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
"use client"

import React, { useMemo } from 'react'
import { Bar, BarChart, CartesianGrid, XAxis, YAxis,  Line, LineChart } from "recharts"
import {
  ChartTooltip,
  ChartConfig,
  ChartContainer,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import { usePedidosGet } from '@/hooks/Pedidos/usePedidosGet'
import type { PedidoGet } from '@/hooks/Pedidos/pedidos'
import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Configuración de colores para los gráficos
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
} satisfies ChartConfig

export default function GraficBarra() {
  const { pedidos, isLoading, error } = usePedidosGet()
  const [activeChart, setActiveChart] = React.useState<keyof typeof chartConfig>("ganancias")
  const [activePeriod, setActivePeriod] = React.useState<"diario" | "semanal" | "mensual">("mensual")

  // Datos de ejemplo para los gráficos
  const gananciasData = useMemo(() => {
    const periodos = activePeriod === "diario" ? 30 : activePeriod === "semanal" ? 12 : 12
    return Array.from({ length: periodos }, (_, i) => ({
      periodo: activePeriod === "diario" ? `Día ${i + 1}` : activePeriod === "semanal" ? `Semana ${i + 1}` : `Mes ${i + 1}`,
      ganancias: Math.floor(Math.random() * 10000) + 5000,
    }))
  }, [activePeriod])

  const pedidosClientesData = useMemo(() => {
    const periodos = activePeriod === "diario" ? 30 : activePeriod === "semanal" ? 12 : 12
    return Array.from({ length: periodos }, (_, i) => ({
      periodo: activePeriod === "diario" ? `Día ${i + 1}` : activePeriod === "semanal" ? `Semana ${i + 1}` : `Mes ${i + 1}`,
      pedidos: Math.floor(Math.random() * 100) + 50,
      clientes: Math.floor(Math.random() * 50) + 20,
    }))
  }, [activePeriod])

  const totalGanancias = useMemo(() => gananciasData.reduce((acc, curr) => acc + curr.ganancias, 0), [gananciasData])
  const totalPedidos = useMemo(() => pedidosClientesData.reduce((acc, curr) => acc + curr.pedidos, 0), [pedidosClientesData])
  const totalClientes = useMemo(() => pedidosClientesData.reduce((acc, curr) => acc + curr.clientes, 0), [pedidosClientesData])

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
                    ? `$${totalGanancias.toLocaleString()}`
                    : key === "pedidos"
                    ? totalPedidos.toLocaleString()
                    : totalClientes.toLocaleString()}
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
                {isLoading ? (
                  <Skeleton className="h-[400px] w-full" />
                ) : error ? (
                  <div className="text-red-500">Error: {error.message}</div>
                ) : (
                  activeChart === "ganancias" ? (
                    <LineChart
                      data={gananciasData}
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
                  ) : (
                    <BarChart
                      data={pedidosClientesData}
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
                  )
                )}
              </ChartContainer>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
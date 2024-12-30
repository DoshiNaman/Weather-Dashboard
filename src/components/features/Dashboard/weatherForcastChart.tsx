"use client";

import * as React from "react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

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
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Circle, GitCommitVertical } from "lucide-react";

const chartConfig = {
  temperature_2m_max: {
    label: "temperature_2m_max",
    color: "#FF5733",
  },
  apparent_temperature_max: {
    label: "apparent_temperature_max",
    color: "#fbbf24",
  },
  temperature_2m_mean: {
    label: "temperature_2m_mean",
    color: "#28A745",
  },
  apparent_temperature_mean: {
    label: "apparent_temperature_mean",
    color: "#a3e635",
  },
  temperature_2m_min: {
    label: "temperature_2m_min",
    color: "#007BFF",
  },
  apparent_temperature_min: {
    label: "apparent_temperature_min",
    color: "#6F42C1",
  },
} satisfies ChartConfig;

export function WeatherForcastChart({
  data,
}: {
  data: {
    date: string;
    temperature_2m_max: number | null;
    apparent_temperature_max: number | null;
    temperature_2m_mean: number | null;
    apparent_temperature_mean: number | null;
    temperature_2m_min: number | null;
    apparent_temperature_min: number | null;
  }[];
}) {
  function activeDotStyle(color: any, cx: any, cy: any, payload: any) {
    return (
      <>
        <Circle
          key={payload.month}
          x={cx - 15 / 2}
          y={cy - 15 / 2}
          width={15}
          height={15}
          fill={color}
          opacity={0.2}
          stroke={color}
        />
        <Circle
          key={payload.month}
          x={cx - 10 / 2}
          y={cy - 10 / 2}
          width={10}
          height={10}
          opacity={0.5}
          fill={color}
          stroke={color}
        />
        <Circle
          key={payload.month}
          x={cx - 5 / 2}
          y={cy - 5 / 2}
          width={5}
          height={5}
          opacity={1}
          fill={color}
          stroke={color}
        />
      </>
    );
  }

  return (
    <Card>
      <CardHeader className="flex items-center gap-2 space-y-0 border-b py-5 sm:flex-row">
        <div className="grid flex-1 gap-1 text-center sm:text-left">
          <CardTitle>Daily Temperature Trends</CardTitle>
          <CardDescription>
            Daily max, mean, and min temperatures with apparent temperature
            comparisons.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-2 pt-4 sm:px-6 sm:pt-6">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[300px] w-full"
        >
          <LineChart
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
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              // cursor={false}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    });
                  }}
                  className="md:w-[20vw]"
                />
              }
            />
            <Line
              dataKey="temperature_2m_max"
              type="monotone"
              stroke="var(--color-temperature_2m_max)"
              strokeWidth={1}
              dot={false}
              activeDot={({ cx, cy, payload }: any) =>
                activeDotStyle(
                  "var(--color-temperature_2m_max)",
                  cx,
                  cy,
                  payload
                )
              }
            />
            <Line
              dataKey="apparent_temperature_max"
              type="monotone"
              stroke="var(--color-apparent_temperature_max)"
              strokeWidth={1}
              dot={false}
              activeDot={({ cx, cy, payload }: any) =>
                activeDotStyle(
                  "var(--color-apparent_temperature_max)",
                  cx,
                  cy,
                  payload
                )
              }
            />
            <Line
              dataKey="temperature_2m_mean"
              type="monotone"
              stroke="var(--color-temperature_2m_mean)"
              strokeWidth={1}
              dot={false}
              activeDot={({ cx, cy, payload }: any) =>
                activeDotStyle(
                  "var(--color-temperature_2m_mean)",
                  cx,
                  cy,
                  payload
                )
              }
            />
            <Line
              dataKey="apparent_temperature_mean"
              type="monotone"
              stroke="var(--color-apparent_temperature_mean)"
              strokeWidth={1}
              dot={false}
              activeDot={({ cx, cy, payload }: any) =>
                activeDotStyle(
                  "var(--color-apparent_temperature_mean)",
                  cx,
                  cy,
                  payload
                )
              }
            />
            <Line
              dataKey="temperature_2m_min"
              type="monotone"
              stroke="var(--color-temperature_2m_min)"
              strokeWidth={1}
              dot={false}
              activeDot={({ cx, cy, payload }: any) =>
                activeDotStyle(
                  "var(--color-temperature_2m_min)",
                  cx,
                  cy,
                  payload
                )
              }
            />
            <Line
              dataKey="apparent_temperature_min"
              type="monotone"
              stroke="var(--color-apparent_temperature_min)"
              strokeWidth={1}
              dot={false}
              activeDot={({ cx, cy, payload }: any) =>
                activeDotStyle(
                  "var(--color-apparent_temperature_min)",
                  cx,
                  cy,
                  payload
                )
              }
            />
            <ChartLegend
              content={
                <ChartLegendContent className="md:max-w-[50vw] mx-auto flex-wrap gap-x-2 gap-y-1" />
              }
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}

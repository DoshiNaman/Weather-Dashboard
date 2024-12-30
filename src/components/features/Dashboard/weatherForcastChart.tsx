"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
} from "recharts";

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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Circle, GitCommitVertical } from "lucide-react";

// const chartData = [
//   {
//     date: "2024-12-01",
//     temperature_2m_max: 29.0,
//     apparent_temperature_max: 28.0,
//     temperature_2m_mean: 22.1,
//     apparent_temperature_mean: 21.0,
//     temperature_2m_min: 15.4,
//     apparent_temperature_min: 14.0,
//   },
//   {
//     date: "2024-12-02",
//     temperature_2m_max: 30.0,
//     apparent_temperature_max: 29.0,
//     temperature_2m_mean: 22.7,
//     apparent_temperature_mean: 21.5,
//     temperature_2m_min: 16.2,
//     apparent_temperature_min: 15.0,
//   },
//   {
//     date: "2024-12-03",
//     temperature_2m_max: 10.2,
//     apparent_temperature_max: -3.2,
//     temperature_2m_mean: 24.6,
//     apparent_temperature_mean: 23.0,
//     temperature_2m_min: 18.6,
//     apparent_temperature_min: 17.0,
//   },
//   {
//     date: "2024-12-04",
//     temperature_2m_max: 31.8,
//     apparent_temperature_max: 30.5,
//     temperature_2m_mean: 25.5,
//     apparent_temperature_mean: 24.0,
//     temperature_2m_min: 19.8,
//     apparent_temperature_min: 18.0,
//   },
//   {
//     date: "2024-12-05",
//     temperature_2m_max: 31.7,
//     apparent_temperature_max: 30.5,
//     temperature_2m_mean: 25.5,
//     apparent_temperature_mean: 24.0,
//     temperature_2m_min: 19.0,
//     apparent_temperature_min: 18.0,
//   },
//   {
//     date: "2024-12-06",
//     temperature_2m_max: 30.8,
//     apparent_temperature_max: 29.5,
//     temperature_2m_mean: 24.0,
//     apparent_temperature_mean: 22.5,
//     temperature_2m_min: 17.9,
//     apparent_temperature_min: 16.0,
//   },
//   {
//     date: "2024-12-07",
//     temperature_2m_max: 30.3,
//     apparent_temperature_max: 29.0,
//     temperature_2m_mean: 22.2,
//     apparent_temperature_mean: 21.0,
//     temperature_2m_min: 13.8,
//     apparent_temperature_min: 12.5,
//   },
//   {
//     date: "2024-12-08",
//     temperature_2m_max: 30.0,
//     apparent_temperature_max: 28.5,
//     temperature_2m_mean: 21.4,
//     apparent_temperature_mean: 20.0,
//     temperature_2m_min: 13.2,
//     apparent_temperature_min: 12.0,
//   },
//   {
//     date: "2024-12-09",
//     temperature_2m_max: 27.7,
//     apparent_temperature_max: 26.5,
//     temperature_2m_mean: 20.2,
//     apparent_temperature_mean: 19.0,
//     temperature_2m_min: 13.9,
//     apparent_temperature_min: 12.5,
//   },
//   {
//     date: "2024-12-10",
//     temperature_2m_max: 26.0,
//     apparent_temperature_max: 25.0,
//     temperature_2m_mean: 19.4,
//     apparent_temperature_mean: 18.0,
//     temperature_2m_min: 13.7,
//     apparent_temperature_min: 12.5,
//   },
//   {
//     date: "2024-12-11",
//     temperature_2m_max: 27.0,
//     apparent_temperature_max: 26.0,
//     temperature_2m_mean: 19.8,
//     apparent_temperature_mean: 18.5,
//     temperature_2m_min: 13.4,
//     apparent_temperature_min: 12.5,
//   },
//   {
//     date: "2024-12-12",
//     temperature_2m_max: 27.3,
//     apparent_temperature_max: 26.5,
//     temperature_2m_mean: 20.2,
//     apparent_temperature_mean: 19.0,
//     temperature_2m_min: 13.0,
//     apparent_temperature_min: 12.0,
//   },
//   {
//     date: "2024-12-13",
//     temperature_2m_max: 26.0,
//     apparent_temperature_max: 45.0,
//     temperature_2m_mean: 19.5,
//     apparent_temperature_mean: 18.0,
//     temperature_2m_min: 13.3,
//     apparent_temperature_min: 12.5,
//   },
//   {
//     date: "2024-12-14",
//     temperature_2m_max: 20.0,
//     apparent_temperature_max: 26.5,
//     temperature_2m_mean: 19.9,
//     apparent_temperature_mean: 18.5,
//     temperature_2m_min: 12.5,
//     apparent_temperature_min: 12.0,
//   },
//   {
//     date: "2024-12-15",
//     temperature_2m_max: 28.3,
//     apparent_temperature_max: 27.0,
//     temperature_2m_mean: 20.3,
//     apparent_temperature_mean: 19.0,
//     temperature_2m_min: 13.5,
//     apparent_temperature_min: 12.5,
//   },
// ];

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

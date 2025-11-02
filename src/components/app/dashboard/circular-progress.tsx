"use client";

import { PolarAngleAxis, RadialBar, RadialBarChart, ResponsiveContainer } from "recharts";

type CircularProgressProps = {
  value: number;
  label: string;
};

export function CircularProgress({ value, label }: CircularProgressProps) {
  return (
    <div className="relative flex h-40 w-40 items-center justify-center">
      <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          innerRadius="75%"
          outerRadius="90%"
          data={[{ value }]}
          startAngle={90}
          endAngle={-270}
          barSize={12}
        >
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            angleAxisId={0}
            tick={false}
          />
          <RadialBar
            background={{ fill: "hsl(var(--muted))" }}
            dataKey="value"
            cornerRadius={10}
            className="fill-primary"
          />
        </RadialBarChart>
      </ResponsiveContainer>
      <div className="absolute flex flex-col items-center justify-center">
        <span className="font-headline text-3xl font-bold">{value}%</span>
        <span className="text-sm text-muted-foreground">{label}</span>
      </div>
    </div>
  );
}

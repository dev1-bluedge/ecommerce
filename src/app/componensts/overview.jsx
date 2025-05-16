"use client"

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts"

const data = [
  {
    name: "Jan",
    total:  700,
  },
  {
    name: "Feb",
    total: 1000,
  },
  {
    name: "Mar",
    total: 1000,
  },
  {
    name: "Apr",
    total:  1000,
  },
  {
    name: "May",
    total: 1000,
  },
  {
    name: "Jun",
    total:  500,
  },
  {
    name: "Jul",
    total: 1000,
  },
  {
    name: "Aug",
    total: 1000,
  },
  {
    name: "Sep",
    total: 1000,
  },
  {
    name: "Oct",
    total: 1000,
  },
  {
    name: "Nov",
    total: 1000,
  },
  {
    name: "Dec",
    total: 100,
  },
]

export function Overview() {
  return (
    <ResponsiveContainer width="100%" height={350}>
      <BarChart data={data}>
        <XAxis
          dataKey="name"
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
        />
        <YAxis
          stroke="#888888"
          fontSize={12}
          tickLine={false}
          axisLine={false}
          tickFormatter={(value) => `${value}`}
        />
        <Bar
          dataKey="total"
          fill="currentColor"
          radius={[4, 4, 0, 0]}
          className="fill-primary"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
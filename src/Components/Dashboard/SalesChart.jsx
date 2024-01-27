import { eachDayOfInterval, format, isSameDay, subDays } from "date-fns";
import React, { useContext } from "react";
import { contexts } from "../../Services/Context";
import { motion } from "framer-motion";
import { useSearchParams } from "react-router-dom";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function SalesChart({ bookings }) {
  const { mode } = useContext(contexts);
  const [searchParams] = useSearchParams();

  const days = searchParams.get("last") || 6;

  const allDates = eachDayOfInterval({
    start: subDays(new Date(), days),
    end: new Date(),
  });

  const data = allDates.map((date) => {
    return {
      label: format(date, "MMM dd"),
      totalSales: bookings
        .filter((b) => isSameDay(date, new Date(b.created_at)))
        .reduce((acc, cur) => acc + cur.totalPrice, 0),
      extrasSales: bookings
        .filter((b) => isSameDay(date, new Date(b.created_at)))
        .reduce((acc, cur) => acc + cur.extrasPrice, 0),
    };
  });

  return (
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "just", duration: 0.6 }}
      className="w-full h-80 p-4 rounded-md dark:bg-[#18212f] bg-white mt-4 grow"
    >
      <h1 className="font-semibold mb-2">
        Sales from{" "}
        {format(subDays(new Date("2024-01-26"), days), "MMM dd yyyy")} —{" "}
        {format(new Date("2024-01-26"), "MMM dd yyyy")}
      </h1>
      <div className="h-full text-[11px]">
        <ResponsiveContainer width="100%" height={"90%"}>
          <AreaChart data={data}>
            <CartesianGrid strokeDasharray="3" />
            <XAxis
              dataKey="label"
              tick={{ fill: `${mode === "dark" && "#e6e6e6"}` }}
              angle={-15}
              tickSize={8}
            />
            <YAxis
              dataKey="totalSales"
              unit={"$"}
              width={50}
              tick={{ fill: `${mode === "dark" && "#e6e6e6"}` }}
              tickCount={5}
              tickSize={10}
              mirror={true}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: `${mode === "dark" ? "#18212f" : "white"}`,
              }}
              unit={"$"}
            />
            <Area
              type="monotone"
              dataKey={"totalSales"}
              stroke="#5355e2"
              fill={`${mode === "dark" ? "#5355e2" : "rgb(187 185 255)"}`}
              name="Total sales"
            />
            <Area
              type="monotone"
              dataKey={"extrasSales"}
              stroke="#1cb51d"
              fill={`${mode === "dark" ? "#2bdbb3" : "rgb(185 255 239)"}`}
              name="Extra sales"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

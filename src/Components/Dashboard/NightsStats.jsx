import React, { useContext } from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { contexts } from "../../Services/Context";
import getChartData, { nightsDark, nightsLight } from "./NightsData";
import { motion } from "framer-motion";

export default function NightsStats({ bookings }) {
  const { mode } = useContext(contexts);
  const nights = mode === "dark" ? nightsDark : nightsLight;
  let chartData = getChartData(bookings, nights);

  return (
    <motion.div
      initial={{ x: "100%", opacity: 0 }}
      whileInView={{ x: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ type: "just", duration: 0.6 }}
      className="p-4 rounded-md dark:bg-[#18212f] bg-white text-[13px] grow"
    >
      <h1 className="font-semibold text-[16px]">Stay duration summary</h1>
      <div className="flex items-center justify-center content-center h-[90%]">
        <ResponsiveContainer width="100%" height={230}>
          <PieChart>
            <Pie
              data={chartData}
              nameKey="duration"
              dataKey="value"
              innerRadius={window.innerWidth < 400 ? 40 : 60}
              outerRadius={window.innerWidth < 400 ? 60 : 85}
              paddingAngle={3}
              stroke="transparent"
              label={window.innerWidth < 400 && true}
            >
              {chartData.map((entry) => (
                <Cell
                  fill={entry.color}
                  stroke={entry.color}
                  key={entry.value !== 0 ? entry.duration : null}
                />
              ))}
            </Pie>
            <Tooltip></Tooltip>
            {window.innerWidth > 400 && (
              <Legend
                verticalAlign="middle"
                align="right"
                width="30%"
                iconSize={8}
                iconType="circle"
              />
            )}
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}

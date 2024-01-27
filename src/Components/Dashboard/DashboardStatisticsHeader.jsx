import React from "react";
import { RiCalendar2Line } from "react-icons/ri";
import { GiMoneyStack } from "react-icons/gi";
import { FaCheckToSlot } from "react-icons/fa6";
import { GrGroup } from "react-icons/gr";
import { formatCurrency } from "../../Services/Helpers";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";

export default function DashboardStatisticsHeader({ bookings, cabins }) {
  const [searchParams] = useSearchParams();

  const occupancy =
    (bookings.reduce((acc, cur) => acc + cur.numNights, 0) /
      cabins.length /
      searchParams.get("last")) *
    100;

  return (
    <div className="flex gap-3 items-center w-full mt-3 flex-wrap">
      <div className="flex gap-3 items-center md:w-[40%] w-full grow flex-wrap">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: Math.random(1) }}
          className="flex items-center gap-3 p-3 rounded-md dark:bg-[#18212f] bg-white grow"
        >
          <h1 className="p-[11px] rounded-full dark:bg-sky-800 bg-sky-100 dark:text-slate-300 text-sky-700 text-[25px]">
            <RiCalendar2Line />
          </h1>
          <div className="flex flex-col">
            <p className="text-[10.5px] dark:text-gray-400 font-medium uppercase">
              Bookings
            </p>
            <h1 className="font-semibold text-[18px]">{bookings.length}</h1>
          </div>
        </motion.div>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: Math.random(1) }}
          className="flex items-center gap-3 p-3 rounded-md dark:bg-[#18212f] bg-white grow"
        >
          <h1 className="p-[11px] rounded-full dark:bg-green-800 bg-green-100 dark:text-slate-100 text-green-700 text-[25px]">
            <GiMoneyStack />
          </h1>
          <div className="flex flex-col">
            <p className="text-[10.5px] dark:text-gray-400 font-medium uppercase">
              sales
            </p>
            <h1 className="font-semibold text-[18px]">
              {formatCurrency(
                bookings.reduce((acc, cur) => acc + cur.totalPrice, 0)
              )}
            </h1>
          </div>
        </motion.div>
      </div>
      <div className="flex gap-3 items-center md:w-[40%] w-full grow flex-wrap">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: Math.random(1) }}
          className="flex items-center gap-3 p-3 rounded-md dark:bg-[#18212f] bg-white grow"
        >
          <h1 className="p-[11px] rounded-full dark:bg-indigo-800 bg-indigo-100 dark:text-slate-300 text-indigo-700 text-[25px]">
            <FaCheckToSlot />
          </h1>
          <div className="flex flex-col">
            <p className="text-[10.5px] dark:text-gray-400 font-medium uppercase">
              CHECK INS
            </p>
            <h1 className="font-semibold text-[18px]">
              {bookings.filter((b) => b.status === "checked-in").length}
            </h1>
          </div>
        </motion.div>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: Math.random(1) }}
          className="flex items-center gap-3 p-3 rounded-md dark:bg-[#18212f] bg-white grow"
        >
          <h1 className="p-[11px] rounded-full dark:bg-yellow-800 bg-yellow-100 dark:text-slate-300 text-yellow-700 text-[25px]">
            <GrGroup />
          </h1>
          <div className="flex flex-col">
            <p className="text-[10.5px] dark:text-gray-400 font-medium uppercase">
              OCCUPANCY RATE
            </p>
            <h1 className="font-semibold text-[18px]">
              {occupancy > 100 ? 100 : Math.round(occupancy)}%
            </h1>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
